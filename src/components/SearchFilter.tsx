import { useState } from 'react';
import { getCountryName } from '../utils/countryNames';
import styles from './SearchFilter.module.css';

export type TimelineFilter = 'all' | 'live' | '2026' | '2027+' | 'not_supportable';

interface SearchFilterProps {
  selectedCountries: string[];
  onCountriesChange: (countries: string[]) => void;
  timelineFilter: TimelineFilter;
  onTimelineChange: (filter: TimelineFilter) => void;
  allCountryCodes: string[];
}

export default function SearchFilter({
  selectedCountries,
  onCountriesChange,
  timelineFilter,
  onTimelineChange,
  allCountryCodes,
}: SearchFilterProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = query.length >= 1
    ? allCountryCodes
        .filter((code) => {
          if (selectedCountries.includes(code)) return false;
          const name = getCountryName(code).toLowerCase();
          const q = query.toLowerCase();
          return name.includes(q) || code.toLowerCase().includes(q);
        })
        .slice(0, 8)
    : [];

  const addCountry = (code: string) => {
    onCountriesChange([...selectedCountries, code]);
    setQuery('');
    setShowSuggestions(false);
  };

  const removeCountry = (code: string) => {
    onCountriesChange(selectedCountries.filter((c) => c !== code));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      addCountry(suggestions[0]);
    }
    if (e.key === 'Backspace' && query === '' && selectedCountries.length > 0) {
      removeCountry(selectedCountries[selectedCountries.length - 1]);
    }
  };

  const TIMELINE_OPTIONS: Array<{ key: TimelineFilter; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'live', label: 'Live' },
    { key: '2026', label: '2026' },
    { key: '2027+', label: '2027+' },
    { key: 'not_supportable', label: 'Not Supportable' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.searchWrap}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search and add countries..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            zIndex: 50,
            maxHeight: 200,
            overflowY: 'auto',
          }}>
            {suggestions.map((code) => (
              <div
                key={code}
                style={{
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)',
                }}
                onMouseDown={() => addCountry(code)}
              >
                {getCountryName(code)} ({code})
              </div>
            ))}
          </div>
        )}
        {selectedCountries.length > 0 && (
          <div className={styles.tags}>
            {selectedCountries.map((code) => (
              <span key={code} className={styles.tag}>
                {getCountryName(code)}
                <button className={styles.tagRemove} onClick={() => removeCountry(code)}>&#x2715;</button>
              </span>
            ))}
          </div>
        )}
      </div>
      {TIMELINE_OPTIONS.map((opt) => (
        <button
          key={opt.key}
          className={`${styles.filterBtn} ${timelineFilter === opt.key ? styles.filterBtnActive : ''}`}
          onClick={() => onTimelineChange(opt.key)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
