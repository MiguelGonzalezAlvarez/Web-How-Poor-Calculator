export interface SalaryPercentile {
  p25: number;
  p50: number;
  p75: number;
  p90: number;
}

export interface SalaryByIndustry {
  industryId: string;
  percentiles: SalaryPercentile;
}

export interface CountrySalaryData {
  countryId: string;
  currency: string;
  salaryByIndustry: SalaryByIndustry[];
  averagePercentiles: SalaryPercentile;
  year: number;
}

export const salaryTrendsData: CountrySalaryData[] = [
  {
    countryId: 'us',
    currency: 'USD',
    year: 2024,
    averagePercentiles: { p25: 45000, p50: 65000, p75: 95000, p90: 140000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 75000, p50: 120000, p75: 170000, p90: 250000 } },
      { industryId: 'finance', percentiles: { p25: 60000, p50: 90000, p75: 130000, p90: 200000 } },
      { industryId: 'healthcare', percentiles: { p25: 55000, p50: 80000, p75: 110000, p90: 160000 } },
      { industryId: 'marketing', percentiles: { p25: 45000, p50: 65000, p75: 90000, p90: 130000 } },
      { industryId: 'general', percentiles: { p25: 40000, p50: 60000, p75: 85000, p90: 120000 } }
    ]
  },
  {
    countryId: 'gb',
    currency: 'GBP',
    year: 2024,
    averagePercentiles: { p25: 28000, p50: 40000, p75: 55000, p90: 80000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 40000, p50: 60000, p75: 85000, p90: 120000 } },
      { industryId: 'finance', percentiles: { p25: 35000, p50: 55000, p75: 80000, p90: 120000 } },
      { industryId: 'healthcare', percentiles: { p25: 32000, p50: 48000, p75: 65000, p90: 90000 } },
      { industryId: 'marketing', percentiles: { p25: 27000, p50: 38000, p75: 52000, p90: 75000 } },
      { industryId: 'general', percentiles: { p25: 25000, p50: 35000, p75: 48000, p90: 65000 } }
    ]
  },
  {
    countryId: 'de',
    currency: 'EUR',
    year: 2024,
    averagePercentiles: { p25: 35000, p50: 50000, p75: 70000, p90: 95000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 50000, p50: 75000, p75: 100000, p90: 140000 } },
      { industryId: 'finance', percentiles: { p25: 45000, p70: 65000, p75: 85000, p90: 120000 } },
      { industryId: 'healthcare', percentiles: { p25: 40000, p50: 55000, p75: 75000, p90: 100000 } },
      { industryId: 'marketing', percentiles: { p25: 32000, p50: 45000, p75: 60000, p90: 80000 } },
      { industryId: 'general', percentiles: { p25: 30000, p50: 42000, p75: 58000, p90: 78000 } }
    ]
  },
  {
    countryId: 'es',
    currency: 'EUR',
    year: 2024,
    averagePercentiles: { p25: 22000, p50: 30000, p75: 42000, p90: 60000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 28000, p50: 40000, p75: 55000, p90: 80000 } },
      { industryId: 'finance', percentiles: { p25: 25000, p50: 35000, p75: 48000, p90: 70000 } },
      { industryId: 'healthcare', percentiles: { p25: 28000, p50: 38000, p75: 50000, p90: 70000 } },
      { industryId: 'marketing', percentiles: { p25: 20000, p50: 28000, p75: 38000, p90: 52000 } },
      { industryId: 'general', percentiles: { p25: 18000, p50: 25000, p75: 35000, p90: 48000 } }
    ]
  },
  {
    countryId: 'fr',
    currency: 'EUR',
    year: 2024,
    averagePercentiles: { p25: 30000, p50: 42000, p75: 58000, p90: 80000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 42000, p50: 60000, p75: 85000, p90: 120000 } },
      { industryId: 'finance', percentiles: { p25: 38000, p50: 55000, p75: 75000, p90: 110000 } },
      { industryId: 'healthcare', percentiles: { p25: 35000, p50: 48000, p75: 65000, p90: 90000 } },
      { industryId: 'marketing', percentiles: { p25: 28000, p50: 38000, p75: 52000, p90: 70000 } },
      { industryId: 'general', percentiles: { p25: 25000, p50: 35000, p75: 48000, p90: 65000 } }
    ]
  },
  {
    countryId: 'nl',
    currency: 'EUR',
    year: 2024,
    averagePercentiles: { p25: 35000, p50: 50000, p75: 68000, p90: 90000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 50000, p50: 72000, p75: 95000, p90: 130000 } },
      { industryId: 'finance', percentiles: { p25: 42000, p50: 60000, p75: 80000, p90: 110000 } },
      { industryId: 'healthcare', percentiles: { p25: 38000, p50: 52000, p75: 70000, p90: 95000 } },
      { industryId: 'marketing', percentiles: { p25: 32000, p50: 45000, p75: 60000, p90: 80000 } },
      { industryId: 'general', percentiles: { p25: 30000, p50: 42000, p75: 56000, p90: 75000 } }
    ]
  },
  {
    countryId: 'pt',
    currency: 'EUR',
    year: 2024,
    averagePercentiles: { p25: 16000, p50: 22000, p75: 32000, p90: 48000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 22000, p50: 32000, p75: 45000, p90: 65000 } },
      { industryId: 'finance', percentiles: { p25: 19000, p50: 27000, p75: 38000, p90: 55000 } },
      { industryId: 'healthcare', percentiles: { p25: 20000, p50: 28000, p75: 38000, p90: 52000 } },
      { industryId: 'marketing', percentiles: { p25: 15000, p50: 20000, p75: 28000, p90: 40000 } },
      { industryId: 'general', percentiles: { p25: 14000, p50: 19000, p75: 26000, p90: 36000 } }
    ]
  },
  {
    countryId: 'ca',
    currency: 'CAD',
    year: 2024,
    averagePercentiles: { p25: 42000, p50: 60000, p75: 82000, p90: 115000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 65000, p50: 95000, p75: 130000, p90: 180000 } },
      { industryId: 'finance', percentiles: { p25: 55000, p50: 80000, p75: 110000, p90: 160000 } },
      { industryId: 'healthcare', percentiles: { p25: 50000, p50: 72000, p75: 95000, p90: 130000 } },
      { industryId: 'marketing', percentiles: { p25: 40000, p50: 55000, p75: 75000, p90: 100000 } },
      { industryId: 'general', percentiles: { p25: 38000, p50: 52000, p75: 70000, p90: 95000 } }
    ]
  },
  {
    countryId: 'au',
    currency: 'AUD',
    year: 2024,
    averagePercentiles: { p25: 45000, p50: 65000, p75: 90000, p90: 125000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 70000, p50: 100000, p75: 140000, p90: 190000 } },
      { industryId: 'finance', percentiles: { p25: 60000, p50: 85000, p75: 120000, p90: 170000 } },
      { industryId: 'healthcare', percentiles: { p25: 55000, p50: 78000, p75: 100000, p90: 140000 } },
      { industryId: 'marketing', percentiles: { p25: 42000, p50: 60000, p75: 82000, p90: 110000 } },
      { industryId: 'general', percentiles: { p25: 40000, p50: 55000, p75: 75000, p90: 100000 } }
    ]
  },
  {
    countryId: 'ch',
    currency: 'CHF',
    year: 2024,
    averagePercentiles: { p25: 55000, p50: 78000, p75: 105000, p90: 145000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 75000, p50: 110000, p75: 150000, p90: 200000 } },
      { industryId: 'finance', percentiles: { p25: 70000, p50: 100000, p75: 140000, p90: 200000 } },
      { industryId: 'healthcare', percentiles: { p25: 60000, p50: 85000, p75: 110000, p90: 150000 } },
      { industryId: 'marketing', percentiles: { p25: 50000, p50: 70000, p75: 95000, p90: 130000 } },
      { industryId: 'general', percentiles: { p25: 48000, p50: 68000, p75: 90000, p90: 120000 } }
    ]
  },
  {
    countryId: 'jp',
    currency: 'JPY',
    year: 2024,
    averagePercentiles: { p25: 3500000, p50: 5000000, p75: 7000000, p90: 10000000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 4500000, p50: 6500000, p75: 9000000, p90: 13000000 } },
      { industryId: 'finance', percentiles: { p25: 4000000, p50: 6000000, p75: 8500000, p90: 12000000 } },
      { industryId: 'healthcare', percentiles: { p25: 4200000, p50: 5800000, p75: 7800000, p90: 11000000 } },
      { industryId: 'marketing', percentiles: { p25: 3200000, p50: 4500000, p75: 6200000, p90: 8800000 } },
      { industryId: 'general', percentiles: { p25: 3000000, p50: 4200000, p75: 5800000, p90: 8000000 } }
    ]
  },
  {
    countryId: 'br',
    currency: 'BRL',
    year: 2024,
    averagePercentiles: { p25: 24000, p50: 36000, p75: 54000, p90: 84000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 36000, p50: 55000, p75: 85000, p90: 130000 } },
      { industryId: 'finance', percentiles: { p25: 32000, p50: 48000, p75: 72000, p90: 110000 } },
      { industryId: 'healthcare', percentiles: { p25: 30000, p50: 44000, p75: 65000, p90: 95000 } },
      { industryId: 'marketing', percentiles: { p25: 22000, p50: 32000, p75: 48000, p90: 72000 } },
      { industryId: 'general', percentiles: { p25: 20000, p50: 29000, p75: 42000, p90: 62000 } }
    ]
  },
  {
    countryId: 'mx',
    currency: 'MXN',
    year: 2024,
    averagePercentiles: { p25: 180000, p50: 300000, p75: 480000, p90: 780000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 300000, p50: 480000, p75: 720000, p90: 1100000 } },
      { industryId: 'finance', percentiles: { p25: 260000, p50: 420000, p75: 640000, p90: 960000 } },
      { industryId: 'healthcare', percentiles: { p25: 240000, p50: 380000, p75: 560000, p90: 840000 } },
      { industryId: 'marketing', percentiles: { p25: 160000, p50: 260000, p75: 400000, p90: 600000 } },
      { industryId: 'general', percentiles: { p25: 150000, p50: 240000, p75: 360000, p90: 540000 } }
    ]
  },
  {
    countryId: 'co',
    currency: 'COP',
    year: 2024,
    averagePercentiles: { p25: 12000000, p50: 20000000, p75: 36000000, p90: 60000000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 24000000, p50: 42000000, p75: 72000000, p90: 120000000 } },
      { industryId: 'finance', percentiles: { p25: 20000000, p50: 36000000, p75: 60000000, p90: 96000000 } },
      { industryId: 'healthcare', percentiles: { p25: 18000000, p50: 32000000, p75: 52000000, p90: 84000000 } },
      { industryId: 'marketing', percentiles: { p25: 12000000, p50: 20000000, p75: 34000000, p90: 56000000 } },
      { industryId: 'general', percentiles: { p25: 10000000, p50: 18000000, p75: 30000000, p90: 48000000 } }
    ]
  },
  {
    countryId: 'ar',
    currency: 'ARS',
    year: 2024,
    averagePercentiles: { p25: 1800000, p50: 3000000, p75: 5000000, p90: 9000000 },
    salaryByIndustry: [
      { industryId: 'tech', percentiles: { p25: 3000000, p50: 5000000, p75: 9000000, p90: 16000000 } },
      { industryId: 'finance', percentiles: { p25: 2600000, p50: 4400000, p75: 7600000, p90: 13000000 } },
      { industryId: 'healthcare', percentiles: { p25: 2400000, p50: 4000000, p75: 6800000, p90: 11000000 } },
      { industryId: 'marketing', percentiles: { p25: 1600000, p50: 2800000, p75: 4600000, p90: 8000000 } },
      { industryId: 'general', percentiles: { p25: 1500000, p50: 2500000, p75: 4200000, p90: 7000000 } }
    ]
  }
];

export const getSalaryData = (countryId: string): CountrySalaryData | undefined => {
  return salaryTrendsData.find(d => d.countryId === countryId);
};

export const getPercentilesByIndustry = (
  countryId: string,
  industryId: string
): SalaryPercentile | null => {
  const data = getSalaryData(countryId);
  if (!data) return null;
  
  const byIndustry = data.salaryByIndustry.find(i => i.industryId === industryId);
  return byIndustry?.percentiles || data.averagePercentiles;
};

export const getMedianSalary = (countryId: string, industryId: string = 'general'): number => {
  const percentiles = getPercentilesByIndustry(countryId, industryId);
  return percentiles?.p50 || 0;
};
