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
    id: 'remote_acquiring',
    name: 'Remote Acquiring (Payments)',
    group: 'money_in',
    groupLabel: 'Money In',
    description: 'Accept payments from customers in other countries',
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
  {
    id: 'local_currency_onramp',
    name: 'Local Currency On-Ramp',
    group: 'money_in',
    groupLabel: 'Money In',
    description: 'Convert local fiat currency to stablecoins',
  },

  // Balances/Storage
  {
    id: 'stablecoin_link_balance',
    name: 'Stablecoin Link Balance',
    group: 'balances',
    groupLabel: 'Balances/Storage',
    description: 'Hold stablecoin balances via Link',
  },
  {
    id: 'sfa_custodial',
    name: 'Stablecoin Financial Accounts (custodial wallets)',
    group: 'balances',
    groupLabel: 'Balances/Storage',
    description: 'Stripe-hosted custodial wallets for USDC storage',
  },
  {
    id: 'sfa_non_custodial',
    name: 'Stablecoin Financial Accounts (non-custodial wallets)',
    group: 'balances',
    groupLabel: 'Balances/Storage',
    description: 'Self-hosted non-custodial wallets requiring NCW setup',
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


  // Spend
  {
    id: 'stablecoin_issuing',
    name: 'Stablecoin Issuing',
    group: 'spend',
    groupLabel: 'Spend',
    description: 'Issue cards funded by stablecoin balances',
  },

  // Connect
  {
    id: 'legacy_connect_crypto',
    name: 'Legacy Connect Crypto Payouts',
    group: 'connect',
    groupLabel: 'Connect',
    description: 'Crypto payouts via Connect (US platforms)',
  },
  {
    id: 'distributed_payouts',
    name: 'Distributed Payouts (Crypto Connect v1)',
    group: 'connect',
    groupLabel: 'Connect',
    description: 'Platform-initiated USDC payouts to connected accounts (EU/US)',
  },
];

export const GROUP_ORDER: Array<{ key: string; label: string }> = [
  { key: 'money_in', label: 'Money In' },
  { key: 'balances', label: 'Balances/Storage' },
  { key: 'money_out', label: 'Money Out' },
  { key: 'spend', label: 'Spend' },
  { key: 'connect', label: 'Connect' },
];
