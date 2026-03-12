export interface CareerGrowthData {
  countryId: string;
  industryId: string;
  entryLevelGrowth: number;
  midLevelGrowth: number;
  seniorLevelGrowth: number;
  executiveGrowth: number;
  promotionFrequency: number;
  avgYearsToPromotion: number;
}

export const careerGrowthData: CareerGrowthData[] = [
  { countryId: 'us', industryId: 'tech', entryLevelGrowth: 8, midLevelGrowth: 6, seniorLevelGrowth: 4, executiveGrowth: 3, promotionFrequency: 2.5, avgYearsToPromotion: 2 },
  { countryId: 'us', industryId: 'finance', entryLevelGrowth: 6, midLevelGrowth: 5, seniorLevelGrowth: 3, executiveGrowth: 2.5, promotionFrequency: 3, avgYearsToPromotion: 3 },
  { countryId: 'us', industryId: 'healthcare', entryLevelGrowth: 5, midLevelGrowth: 4, seniorLevelGrowth: 3, executiveGrowth: 2, promotionFrequency: 3.5, avgYearsToPromotion: 4 },
  { countryId: 'us', industryId: 'retail', entryLevelGrowth: 3, midLevelGrowth: 2.5, seniorLevelGrowth: 2, executiveGrowth: 1.5, promotionFrequency: 4, avgYearsToPromotion: 5 },
  { countryId: 'us', industryId: 'engineering', entryLevelGrowth: 7, midLevelGrowth: 5, seniorLevelGrowth: 4, executiveGrowth: 3, promotionFrequency: 2.5, avgYearsToPromotion: 2.5 },
  { countryId: 'es', industryId: 'tech', entryLevelGrowth: 6, midLevelGrowth: 5, seniorLevelGrowth: 3, executiveGrowth: 2.5, promotionFrequency: 3, avgYearsToPromotion: 3 },
  { countryId: 'es', industryId: 'finance', entryLevelGrowth: 5, midLevelGrowth: 4, seniorLevelGrowth: 3, executiveGrowth: 2, promotionFrequency: 3.5, avgYearsToPromotion: 3.5 },
  { countryId: 'es', industryId: 'healthcare', entryLevelGrowth: 4, midLevelGrowth: 3.5, seniorLevelGrowth: 3, executiveGrowth: 2, promotionFrequency: 4, avgYearsToPromotion: 4 },
  { countryId: 'es', industryId: 'retail', entryLevelGrowth: 3, midLevelGrowth: 2, seniorLevelGrowth: 1.5, executiveGrowth: 1, promotionFrequency: 5, avgYearsToPromotion: 5 },
  { countryId: 'es', industryId: 'engineering', entryLevelGrowth: 6, midLevelGrowth: 5, seniorLevelGrowth: 3.5, executiveGrowth: 2.5, promotionFrequency: 3, avgYearsToPromotion: 3 },
  { countryId: 'de', industryId: 'tech', entryLevelGrowth: 5, midLevelGrowth: 4, seniorLevelGrowth: 3, executiveGrowth: 2.5, promotionFrequency: 3.5, avgYearsToPromotion: 3 },
  { countryId: 'de', industryId: 'engineering', entryLevelGrowth: 5, midLevelGrowth: 4, seniorLevelGrowth: 3, executiveGrowth: 2.5, promotionFrequency: 3.5, avgYearsToPromotion: 3 },
  { countryId: 'de', industryId: 'finance', entryLevelGrowth: 4, midLevelGrowth: 3.5, seniorLevelGrowth: 2.5, executiveGrowth: 2, promotionFrequency: 4, avgYearsToPromotion: 4 },
  { countryId: 'gb', industryId: 'tech', entryLevelGrowth: 7, midLevelGrowth: 5, seniorLevelGrowth: 4, executiveGrowth: 3, promotionFrequency: 2.5, avgYearsToPromotion: 2.5 },
  { countryId: 'gb', industryId: 'finance', entryLevelGrowth: 6, midLevelGrowth: 4.5, seniorLevelGrowth: 3.5, executiveGrowth: 2.5, promotionFrequency: 3, avgYearsToPromotion: 3 },
  { countryId: 'gb', industryId: 'consulting', entryLevelGrowth: 8, midLevelGrowth: 6, seniorLevelGrowth: 4, executiveGrowth: 3, promotionFrequency: 2, avgYearsToPromotion: 2 },
  { countryId: 'mx', industryId: 'tech', entryLevelGrowth: 10, midLevelGrowth: 8, seniorLevelGrowth: 5, executiveGrowth: 3.5, promotionFrequency: 2, avgYearsToPromotion: 2 },
  { countryId: 'mx', industryId: 'finance', entryLevelGrowth: 8, midLevelGrowth: 6, seniorLevelGrowth: 4, executiveGrowth: 3, promotionFrequency: 2.5, avgYearsToPromotion: 2.5 },
  { countryId: 'mx', industryId: 'manufacturing', entryLevelGrowth: 6, midLevelGrowth: 5, seniorLevelGrowth: 3.5, executiveGrowth: 2.5, promotionFrequency: 3, avgYearsToPromotion: 3 },
  { countryId: 'pt', industryId: 'tech', entryLevelGrowth: 7, midLevelGrowth: 5.5, seniorLevelGrowth: 4, executiveGrowth: 3, promotionFrequency: 2.5, avgYearsToPromotion: 2.5 },
  { countryId: 'pt', industryId: 'tourism', entryLevelGrowth: 4, midLevelGrowth: 3, seniorLevelGrowth: 2.5, executiveGrowth: 2, promotionFrequency: 4, avgYearsToPromotion: 4 },
];

export const industries = [
  { id: 'tech', name: 'Technology', nameEs: 'Tecnología' },
  { id: 'finance', name: 'Finance', nameEs: 'Finanzas' },
  { id: 'healthcare', name: 'Healthcare', nameEs: 'Salud' },
  { id: 'retail', name: 'Retail', nameEs: 'Comercio' },
  { id: 'engineering', name: 'Engineering', nameEs: 'Ingeniería' },
  { id: 'consulting', name: 'Consulting', nameEs: 'Consultoría' },
  { id: 'manufacturing', name: 'Manufacturing', nameEs: 'Manufactura' },
  { id: 'tourism', name: 'Tourism', nameEs: 'Turismo' },
];

export const careerLevels = [
  { id: 'entry', name: 'Entry Level', nameEs: 'Junior', yearsExp: '0-2' },
  { id: 'mid', name: 'Mid Level', nameEs: 'Semi-Senior', yearsExp: '3-5' },
  { id: 'senior', name: 'Senior', nameEs: 'Senior', yearsExp: '6-10' },
  { id: 'executive', name: 'Executive', nameEs: 'Ejecutivo', yearsExp: '10+' },
];

export const getCareerGrowth = (countryId: string, industryId: string): CareerGrowthData | undefined => {
  return careerGrowthData.find(d => d.countryId === countryId && d.industryId === industryId);
};

export const projectSalary = (
  currentSalary: number,
  growthRate: number,
  years: number
): { year: number; salary: number; totalGrowth: number }[] => {
  const projections = [];
  let salary = currentSalary;
  
  for (let i = 1; i <= years; i++) {
    salary = salary * (1 + growthRate / 100);
    projections.push({
      year: new Date().getFullYear() + i,
      salary: Math.round(salary),
      totalGrowth: Math.round(salary - currentSalary)
    });
  }
  
  return projections;
};

export const calculatePromotionTimeline = (
  currentLevel: string,
  targetLevel: string,
  growthData: CareerGrowthData
): { promotions: number; years: number; finalSalary: number } => {
  const levelOrder = ['entry', 'mid', 'senior', 'executive'];
  const currentIdx = levelOrder.indexOf(currentLevel);
  const targetIdx = levelOrder.indexOf(targetLevel);
  
  if (currentIdx >= targetIdx) {
    return { promotions: 0, years: 0, finalSalary: 0 };
  }
  
  const promotions = targetIdx - currentIdx;
  const years = promotions * growthData.avgYearsToPromotion;
  
  const growthRates = [
    growthData.entryLevelGrowth,
    growthData.midLevelGrowth,
    growthData.seniorLevelGrowth,
    growthData.executiveGrowth
  ];
  
  return { promotions, years, finalSalary: growthRates[targetIdx] };
};
