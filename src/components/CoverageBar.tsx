import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { CountryDataFile } from '../data/types';
import { PRODUCTS } from '../data/products';
import styles from './CoverageBar.module.css';

interface CoverageBarProps {
  data: CountryDataFile;
}

export default function CoverageBar({ data }: CoverageBarProps) {
  const chartData = PRODUCTS.map((p) => {
    const d = data.products[p.id];
    return {
      name: p.name.length > 28 ? p.name.slice(0, 26) + '...' : p.name,
      fullName: p.name,
      Live: d?.live.length ?? 0,
      'Coming Soon': d?.coming_soon_2026.length ?? 0,
      '2027+': d?.year_2027_plus.length ?? 0,
      'Not Supportable': d?.not_supportable.length ?? 0,
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>Country Coverage by Product</div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 0, right: 32, bottom: 0, left: 180 }}
        >
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 11 }}
            width={180}
          />
          <Tooltip
            labelFormatter={(_label, payload) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const items = payload as any[];
              return items?.[0]?.payload?.fullName || String(_label);
            }}
          />
          <Legend />
          <Bar dataKey="Live" stackId="a" fill="#16a34a" />
          <Bar dataKey="Coming Soon" stackId="a" fill="#d97706" />
          <Bar dataKey="2027+" stackId="a" fill="#635bff" />
          <Bar dataKey="Not Supportable" stackId="a" fill="#d1d5db" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
