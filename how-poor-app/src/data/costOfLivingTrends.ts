export interface CostOfLivingTrend {
  countryId: string;
  year: number;
  groceries: number;
  housing: number;
  utilities: number;
  transport: number;
  restaurants: number;
  overall: number;
}

export const costOfLivingTrends: CostOfLivingTrend[] = [
  { countryId: 'us', year: 2019, groceries: 100, housing: 100, utilities: 100, transport: 100, restaurants: 100, overall: 100 },
  { countryId: 'us', year: 2020, groceries: 103, housing: 105, utilities: 102, transport: 95, restaurants: 102, overall: 103 },
  { countryId: 'us', year: 2021, groceries: 108, housing: 112, utilities: 104, transport: 110, restaurants: 108, overall: 110 },
  { countryId: 'us', year: 2022, groceries: 118, housing: 125, utilities: 110, transport: 125, restaurants: 118, overall: 120 },
  { countryId: 'us', year: 2023, groceries: 122, housing: 132, utilities: 115, transport: 130, restaurants: 124, overall: 126 },
  { countryId: 'us', year: 2024, groceries: 125, housing: 138, utilities: 118, transport: 135, restaurants: 128, overall: 130 },
  { countryId: 'es', year: 2019, groceries: 100, housing: 100, utilities: 100, transport: 100, restaurants: 100, overall: 100 },
  { countryId: 'es', year: 2020, groceries: 102, housing: 101, utilities: 101, transport: 98, restaurants: 101, overall: 101 },
  { countryId: 'es', year: 2021, groceries: 105, housing: 103, utilities: 102, transport: 105, restaurants: 105, overall: 104 },
  { countryId: 'es', year: 2022, groceries: 115, housing: 110, utilities: 108, transport: 115, restaurants: 112, overall: 112 },
  { countryId: 'es', year: 2023, groceries: 120, housing: 118, utilities: 112, transport: 120, restaurants: 118, overall: 118 },
  { countryId: 'es', year: 2024, groceries: 123, housing: 122, utilities: 115, transport: 124, restaurants: 122, overall: 122 },
  { countryId: 'de', year: 2019, groceries: 100, housing: 100, utilities: 100, transport: 100, restaurants: 100, overall: 100 },
  { countryId: 'de', year: 2020, groceries: 102, housing: 103, utilities: 101, transport: 98, restaurants: 101, overall: 101 },
  { countryId: 'de', year: 2021, groceries: 104, housing: 106, utilities: 102, transport: 102, restaurants: 104, overall: 104 },
  { countryId: 'de', year: 2022, groceries: 112, housing: 115, utilities: 108, transport: 112, restaurants: 110, overall: 112 },
  { countryId: 'de', year: 2023, groceries: 118, housing: 122, utilities: 112, transport: 118, restaurants: 116, overall: 118 },
  { countryId: 'de', year: 2024, groceries: 121, housing: 128, utilities: 115, transport: 122, restaurants: 120, overall: 122 },
  { countryId: 'gb', year: 2019, groceries: 100, housing: 100, utilities: 100, transport: 100, restaurants: 100, overall: 100 },
  { countryId: 'gb', year: 2020, groceries: 102, housing: 102, utilities: 101, transport: 95, restaurants: 101, overall: 100 },
  { countryId: 'gb', year: 2021, groceries: 104, housing: 105, utilities: 102, transport: 100, restaurants: 104, overall: 103 },
  { countryId: 'gb', year: 2022, groceries: 112, housing: 115, utilities: 108, transport: 115, restaurants: 110, overall: 112 },
  { countryId: 'gb', year: 2023, groceries: 118, housing: 125, utilities: 112, transport: 122, restaurants: 118, overall: 120 },
  { countryId: 'gb', year: 2024, groceries: 122, housing: 132, utilities: 115, transport: 128, restaurants: 122, overall: 125 },
  { countryId: 'mx', year: 2019, groceries: 100, housing: 100, utilities: 100, transport: 100, restaurants: 100, overall: 100 },
  { countryId: 'mx', year: 2020, groceries: 104, housing: 105, utilities: 103, transport: 102, restaurants: 105, overall: 104 },
  { countryId: 'mx', year: 2021, groceries: 110, housing: 112, utilities: 106, transport: 110, restaurants: 110, overall: 110 },
  { countryId: 'mx', year: 2022, groceries: 122, housing: 120, utilities: 112, transport: 125, restaurants: 120, overall: 120 },
  { countryId: 'mx', year: 2023, groceries: 130, housing: 128, utilities: 118, transport: 135, restaurants: 130, overall: 128 },
  { countryId: 'mx', year: 2024, groceries: 135, housing: 135, utilities: 122, transport: 142, restaurants: 138, overall: 135 },
  { countryId: 'pt', year: 2019, groceries: 100, housing: 100, utilities: 100, transport: 100, restaurants: 100, overall: 100 },
  { countryId: 'pt', year: 2020, groceries: 103, housing: 102, utilities: 101, transport: 98, restaurants: 102, overall: 101 },
  { countryId: 'pt', year: 2021, groceries: 106, housing: 105, utilities: 102, transport: 104, restaurants: 105, overall: 104 },
  { countryId: 'pt', year: 2022, groceries: 115, housing: 112, utilities: 108, transport: 112, restaurants: 112, overall: 112 },
  { countryId: 'pt', year: 2023, groceries: 122, housing: 120, utilities: 112, transport: 118, restaurants: 118, overall: 118 },
  { countryId: 'pt', year: 2024, groceries: 126, housing: 125, utilities: 115, transport: 122, restaurants: 122, overall: 122 },
  { countryId: 'ca', year: 2019, groceries: 100, housing: 100, utilities: 100, transport: 100, restaurants: 100, overall: 100 },
  { countryId: 'ca', year: 2020, groceries: 103, housing: 105, utilities: 101, transport: 98, restaurants: 102, overall: 102 },
  { countryId: 'ca', year: 2021, groceries: 106, housing: 110, utilities: 102, transport: 102, restaurants: 105, overall: 105 },
  { countryId: 'ca', year: 2022, groceries: 115, housing: 120, utilities: 108, transport: 115, restaurants: 112, overall: 115 },
  { countryId: 'ca', year: 2023, groceries: 120, housing: 128, utilities: 112, transport: 120, restaurants: 118, overall: 120 },
  { countryId: 'ca', year: 2024, groceries: 124, housing: 135, utilities: 115, transport: 125, restaurants: 122, overall: 125 },
];

export const getTrendsByCountry = (countryId: string): CostOfLivingTrend[] => {
  return costOfLivingTrends.filter(t => t.countryId === countryId);
};

export const getLatestTrends = (countryId: string): CostOfLivingTrend | undefined => {
  const trends = getTrendsByCountry(countryId);
  return trends.find(t => t.year === 2024);
};

export const calculateChange = (countryId: string, years: number = 5): { category: string; change: number }[] => {
  const trends = getTrendsByCountry(countryId);
  const latest = trends.find(t => t.year === 2024);
  const past = trends.find(t => t.year === 2024 - years);
  
  if (!latest || !past) return [];
  
  return [
    { category: 'groceries', change: latest.groceries - past.groceries },
    { category: 'housing', change: latest.housing - past.housing },
    { category: 'utilities', change: latest.utilities - past.utilities },
    { category: 'transport', change: latest.transport - past.transport },
    { category: 'restaurants', change: latest.restaurants - past.restaurants },
    { category: 'overall', change: latest.overall - past.overall },
  ];
};
