import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  salary?: string;
  currency?: string;
  country?: string;
  countryName?: string;
  image?: string;
}

export const useSEO = ({
  title,
  description,
  salary,
  currency,
  country,
  countryName,
  image
}: SEOProps = {}) => {
  const { i18n } = useTranslation();

  const defaultTitle = i18n.language === 'es' 
    ? 'How Poor I am - Calculadora de Poder Adquisitivo Internacional'
    : 'How Poor I am - International Purchasing Power Calculator';

  const defaultDescription = i18n.language === 'es'
    ? 'Descubre tu verdadero poder adquisitivo en cualquier parte del mundo. Compara tu salario con el coste de vida en diferentes países y regiones.'
    : 'Discover your true purchasing power anywhere in the world. Compare your salary with the cost of living in different countries and regions.';

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    const salaryParam = salary || params.get('salary') || '';
    const currencyParam = currency || params.get('currency') || 'USD';
    const countryParam = country || params.get('country') || '';
    
    let dynamicTitle = title || defaultTitle;
    let dynamicDescription = description || defaultDescription;

    if (salaryParam && countryParam) {
      const formattedSalary = new Intl.NumberFormat(i18n.language, {
        style: 'currency',
        currency: currencyParam,
        maximumFractionDigits: 0
      }).format(parseFloat(salaryParam));

      if (i18n.language === 'es') {
        dynamicTitle = `${formattedSalary} en ${countryName || countryParam} - How Poor I am`;
        dynamicDescription = `Descubre cómo se compara tu salario de ${formattedSalary} con el coste de vida en otros países. Calcula tu poder adquisitivo internacional.`;
      } else {
        dynamicTitle = `${formattedSalary} in ${countryName || countryParam} - How Poor I am`;
        dynamicDescription = `Discover how your salary of ${formattedSalary} compares to the cost of living in other countries. Calculate your international purchasing power.`;
      }
    }

    document.title = dynamicTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', dynamicDescription);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', dynamicTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', dynamicDescription);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.href);
    }

    if (image) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', image);
      }
    }

  }, [title, description, salary, currency, country, countryName, image, i18n.language, defaultTitle, defaultDescription]);
};

export default useSEO;
