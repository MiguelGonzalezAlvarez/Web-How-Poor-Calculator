import { describe, it, expect } from 'vitest';
import { 
  parseSalary, 
  getExchangeRate, 
  calculateStatus, 
  calculateEquivalences 
} from '../services/CalculationService';
import { Country, Region } from '../types';

const mockCountries: Country[] = [
  {
    id: "us",
    name: "United States",
    nameEs: "Estados Unidos",
    code: "US",
    currency: "USD",
    currencySymbol: "$",
    flag: "🇺🇸",
    lat: 37.0902,
    lng: -95.7129,
    gdpPppPerCapita: 73637,
    costOfLivingIndex: 100,
    purchasingPowerIndex: 100,
    qualityOfLife: { healthcare: 77, safety: 50, education: 78, climate: 65, pollution: 55 },
    regions: [
      { id: "us-ny", name: "New York", nameEs: "Nueva York", costOfLivingIndex: 100, rentIndex: 100, purchasingPowerIndex: 100, avgNetSalary: 75000 }
    ]
  },
  {
    id: "es",
    name: "Spain",
    nameEs: "España",
    code: "ES",
    currency: "EUR",
    currencySymbol: "€",
    flag: "🇪🇸",
    lat: 40.4637,
    lng: -3.7492,
    gdpPppPerCapita: 45000,
    costOfLivingIndex: 55,
    purchasingPowerIndex: 65,
    qualityOfLife: { healthcare: 80, safety: 75, education: 75, climate: 80, pollution: 40 },
    regions: [
      { id: "es-ma", name: "Madrid", nameEs: "Madrid", costOfLivingIndex: 65, rentIndex: 60, purchasingPowerIndex: 70, avgNetSalary: 35000 }
    ]
  }
];

const mockExchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79
};

describe('CalculationService', () => {
  describe('parseSalary', () => {
    it('should parse valid salary string', () => {
      expect(parseSalary('50000')).toBe(50000);
      expect(parseSalary('50,000')).toBe(50000);
      expect(parseSalary('$50,000')).toBe(50000);
    });

    it('should return 0 for invalid salary string', () => {
      expect(parseSalary('')).toBe(0);
      expect(parseSalary('abc')).toBe(0);
      expect(parseSalary('N/A')).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(parseSalary('-50000')).toBe(-50000);
    });
  });

  describe('getExchangeRate', () => {
    it('should return correct exchange rate', () => {
      expect(getExchangeRate('USD', mockExchangeRates)).toBe(1);
      expect(getExchangeRate('EUR', mockExchangeRates)).toBe(0.92);
      expect(getExchangeRate('GBP', mockExchangeRates)).toBe(0.79);
    });

    it('should return 1 for unknown currency', () => {
      expect(getExchangeRate('XXX', mockExchangeRates)).toBe(1);
      expect(getExchangeRate('', mockExchangeRates)).toBe(1);
    });
  });

  describe('calculateStatus', () => {
    it('should return "better" when ratio > 1.2', () => {
      expect(calculateStatus(1.3)).toBe('better');
      expect(calculateStatus(2.0)).toBe('better');
    });

    it('should return "similar" when ratio is between 0.8 and 1.2', () => {
      expect(calculateStatus(1.0)).toBe('similar');
      expect(calculateStatus(1.19)).toBe('similar');
      expect(calculateStatus(0.81)).toBe('similar');
    });

    it('should return "worse" when ratio < 0.8', () => {
      expect(calculateStatus(0.5)).toBe('worse');
      expect(calculateStatus(0.79)).toBe('worse');
    });
  });

  describe('calculateEquivalences', () => {
    it('should return null when salary is missing', () => {
      const result = calculateEquivalences({
        salary: 0,
        currency: 'USD',
        selectedCountry: 'us',
        selectedRegion: 'us-ny',
        industry: 'general'
      }, mockCountries, mockExchangeRates);
      expect(result).toBeNull();
    });

    it('should return null when country is missing', () => {
      const result = calculateEquivalences({
        salary: 50000,
        currency: 'USD',
        selectedCountry: '',
        selectedRegion: 'us-ny',
        industry: 'general'
      }, mockCountries, mockExchangeRates);
      expect(result).toBeNull();
    });

    it('should return null when region is missing', () => {
      const result = calculateEquivalences({
        salary: 50000,
        currency: 'USD',
        selectedCountry: 'us',
        selectedRegion: '',
        industry: 'general'
      }, mockCountries, mockExchangeRates);
      expect(result).toBeNull();
    });

    it('should return null when country is not found', () => {
      const result = calculateEquivalences({
        salary: 50000,
        currency: 'USD',
        selectedCountry: 'invalid',
        selectedRegion: 'us-ny',
        industry: 'general'
      }, mockCountries, mockExchangeRates);
      expect(result).toBeNull();
    });

    it('should calculate equivalences correctly', () => {
      const result = calculateEquivalences({
        salary: 50000,
        currency: 'USD',
        selectedCountry: 'us',
        selectedRegion: 'us-ny',
        industry: 'general'
      }, mockCountries, mockExchangeRates);

      expect(result).not.toBeNull();
      expect(result!.results.length).toBeGreaterThan(0);
      expect(result!.originCountry.id).toBe('us');
      expect(result!.originRegion.id).toBe('us-ny');
      expect(result!.salaryInUSD).toBe(50000);
    });

    it('should exclude origin country from results', () => {
      const result = calculateEquivalences({
        salary: 50000,
        currency: 'USD',
        selectedCountry: 'us',
        selectedRegion: 'us-ny',
        industry: 'general'
      }, mockCountries, mockExchangeRates);

      const usResults = result!.results.filter(r => r.country.id === 'us');
      expect(usResults.length).toBe(0);
    });

    it('should sort results by ratio descending', () => {
      const result = calculateEquivalences({
        salary: 50000,
        currency: 'USD',
        selectedCountry: 'us',
        selectedRegion: 'us-ny',
        industry: 'general'
      }, mockCountries, mockExchangeRates);

      const ratios = result!.results.map(r => r.ratio);
      expect(ratios).toEqual([...ratios].sort((a, b) => b - a));
    });

    it('should apply industry multiplier', () => {
      const resultWithMultiplier = calculateEquivalences({
        salary: 50000,
        currency: 'USD',
        selectedCountry: 'us',
        selectedRegion: 'us-ny',
        industry: 'tech'
      }, mockCountries, mockExchangeRates);

      expect(resultWithMultiplier?.results[0]?.equivalentSalary).toBeDefined();
    });
  });
});
