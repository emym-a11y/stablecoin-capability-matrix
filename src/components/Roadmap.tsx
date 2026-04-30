import { useState, useMemo } from 'react';
import { PUBLIC_ROADMAP, ROADMAP_CATEGORIES } from '../data/publicRoadmap';
import type { RoadmapItem } from '../data/publicRoadmap';
import type { CountryDataFile } from '../data/types';
import { PRODUCTS, GROUP_ORDER } from '../data/products';
import { getStatusCounts } from '../data/types';
import styles from './Roadmap.module.css';

interface RoadmapProps {
  data: CountryDataFile;
}

type RoadmapView = 'public' | 'internal';

interface GroupedRelease {
  product: string;
  release: string;
  description: string;
  privatePreview: string;
  publicPreview: string;
  ga: string;
}

function groupItemsByRelease(items: RoadmapItem[]): GroupedRelease[] {
  const map = new Map<string, GroupedRelease>();

  for (const item of items) {
    const key = `${item.product}::${item.release}`;
    if (!map.has(key)) {
      map.set(key, {
        product: item.product,
        release: item.release,
        description: item.description,
        privatePreview: '',
        publicPreview: '',
        ga: '',
      });
    }
    const entry = map.get(key)!;
    // Use the longest description
    if (item.description.length > entry.description.length) {
      entry.description = item.description;
    }
    const q = item.quarter + (item.region ? ` (${item.region})` : '');
    if (item.phase === 'Private preview') entry.privatePreview = q;
    else if (item.phase === 'Public preview') entry.publicPreview = q;
    else if (item.phase === 'GA') entry.ga = q;
  }

  return Array.from(map.values());
}

function PublicRoadmapSection({ category, items }: { category: string; items: RoadmapItem[] }) {
  const [collapsed, setCollapsed] = useState(false);
  const grouped = useMemo(() => groupItemsByRelease(items), [items]);

  if (grouped.length === 0) return null;

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader} onClick={() => setCollapsed(!collapsed)}>
        <div className={styles.sectionTitle}>
          <span className={`${styles.sectionArrow} ${collapsed ? '' : styles.sectionArrowOpen}`}>
            &#9662;
          </span>
          {category}
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontWeight: 400 }}>
            ({grouped.length} releases)
          </span>
        </div>
      </div>
      {!collapsed && (
        <div className={styles.sectionBody}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Release</th>
                <th className={styles.colPhase}>Private Preview</th>
                <th className={styles.colPhase}>Public Preview</th>
                <th className={styles.colPhase}>GA</th>
              </tr>
            </thead>
            <tbody>
              {grouped.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{row.product}</td>
                  <td>
                    <div className={styles.releaseName}>{row.release}</div>
                    <div className={styles.releaseDesc}>{row.description}</div>
                  </td>
                  <td className={styles.colPhase}>
                    {row.privatePreview ? (
                      <span className={`${styles.badge} ${styles.phasePrivate}`}>
                        <span className={styles.badgeDot} />{row.privatePreview}
                      </span>
                    ) : <span className={styles.dash}>&mdash;</span>}
                  </td>
                  <td className={styles.colPhase}>
                    {row.publicPreview ? (
                      <span className={`${styles.badge} ${styles.phasePublic}`}>
                        <span className={styles.badgeDot} />{row.publicPreview}
                      </span>
                    ) : <span className={styles.dash}>&mdash;</span>}
                  </td>
                  <td className={styles.colPhase}>
                    {row.ga ? (
                      <span className={`${styles.badge} ${styles.phaseGA}`}>
                        <span className={styles.badgeDot} />{row.ga}
                      </span>
                    ) : <span className={styles.dash}>&mdash;</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function InternalRoadmapSection({ groupKey, groupLabel, data }: { groupKey: string; groupLabel: string; data: CountryDataFile }) {
  const [collapsed, setCollapsed] = useState(false);
  const products = PRODUCTS.filter((p) => p.group === groupKey);

  if (products.length === 0) return null;

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader} onClick={() => setCollapsed(!collapsed)}>
        <div className={styles.sectionTitle}>
          <span className={`${styles.sectionArrow} ${collapsed ? '' : styles.sectionArrowOpen}`}>
            &#9662;
          </span>
          {groupLabel}
        </div>
      </div>
      {!collapsed && (
        <div className={styles.sectionBody}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th className={styles.colQuarter}>Live</th>
                <th className={styles.colQuarter}>2026</th>
                <th className={styles.colQuarter}>2027+</th>
                <th className={styles.colPhase}>Not Supportable</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const pd = data.products[product.id];
                if (!pd) return (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.releaseName}>{product.name}</div>
                      <div className={styles.releaseDesc}>{product.description}</div>
                    </td>
                    <td className={styles.colQuarter}>0</td>
                    <td className={styles.colQuarter}>0</td>
                    <td className={styles.colQuarter}>0</td>
                    <td className={styles.colPhase}>0</td>
                  </tr>
                );
                const counts = getStatusCounts(pd);
                return (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.releaseName}>{product.name}</div>
                      <div className={styles.releaseDesc}>{product.description}</div>
                    </td>
                    <td className={styles.colQuarter}>
                      <span className={`${styles.badge} ${counts.live > 0 ? styles.phaseGA : styles.phaseTBD}`}>
                        <span className={styles.badgeDot} />{counts.live}
                      </span>
                    </td>
                    <td className={styles.colQuarter}>
                      <span className={`${styles.badge} ${counts.coming_soon_2026 > 0 ? styles.phasePrivate : styles.phaseTBD}`}>
                        <span className={styles.badgeDot} />{counts.coming_soon_2026}
                      </span>
                    </td>
                    <td className={styles.colQuarter}>
                      <span className={`${styles.badge} ${counts.year_2027_plus > 0 ? styles.phasePublic : styles.phaseTBD}`}>
                        <span className={styles.badgeDot} />{counts.year_2027_plus}
                      </span>
                    </td>
                    <td className={styles.colPhase}>
                      <span className={`${styles.badge} ${styles.phaseTBD}`}>
                        <span className={styles.badgeDot} />{counts.not_supportable}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function Roadmap({ data }: RoadmapProps) {
  const [view, setView] = useState<RoadmapView>('public');

  return (
    <div className={styles.container}>
      <div className={styles.toggleBar}>
        <button
          className={`${styles.toggleBtn} ${view === 'public' ? styles.toggleBtnActive : ''}`}
          onClick={() => setView('public')}
        >
          Public Roadmap
        </button>
        <button
          className={`${styles.toggleBtn} ${view === 'internal' ? styles.toggleBtnActive : ''}`}
          onClick={() => setView('internal')}
        >
          Internal Roadmap
        </button>
      </div>

      {view === 'internal' && (
        <div className={styles.internalNote}>
          Internal only -- includes per-country data and timelines not shared externally.
        </div>
      )}

      {view === 'public' && (
        <>
          {ROADMAP_CATEGORIES.map((cat) => {
            const items = PUBLIC_ROADMAP.filter((item) => item.category === cat);
            return <PublicRoadmapSection key={cat} category={cat} items={items} />;
          })}
        </>
      )}

      {view === 'internal' && (
        <>
          {GROUP_ORDER.map((group) => (
            <InternalRoadmapSection key={group.key} groupKey={group.key} groupLabel={group.label} data={data} />
          ))}
        </>
      )}
    </div>
  );
}
