import type { CountryDataFile } from '../data/types';
import { PRODUCTS } from '../data/products';
import styles from './Header.module.css';

interface HeaderProps {
  data: CountryDataFile;
}

function formatRelativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Updated today';
  if (days === 1) return 'Updated yesterday';
  return `Updated ${days} days ago`;
}

export default function Header({ data }: HeaderProps) {
  const liveProducts = PRODUCTS.filter(
    (p) => (data.products[p.id]?.count ?? 0) > 0
  ).length;

  const allCountries = new Set(
    Object.values(data.products).flatMap((p) => p.countries)
  );

  const maxCoverage = Math.max(
    ...Object.values(data.products).map((p) => p.count)
  );

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>Stablecoin Capability Matrix</h1>
        <div className={styles.subtitle}>
          {formatRelativeTime(data.fetchedAt)} from pay-server
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{liveProducts}/{PRODUCTS.length}</div>
          <div className={styles.statLabel}>Products live</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{allCountries.size}</div>
          <div className={styles.statLabel}>Unique countries</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{maxCoverage}</div>
          <div className={styles.statLabel}>Max coverage</div>
        </div>
      </div>
    </div>
  );
}
