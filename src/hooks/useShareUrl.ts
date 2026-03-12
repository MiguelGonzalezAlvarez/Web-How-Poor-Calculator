import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

type SocialPlatform = 'twitter' | 'linkedin' | 'facebook' | 'whatsapp';

export const useUrlParams = (): { isLoading: boolean } => {
  const [searchParams] = useSearchParams();
  const { 
    setSalary, 
    setCurrency, 
    setSelectedCountry, 
    setSelectedRegion, 
    setIndustry,
    calculateEquivalences
  } = useAppStore();
  
  const [isLoading, setIsLoading] = useState(true);

  const salary = searchParams.get('salary');
  const currency = searchParams.get('currency');
  const country = searchParams.get('country');
  const region = searchParams.get('region');
  const industry = searchParams.get('industry');

  if (salary || country) {
    if (salary) setSalary(salary);
    if (currency) setCurrency(currency);
    if (country) setSelectedCountry(country);
    if (region) setSelectedRegion(region);
    if (industry) setIndustry(industry);

    if (salary && country && region) {
      setTimeout(() => {
        calculateEquivalences();
        setIsLoading(false);
      }, 100);
    } else {
      setIsLoading(false);
    }
  } else {
    setIsLoading(false);
  }

  return { isLoading };
};

export const useShareUrl = () => {
  const { salary, currency, selectedCountry, selectedRegion, industry, isCalculated } = useAppStore();
  const [copied, setCopied] = useState(false);

  const generateShareUrl = useCallback((): string | null => {
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

  const copyToClipboard = useCallback(async (): Promise<boolean> => {
    const url = generateShareUrl();
    if (!url) return false;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      return false;
    }
  }, [generateShareUrl]);

  const shareToSocial = useCallback((platform: SocialPlatform) => {
    const url = generateShareUrl();
    if (!url) return;

    const text = 'Check your purchasing power around the world!';

    const shareUrls: Record<SocialPlatform, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  }, [generateShareUrl]);

  return {
    generateShareUrl,
    copyToClipboard,
    shareToSocial,
    copied,
    isCalculated
  };
};
