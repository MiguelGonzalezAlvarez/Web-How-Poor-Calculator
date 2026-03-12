import { ExchangeRates } from '../types';

const EXCHANGE_API = 'https://api.frankfurter.app';

export interface LiveExchangeRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface CostOfLivingData {
  country: string;
  costIndex: number;
  rentIndex: number;
  groceriesIndex: number;
  restaurantsIndex: number;
  purchasingPower: number;
}

let cachedRates: LiveExchangeRates | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000;

export const fetchLiveExchangeRates = async (baseCurrency: string = 'USD'): Promise<LiveExchangeRates> => {
  const now = Date.now();
  
  if (cachedRates && cachedRates.base === baseCurrency && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedRates;
  }

  try {
    const response = await fetch(`${EXCHANGE_API}/latest?from=${baseCurrency}`);
    if (!response.ok) throw new Error('Failed to fetch exchange rates');
    
    const data = await response.json();
    cachedRates = {
      base: data.base,
      date: data.date,
      rates: data.rates
    };
    lastFetchTime = now;
    
    return cachedRates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

export const convertCurrency = async (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  if (fromCurrency === toCurrency) return amount;
  
  try {
    const rates = await fetchLiveExchangeRates(fromCurrency);
    const rate = rates.rates[toCurrency];
    if (!rate) throw new Error(`No rate found for ${toCurrency}`);
    return amount * rate;
  } catch (error) {
    console.error('Currency conversion error:', error);
    throw error;
  }
};

export const fetchMultipleCurrencies = async (
  currencies: string[],
  baseCurrency: string = 'USD'
): Promise<Record<string, number>> => {
  const currencyList = currencies.filter(c => c !== baseCurrency).join(',');
  
  try {
    const response = await fetch(`${EXCHANGE_API}/latest?from=${baseCurrency}&to=${currencyList}`);
    if (!response.ok) throw new Error('Failed to fetch currencies');
    
    const data = await response.json();
    return { [baseCurrency]: 1, ...data.rates };
  } catch (error) {
    console.error('Error fetching multiple currencies:', error);
    throw error;
  }
};

export const isDataStale = (lastUpdate: Date): boolean => {
  const now = new Date();
  const daysSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceUpdate > 30;
};

export const getDataSourceInfo = (): { source: string; description: string; updateFrequency: string } => ({
  source: 'Frankfurter API + Static Data',
  description: 'Live exchange rates from European Central Bank. Cost of living from Numbeo/World Bank static data.',
  updateFrequency: 'Exchange rates: Daily | Cost of living: Monthly'
});
