export type ProductGroup = 'money_in' | 'balances' | 'money_out';
export type DataSource = 'auto' | 'override';

export interface ProductMeta {
  id: string;
  name: string;
  group: ProductGroup;
  groupLabel: string;
  description: string;
  rubySource: string;
}

export interface ProductCountryData {
  countries: string[];
  source: DataSource;
  count: number;
}

export interface CountryDataFile {
  fetchedAt: string;
  commitSha: string;
  products: Record<string, ProductCountryData>;
}

export type CoverageTier = 'high' | 'medium' | 'low' | 'none';

export function getCoverageTier(count: number): CoverageTier {
  if (count >= 20) return 'high';
  if (count >= 5) return 'medium';
  if (count >= 1) return 'low';
  return 'none';
}
