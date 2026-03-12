import { describe, it, expect } from 'vitest';

describe('ShareUrl Generation', () => {
  const generateShareUrl = (params: {
    salary?: string;
    currency?: string;
    selectedCountry?: string | null;
    selectedRegion?: string | null;
    industry?: string;
    isCalculated?: boolean;
  }): string | null => {
    const { salary, currency, selectedCountry, selectedRegion, industry, isCalculated } = params;
    
    if (!isCalculated) return null;

    const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    const paramsList = new URLSearchParams();

    if (salary) paramsList.set('salary', salary);
    if (currency) paramsList.set('currency', currency);
    if (selectedCountry) paramsList.set('country', selectedCountry);
    if (selectedRegion) paramsList.set('region', selectedRegion);
    if (industry && industry !== 'general') paramsList.set('industry', industry);

    return `${baseUrl}?${paramsList.toString()}`;
  };

  it('should return null when not calculated', () => {
    const url = generateShareUrl({ isCalculated: false });
    expect(url).toBeNull();
  });

  it('should generate URL with salary', () => {
    const url = generateShareUrl({ 
      salary: '50000', 
      currency: 'USD',
      selectedCountry: 'us',
      selectedRegion: 'us-ny',
      industry: 'general',
      isCalculated: true 
    });
    
    expect(url).toContain('salary=50000');
    expect(url).toContain('currency=USD');
    expect(url).toContain('country=us');
    expect(url).toContain('region=us-ny');
  });

  it('should not include industry when general', () => {
    const url = generateShareUrl({ 
      salary: '50000', 
      currency: 'USD',
      selectedCountry: 'us',
      selectedRegion: 'us-ny',
      industry: 'general',
      isCalculated: true 
    });
    
    expect(url).not.toContain('industry');
  });

  it('should include industry when not general', () => {
    const url = generateShareUrl({ 
      salary: '50000', 
      currency: 'USD',
      selectedCountry: 'us',
      selectedRegion: 'us-ny',
      industry: 'tech',
      isCalculated: true 
    });
    
    expect(url).toContain('industry=tech');
  });

  it('should not include null or empty values', () => {
    const url = generateShareUrl({ 
      salary: '', 
      currency: 'USD',
      selectedCountry: null,
      selectedRegion: 'us-ny',
      industry: 'general',
      isCalculated: true 
    });
    
    expect(url).toContain('currency=USD');
    expect(url).toContain('region=us-ny');
    expect(url).not.toContain('salary=');
    expect(url).not.toContain('country=');
  });
});
