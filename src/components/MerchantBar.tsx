import styles from './MerchantBar.module.css';

export type MerchantRegion = 'US' | 'UK' | 'EU' | 'Borderless' | 'MX' | 'BR' | 'HK' | 'SG';

export const MERCHANT_REGIONS: MerchantRegion[] = ['US', 'UK', 'EU', 'MX', 'BR', 'HK', 'SG', 'Borderless'];

interface MerchantBarProps {
  selected: Set<MerchantRegion>;
  onChange: (regions: Set<MerchantRegion>) => void;
}

export default function MerchantBar({ selected, onChange }: MerchantBarProps) {
  const toggle = (region: MerchantRegion) => {
    const next = new Set(selected);
    if (next.has(region)) {
      next.delete(region);
    } else {
      next.add(region);
    }
    onChange(next);
  };

  return (
    <div className={styles.bar}>
      <span className={styles.label}>Merchant country:</span>
      <div className={styles.options}>
        {MERCHANT_REGIONS.map((region) => (
          <label key={region} className={styles.checkbox}>
            <input
              type="checkbox"
              checked={selected.has(region)}
              onChange={() => toggle(region)}
            />
            <span className={styles.checkLabel}>{region}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
