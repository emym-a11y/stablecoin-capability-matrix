import type { ProductMeta } from './types';

// comingSoon = sum of planned countries from sheet (Q1 + Q2 + 2H + 2027 columns)
export const PRODUCTS: ProductMeta[] = [
  // Money In
  {
    id: 'local_acquiring',
    name: 'Local Acquiring',
    group: 'money_in',
    groupLabel: 'Money In',
    description: 'Countries where Stripe has merchants today',
    rubySource: 'supported_acquiring_and_payouts_countries_excluding_gated',
    comingSoon: 1, // sheet: 47+47+47 - 46 live = ~1 new
  },
  {
    id: 'stablecoin_payments',
    name: 'Stablecoin Payments',
    group: 'money_in',
    groupLabel: 'Money In',
    description: 'Accept stablecoin payments from customers',
    rubySource: 'SUPPORTED_STABLECOIN_CARDPAYMENTS_MERCHANT_COUNTRIES',
    comingSoon: 172, // sheet: Q2=31, 2H=173, 2027=173 (max 173 - 1 live)
  },
  {
    id: 'onramp_support',
    name: 'On-Ramp Support (for top-ups)',
    group: 'money_in',
    groupLabel: 'Money In',
    description: 'Convert fiat to crypto for account top-ups',
    rubySource: 'SUPPORTED_COUNTRIES (US + EU + UK)',
    comingSoon: 26, // sheet: Q1=1, Q2=26, 2H=27, 2027=27 (27 - 1 live)
  },

  // Balances
  {
    id: 'stablecoin_link_balance',
    name: 'Stablecoin Link Balance',
    group: 'balances',
    groupLabel: 'Balances',
    description: 'Hold stablecoin balances via Link',
    rubySource: 'SUPPORTED_STABLECOIN_CARDPAYMENTS_MERCHANT_COUNTRIES',
    comingSoon: 56, // sheet: Q1=5, Q2=7, 2H=61, 2027=61 (61 - 5 live)
  },
  {
    id: 'sfa_storage',
    name: 'SFA Support for Storage',
    group: 'balances',
    groupLabel: 'Balances',
    description: 'Stablecoin Financial Account for USDC storage',
    rubySource: 'SUPPORTED_USDC_STORER_MERCHANT_COUNTRIES',
    comingSoon: 7, // sheet: 103->109->110->110 (110 - 103 = 7 new)
  },

  // Money Out
  {
    id: 'global_payouts',
    name: 'Global Payouts',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'Send payouts to recipients worldwide',
    rubySource: 'supported_payouts_countries',
    comingSoon: 0, // already at 148, stays at 148
  },
  {
    id: 'local_currency_offramps',
    name: 'Local Currency Off-Ramps',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'Convert USDC to local fiat currency',
    rubySource: 'get_supported_countries_for_bank_account_destination_recipients',
    comingSoon: 43, // sheet: Q1=25, Q2=37, 2H=68, 2027=68 (68 - 25)
  },
  {
    id: 'legacy_connect_crypto',
    name: 'Legacy Connect Crypto Payouts',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'Crypto payouts via Connect (US platforms)',
    rubySource: 'CRYPTO_RECIPIENT_COUNTRIES',
    comingSoon: 0, // stays at 67
  },
  {
    id: 'distributed_payouts',
    name: 'Distributed Payouts (Crypto Connect v1)',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'USDC payouts to crypto wallets (EU/US)',
    rubySource: 'get_supported_countries_for_recipients',
    comingSoon: 101, // sheet: Q1=1, Q2=25, 2H=102, 2027=102 (102 - 1)
  },
  {
    id: 'stablecoin_issuing',
    name: 'Stablecoin Issuing',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'Issue cards funded by stablecoin balances',
    rubySource: 'SUPPORTED_STABLECOIN_COUNTRIES_FOR_ISSUING + SUPPORTED_BRIDGE_COUNTRIES_FOR_ISSUING',
    comingSoon: 91, // sheet: 20->36->45->127->127 (127 - 36)
  },
];

export const GROUP_ORDER: Array<{ key: string; label: string }> = [
  { key: 'money_in', label: 'Money In' },
  { key: 'balances', label: 'Balances' },
  { key: 'money_out', label: 'Money Out' },
];
