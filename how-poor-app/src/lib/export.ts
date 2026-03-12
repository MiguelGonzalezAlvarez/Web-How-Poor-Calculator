import html2canvas from 'html2canvas';
import { CalculationResult } from '../types';
import { formatCurrency } from '../services/utils/formatters';

export const exportToCSV = (
  results: CalculationResult[],
  originCountry: string,
  _originSalary: string,
  language: string = 'es'
): void => {
  const headers = language === 'es'
    ? ['País', 'Región', 'Salario Equivalente', 'Coste de Vida', 'Poder Adquisitivo', 'Situación']
    : ['Country', 'Region', 'Equivalent Salary', 'Cost of Living', 'Purchasing Power', 'Status'];

  const rows = results.map(result => [
    language === 'es' ? result.country.nameEs : result.country.name,
    language === 'es' ? result.region.nameEs : result.region.name,
    result.equivalentSalary,
    result.costOfLivingIndex,
    result.purchasingPowerIndex,
    result.status
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `how-poor-${originCountry}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPNG = async (
  elementId: string,
  filename: string = 'results'
): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting to PNG:', error);
  }
};

export const generateShareableText = (
  originCountry: string,
  salary: string,
  currency: string,
  betterCountries: string[],
  language: string = 'es'
): string => {
  const formattedSalary = formatCurrency(parseFloat(salary), currency);
  
  if (language === 'es') {
    return `Mi salario de ${formattedSalary} en ${originCountry} tiene más valor en: ${betterCountries.join(', ')}. Descubre el tuyo en How Poor I am!`;
  } else {
    return `My salary of ${formattedSalary} in ${originCountry} goes further in: ${betterCountries.join(', ')}. Discover yours at How Poor I am!`;
  }
};
