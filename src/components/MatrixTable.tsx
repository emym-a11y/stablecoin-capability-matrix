import { useState } from 'react';
import type { CountryDataFile } from '../data/types';
import { getCoverageTier } from '../data/types';
import { PRODUCTS, GROUP_ORDER } from '../data/products';
import { getCountryName, groupByRegion } from '../utils/countryNames';
import StatusBadge from './StatusBadge';
import styles from './MatrixTable.module.css';

interface MatrixTableProps {
  data: CountryDataFile;
}

export default function MatrixTable({ data }: MatrixTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const grouped = GROUP_ORDER.map((group) => ({
    ...group,
    products: PRODUCTS.filter((p) => p.group === group.key),
  }));

  const toggleExpand = (productId: string) => {
    const productData = data.products[productId];
    if (productData && productData.count > 0) {
      setExpandedId(expandedId === productId ? null : productId);
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Product</th>
          <th className={styles.countCell}>Live</th>
          <th className={styles.countCell}>Coming Soon</th>
          <th className={styles.statusCell}>Status</th>
        </tr>
      </thead>
      <tbody>
        {grouped.map((group) => (
          <>
            <tr key={group.key} className={styles.groupRow}>
              <td colSpan={4}>{group.label}</td>
            </tr>
            {group.products.map((product) => {
              const productData = data.products[product.id];
              const count = productData?.count ?? 0;
              const tier = getCoverageTier(count);
              const isExpanded = expandedId === product.id;

              return (
                <>
                  <tr key={product.id} className={isExpanded ? styles.expandedRow : undefined}>
                    <td>
                      <div className={styles.productName}>{product.name}</div>
                      <div className={styles.productDesc}>{product.description}</div>
                    </td>
                    <td className={styles.countCell}>
                      <button
                        className={`${styles.countBadge} ${styles[tier]}`}
                        onClick={() => toggleExpand(product.id)}
                      >
                        {count}
                        {count > 0 && (
                          <span className={`${styles.arrow} ${isExpanded ? styles.arrowUp : ''}`}>
                            &#9662;
                          </span>
                        )}
                      </button>
                    </td>
                    <td className={styles.countCell}>
                      {product.comingSoon > 0 ? (
                        <span className={`${styles.countBadge} ${styles.comingSoonBadge}`}>
                          {product.comingSoon}
                        </span>
                      ) : (
                        <span className={styles.countBadge} style={{ opacity: 0.4 }}>--</span>
                      )}
                    </td>
                    <td className={styles.statusCell}>
                      <StatusBadge isLive={count > 0} />
                    </td>
                  </tr>
                  {isExpanded && productData && (
                    <tr key={`${product.id}-detail`} className={styles.detailRow}>
                      <td colSpan={4}>
                        <div className={styles.detailPanel}>
                          {(Object.entries(groupByRegion(productData.countries)) as [string, string[]][]).map(
                            ([region, countries]) =>
                              countries.length > 0 ? (
                                <div key={region} className={styles.regionSection}>
                                  <div className={styles.regionLabel}>
                                    {region} ({countries.length})
                                  </div>
                                  <div className={styles.countryGrid}>
                                    {countries.map((code) => (
                                      <span key={code} className={styles.countryTag}>
                                        {getCountryName(code)}
                                        <span className={styles.countryCode}>{code}</span>
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ) : null
                          )}
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
