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
    (p) => (data.products[p.id]?.live.length ?? 0) > 0
  ).length;

  const allLiveCountries = new Set(
    Object.values(data.products).flatMap((p) => p.live)
  );

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>Stablecoin Capability Matrix</h1>
        <div className={styles.subtitle}>
          {formatRelativeTime(data.fetchedAt)}
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{liveProducts}/{PRODUCTS.length}</div>
          <div className={styles.statLabel}>Products live</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{allLiveCountries.size}</div>
          <div className={styles.statLabel}>Countries with live products</div>
        </div>
      </div>
    </div>
  );
}
