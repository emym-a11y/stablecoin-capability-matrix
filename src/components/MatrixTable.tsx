import { useState } from 'react';
import type { CountryDataFile, CountryStatus } from '../data/types';
import { getStatusCounts } from '../data/types';
import { PRODUCTS, GROUP_ORDER } from '../data/products';
import { getCountryName } from '../utils/countryNames';
import styles from './MatrixTable.module.css';

interface MatrixTableProps {
  data: CountryDataFile;
}

const STATUS_ORDER: CountryStatus[] = ['live', 'coming_soon_2026', 'year_2027_plus', 'not_supportable'];

const STATUS_BADGE_CLASS: Record<CountryStatus, string> = {
  live: 'badgeLive',
  coming_soon_2026: 'badgeComingSoon',
  year_2027_plus: 'badge2027',
  not_supportable: 'badgeNotSupported',
};

const STATUS_BADGE_LABEL: Record<CountryStatus, string> = {
  live: 'Live',
  coming_soon_2026: 'Coming Soon',
  year_2027_plus: '2027+',
  not_supportable: 'Not Supportable',
};

export default function MatrixTable({ data }: MatrixTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const grouped = GROUP_ORDER.map((group) => ({
    ...group,
    products: PRODUCTS.filter((p) => p.group === group.key),
  }));

  const toggleExpand = (productId: string) => {
    setExpandedId(expandedId === productId ? null : productId);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Product</th>
          <th className={styles.countCell}>Live</th>
          <th className={styles.countCell}>Coming Soon (2026)</th>
          <th className={styles.countCell}>2027+</th>
          <th className={styles.countCell}>Not Supportable</th>
        </tr>
      </thead>
      <tbody>
        {grouped.map((group) => (
          <>
            <tr key={group.key} className={styles.groupRow}>
              <td colSpan={5}>{group.label}</td>
            </tr>
            {group.products.map((product) => {
              const productData = data.products[product.id];
              if (!productData) return null;
              const counts = getStatusCounts(productData);
              const isExpanded = expandedId === product.id;
              const hasData = counts.live + counts.coming_soon_2026 + counts.year_2027_plus + counts.not_supportable > 0;

              // Build sorted list of all countries with their status
              const allCountries: Array<{ code: string; status: CountryStatus }> = [];
              for (const status of STATUS_ORDER) {
                for (const code of productData[status]) {
                  allCountries.push({ code, status });
                }
              }
              allCountries.sort((a, b) =>
                getCountryName(a.code).localeCompare(getCountryName(b.code))
              );

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
                          <span className={`${styles.arrow} ${isExpanded ? styles.arrowUp : ''}`}>
                            &#9662;
                          </span>
                        )}
                        {product.name}
                      </div>
                      <div className={styles.productDesc}>{product.description}</div>
                    </td>
                    <td className={styles.countCell}>
                      <span className={`${styles.countNum} ${counts.live > 0 ? styles.countLive : styles.countZero}`}>
                        {counts.live}
                      </span>
                    </td>
                    <td className={styles.countCell}>
                      <span className={`${styles.countNum} ${counts.coming_soon_2026 > 0 ? styles.countComingSoon : styles.countZero}`}>
                        {counts.coming_soon_2026}
                      </span>
                    </td>
                    <td className={styles.countCell}>
                      <span className={`${styles.countNum} ${counts.year_2027_plus > 0 ? styles.count2027 : styles.countZero}`}>
                        {counts.year_2027_plus}
                      </span>
                    </td>
                    <td className={styles.countCell}>
                      <span className={`${styles.countNum} ${counts.not_supportable > 0 ? styles.countNotSupported : styles.countZero}`}>
                        {counts.not_supportable}
                      </span>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${product.id}-detail`} className={styles.detailRow}>
                      <td colSpan={5}>
                        <div className={styles.detailPanel}>
                          <div className={styles.countryList}>
                            {allCountries.map(({ code, status }) => (
                              <div key={code} className={styles.countryRow}>
                                <span className={styles.countryName}>
                                  {getCountryName(code)}
                                  <span className={styles.countryCode}>{code}</span>
                                </span>
                                <span className={`${styles.statusBadge} ${styles[STATUS_BADGE_CLASS[status]]}`}>
                                  {STATUS_BADGE_LABEL[status]}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </>
        ))}
      </tbody>
    </table>
  );
}
