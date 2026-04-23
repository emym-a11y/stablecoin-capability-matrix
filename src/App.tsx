import countryData from './data/countries.json';
import type { CountryDataFile } from './data/types';
import Header from './components/Header';
import MatrixTable from './components/MatrixTable';
import CoverageBar from './components/CoverageBar';

const data = countryData as CountryDataFile;

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <Header data={data} />
      <MatrixTable data={data} />
      <CoverageBar data={data} />
    </div>
  );
}
