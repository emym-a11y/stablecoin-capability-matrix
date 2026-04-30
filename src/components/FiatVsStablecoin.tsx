import { useState, useMemo } from 'react';
import type { CountryDataFile, CountryStatus } from '../data/types';
import { getCountryName } from '../utils/countryNames';
import { getFlag } from '../utils/flags';
import type { TimelineFilter } from './SearchFilter';
import styles from './FiatVsStablecoin.module.css';

interface FiatVsStablecoinProps {
  data: CountryDataFile;
  selectedCountries: string[];
  timelineFilter: TimelineFilter;
}

interface ColumnDef {
  id: string;
  header: string;
  subheader?: string;
}

interface SectionDef {
  title: string;
  columns: ColumnDef[];
}

const SECTIONS: SectionDef[] = [
  {
    title: 'Money In',
    columns: [
      { id: 'local_acquiring', header: 'Fiat', subheader: 'Local Acquiring'},
      { id: 'stablecoin_payments', header: 'Stablecoin', subheader: 'Crypto Pay-ins'},
    ],
  },
  {
    title: 'Money Out',
    columns: [
      { id: 'global_payouts', header: 'Fiat', subheader: 'Global Payouts'},
      { id: 'distributed_payouts', header: 'Stablecoin', subheader: 'USDC Payouts'},
      { id: 'local_currency_offramps', header: 'Off-Ramp', subheader: 'Roadmap'},
    ],
  },
  {
    title: 'Spend',
    columns: [
      { id: 'fiat_issuing', header: 'Fiat', subheader: 'Card Issuing'},
      { id: 'stablecoin_issuing', header: 'Stablecoin', subheader: 'Card Issuing'},
    ],
  },
  {
    title: 'Connect',
    columns: [
      { id: 'legacy_connect_crypto', header: 'Fiat', subheader: 'Legacy Crypto Payouts'},
      { id: 'distributed_payouts', header: 'Stablecoin', subheader: 'USDC Payouts'},
    ],
  },
];

type CellStatus = 'live' | 'roadmap' | 'not_supportable' | 'none';

function getCountryStatus(
  productData: { live: string[]; coming_soon_2026: string[]; year_2027_plus: string[]; not_supportable: string[] },
  code: string,
): CellStatus {
  if (productData.live.includes(code)) return 'live';
  if (productData.coming_soon_2026.includes(code)) return 'roadmap';
  if (productData.year_2027_plus.includes(code)) return 'roadmap';
  if (productData.not_supportable.includes(code)) return 'not_supportable';
  return 'none';
}

function StatusBadge({ status }: { status: CellStatus }) {
  if (status === 'none') return <span className={styles.dash}>&mdash;</span>;

  const config: Record<CellStatus, { label: string; cls: string }> = {
    live: { label: 'Live now', cls: styles.badgeLiveNow },
    roadmap: { label: '2026', cls: styles.badgeRoadmap },
    not_supportable: { label: 'N/A', cls: styles.badgeNotSupported },
    none: { label: '', cls: '' },
  };

  const c = config[status];
  return (
    <span className={`${styles.badge} ${c.cls}`}>
      <span className={styles.badgeDot} />
      {c.label}
    </span>
  );
}

function matchesTimelineFilter(status: CellStatus, filter: TimelineFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'live') return status === 'live';
  if (filter === '2026') return status === 'roadmap';
  if (filter === 'not_supportable') return status === 'not_supportable';
  return true;
}

// Max columns across all sections (for consistent grid)
const MAX_PRODUCT_COLS = Math.max(...SECTIONS.map((s) => s.columns.length));

function ComparisonSection({
  section,
  data,
  selectedCountries,
  timelineFilter,
}: {
  section: SectionDef;
  data: CountryDataFile;
  selectedCountries: string[];
  timelineFilter: TimelineFilter;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const allCountries = useMemo(() => {
    const codes = new Set<string>();
    for (const col of section.columns) {
      const pd = data.products[col.id];
      if (!pd) continue;
      for (const status of ['live', 'coming_soon_2026', 'year_2027_plus', 'not_supportable'] as CountryStatus[]) {
        for (const code of pd[status]) {
          codes.add(code);
        }
      }
    }
    return Array.from(codes).sort((a, b) => getCountryName(a).localeCompare(getCountryName(b)));
  }, [section, data]);

  const rows = useMemo(() => {
    return allCountries.map((code) => {
      const statuses = section.columns.map((col) => {
        const pd = data.products[col.id];
        if (!pd) return 'none' as CellStatus;
        return getCountryStatus(pd, code);
      });
      return { code, statuses };
    });
  }, [allCountries, section, data]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (selectedCountries.length > 0 && !selectedCountries.includes(row.code)) return false;
      if (timelineFilter !== 'all') {
        return row.statuses.some((s) => matchesTimelineFilter(s, timelineFilter));
      }
      return true;
    });
  }, [rows, selectedCountries, timelineFilter]);

  const stats = useMemo(() => {
    let live = 0;
    let roadmap = 0;
    for (const row of rows) {
      if (row.statuses.some((s) => s === 'live')) live++;
      else if (row.statuses.some((s) => s === 'roadmap')) roadmap++;
    }
    return { total: rows.length, live, roadmap };
  }, [rows]);

  // Pad columns to MAX_PRODUCT_COLS for alignment
  const emptyCols = MAX_PRODUCT_COLS - section.columns.length;

  return (
    <div className={styles.section}>
      <div
        className={`${styles.sectionHeader} ${styles.clickable}`}
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className={styles.sectionTitle}>
          <span className={`${styles.sectionArrow} ${collapsed ? '' : styles.sectionArrowOpen}`}>
            &#9662;
          </span>
          {section.title}
        </div>
      </div>
      {!collapsed && (
        <div className={styles.sectionBody}>
          <div className={styles.summaryStats}>
            <strong>{stats.total}</strong> destination countries
            <span className={styles.dot}>&middot;</span>
            <strong>{stats.live}</strong> live now
            <span className={styles.dot}>&middot;</span>
            <strong>{stats.roadmap}</strong> roadmap
          </div>

          <table className={styles.table}>
            <colgroup>
              <col className={styles.colCountry} />
              {section.columns.map((col) => (
                <col key={col.id} className={styles.colStatus} />
              ))}
              {Array.from({ length: emptyCols }).map((_, i) => (
                <col key={`empty-${i}`} className={styles.colStatus} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th>Destination Country</th>
                {section.columns.map((col) => (
                  <th key={col.id}>
                    {col.header}
                    {col.subheader && <span className={styles.colGroup}>{col.subheader}</span>}
                  </th>
                ))}
                {Array.from({ length: emptyCols }).map((_, i) => (
                  <th key={`empty-${i}`} />
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.code}>
                  <td>
                    <div className={styles.countryCell}>
                      <span className={styles.flag}>{getFlag(row.code)}</span>
                      <span className={styles.countryLabel}>{getCountryName(row.code)}</span>
                    </div>
                  </td>
                  {row.statuses.map((status, i) => (
                    <td key={i}>
                      <StatusBadge status={status} />
                    </td>
                  ))}
                  {Array.from({ length: emptyCols }).map((_, i) => (
                    <td key={`empty-${i}`} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function FiatVsStablecoin({ data, selectedCountries, timelineFilter }: FiatVsStablecoinProps) {
  return (
    <div className={styles.container}>
      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.badge} ${styles.badgeLiveNow}`}>
            <span className={styles.badgeDot} />Live now
          </span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.badge} ${styles.badgeRoadmap}`}>
            <span className={styles.badgeDot} />2026
          </span>
          <span>Roadmap</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.dash}>&mdash;</span>
          <span>Not available</span>
        </div>
      </div>

      {/* Sections */}
      {SECTIONS.map((section) => (
        <ComparisonSection
          key={section.title}
          section={section}
          data={data}
          selectedCountries={selectedCountries}
          timelineFilter={timelineFilter}
        />
      ))}
    </div>
  );
}
