const COUNTRY_NAMES: Record<string, string> = {
  AD: 'Andorra', AE: 'United Arab Emirates', AG: 'Antigua and Barbuda', AI: 'Anguilla',
  AL: 'Albania', AM: 'Armenia', AO: 'Angola', AR: 'Argentina', AT: 'Austria', AU: 'Australia',
  AZ: 'Azerbaijan', BA: 'Bosnia and Herzegovina', BD: 'Bangladesh', BE: 'Belgium', BF: 'Burkina Faso',
  BG: 'Bulgaria', BH: 'Bahrain', BJ: 'Benin', BM: 'Bermuda', BN: 'Brunei', BO: 'Bolivia',
  BR: 'Brazil', BS: 'Bahamas', BT: 'Bhutan', BW: 'Botswana', BZ: 'Belize',
  CA: 'Canada', CH: 'Switzerland', CI: "Cote d'Ivoire", CL: 'Chile', CM: 'Cameroon',
  CO: 'Colombia', CR: 'Costa Rica', CV: 'Cabo Verde', CY: 'Cyprus', CZ: 'Czech Republic',
  DE: 'Germany', DJ: 'Djibouti', DK: 'Denmark', DM: 'Dominica', DO: 'Dominican Republic',
  DZ: 'Algeria', EC: 'Ecuador', EE: 'Estonia', EG: 'Egypt', ES: 'Spain', ET: 'Ethiopia',
  FI: 'Finland', FJ: 'Fiji', FM: 'Micronesia', FR: 'France',
  GA: 'Gabon', GB: 'United Kingdom', GD: 'Grenada', GE: 'Georgia', GG: 'Guernsey',
  GH: 'Ghana', GI: 'Gibraltar', GM: 'Gambia', GN: 'Guinea', GQ: 'Equatorial Guinea',
  GR: 'Greece', GT: 'Guatemala', GY: 'Guyana',
  HK: 'Hong Kong', HN: 'Honduras', HR: 'Croatia', HU: 'Hungary',
  ID: 'Indonesia', IE: 'Ireland', IL: 'Israel', IM: 'Isle of Man', IN: 'India',
  IS: 'Iceland', IT: 'Italy',
  JM: 'Jamaica', JO: 'Jordan', JP: 'Japan',
  KE: 'Kenya', KG: 'Kyrgyzstan', KH: 'Cambodia', KI: 'Kiribati', KM: 'Comoros',
  KN: 'Saint Kitts and Nevis', KR: 'South Korea', KW: 'Kuwait', KY: 'Cayman Islands', KZ: 'Kazakhstan',
  LA: 'Laos', LC: 'Saint Lucia', LI: 'Liechtenstein', LK: 'Sri Lanka', LR: 'Liberia',
  LS: 'Lesotho', LT: 'Lithuania', LU: 'Luxembourg', LV: 'Latvia',
  MA: 'Morocco', MC: 'Monaco', MD: 'Moldova', ME: 'Montenegro', MG: 'Madagascar',
  MH: 'Marshall Islands', MK: 'North Macedonia', MN: 'Mongolia', MO: 'Macao',
  MR: 'Mauritania', MS: 'Montserrat', MT: 'Malta', MU: 'Mauritius', MV: 'Maldives',
  MW: 'Malawi', MX: 'Mexico', MY: 'Malaysia', MZ: 'Mozambique',
  NA: 'Namibia', NE: 'Niger', NG: 'Nigeria', NL: 'Netherlands', NO: 'Norway', NZ: 'New Zealand',
  OM: 'Oman', PA: 'Panama', PE: 'Peru', PG: 'Papua New Guinea', PH: 'Philippines',
  PK: 'Pakistan', PL: 'Poland', PT: 'Portugal', PW: 'Palau', PY: 'Paraguay',
  QA: 'Qatar', RO: 'Romania', RS: 'Serbia', RW: 'Rwanda',
  SA: 'Saudi Arabia', SB: 'Solomon Islands', SC: 'Seychelles', SE: 'Sweden', SG: 'Singapore',
  SI: 'Slovenia', SK: 'Slovakia', SL: 'Sierra Leone', SM: 'San Marino', SN: 'Senegal',
  SR: 'Suriname', SV: 'El Salvador',
  TC: 'Turks and Caicos', TH: 'Thailand', TJ: 'Tajikistan', TL: 'Timor-Leste',
  TN: 'Tunisia', TO: 'Tonga', TR: 'Turkey', TT: 'Trinidad and Tobago', TV: 'Tuvalu',
  TW: 'Taiwan', TZ: 'Tanzania',
  UG: 'Uganda', US: 'United States', UY: 'Uruguay', UZ: 'Uzbekistan',
  VA: 'Vatican City', VC: 'Saint Vincent and the Grenadines', VG: 'British Virgin Islands',
  VN: 'Vietnam', VU: 'Vanuatu', WS: 'Samoa', ZA: 'South Africa', ZM: 'Zambia',
};

export function getCountryName(code: string): string {
  return COUNTRY_NAMES[code.toUpperCase()] || code;
}

type Region = 'Americas' | 'Europe' | 'Asia-Pacific' | 'Middle East & Africa';

const REGION_MAP: Record<string, Region> = {
  // Americas
  AG: 'Americas', AI: 'Americas', AR: 'Americas', BB: 'Americas', BM: 'Americas', BO: 'Americas',
  BR: 'Americas', BS: 'Americas', BZ: 'Americas', CA: 'Americas', CL: 'Americas', CO: 'Americas',
  CR: 'Americas', DM: 'Americas', DO: 'Americas', EC: 'Americas', GD: 'Americas', GT: 'Americas',
  GY: 'Americas', HN: 'Americas', JM: 'Americas', KN: 'Americas', KY: 'Americas', LC: 'Americas',
  MS: 'Americas', MX: 'Americas', PA: 'Americas', PE: 'Americas', PY: 'Americas', SR: 'Americas',
  SV: 'Americas', TC: 'Americas', TT: 'Americas', US: 'Americas', UY: 'Americas', VC: 'Americas',
  VG: 'Americas',
  // Europe
  AD: 'Europe', AL: 'Europe', AM: 'Europe', AT: 'Europe', AZ: 'Europe', BA: 'Europe',
  BE: 'Europe', BG: 'Europe', CH: 'Europe', CY: 'Europe', CZ: 'Europe', DE: 'Europe',
  DK: 'Europe', EE: 'Europe', ES: 'Europe', FI: 'Europe', FR: 'Europe', GB: 'Europe',
  GE: 'Europe', GG: 'Europe', GI: 'Europe', GR: 'Europe', HR: 'Europe', HU: 'Europe',
  IE: 'Europe', IM: 'Europe', IS: 'Europe', IT: 'Europe', LI: 'Europe', LT: 'Europe',
  LU: 'Europe', LV: 'Europe', MC: 'Europe', MD: 'Europe', ME: 'Europe', MK: 'Europe',
  MT: 'Europe', NL: 'Europe', NO: 'Europe', PL: 'Europe', PT: 'Europe', RO: 'Europe',
  RS: 'Europe', SE: 'Europe', SI: 'Europe', SK: 'Europe', SM: 'Europe', TR: 'Europe',
  VA: 'Europe',
  // Asia-Pacific
  AU: 'Asia-Pacific', BD: 'Asia-Pacific', BN: 'Asia-Pacific', BT: 'Asia-Pacific',
  FJ: 'Asia-Pacific', FM: 'Asia-Pacific', HK: 'Asia-Pacific', ID: 'Asia-Pacific',
  IL: 'Asia-Pacific', IN: 'Asia-Pacific', JP: 'Asia-Pacific', KG: 'Asia-Pacific',
  KH: 'Asia-Pacific', KI: 'Asia-Pacific', KR: 'Asia-Pacific', KZ: 'Asia-Pacific',
  LA: 'Asia-Pacific', LK: 'Asia-Pacific', MH: 'Asia-Pacific', MN: 'Asia-Pacific',
  MO: 'Asia-Pacific', MV: 'Asia-Pacific', MY: 'Asia-Pacific', NZ: 'Asia-Pacific',
  PG: 'Asia-Pacific', PH: 'Asia-Pacific', PK: 'Asia-Pacific', PW: 'Asia-Pacific',
  SB: 'Asia-Pacific', SG: 'Asia-Pacific', TH: 'Asia-Pacific', TJ: 'Asia-Pacific',
  TL: 'Asia-Pacific', TN: 'Asia-Pacific', TO: 'Asia-Pacific', TV: 'Asia-Pacific',
  TW: 'Asia-Pacific', UZ: 'Asia-Pacific', VN: 'Asia-Pacific', VU: 'Asia-Pacific',
  WS: 'Asia-Pacific',
  // Middle East & Africa
  AE: 'Middle East & Africa', AO: 'Middle East & Africa', BF: 'Middle East & Africa',
  BH: 'Middle East & Africa', BJ: 'Middle East & Africa', BW: 'Middle East & Africa',
  CI: 'Middle East & Africa', CM: 'Middle East & Africa', CV: 'Middle East & Africa',
  DJ: 'Middle East & Africa', DZ: 'Middle East & Africa', EG: 'Middle East & Africa',
  ET: 'Middle East & Africa', GA: 'Middle East & Africa', GH: 'Middle East & Africa',
  GM: 'Middle East & Africa', GN: 'Middle East & Africa', GQ: 'Middle East & Africa',
  JO: 'Middle East & Africa', KE: 'Middle East & Africa', KM: 'Middle East & Africa',
  KW: 'Middle East & Africa', LR: 'Middle East & Africa', LS: 'Middle East & Africa',
  MA: 'Middle East & Africa', MG: 'Middle East & Africa', MR: 'Middle East & Africa',
  MU: 'Middle East & Africa', MW: 'Middle East & Africa', MZ: 'Middle East & Africa',
  NA: 'Middle East & Africa', NE: 'Middle East & Africa', NG: 'Middle East & Africa',
  OM: 'Middle East & Africa', QA: 'Middle East & Africa', RW: 'Middle East & Africa',
  SA: 'Middle East & Africa', SC: 'Middle East & Africa', SL: 'Middle East & Africa',
  SN: 'Middle East & Africa', TZ: 'Middle East & Africa', UG: 'Middle East & Africa',
  ZA: 'Middle East & Africa', ZM: 'Middle East & Africa',
};

export function getRegion(code: string): Region {
  return REGION_MAP[code.toUpperCase()] || 'Asia-Pacific';
}

export function groupByRegion(countries: string[]): Record<Region, string[]> {
  const groups: Record<Region, string[]> = {
    'Americas': [],
    'Europe': [],
    'Asia-Pacific': [],
    'Middle East & Africa': [],
  };
  for (const code of countries) {
    const region = getRegion(code);
    groups[region].push(code);
  }
  for (const region of Object.keys(groups) as Region[]) {
    groups[region].sort((a, b) => getCountryName(a).localeCompare(getCountryName(b)));
  }
  return groups;
}
