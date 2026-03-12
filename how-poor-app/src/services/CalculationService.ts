import { Country, Region, CalculationResult, Industry } from '../types';

export interface CalculationParams {
  salary: number;
  currency: string;
  selectedCountry: string;
  selectedRegion: string;
  industry: string;
}

export interface CalculationOutput {
  results: CalculationResult[];
  originCountry: Country;
  originRegion: Region;
  salaryInUSD: number;
}

export const parseSalary = (salary: string): number => {
  const parsed = parseFloat(salary.replace(/[^0-9.-]/g, ''));
  return isNaN(parsed) ? 0 : parsed;
};

export const getExchangeRate = (currency: string, exchangeRates: Record<string, number>): number => {
  return exchangeRates[currency] || 1;
};

export const calculateStatus = (ratio: number): 'better' | 'similar' | 'worse' => {
  if (ratio > 1.2) return 'better';
  if (ratio < 0.8) return 'worse';
  return 'similar';
};

export const calculateEquivalences = (
  params: CalculationParams,
  countries: Country[],
  exchangeRates: Record<string, number>
): CalculationOutput | null => {
  const { salary, currency, selectedCountry, selectedRegion, industry } = params;

  if (!salary || !selectedCountry || !selectedRegion) {
    return null;
  }

  const originCountry = countries.find(c => c.id === selectedCountry);
  const originRegion = originCountry?.regions.find(r => r.id === selectedRegion);

  if (!originCountry || !originRegion) {
    return null;
  }

  const originRate = getExchangeRate(currency, exchangeRates);
  const salaryInUSD = salary / originRate;

  const originPPIndex = originRegion.purchasingPowerIndex || originCountry.purchasingPowerIndex;
  const originCOLIndex = originRegion.costOfLivingIndex || originCountry.costOfLivingIndex;

  const results: CalculationResult[] = countries
    .filter(c => c.id !== selectedCountry)
    .map(country => {
      return country.regions.slice(0, 3).map(region => {
        const destPPIndex = region.purchasingPowerIndex || country.purchasingPowerIndex;
        const destCOLIndex = region.costOfLivingIndex || country.costOfLivingIndex;

        let equivalentSalary: number;
        if (destPPIndex && originPPIndex) {
          equivalentSalary = salary * (destPPIndex / originPPIndex);
        } else if (destCOLIndex && originCOLIndex) {
          equivalentSalary = salary * (originCOLIndex / destCOLIndex);
        } else {
          equivalentSalary = salary * (country.gdpPppPerCapita / originCountry.gdpPppPerCapita);
        }

        const industryMultiplier = industry === 'general' ? 1 : 
          country.industries?.find((i: Industry) => i.id === industry)?.salaryMultiplier || 1;

        const adjustedSalary = equivalentSalary * industryMultiplier;
        const destRate = getExchangeRate(country.currency, exchangeRates);
        const salaryInOriginCurrency = adjustedSalary * destRate;

        const ratio = adjustedSalary / salary;
        const status = calculateStatus(ratio);

        return {
          country,
          region,
          equivalentSalary: Math.round(adjustedSalary),
          salaryInOriginCurrency: Math.round(salaryInOriginCurrency),
          currency: country.currency,
          currencySymbol: country.currencySymbol,
          costOfLivingIndex: destCOLIndex,
          rentIndex: region.rentIndex || destCOLIndex * 0.8,
          purchasingPowerIndex: destPPIndex,
          ratio,
          status,
          gdpPpp: country.gdpPppPerCapita
        };
      });
    })
    .flat()
    .sort((a, b) => b.ratio - a.ratio);

  return {
    results,
    originCountry,
    originRegion,
    salaryInUSD
  };
};
