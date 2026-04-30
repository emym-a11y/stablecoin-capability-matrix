import { useState, useMemo } from 'react';
import type { CountryDataFile, CountryStatus } from '../data/types';
import { getStatusCounts } from '../data/types';
import { PRODUCTS, GROUP_ORDER } from '../data/products';
import { getCountryName } from '../utils/countryNames';
import type { TimelineFilter } from './SearchFilter';
import styles from './MatrixTable.module.css';

interface MatrixTableProps {
  data: CountryDataFile;
  selectedCountries: string[];
  timelineFilter: TimelineFilter;
}

const STATUS_ORDER: CountryStatus[] = ['live', 'coming_soon_2026', 'year_2027_plus', 'not_supportable'];

const TIMELINE_TO_STATUS: Record<TimelineFilter, CountryStatus | null> = {
  all: null,
  live: 'live',
  '2026': 'coming_soon_2026',
  '2027+': 'year_2027_plus',
  not_supportable: 'not_supportable',
};

export default function MatrixTable({ data, selectedCountries, timelineFilter }: MatrixTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const grouped = GROUP_ORDER.map((group) => ({
    ...group,
    products: PRODUCTS.filter((p) => p.group === group.key),
  }));

  const toggleExpand = (productId: string) => {
    setExpandedId(expandedId === productId ? null : productId);
  };

  const toggleGroup = (groupKey: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupKey)) {
        next.delete(groupKey);
      } else {
        next.add(groupKey);
      }
      return next;
    });
  };

  // Filter countries for each product based on search + timeline
  const getFilteredCountries = useMemo(() => {
    return (productId: string) => {
      const productData = data.products[productId];
      if (!productData) return [];

      const allCountries: Array<{ code: string; status: CountryStatus }> = [];
      for (const status of STATUS_ORDER) {
        for (const code of productData[status]) {
          allCountries.push({ code, status });
        }
      }

      const statusPriority: Record<CountryStatus, number> = {
        live: 0, coming_soon_2026: 1, year_2027_plus: 2, not_supportable: 3,
      };

      return allCountries
        .filter(({ code, status }) => {
          if (selectedCountries.length > 0 && !selectedCountries.includes(code)) return false;
          const targetStatus = TIMELINE_TO_STATUS[timelineFilter];
          if (targetStatus && status !== targetStatus) return false;
          return true;
        })
        .sort((a, b) => {
          const sp = statusPriority[a.status] - statusPriority[b.status];
          if (sp !== 0) return sp;
          return getCountryName(a.code).localeCompare(getCountryName(b.code));
        });
    };
  }, [data, selectedCountries, timelineFilter]);

  // Compute filtered counts for display
  const getFilteredCounts = (productId: string) => {
    const productData = data.products[productId];
    if (!productData) return { live: 0, coming_soon_2026: 0, year_2027_plus: 0, not_supportable: 0 };

    if (selectedCountries.length === 0) return getStatusCounts(productData);

    // Recount with only selected countries
    const counts = { live: 0, coming_soon_2026: 0, year_2027_plus: 0, not_supportable: 0 };
    for (const status of STATUS_ORDER) {
      for (const code of productData[status]) {
        if (selectedCountries.includes(code)) {
          counts[status]++;
        }
      }
    }
    return counts;
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Product</th>
          <th className={styles.countCell}>Live</th>
          <th className={styles.countCell}>2026</th>
          <th className={styles.countCell}>2027+</th>
          <th className={styles.countCell}>Not Supportable</th>
        </tr>
      </thead>
      <tbody>
        {grouped.map((group) => {
          const isGroupCollapsed = collapsedGroups.has(group.key);

          return (
            <>
              <tr
                key={group.key}
                className={`${styles.groupRow} ${styles.clickable}`}
                onClick={() => toggleGroup(group.key)}
              >
                <td colSpan={5}>
                  <div className={styles.groupLabel}>
                    <span className={`${styles.groupArrow} ${isGroupCollapsed ? '' : styles.groupArrowOpen}`}>
                      &#9662;
                    </span>
                    {group.label}
                  </div>
                </td>
              </tr>
              {!isGroupCollapsed && group.products.map((product) => {
                const productData = data.products[product.id];
                if (!productData) return null;
                const counts = getFilteredCounts(product.id);
                const isExpanded = expandedId === product.id;
                const hasData = counts.live + counts.coming_soon_2026 + counts.year_2027_plus + counts.not_supportable > 0;
                const filteredCountries = getFilteredCountries(product.id);

                return (
                  <>
                    <tr
                      key={product.id}
                      className={`${styles.productRow} ${isExpanded ? styles.expandedRow : ''} ${hasData ? styles.clickable : ''}`}
                      onClick={() => hasData && toggleExpand(product.id)}
                    >
                      <td>
                        <div className={styles.productName}>
                          {hasData && (
                            <span className={`${styles.arrow} ${isExpanded ? styles.arrowOpen : ''}`}>
                              &#9662;
                            </span>
                          )}
                          {product.name}
                        </div>
                        <div className={styles.productDesc}>{product.description}</div>
                      </td>
                      <td className={styles.countCell}>
                        <span className={`${styles.countBadge} ${counts.live > 0 ? styles.countLive : styles.countZero}`}>
                          {counts.live}
                        </span>
                      </td>
                      <td className={styles.countCell}>
                        <span className={`${styles.countBadge} ${counts.coming_soon_2026 > 0 ? styles.countComingSoon : styles.countZero}`}>
                          {counts.coming_soon_2026}
                        </span>
                      </td>
                      <td className={styles.countCell}>
                        <span className={`${styles.countBadge} ${counts.year_2027_plus > 0 ? styles.count2027 : styles.countZero}`}>
                          {counts.year_2027_plus}
                        </span>
                      </td>
                      <td className={styles.countCell}>
                        <span className={`${styles.countBadge} ${counts.not_supportable > 0 ? styles.countNotSupported : styles.countZero}`}>
                          {counts.not_supportable}
                        </span>
                      </td>
                    </tr>
                    {isExpanded && filteredCountries.map(({ code, status }) => (
                      <tr key={`${product.id}-${code}`} className={styles.countryDetailRow}>
                        <td className={styles.countryNameCell}>
                          <span className={styles.countryName}>
                            {getCountryName(code)}
                            <span className={styles.countryCode}>{code}</span>
                          </span>
                        </td>
                        <td className={styles.countCell}>
                          {status === 'live' && (
                            <span className={`${styles.statusBadge} ${styles.badgeLive}`}>Live</span>
                          )}
                        </td>
                        <td className={styles.countCell}>
                          {status === 'coming_soon_2026' && (
                            <span className={`${styles.statusBadge} ${styles.badgeComingSoon}`}>Coming Soon</span>
                          )}
                        </td>
                        <td className={styles.countCell}>
                          {status === 'year_2027_plus' && (
                            <span className={`${styles.statusBadge} ${styles.badge2027}`}>2027+</span>
                          )}
                        </td>
                        <td className={styles.countCell}>
                          {status === 'not_supportable' && (
                            <span className={`${styles.statusBadge} ${styles.badgeNotSupported}`}>Not Supportable</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                );
              })}
            </>
          );
        })}
      </tbody>
    </table>
  );
}
