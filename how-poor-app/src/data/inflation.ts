export interface InflationData {
  countryId: string;
  year: number;
  inflationRate: number;
  foodInflation: number;
  housingInflation: number;
  transportInflation: number;
  utilitiesInflation: number;
  forecast: boolean;
}

export const inflationData: InflationData[] = [
  { countryId: 'us', year: 2024, inflationRate: 3.1, foodInflation: 2.5, housingInflation: 4.2, transportInflation: 3.8, utilitiesInflation: 2.1, forecast: false },
  { countryId: 'us', year: 2025, inflationRate: 2.5, foodInflation: 2.0, housingInflation: 3.5, transportInflation: 2.8, utilitiesInflation: 1.8, forecast: true },
  { countryId: 'es', year: 2024, inflationRate: 2.8, foodInflation: 3.2, housingInflation: 2.1, transportInflation: 2.5, utilitiesInflation: 1.5, forecast: false },
  { countryId: 'es', year: 2025, inflationRate: 2.2, foodInflation: 2.5, housingInflation: 1.8, transportInflation: 2.0, utilitiesInflation: 1.2, forecast: true },
  { countryId: 'de', year: 2024, inflationRate: 2.5, foodInflation: 2.8, housingInflation: 2.0, transportInflation: 1.8, utilitiesInflation: 2.2, forecast: false },
  { countryId: 'de', year: 2025, inflationRate: 2.0, foodInflation: 2.2, housingInflation: 1.8, transportInflation: 1.5, utilitiesInflation: 1.8, forecast: true },
  { countryId: 'gb', year: 2024, inflationRate: 3.2, foodInflation: 3.8, housingInflation: 3.5, transportInflation: 2.9, utilitiesInflation: 2.5, forecast: false },
  { countryId: 'gb', year: 2025, inflationRate: 2.6, foodInflation: 3.0, housingInflation: 2.8, transportInflation: 2.2, utilitiesInflation: 2.0, forecast: true },
  { countryId: 'fr', year: 2024, inflationRate: 2.3, foodInflation: 2.6, housingInflation: 2.2, transportInflation: 2.0, utilitiesInflation: 1.8, forecast: false },
  { countryId: 'fr', year: 2025, inflationRate: 1.9, foodInflation: 2.1, housingInflation: 1.8, transportInflation: 1.6, utilitiesInflation: 1.5, forecast: true },
  { countryId: 'pt', year: 2024, inflationRate: 2.9, foodInflation: 3.5, housingInflation: 2.4, transportInflation: 2.8, utilitiesInflation: 1.6, forecast: false },
  { countryId: 'pt', year: 2025, inflationRate: 2.3, foodInflation: 2.8, housingInflation: 2.0, transportInflation: 2.2, utilitiesInflation: 1.3, forecast: true },
  { countryId: 'nl', year: 2024, inflationRate: 2.8, foodInflation: 3.0, housingInflation: 3.2, transportInflation: 2.5, utilitiesInflation: 2.0, forecast: false },
  { countryId: 'nl', year: 2025, inflationRate: 2.2, foodInflation: 2.4, housingInflation: 2.6, transportInflation: 2.0, utilitiesInflation: 1.6, forecast: true },
  { countryId: 'ca', year: 2024, inflationRate: 2.6, foodInflation: 2.2, housingInflation: 3.8, transportInflation: 2.4, utilitiesInflation: 1.8, forecast: false },
  { countryId: 'ca', year: 2025, inflationRate: 2.1, foodInflation: 1.8, housingInflation: 3.0, transportInflation: 1.9, utilitiesInflation: 1.5, forecast: true },
  { countryId: 'au', year: 2024, inflationRate: 3.5, foodInflation: 3.8, housingInflation: 4.5, transportInflation: 3.2, utilitiesInflation: 2.8, forecast: false },
  { countryId: 'au', year: 2025, inflationRate: 2.8, foodInflation: 3.0, housingInflation: 3.6, transportInflation: 2.5, utilitiesInflation: 2.2, forecast: true },
  { countryId: 'mx', year: 2024, inflationRate: 4.2, foodInflation: 5.0, housingInflation: 3.8, transportInflation: 4.5, utilitiesInflation: 3.2, forecast: false },
  { countryId: 'mx', year: 2025, inflationRate: 3.5, foodInflation: 4.0, housingInflation: 3.2, transportInflation: 3.6, utilitiesInflation: 2.8, forecast: true },
  { countryId: 'jp', year: 2024, inflationRate: 2.5, foodInflation: 3.2, housingInflation: 1.8, transportInflation: 2.0, utilitiesInflation: 1.5, forecast: false },
  { countryId: 'jp', year: 2025, inflationRate: 2.0, foodInflation: 2.5, housingInflation: 1.5, transportInflation: 1.6, utilitiesInflation: 1.2, forecast: true },
  { countryId: 'ae', year: 2024, inflationRate: 2.2, foodInflation: 2.5, housingInflation: 2.8, transportInflation: 1.8, utilitiesInflation: 1.5, forecast: false },
  { countryId: 'ae', year: 2025, inflationRate: 1.8, foodInflation: 2.0, housingInflation: 2.2, transportInflation: 1.5, utilitiesInflation: 1.2, forecast: true },
  { countryId: 'ar', year: 2024, inflationRate: 140.0, foodInflation: 150.0, housingInflation: 130.0, transportInflation: 145.0, utilitiesInflation: 120.0, forecast: false },
  { countryId: 'ar', year: 2025, inflationRate: 60.0, foodInflation: 65.0, housingInflation: 55.0, transportInflation: 58.0, utilitiesInflation: 50.0, forecast: true },
];

export const getInflationByCountry = (countryId: string, year?: number): InflationData[] => {
  let data = inflationData.filter(d => d.countryId === countryId);
  if (year) {
    data = data.filter(d => d.year === year);
  }
  return data;
};

export const getLatestInflation = (countryId: string): InflationData | undefined => {
  const data = getInflationByCountry(countryId);
  return data.find(d => !d.forecast) || data[0];
};

export const getForecastInflation = (countryId: string): InflationData | undefined => {
  const data = getInflationByCountry(countryId);
  return data.find(d => d.forecast);
};

export const historicalInflation: { year: number; rate: number }[] = [
  { year: 2015, rate: 0.2 },
  { year: 2016, rate: 1.3 },
  { year: 2017, rate: 2.1 },
  { year: 2018, rate: 2.4 },
  { year: 2019, rate: 1.8 },
  { year: 2020, rate: 1.2 },
  { year: 2021, rate: 4.7 },
  { year: 2022, rate: 8.0 },
  { year: 2023, rate: 4.1 },
  { year: 2024, rate: 3.1 },
];
