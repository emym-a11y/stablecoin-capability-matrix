import type { ProductMeta } from './types';

export const PRODUCTS: ProductMeta[] = [
  // Money In
  {
    id: 'local_acquiring',
    name: 'Local Acquiring',
    group: 'money_in',
    groupLabel: 'Money In',
    description: 'Countries where Stripe has merchants today',
    rubySource: 'supported_acquiring_and_payouts_countries_excluding_gated',
  },
  {
    id: 'stablecoin_payments',
    name: 'Stablecoin Payments',
    group: 'money_in',
    groupLabel: 'Money In',
    description: 'Accept stablecoin payments from customers',
    rubySource: 'SUPPORTED_STABLECOIN_CARDPAYMENTS_MERCHANT_COUNTRIES',
  },
  {
    id: 'onramp_support',
    name: 'On-Ramp Support (for top-ups)',
    group: 'money_in',
    groupLabel: 'Money In',
    description: 'Convert fiat to crypto for account top-ups',
    rubySource: 'SUPPORTED_COUNTRIES (US + EU + UK)',
  },

  // Balances
  {
    id: 'stablecoin_link_balance',
    name: 'Stablecoin Link Balance',
    group: 'balances',
    groupLabel: 'Balances',
    description: 'Hold stablecoin balances via Link',
    rubySource: 'SUPPORTED_STABLECOIN_CARDPAYMENTS_MERCHANT_COUNTRIES',
  },
  {
    id: 'sfa_storage',
    name: 'SFA Support for Storage',
    group: 'balances',
    groupLabel: 'Balances',
    description: 'Stablecoin Financial Account for USDC storage',
    rubySource: 'SUPPORTED_USDC_STORER_MERCHANT_COUNTRIES',
  },

  // Money Out
  {
    id: 'global_payouts',
    name: 'Global Payouts',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'Send payouts to recipients worldwide',
    rubySource: 'supported_payouts_countries',
  },
  {
    id: 'local_currency_offramps',
    name: 'Local Currency Off-Ramps',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'Convert USDC to local fiat currency',
    rubySource: 'get_supported_countries_for_bank_account_destination_recipients',
  },
  {
    id: 'legacy_connect_crypto',
    name: 'Legacy Connect Crypto Payouts',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'Crypto payouts via Connect (US platforms)',
    rubySource: 'CRYPTO_RECIPIENT_COUNTRIES',
  },
  {
    id: 'distributed_payouts',
    name: 'Distributed Payouts (Crypto Connect v1)',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'USDC payouts to crypto wallets (EU/US)',
    rubySource: 'get_supported_countries_for_recipients',
  },
  {
    id: 'stablecoin_issuing',
    name: 'Stablecoin Issuing',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'Issue cards funded by stablecoin balances',
    rubySource: 'SUPPORTED_STABLECOIN_COUNTRIES_FOR_ISSUING + SUPPORTED_BRIDGE_COUNTRIES_FOR_ISSUING',
  },
];

export const GROUP_ORDER: Array<{ key: string; label: string }> = [
  { key: 'money_in', label: 'Money In' },
  { key: 'balances', label: 'Balances' },
  { key: 'money_out', label: 'Money Out' },
];
