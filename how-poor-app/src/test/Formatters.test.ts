import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatCompactCurrency,
  convertCurrency,
  calculateNetSalary,
  calculateTaxBreakdown,
  getCostForCountry,
  calculateCostOfLiving,
  getPurchasingPowerText,
  getStatusColor,
  getPercentile,
  sortResults,
  filterResults,
  generateInsights
} from '../services/utils/formatters';
import { Country, CalculationResult } from '../types';

const mockCountry: Country = {
  id: 'es',
  name: 'Spain',
  nameEs: 'España',
  code: 'ES',
  currency: 'EUR',
  currencySymbol: '€',
  flag: '🇪🇸',
  lat: 40.4,
  lng: -3.7,
  gdpPppPerCapita: 45000,
  costOfLivingIndex: 65,
  purchasingPowerIndex: 70,
  regions: [
    {
      id: 'es-mad',
      name: 'Madrid',
      nameEs: 'Madrid',
      costOfLivingIndex: 75,
      rentIndex: 80,
      purchasingPowerIndex: 75
    }
  ]
};

const mockResult: CalculationResult = {
  country: mockCountry,
  region: mockCountry.regions[0],
  equivalentSalary: 50000,
  salaryInOriginCurrency: 50000,
  currency: 'EUR',
  currencySymbol: '€',
  costOfLivingIndex: 75,
  rentIndex: 80,
  purchasingPowerIndex: 75,
  ratio: 1.2,
  status: 'better',
  gdpPpp: 45000
};

const mockResults: CalculationResult[] = [
  { ...mockResult, ratio: 1.5, status: 'better', country: { ...mockCountry, id: 'de', name: 'Germany', nameEs: 'Alemania' } },
  { ...mockResult, ratio: 1.0, status: 'similar', country: { ...mockCountry, id: 'fr', name: 'France', nameEs: 'Francia' } },
  { ...mockResult, ratio: 0.7, status: 'worse', country: { ...mockCountry, id: 'uk', name: 'UK', nameEs: 'Reino Unido' } }
];

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('formats EUR correctly', () => {
      const result = formatCurrency(50000, 'EUR');
      expect(result).toContain('50');
    });

    it('formats USD correctly', () => {
      const result = formatCurrency(100000, 'USD');
      expect(result).toContain('100');
    });

    it('handles unknown currency', () => {
      const result = formatCurrency(50000, 'XYZ');
      expect(result).toBeDefined();
    });
  });

  describe('formatCompactCurrency', () => {
    it('formats millions with M', () => {
      expect(formatCompactCurrency(1500000, 'EUR')).toBe('€1.5M');
    });

    it('formats thousands with K', () => {
      expect(formatCompactCurrency(50000, 'EUR')).toBe('€50K');
    });

    it('formats small amounts without suffix', () => {
      expect(formatCompactCurrency(500, 'EUR')).toBe('€500');
    });
  });

  describe('convertCurrency', () => {
    it('converts USD to EUR', () => {
      const result = convertCurrency(100, 'USD', 'EUR');
      expect(result).toBeGreaterThan(0);
    });

    it('returns same amount for same currency', () => {
      expect(convertCurrency(100, 'EUR', 'EUR')).toBe(100);
    });

    it('handles unknown currency', () => {
      const result = convertCurrency(100, 'XYZ', 'EUR');
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('calculateNetSalary', () => {
    it('calculates net salary for known country', () => {
      const result = calculateNetSalary(100000, 'ES');
      expect(result).toBeLessThan(100000);
      expect(result).toBeGreaterThan(0);
    });

    it('returns default 70% for unknown country', () => {
      const result = calculateNetSalary(100000, 'XX');
      expect(result).toBe(70000);
    });
  });

  describe('calculateTaxBreakdown', () => {
    it('returns tax breakdown for known country', () => {
      const result = calculateTaxBreakdown(100000, 'us');
      expect(result).toBeDefined();
      expect(result?.gross).toBe(100000);
      expect(result?.net).toBeLessThan(100000);
      expect(result?.effectiveRate).toBeGreaterThan(0);
    });

    it('returns null for unknown country', () => {
      const result = calculateTaxBreakdown(100000, 'xx');
      expect(result).toBeNull();
    });
  });

  describe('getCostForCountry', () => {
    it('calculates cost based on index', () => {
      const result = getCostForCountry(1000, 100);
      expect(result).toBe(1000);
    });

    it('adjusts for lower cost of living', () => {
      const result = getCostForCountry(1000, 50);
      expect(result).toBe(500);
    });

    it('adjusts for higher cost of living', () => {
      const result = getCostForCountry(1000, 150);
      expect(result).toBe(1500);
    });
  });

  describe('getPurchasingPowerText', () => {
    it('returns correct text for Spanish', () => {
      expect(getPurchasingPowerText(1.6, 'es')).toBe('Mucho mejor');
      expect(getPurchasingPowerText(1.3, 'es')).toBe('Mejor');
      expect(getPurchasingPowerText(0.95, 'es')).toBe('Similar');
      expect(getPurchasingPowerText(0.75, 'es')).toBe('Peor');
      expect(getPurchasingPowerText(0.4, 'es')).toBe('Mucho peor');
    });

    it('returns correct text for English', () => {
      expect(getPurchasingPowerText(1.6, 'en')).toBe('Much better');
      expect(getPurchasingPowerText(1.3, 'en')).toBe('Better');
      expect(getPurchasingPowerText(0.95, 'en')).toBe('Similar');
      expect(getPurchasingPowerText(0.75, 'en')).toBe('Worse');
      expect(getPurchasingPowerText(0.4, 'en')).toBe('Much worse');
    });
  });

  describe('getStatusColor', () => {
    it('returns green for better', () => {
      expect(getStatusColor('better')).toBe('#22c55e');
    });

    it('returns red for worse', () => {
      expect(getStatusColor('worse')).toBe('#ef4444');
    });

    it('returns gray for similar', () => {
      expect(getStatusColor('similar')).toBe('#6b7280');
    });
  });

  describe('getPercentile', () => {
    it('calculates high percentile for high salary', () => {
      const result = getPercentile(100000, 'es', 'es-mad', [mockCountry]);
      expect(result).toBeGreaterThanOrEqual(60);
    });

    it('calculates low percentile for low salary', () => {
      const result = getPercentile(15000, 'es', 'es-mad', [mockCountry]);
      expect(result).toBeLessThanOrEqual(40);
    });

    it('returns 50 for unknown country', () => {
      const result = getPercentile(50000, 'xx', null, []);
      expect(result).toBe(50);
    });
  });

  describe('sortResults', () => {
    it('sorts by salary descending', () => {
      const sorted = sortResults(mockResults, 'salary', 'desc');
      expect(sorted[0].equivalentSalary).toBeGreaterThanOrEqual(sorted[1].equivalentSalary);
    });

    it('sorts by ratio ascending', () => {
      const sorted = sortResults(mockResults, 'ratio', 'asc');
      expect(sorted[0].ratio).toBeLessThanOrEqual(sorted[1].ratio);
    });

    it('sorts by country name', () => {
      const sorted = sortResults(mockResults, 'country', 'asc');
      expect(sorted).toHaveLength(3);
    });
  });

  describe('filterResults', () => {
    it('filters by countries', () => {
      const filtered = filterResults(mockResults, { countries: ['es', 'de'] });
      expect(filtered.length).toBeLessThanOrEqual(2);
    });

    it('filters by status', () => {
      const filtered = filterResults(mockResults, { status: ['better'] });
      expect(filtered.every(r => r.status === 'better')).toBe(true);
    });

    it('filters by min salary', () => {
      const filtered = filterResults(mockResults, { minSalary: 50000 });
      expect(filtered.every(r => r.equivalentSalary >= 50000)).toBe(true);
    });

    it('filters by max salary', () => {
      const filtered = filterResults(mockResults, { maxSalary: 50000 });
      expect(filtered.every(r => r.equivalentSalary <= 50000)).toBe(true);
    });

    it('returns all results with empty filters', () => {
      const filtered = filterResults(mockResults, {});
      expect(filtered).toHaveLength(3);
    });
  });

  describe('generateInsights', () => {
    it('generates insights for better countries', () => {
      const insights = generateInsights(mockResults, mockCountry, 50000, 'es');
      expect(insights.length).toBeGreaterThan(0);
    });

    it('returns empty array for no results', () => {
      const insights = generateInsights([], mockCountry, 50000, 'es');
      expect(insights).toHaveLength(0);
    });

    it('returns empty array for no origin country', () => {
      const insights = generateInsights(mockResults, null, 50000, 'es');
      expect(insights).toHaveLength(0);
    });
  });
});
