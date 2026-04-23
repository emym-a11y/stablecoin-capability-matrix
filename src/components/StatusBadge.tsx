import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  isLive: boolean;
}

export default function StatusBadge({ isLive }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${isLive ? styles.live : styles.comingSoon}`}>
      <span className={styles.dot} />
      {isLive ? 'Live' : 'Coming Soon'}
    </span>
  );
}
