/**
 * Fetches Ruby source files from Sourcegraph, parses country constants,
 * and outputs src/data/countries.json.
 *
 * Usage: npx tsx scripts/fetch-country-data.ts
 * Requires SOURCEGRAPH_TOKEN env var.
 */

import * as fs from 'fs';
import * as path from 'path';

const SOURCEGRAPH_URL = 'https://stripe.sourcegraphcloud.com/.api/graphql';
const REPO = 'stripe-internal/pay-server';

interface ProductCountryData {
  countries: string[];
  source: 'auto' | 'override';
  count: number;
}

interface Override {
  countries: string[];
  source: 'override';
  note?: string;
}

// --- Sourcegraph API ---

async function fetchFileContent(filePath: string): Promise<string> {
  const token = process.env.SOURCEGRAPH_TOKEN;
  if (!token) throw new Error('SOURCEGRAPH_TOKEN env var is required');

  const query = `
    query ReadFile($repo: String!, $path: String!) {
      repository(name: $repo) {
        commit(rev: "HEAD") {
          file(path: $path) {
            content
          }
        }
      }
    }
  `;

  const resp = await fetch(SOURCEGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: { repo: REPO, path: filePath },
    }),
  });

  if (!resp.ok) {
    throw new Error(`Sourcegraph API error: ${resp.status} ${resp.statusText}`);
  }

  const json = await resp.json();
  const content = json?.data?.repository?.commit?.file?.content;
  if (!content) {
    throw new Error(`File not found or empty: ${filePath}`);
  }
  return content;
}

// --- Ruby Parser ---

/**
 * Extract all Opus::Globalization::Country.XX references from a block of Ruby code.
 * Returns uppercase 2-letter country codes.
 */
function parseCountryCodes(ruby: string): string[] {
  const regex = /Opus::Globalization::Country\.(\w{2})/g;
  const codes = new Set<string>();
  let match;
  while ((match = regex.exec(ruby)) !== null) {
    codes.add(match[1].toUpperCase());
  }
  return Array.from(codes).sort();
}

/**
 * Extract a named constant block from Ruby source.
 * Looks for CONSTANT_NAME = T.let( ... ) or CONSTANT_NAME = [ ... ]
 */
function extractConstantBlock(source: string, constantName: string): string {
  const startIdx = source.indexOf(constantName);
  if (startIdx === -1) return '';

  // Find the opening bracket
  let bracketStart = source.indexOf('[', startIdx);
  if (bracketStart === -1) return '';

  // Count brackets to find the matching close
  let depth = 0;
  let i = bracketStart;
  while (i < source.length) {
    if (source[i] === '[') depth++;
    if (source[i] === ']') depth--;
    if (depth === 0) break;
    i++;
  }

  return source.slice(bracketStart, i + 1);
}

/**
 * Extract a method body from Ruby source.
 * Looks for def self.method_name ... end
 */
function extractMethodBody(source: string, methodName: string): string {
  const pattern = new RegExp(`def\\s+self\\.${methodName}[\\s\\S]*?\\bend\\b`);
  const match = source.match(pattern);
  return match ? match[0] : '';
}

// --- Product Parsers ---

type ProductParser = () => Promise<ProductCountryData>;

function makeConstantParser(
  filePath: string,
  constantName: string,
): ProductParser {
  return async () => {
    const source = await fetchFileContent(filePath);
    const block = extractConstantBlock(source, constantName);
    const countries = parseCountryCodes(block);
    return { countries, source: 'auto', count: countries.length };
  };
}

function makeMethodParser(
  filePath: string,
  methodName: string,
): ProductParser {
  return async () => {
    const source = await fetchFileContent(filePath);
    const block = extractMethodBody(source, methodName);
    const countries = parseCountryCodes(block);
    return { countries, source: 'auto', count: countries.length };
  };
}

// SFA = NONCARDPAYMENTS + [MX, US]
function makeSfaParser(): ProductParser {
  return async () => {
    const source = await fetchFileContent('lib/globalization/core.rb');
    const noncardBlock = extractConstantBlock(
      source,
      'SUPPORTED_STABLECOIN_NONCARDPAYMENTS_MERCHANT_COUNTRIES',
    );
    const countries = new Set(parseCountryCodes(noncardBlock));
    countries.add('MX');
    countries.add('US');
    return {
      countries: Array.from(countries).sort(),
      source: 'auto',
      count: countries.size,
    };
  };
}

// Stablecoin Issuing = FOR_ISSUING + BRIDGE_FOR_ISSUING
function makeIssuingParser(): ProductParser {
  return async () => {
    const source = await fetchFileContent('issuing/countries/constants.rb');
    const block1 = extractConstantBlock(
      source,
      'SUPPORTED_STABLECOIN_COUNTRIES_FOR_ISSUING',
    );
    const block2 = extractConstantBlock(
      source,
      'SUPPORTED_BRIDGE_COUNTRIES_FOR_ISSUING',
    );
    const countries = new Set([
      ...parseCountryCodes(block1),
      ...parseCountryCodes(block2),
    ]);
    return {
      countries: Array.from(countries).sort(),
      source: 'auto',
      count: countries.size,
    };
  };
}

// On-Ramp: parse EU + UK + US constants
function makeOnrampParser(): ProductParser {
  return async () => {
    const source = await fetchFileContent(
      'lib/cryptocurrency/onramp/core/constants/_impl.rb',
    );
    const countries = parseCountryCodes(source);
    // Always include US as the base
    const set = new Set(countries);
    set.add('US');
    return {
      countries: Array.from(set).sort(),
      source: 'auto',
      count: set.size,
    };
  };
}

const PRODUCT_PARSERS: Record<string, ProductParser> = {
  // local_acquiring and global_payouts use overrides (dynamic methods)
  stablecoin_payments: makeConstantParser(
    'lib/globalization/core.rb',
    'SUPPORTED_STABLECOIN_CARDPAYMENTS_MERCHANT_COUNTRIES',
  ),
  onramp_support: makeOnrampParser(),
  stablecoin_link_balance: makeConstantParser(
    'lib/globalization/core.rb',
    'SUPPORTED_STABLECOIN_CARDPAYMENTS_MERCHANT_COUNTRIES',
  ),
  sfa_storage: makeSfaParser(),
  local_currency_offramps: makeMethodParser(
    'lib/cryptocurrency/financial_accounts/utils/helpers.rb',
    'get_supported_countries_for_bank_account_destination_recipients',
  ),
  legacy_connect_crypto: makeMethodParser(
    'lib/cryptocurrency/financial_accounts/utils/helpers.rb',
    'get_supported_countries_for_recipients',
  ),
  distributed_payouts: makeMethodParser(
    'lib/cryptocurrency/financial_accounts/utils/helpers.rb',
    'get_supported_countries_for_recipients',
  ),
  stablecoin_issuing: makeIssuingParser(),
};

// --- Main ---

async function main() {
  console.log('Fetching country data from Sourcegraph...');

  // Load overrides
  const overridesPath = path.join(__dirname, 'overrides.json');
  const overrides: Record<string, Override> = JSON.parse(
    fs.readFileSync(overridesPath, 'utf-8'),
  );

  const products: Record<string, ProductCountryData> = {};

  // Apply overrides first
  for (const [id, override] of Object.entries(overrides)) {
    products[id] = {
      countries: override.countries,
      source: 'override',
      count: override.countries.length,
    };
    console.log(`  ${id}: ${override.countries.length} countries (override)`);
  }

  // Parse auto products
  for (const [id, parser] of Object.entries(PRODUCT_PARSERS)) {
    try {
      const result = await parser();
      products[id] = result;
      console.log(`  ${id}: ${result.count} countries (auto)`);
    } catch (err) {
      console.error(`  ${id}: FAILED - ${err}`);
      // Keep existing data if available
    }
  }

  const output = {
    fetchedAt: new Date().toISOString(),
    commitSha: 'auto-fetched',
    products,
  };

  const outputPath = path.join(__dirname, '..', 'src', 'data', 'countries.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n');
  console.log(`\nWrote ${outputPath}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
