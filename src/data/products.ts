import type { ProductMeta } from './types';

export const PRODUCTS: ProductMeta[] = [
  // Money In
  {
    id: 'local_acquiring',
    name: 'Local Acquiring',
    group: 'money_in',
    groupLabel: 'Money In',
    description: 'Countries where Stripe has merchants today',
  },
  {
    id: 'stablecoin_payments',
    name: 'Stablecoin Payments',
    group: 'money_in',
    groupLabel: 'Money In',
    description: 'Accept stablecoin payments from customers',
  },
  {
    id: 'onramp_support',
    name: 'On-Ramp Support (for top-ups)',
    group: 'money_in',
    groupLabel: 'Money In',
    description: 'Convert fiat to crypto for account top-ups',
  },

  // Balances
  {
    id: 'stablecoin_link_balance',
    name: 'Stablecoin Link Balance',
    group: 'balances',
    groupLabel: 'Balances',
    description: 'Hold stablecoin balances via Link',
  },
  {
    id: 'sfa_storage',
    name: 'SFA Support for Storage',
    group: 'balances',
    groupLabel: 'Balances',
    description: 'Stablecoin Financial Account for USDC storage',
  },

  // Money Out
  {
    id: 'global_payouts',
    name: 'Global Payouts',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'Send payouts to recipients worldwide',
  },
  {
    id: 'local_currency_offramps',
    name: 'Local Currency Off-Ramps',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'Convert USDC to local fiat currency',
  },
  {
    id: 'legacy_connect_crypto',
    name: 'Legacy Connect Crypto Payouts',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'Crypto payouts via Connect (US platforms)',
  },
  {
    id: 'distributed_payouts',
    name: 'Distributed Payouts (Crypto Connect v1)',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'USDC payouts to crypto wallets (EU/US)',
  },
  {
    id: 'stablecoin_issuing',
    name: 'Stablecoin Issuing',
    group: 'money_out',
    groupLabel: 'Money Out',
    description: 'Issue cards funded by stablecoin balances',
  },
];

export const GROUP_ORDER: Array<{ key: string; label: string }> = [
  { key: 'money_in', label: 'Money In' },
  { key: 'balances', label: 'Balances' },
  { key: 'money_out', label: 'Money Out' },
];
