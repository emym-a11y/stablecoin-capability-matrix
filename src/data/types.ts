export type ProductGroup = 'money_in' | 'balances' | 'money_out';

export type CountryStatus = 'live' | 'coming_soon_2026' | 'year_2027_plus' | 'not_supportable';

export const STATUS_LABELS: Record<CountryStatus, string> = {
  live: 'Live',
  coming_soon_2026: 'Coming Soon (2026)',
  year_2027_plus: '2027+',
  not_supportable: 'Not Supportable',
};

export interface ProductMeta {
  id: string;
  name: string;
  group: ProductGroup;
  groupLabel: string;
  description: string;
}

export interface ProductCountryData {
  live: string[];
  coming_soon_2026: string[];
  year_2027_plus: string[];
  not_supportable: string[];
}

export interface CountryDataFile {
  fetchedAt: string;
  products: Record<string, ProductCountryData>;
}

export function getStatusCounts(data: ProductCountryData) {
  return {
    live: data.live.length,
    coming_soon_2026: data.coming_soon_2026.length,
    year_2027_plus: data.year_2027_plus.length,
    not_supportable: data.not_supportable.length,
  };
}

export type CoverageTier = 'high' | 'medium' | 'low' | 'none';

export function getCoverageTier(count: number): CoverageTier {
  if (count >= 20) return 'high';
  if (count >= 5) return 'medium';
  if (count >= 1) return 'low';
  return 'none';
}
