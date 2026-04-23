import { useEffect } from 'react';
import type { ProductMeta, ProductCountryData } from '../data/types';
import { getCountryName, groupByRegion } from '../utils/countryNames';
import styles from './CountryModal.module.css';

interface CountryModalProps {
  product: ProductMeta;
  data: ProductCountryData;
  onClose: () => void;
}

export default function CountryModal({ product, data, onClose }: CountryModalProps) {
  const regions = groupByRegion(data.countries);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <div className={styles.title}>{product.name}</div>
            <div className={styles.subtitle}>
              {data.count} countries
              <span className={styles.sourceTag} style={{ marginLeft: 8 }}>
                {data.source === 'auto' ? 'Auto-parsed from code' : 'Manually maintained'}
              </span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            &#x2715;
          </button>
        </div>
        <div className={styles.body}>
          {(Object.entries(regions) as [string, string[]][]).map(([region, countries]) =>
            countries.length > 0 ? (
              <div key={region} className={styles.regionSection}>
                <div className={styles.regionLabel}>
                  {region} ({countries.length})
                </div>
                <div className={styles.countryGrid}>
                  {countries.map((code) => (
                    <div key={code} className={styles.country}>
                      {getCountryName(code)}
                      <span className={styles.countryCode}>{code}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
