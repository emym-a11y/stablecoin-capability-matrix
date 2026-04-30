import styles from './TabNav.module.css';

interface TabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { key: 'stablecoin_products', label: 'Stablecoin Products' },
  { key: 'fiat_vs_stablecoin', label: 'Fiat vs Stablecoin' },
  { key: 'roadmap', label: 'Public Roadmap' },
];

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <div className={styles.tabs}>
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={`${styles.tab} ${activeTab === tab.key ? styles.active : ''}`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
