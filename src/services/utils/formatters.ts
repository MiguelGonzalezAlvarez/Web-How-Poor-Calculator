import { currencies, exchangeRates, costItems, taxRates } from '../../data/countries';
import { CalculationResult, Filters, Country } from '../../types';

export const formatCurrency = (amount: number, currencyCode: string, locale = 'es-ES'): string => {
  const currency = currencies.find(c => c.code === currencyCode) || currencies[0];
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    return `${currency.symbol}${Math.round(amount).toLocaleString()}`;
  }
};

export const formatCompactCurrency = (amount: number, currencyCode: string): string => {
  const currency = currencies.find(c => c.code === currencyCode) || currencies[0];
  
  if (amount >= 1000000) {
    return `${currency.symbol}${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `${currency.symbol}${(amount / 1000).toFixed(0)}K`;
  }
  return `${currency.symbol}${Math.round(amount).toLocaleString()}`;
};

export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  const fromRate = exchangeRates[fromCurrency] || 1;
  const toRate = exchangeRates[toCurrency] || 1;
  return (amount / fromRate) * toRate;
};

export const calculateNetSalary = (grossSalary: number, countryCode: string): number => {
  const tax = taxRates[countryCode];
  if (!tax) return grossSalary * 0.7;
  return grossSalary * (1 - tax.total);
};

export interface TaxBreakdown {
  gross: number;
  federal: number;
  state: number;
  social: number;
  net: number;
  effectiveRate: number;
}

export const calculateTaxBreakdown = (grossSalary: number, countryCode: string): TaxBreakdown | null => {
  const tax = taxRates[countryCode];
  if (!tax) return null;
  
  return {
    gross: grossSalary,
    federal: grossSalary * tax.federal,
    state: grossSalary * tax.state,
    social: grossSalary * tax.social,
    net: grossSalary * (1 - tax.total),
    effectiveRate: tax.total
  };
};

export const getCostForCountry = (baseCost: number, costOfLivingIndex: number): number => {
  return baseCost * (costOfLivingIndex / 100);
};

export interface CostItemWithPrice {
  name: string;
  nameEs: string;
  avgPrice: number;
  unit: string;
  priceInCountry: number;
}

export const calculateCostOfLiving = (countryCostOfLivingIndex: number): Record<string, CostItemWithPrice> => {
  const items: Record<string, CostItemWithPrice> = {};
  
  Object.entries(costItems).forEach(([key, item]) => {
    items[key] = {
      ...item,
      priceInCountry: getCostForCountry(item.avgPrice, countryCostOfLivingIndex)
    };
  });
  
  return items;
};

export const getPurchasingPowerText = (ratio: number, language = 'es'): string => {
  if (ratio >= 1.5) {
    return language === 'es' ? 'Mucho mejor' : 'Much better';
  } else if (ratio >= 1.2) {
    return language === 'es' ? 'Mejor' : 'Better';
  } else if (ratio >= 0.9) {
    return language === 'es' ? 'Similar' : 'Similar';
  } else if (ratio >= 0.7) {
    return language === 'es' ? 'Peor' : 'Worse';
  } else {
    return language === 'es' ? 'Mucho peor' : 'Much worse';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'better': return '#22c55e';
    case 'worse': return '#ef4444';
    default: return '#6b7280';
  }
};

export const getPercentile = (salary: number, countryId: string, regionId: string | null, countriesList: Country[]): number => {
  const country = countriesList.find(c => c.id === countryId);
  if (!country) return 50;
  
  const region = regionId ? country.regions.find(r => r.id === regionId) : null;
  const avgSalary = region?.avgNetSalary || country.gdpPppPerCapita * 0.4;
  
  const ratio = salary / avgSalary;
  if (ratio >= 2) return 90;
  if (ratio >= 1.5) return 75;
  if (ratio >= 1) return 60;
  if (ratio >= 0.75) return 40;
  if (ratio >= 0.5) return 25;
  return 10;
};

export const sortResults = (results: CalculationResult[], sortBy: string, order: 'asc' | 'desc' = 'desc'): CalculationResult[] => {
  return [...results].sort((a, b) => {
    let valueA: number | string;
    let valueB: number | string;
    
    switch (sortBy) {
      case 'salary':
        valueA = a.equivalentSalary;
        valueB = b.equivalentSalary;
        break;
      case 'country':
        valueA = a.country.name;
        valueB = b.country.name;
        return order === 'asc' 
          ? valueA.localeCompare(valueB as string) 
          : (valueB as string).localeCompare(valueA as string);
      case 'costOfLiving':
        valueA = a.costOfLivingIndex;
        valueB = b.costOfLivingIndex;
        break;
      case 'purchasingPower':
        valueA = a.purchasingPowerIndex;
        valueB = b.purchasingPowerIndex;
        break;
      case 'ratio':
        valueA = a.ratio;
        valueB = b.ratio;
        break;
      default:
        return 0;
    }
    
    return order === 'asc' 
      ? (valueA as number) - (valueB as number) 
      : (valueB as number) - (valueA as number);
  });
};

export const filterResults = (results: CalculationResult[], filters: Filters): CalculationResult[] => {
  return results.filter(result => {
    if (filters.countries && filters.countries.length > 0) {
      if (!filters.countries.includes(result.country.id)) return false;
    }
    
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(result.status)) return false;
    }
    
    if (filters.minSalary) {
      if (result.equivalentSalary < filters.minSalary) return false;
    }
    
    if (filters.maxSalary) {
      if (result.equivalentSalary > filters.maxSalary) return false;
    }
    
    return true;
  });
};

export const generateInsights = (
  results: CalculationResult[], 
  originCountry: Country | null,
  _salary: number,
  language = 'es'
): string[] => {
  const insights: string[] = [];
  
  if (!originCountry || results.length === 0) return insights;

  const better = results.filter(r => r.status === 'better').slice(0, 3);
  const worse = results.filter(r => r.status === 'worse').slice(0, 3);
  
  if (better.length > 0) {
    const countriesList = better.map(r => r.country.nameEs).join(', ');
    insights.push(
      language === 'es' 
        ? `Tu dinero llega más lejos en: ${countriesList}`
        : `Your money goes further in: ${better.map(r => r.country.name).join(', ')}`
    );
  }
  
  if (worse.length > 0) {
    insights.push(
      language === 'es'
        ? `En ${worse[0].country.nameEs} necesitarías ganar más para mantener tu nivel actual`
        : `In ${worse[0].country.name} you would need to earn more to maintain your current level`
    );
  }

  const avgRatio = results.reduce((sum, r) => sum + r.ratio, 0) / results.length;
  if (avgRatio > 1) {
    insights.push(
      language === 'es'
        ? 'En promedio, tu salario tiene más valor en la mayoría de países analizados'
        : 'On average, your salary has more value in most analyzed countries'
    );
  }
  
  return insights;
};
