import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { CountryDataFile } from '../data/types';
import { PRODUCTS } from '../data/products';
import styles from './CoverageBar.module.css';

interface CoverageBarProps {
  data: CountryDataFile;
}

const GROUP_COLORS: Record<string, string> = {
  money_in: '#635bff',
  balances: '#10b981',
  money_out: '#f59e0b',
};

export default function CoverageBar({ data }: CoverageBarProps) {
  const chartData = PRODUCTS.map((p) => ({
    name: p.name.length > 28 ? p.name.slice(0, 26) + '...' : p.name,
    fullName: p.name,
    count: data.products[p.id]?.count ?? 0,
    group: p.group,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.title}>Country Coverage by Product</div>
      <ResponsiveContainer width="100%" height={360}>
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
            formatter={(value) => [`${value} countries`, 'Coverage']}
            labelFormatter={(_label, payload) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const items = payload as any[];
              return items?.[0]?.payload?.fullName || String(_label);
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={GROUP_COLORS[entry.group] || '#635bff'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
