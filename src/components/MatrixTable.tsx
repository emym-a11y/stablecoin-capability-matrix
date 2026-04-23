import { useState } from 'react';
import type { CountryDataFile, ProductMeta } from '../data/types';
import { getCoverageTier } from '../data/types';
import { PRODUCTS, GROUP_ORDER } from '../data/products';
import StatusBadge from './StatusBadge';
import CountryModal from './CountryModal';
import styles from './MatrixTable.module.css';

interface MatrixTableProps {
  data: CountryDataFile;
}

export default function MatrixTable({ data }: MatrixTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductMeta | null>(null);

  const grouped = GROUP_ORDER.map((group) => ({
    ...group,
    products: PRODUCTS.filter((p) => p.group === group.key),
  }));

  const handleCountClick = (product: ProductMeta) => {
    const productData = data.products[product.id];
    if (productData && productData.count > 0) {
      setSelectedProduct(product);
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th className={styles.countCell}>Countries</th>
            <th className={styles.statusCell}>Status</th>
          </tr>
        </thead>
        <tbody>
          {grouped.map((group) => (
            <>
              <tr key={group.key} className={styles.groupRow}>
                <td colSpan={3}>{group.label}</td>
              </tr>
              {group.products.map((product) => {
                const productData = data.products[product.id];
                const count = productData?.count ?? 0;
                const tier = getCoverageTier(count);

                return (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.productName}>{product.name}</div>
                      <div className={styles.productDesc}>{product.description}</div>
                    </td>
                    <td className={styles.countCell}>
                      <button
                        className={`${styles.countBadge} ${styles[tier]}`}
                        onClick={() => handleCountClick(product)}
                        title={count > 0 ? 'Click to see country list' : ''}
                      >
                        {count}
                      </button>
                    </td>
                    <td className={styles.statusCell}>
                      <StatusBadge isLive={count > 0} />
                    </td>
                  </tr>
                );
              })}
            </>
          ))}
        </tbody>
      </table>

      {selectedProduct && data.products[selectedProduct.id] && (
        <CountryModal
          product={selectedProduct}
          data={data.products[selectedProduct.id]}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
