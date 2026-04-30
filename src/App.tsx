import { useState, useMemo } from 'react';
import countryData from './data/countries.json';
import type { CountryDataFile } from './data/types';
import Header from './components/Header';
import TabNav from './components/TabNav';
import SearchFilter from './components/SearchFilter';
import type { TimelineFilter } from './components/SearchFilter';
import MatrixTable from './components/MatrixTable';
import CoverageBar from './components/CoverageBar';
import FiatVsStablecoin from './components/FiatVsStablecoin';
import Roadmap from './components/Roadmap';

const data = countryData as CountryDataFile;

export default function App() {
  const [activeTab, setActiveTab] = useState('stablecoin_products');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>('all');
  const allCountryCodes = useMemo(() => {
    const codes = new Set<string>();
    for (const pd of Object.values(data.products)) {
      for (const code of [...pd.live, ...pd.coming_soon_2026, ...pd.year_2027_plus, ...pd.not_supportable]) {
        codes.add(code);
      }
    }
    return Array.from(codes).sort();
  }, []);

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
      <Header data={data} />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
      <SearchFilter
        selectedCountries={selectedCountries}
        onCountriesChange={setSelectedCountries}
        timelineFilter={timelineFilter}
        onTimelineChange={setTimelineFilter}
        allCountryCodes={allCountryCodes}
      />
      {activeTab === 'stablecoin_products' && (
        <>
          <MatrixTable data={data} selectedCountries={selectedCountries} timelineFilter={timelineFilter} />
          <CoverageBar data={data} />
        </>
      )}
      {activeTab === 'fiat_vs_stablecoin' && (
        <FiatVsStablecoin data={data} selectedCountries={selectedCountries} timelineFilter={timelineFilter} />
      )}
      {activeTab === 'roadmap' && (
        <Roadmap data={data} />
      )}
    </div>
  );
}
