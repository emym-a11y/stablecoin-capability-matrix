export interface RoadmapItem {
  product: string;
  release: string;
  description: string;
  phase: string;
  quarter: string;
  region: string;
  category: string;
}

// Categories matching our sections
function categorize(product: string): string {
  const map: Record<string, string> = {
    'Stablecoin payments': 'Money In',
    'Link': 'Money In',
    'Onramp': 'Money In',
    'Crypto': 'Money In',
    'Treasury': 'Balances/Storage',
    'Treasury for platforms': 'Balances/Storage',
    'Bridge': 'Infrastructure',
    'Global Payouts': 'Money Out',
    'Payouts': 'Money Out',
    'Issuing': 'Spend',
    'Connect': 'Connect',
  };
  return map[product] || 'Other';
}

// Public roadmap data extracted from the sales deck roadmap sheet
const RAW_ITEMS: Array<Omit<RoadmapItem, 'category'>> = [
  // Money In - Stablecoin Payments
  { product: 'Stablecoin payments', release: 'Pay with USDT', description: 'Accept USDT as a payment currency.', phase: 'Public preview', quarter: 'Q2', region: 'Global' },
  { product: 'Stablecoin payments', release: 'Stablecoin payments in 33 countries', description: 'Accept stablecoin payments from customers in 33 additional countries and territories, including Mexico, most of the EU, and Hong Kong.', phase: 'Private preview', quarter: 'Q2', region: 'Global' },
  { product: 'Stablecoin payments', release: 'Stablecoin payments in 33 countries', description: 'Accept stablecoin payments from customers in 33 additional countries.', phase: 'Public preview', quarter: 'Q3', region: 'Global' },
  { product: 'Stablecoin payments', release: 'Stablecoin payments in 33 countries', description: 'Accept stablecoin payments from customers in 33 additional countries.', phase: 'GA', quarter: 'Q4', region: 'Global' },
  { product: 'Stablecoin payments', release: 'Stablecoins subscriptions with Smart Retries', description: 'Stablecoin recurring payments support Smart Retries.', phase: 'Private preview', quarter: 'Q2', region: 'Global' },
  { product: 'Stablecoin payments', release: 'Persistent Deposit Addresses', description: 'Use stable, user-specific deposit addresses to support ongoing transactions.', phase: 'Private preview', quarter: 'Q3', region: 'Global' },
  { product: 'Stablecoin payments', release: 'Stablecoin settlement for crypto payments', description: 'Settle crypto transactions into a stablecoin balance.', phase: 'Private preview', quarter: 'Q4', region: 'Global' },
  { product: 'Stablecoin payments', release: 'Accept Open Issuance stablecoins via Payments', description: 'Accept Open Issuance stablecoins through Stripe Payments.', phase: 'GA', quarter: 'Q4', region: 'Global' },
  { product: 'Stablecoin payments', release: 'Pay with BTC, SOL, and ETH', description: 'Accept BTC, SOL, and ETH as payment currencies.', phase: 'Private preview', quarter: 'Q4', region: 'Global' },

  // Money In - Link
  { product: 'Link', release: 'Stablecoins on Link', description: 'Accept stablecoin payments through Link.', phase: 'Public preview', quarter: 'Q2', region: 'NA' },
  { product: 'Link', release: 'Stablecoins on Link', description: 'Accept stablecoin payments through Link.', phase: 'GA', quarter: 'Q1 2027', region: 'Global' },

  // Money In - Onramp
  { product: 'Onramp', release: 'Crypto Onramp', description: 'Embed a fiat-to-crypto onramp into your web app with embedded components.', phase: 'Private preview', quarter: 'Q2', region: 'EMEA, US' },
  { product: 'Onramp', release: 'Crypto Onramp', description: 'Embed a fiat-to-crypto onramp into your web app with embedded components.', phase: 'Public preview', quarter: 'Q4', region: 'EMEA, US' },
  { product: 'Onramp', release: 'Crypto Onramp reduced KYC flow', description: 'Crypto Onramp supports a lightweight KYC flow for reduced friction.', phase: 'Private preview', quarter: 'Q2', region: 'AMER' },
  { product: 'Onramp', release: 'Crypto Onramp reduced KYC flow', description: 'Crypto Onramp supports a lightweight KYC flow for reduced friction.', phase: 'Public preview', quarter: 'Q4', region: 'AMER' },
  { product: 'Onramp', release: 'KYC sharing and networked identity for Crypto Onramp', description: 'Crypto Onramp supports KYC sharing, eliminating duplicate verification for customers.', phase: 'Private preview', quarter: 'Q3', region: 'Global' },
  { product: 'Onramp', release: 'Crypto offramp for consumers', description: 'Consumers can quickly offramp their crypto to existing payment methods.', phase: 'Private preview', quarter: 'Q4', region: 'Global' },
  { product: 'Onramp', release: 'Crypto Onramp expanded token support', description: 'The Crypto Onramp embedded component supports BTC, SOL, and ETH.', phase: 'Private preview', quarter: 'Q4', region: 'Global' },

  // Money In - Crypto
  { product: 'Crypto', release: 'QR deposit flow', description: 'Accept crypto payments via QR code or direct deposit.', phase: 'GA', quarter: 'Q1', region: 'Global' },

  // Balances/Storage - Treasury
  { product: 'Treasury', release: 'Expanded offramps currencies for Treasury', description: 'Treasury users storing stablecoins (USDC/EURC) can offramp funds to local currency bank accounts in BRL, AUD, GBP, and NGN.', phase: 'Private preview', quarter: 'Q2', region: 'Global' },
  { product: 'Treasury', release: 'Expanded offramps currencies for Treasury', description: 'Treasury users storing stablecoins (USDC/EURC) can offramp funds to local currency bank accounts in ZAR, KES, GHS, NOK, DKK, SEK, and VND.', phase: 'Private preview', quarter: 'Q3', region: 'Global' },
  { product: 'Treasury', release: 'Expanded offramps currencies for Treasury', description: 'Treasury users storing stablecoins (USDC/EURC) can offramp funds to local currency bank accounts in PEN, CLP, PLN, RON, and NZD.', phase: 'Private preview', quarter: 'Q4', region: 'Global' },
  { product: 'Treasury', release: 'Expanded offramps currencies for Treasury', description: 'Treasury users storing stablecoins (USDC/EURC) can offramp funds to local currency bank accounts in BRL, AUD, GBP, and NGN.', phase: 'Public preview', quarter: 'Q4', region: 'Global' },
  { product: 'Treasury', release: 'Additional onramps on Treasury', description: 'Treasury users storing stablecoins (USDC/EURC) can fund their account from local currency bank accounts in MXN, BRL, GBP, AUD, COP, ARS, and NGN.', phase: 'Private preview', quarter: 'Q3', region: 'Global' },
  { product: 'Treasury', release: 'Expanded country coverage for Treasury across Africa, APAC, and Latam', description: 'Open stablecoin-backed financial accounts in 50 additional countries (150 countries total) powered by non-custodial wallets.', phase: 'Private preview', quarter: 'Q4', region: 'Global' },
  { product: 'Treasury', release: 'Fund, store, and send stablecoins with Treasury', description: 'US Treasury users can access funds 24/7 and move money faster with stablecoins.', phase: 'GA', quarter: 'Q4', region: 'NA' },
  { product: 'Treasury', release: 'High yield investment accounts', description: 'Deposit money in high-yield investment accounts backed by fiat and crypto instruments directly from the Stripe Dashboard.', phase: 'Private preview', quarter: 'Q4', region: 'US' },
  { product: 'Treasury for platforms', release: 'Treasury for platforms in 100 countries backed by stablecoins', description: 'Embed financial accounts backed by stablecoins in 100 countries.', phase: 'Private preview', quarter: 'Q2', region: 'Global' },
  { product: 'Treasury for platforms', release: 'Treasury for Platforms in 100 countries backed by stablecoins', description: 'Platforms can offer financial accounts to receive, store, convert, and send funds, including stablecoin balances, in 100 countries.', phase: 'Public preview', quarter: 'Q4', region: 'Global' },

  // Money Out - Global Payouts
  { product: 'Global Payouts', release: 'Stablecoin payouts US', description: 'Send money from the US to recipients in 160 countries instantly in stablecoins via the Dashboard or API with Global Payouts.', phase: 'GA', quarter: 'Q3', region: 'US' },
  { product: 'Global Payouts', release: 'Stablecoin payouts EU', description: 'Send money from the EU to recipients in 160 countries instantly in stablecoins via the Dashboard or API with Global Payouts.', phase: 'Private preview', quarter: 'Q4', region: 'EU' },
  { product: 'Payouts', release: 'Payouts supported by more blockchains', description: 'Send money on Sui and Tempo blockchains.', phase: 'Private preview', quarter: 'Q2', region: 'Global' },
  { product: 'Global Payouts', release: 'Payouts supported by more blockchains', description: 'Send money on Sui and Tempo blockchains.', phase: 'GA', quarter: 'Q4', region: 'Global' },
  { product: 'Global Payouts', release: 'USDT payouts on Global Payouts', description: 'Stablecoin payouts support USDT and Tether.', phase: 'Private preview', quarter: 'Q3', region: 'Global' },

  // Spend - Issuing
  { product: 'Issuing', release: 'Stablecoin-backed card issuing in 60 countries', description: 'Issue consumer or commercial stablecoin-backed cards in 60 countries.', phase: 'Public preview', quarter: 'Q3', region: 'Global' },
  { product: 'Issuing', release: 'Consumer debit card', description: 'Offer a consumer debit card backed by fiat or stablecoins, with Stripe handling program management.', phase: 'Private preview', quarter: 'Q2', region: 'AMER' },
  { product: 'Issuing', release: 'Consumer debit card', description: 'Offer a consumer debit card backed by fiat or stablecoins, with Stripe handling program management.', phase: 'Public preview', quarter: 'Q4', region: 'AMER' },
  { product: 'Issuing', release: 'Spending from DeFi balances', description: 'Your users can spend from their stablecoin balances held in DeFi lending protocols.', phase: 'Private preview', quarter: 'Q3', region: 'Global' },
  { product: 'Issuing', release: 'Spending from DeFi balances', description: 'Your users can spend from their stablecoin balances held in DeFi lending protocols.', phase: 'Public preview', quarter: 'Q4', region: 'Global' },

  // Connect
  { product: 'Connect', release: 'Stablecoins for marketplaces', description: 'Stripe Connect marketplaces in the US can onboard sellers in 100+ countries and transfer digital USD (stablecoins) to their accounts.', phase: 'Private preview', quarter: 'Q3', region: 'NA, EMEA' },
  { product: 'Connect', release: 'Stablecoins for marketplaces', description: 'Connect marketplaces in the EU can onboard sellers in 100+ countries and transfer digital USD (stablecoins) to their accounts.', phase: 'Public preview', quarter: 'Q4', region: 'EU' },

  // Infrastructure - Bridge
  { product: 'Bridge', release: 'Additional onramp and offramp currencies', description: 'Bridge Orchestration adds new on/offramps for COP, ARS, and AUD and supports EURC on MXN, BRL, and GBP on/offramps.', phase: 'GA', quarter: 'Q2', region: 'Global' },
  { product: 'Bridge', release: 'Additional offramp currencies', description: 'Bridge Orchestration adds new on/offramps for NGN, ZAR, KES, and GHS.', phase: 'GA', quarter: 'Q3', region: 'Global' },
  { product: 'Bridge', release: 'EUR-backed stablecoins', description: 'Launch a custom, regulated EUR-backed stablecoin via Open Issuance.', phase: 'GA', quarter: 'Q3', region: 'Global' },
  { product: 'Bridge', release: 'Expanded blockchain coverage', description: 'Bridge supports the Abstract blockchain.', phase: 'GA', quarter: 'Q2', region: 'Global' },
  { product: 'Bridge', release: 'Expanded stablecoin coverage', description: 'Bridge supports USDCBL and EURC on Stellar.', phase: 'GA', quarter: 'Q2', region: 'Global' },
  { product: 'Bridge', release: 'USD fiat rails and capabilities', description: 'Bridge Orchestration supports first-party SWIFT payments, FedNow for USD onramps, and ACH pulls from USD virtual accounts.', phase: 'GA', quarter: 'Q2', region: 'Global' },
  { product: 'Bridge', release: 'Stablecoin-backed card issuing in 30 countries', description: 'Issue consumer or commercial stablecoin-backed cards in 30 countries.', phase: 'Private preview', quarter: 'Q2', region: 'Global' },
  { product: 'Bridge', release: 'Stablecoin-backed card issuing in 60 countries', description: 'Issue consumer or commercial stablecoin-backed cards in 60 countries.', phase: 'Public preview', quarter: 'Q3', region: 'Global' },
  { product: 'Bridge', release: 'Smart contracts support for EVM blockchains for stablecoin-backed cards', description: 'Bridge supports non-custodial card funding on the Tempo, World, Linea, and Base blockchains.', phase: 'GA', quarter: 'Q2', region: 'Global' },
  { product: 'Bridge', release: 'Cross-chain bridging of Open Issuance stablecoins', description: 'Increase stablecoin distribution with cross-chain bridging.', phase: 'GA', quarter: 'Q3', region: 'Global' },
  { product: 'Bridge', release: 'Named EUR accounts', description: 'Bridge supports opening unique EUR virtual international bank account numbers registered in the end user\'s name.', phase: 'Private preview', quarter: 'Q3', region: 'Global' },
  { product: 'Bridge', release: 'Named EUR accounts', description: 'Bridge supports customer-named virtual international bank account number and payouts.', phase: 'Public preview', quarter: 'Q4', region: 'Global' },
  { product: 'Bridge', release: 'Spending from DeFi balances', description: 'Spend from stablecoin balances held in DeFi lending protocols.', phase: 'Public preview', quarter: 'Q4', region: 'Global' },
  { product: 'Bridge', release: 'New monetization tools', description: 'Bridge Orchestration lets developers pass fees through to their customers and set fixed fees for USD virtual account onramps.', phase: 'GA', quarter: 'Q2', region: 'Global' },
  { product: 'Bridge', release: 'Fixed-output foreign exchange', description: 'Bridge Orchestration supports fixed-output foreign exchange, so recipients receive a specified amount.', phase: 'GA', quarter: 'Q1', region: 'Global' },
  { product: 'Bridge', release: 'Onramp and offramp for GBP', description: 'Bridge Orchestration adds on/off-ramps for GBP.', phase: 'GA', quarter: 'Q1', region: 'Global' },
];

export const PUBLIC_ROADMAP: RoadmapItem[] = RAW_ITEMS.map((item) => ({
  ...item,
  category: categorize(item.product),
}));

export const ROADMAP_CATEGORIES = [
  'Money In',
  'Balances/Storage',
  'Money Out',
  'Spend',
  'Connect',
  'Infrastructure',
];
