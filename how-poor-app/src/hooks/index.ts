import { useState, useCallback, useMemo } from 'react';
import useAppStore from '../store/useAppStore';
import { sortResults, filterResults, generateInsights } from '../services/utils/formatters';

export const useCalculation = () => {
  const {
    salary,
    currency,
    selectedCountry,
    selectedRegion,
    industry,
    calculatedResults,
    isCalculated,
    originCountry,
    originRegion,
    salaryInUSD,
    isLoading,
    calculateEquivalences,
    reset
  } = useAppStore();

  const salaryNum = useMemo(() => {
    if (!salary) return 0;
    return parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  }, [salary]);

  const isValid = Boolean(salary && selectedCountry && selectedRegion);
  const isSalaryValid = salaryNum > 0 && salaryNum < 10000000;
  const canCalculate = isValid && isSalaryValid && !isLoading;

  const insights = useMemo(() => {
    if (!originCountry || calculatedResults.length === 0) return [];
    return generateInsights(calculatedResults, originCountry, salaryNum);
  }, [calculatedResults, originCountry, salaryNum]);

  const handleCalculate = useCallback(() => {
    if (canCalculate) {
      calculateEquivalences();
    }
  }, [canCalculate, calculateEquivalences]);

  const percentile = useMemo(() => {
    if (!originRegion || !salaryNum) return 50;
    const avgSalary = originRegion.avgNetSalary || originCountry!.gdpPppPerCapita * 0.4;
    const ratio = salaryNum / avgSalary;
    if (ratio >= 2) return 90;
    if (ratio >= 1.5) return 75;
    if (ratio >= 1) return 60;
    if (ratio >= 0.75) return 40;
    if (ratio >= 0.5) return 25;
    return 10;
  }, [salaryNum, originRegion, originCountry]);

  return {
    salary,
    salaryNum,
    currency,
    selectedCountry,
    selectedRegion,
    industry,
    calculatedResults,
    isCalculated,
    originCountry,
    originRegion,
    salaryInUSD,
    isLoading,
    isValid,
    isSalaryValid,
    canCalculate,
    insights,
    percentile,
    calculate: handleCalculate,
    reset
  };
};

export const useFilters = () => {
  const { filters, updateFilter, clearFilters, calculatedResults } = useAppStore();

  const [sortBy, setSortBy] = useState<string>('ratio');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredResults = useMemo(() => {
    const filtered = filterResults(calculatedResults, filters);
    return sortResults(filtered, sortBy, sortOrder);
  }, [calculatedResults, filters, sortBy, sortOrder]);

  const toggleStatusFilter = useCallback((status: string) => {
    const currentStatuses = filters.status || [];
    if (currentStatuses.includes(status)) {
      updateFilter('status', currentStatuses.filter(s => s !== status));
    } else {
      updateFilter('status', [...currentStatuses, status]);
    }
  }, [filters.status, updateFilter]);

  const handleSort = useCallback((field: string) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  }, [sortBy]);

  const uniqueCountries = useMemo(() => {
    const countryMap = new Map();
    calculatedResults.forEach(r => {
      if (!countryMap.has(r.country.id)) {
        countryMap.set(r.country.id, r.country);
      }
    });
    return Array.from(countryMap.values());
  }, [calculatedResults]);

  return {
    filters,
    filteredResults,
    sortBy,
    sortOrder,
    uniqueCountries,
    toggleStatusFilter,
    handleSort,
    updateFilter,
    clearFilters
  };
};

export const useShare = () => {
  const { salary, currency, selectedCountry, selectedRegion, industry, isCalculated } = useAppStore();
  const [copied, setCopied] = useState(false);

  const generateUrl = useCallback(() => {
    if (!isCalculated) return null;

    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();

    if (salary) params.set('salary', salary);
    if (currency) params.set('currency', currency);
    if (selectedCountry) params.set('country', selectedCountry);
    if (selectedRegion) params.set('region', selectedRegion);
    if (industry && industry !== 'general') params.set('industry', industry);

    return `${baseUrl}?${params.toString()}`;
  }, [salary, currency, selectedCountry, selectedRegion, industry, isCalculated]);

  const copyToClipboard = useCallback(async () => {
    const url = generateUrl();
    if (!url) return false;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      return false;
    }
  }, [generateUrl]);

  const shareToSocial = useCallback((platform: string) => {
    const url = generateUrl();
    if (!url) return;

    const text = 'Check your purchasing power around the world!';
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  }, [generateUrl]);

  return {
    generateUrl,
    copyToClipboard,
    shareToSocial,
    copied,
    isCalculated
  };
};

export const useUrlParams = () => {
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const { 
    setSalary, 
    setCurrency, 
    setSelectedCountry, 
    setSelectedRegion, 
    setIndustry,
    calculateEquivalences
  } = useAppStore();

  const [isReady, setIsReady] = useState(false);

  useState(() => {
    const salary = searchParams.get('salary');
    const currency = searchParams.get('currency');
    const country = searchParams.get('country');
    const region = searchParams.get('region');
    const industry = searchParams.get('industry');

    if (salary) setSalary(salary);
    if (currency) setCurrency(currency);
    if (country) setSelectedCountry(country);
    if (region) setSelectedRegion(region);
    if (industry) setIndustry(industry);

    if (salary && country && region) {
      setTimeout(() => {
        calculateEquivalences();
        setIsReady(true);
      }, 100);
    } else {
      setIsReady(true);
    }
  });

  return isReady;
};
