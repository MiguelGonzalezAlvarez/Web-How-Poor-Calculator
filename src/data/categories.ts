export interface CategoryWeight {
  category: string;
  categoryEs: string;
  icon: string;
  weight: number;
  items: string[];
}

export interface CountryCategoryAdjustment {
  countryId: string;
  categoryAdjustments: Record<string, number>;
}

export const categoryWeights: CategoryWeight[] = [
  {
    category: 'housing',
    categoryEs: 'Vivienda',
    icon: '🏠',
    weight: 0.35,
    items: ['rent', 'utilities', 'internet', 'maintenance']
  },
  {
    category: 'food',
    categoryEs: 'Comida',
    icon: '🍔',
    weight: 0.20,
    items: ['groceries', 'restaurants', 'takeout', 'alcohol']
  },
  {
    category: 'transport',
    categoryEs: 'Transporte',
    icon: '🚗',
    weight: 0.15,
    items: ['car', 'fuel', 'public', 'insurance', 'maintenance']
  },
  {
    category: 'entertainment',
    categoryEs: 'Ocio',
    icon: '🎬',
    weight: 0.12,
    items: ['streaming', 'cinema', 'gym', 'hobbies', 'travel']
  },
  {
    category: 'fashion',
    categoryEs: 'Moda',
    icon: '👕',
    weight: 0.08,
    items: ['clothing', 'shoes', 'accessories']
  },
  {
    category: 'services',
    categoryEs: 'Servicios',
    icon: '💼',
    weight: 0.10,
    items: ['health', 'dental', 'haircut', 'insurance', 'education']
  }
];

export const countryCategoryAdjustments: CountryCategoryAdjustment[] = [
  {
    countryId: 'us',
    categoryAdjustments: {
      housing: 1.3,
      food: 1.2,
      transport: 1.1,
      entertainment: 1.1,
      fashion: 1.0,
      services: 1.3
    }
  },
  {
    countryId: 'es',
    categoryAdjustments: {
      housing: 1.0,
      food: 0.85,
      transport: 0.9,
      entertainment: 0.8,
      fashion: 0.8,
      services: 0.9
    }
  },
  {
    countryId: 'de',
    categoryAdjustments: {
      housing: 1.1,
      food: 0.95,
      transport: 1.0,
      entertainment: 0.9,
      fashion: 0.9,
      services: 1.0
    }
  },
  {
    countryId: 'gb',
    categoryAdjustments: {
      housing: 1.2,
      food: 0.95,
      transport: 1.15,
      entertainment: 0.95,
      fashion: 0.95,
      services: 1.05
    }
  },
  {
    countryId: 'fr',
    categoryAdjustments: {
      housing: 1.0,
      food: 0.9,
      transport: 0.95,
      entertainment: 0.85,
      fashion: 0.85,
      services: 0.95
    }
  },
  {
    countryId: 'it',
    categoryAdjustments: {
      housing: 0.95,
      food: 0.85,
      transport: 0.9,
      entertainment: 0.8,
      fashion: 0.8,
      services: 0.9
    }
  },
  {
    countryId: 'pt',
    categoryAdjustments: {
      housing: 0.8,
      food: 0.75,
      transport: 0.8,
      entertainment: 0.7,
      fashion: 0.7,
      services: 0.8
    }
  },
  {
    countryId: 'nl',
    categoryAdjustments: {
      housing: 1.2,
      food: 1.0,
      transport: 1.1,
      entertainment: 0.95,
      fashion: 0.95,
      services: 1.1
    }
  },
  {
    countryId: 'ch',
    categoryAdjustments: {
      housing: 1.5,
      food: 1.2,
      transport: 1.1,
      entertainment: 1.1,
      fashion: 1.1,
      services: 1.2
    }
  },
  {
    countryId: 'jp',
    categoryAdjustments: {
      housing: 1.0,
      food: 1.1,
      transport: 1.0,
      entertainment: 0.9,
      fashion: 0.85,
      services: 1.0
    }
  },
  {
    countryId: 'br',
    categoryAdjustments: {
      housing: 0.7,
      food: 0.6,
      transport: 0.65,
      entertainment: 0.55,
      fashion: 0.55,
      services: 0.7
    }
  },
  {
    countryId: 'mx',
    categoryAdjustments: {
      housing: 0.55,
      food: 0.5,
      transport: 0.5,
      entertainment: 0.45,
      fashion: 0.45,
      services: 0.55
    }
  }
];

export const getCategoryAdjustment = (
  countryId: string,
  category: string
): number => {
  const adjustment = countryCategoryAdjustments.find(c => c.countryId === countryId);
  return adjustment?.categoryAdjustments[category] || 1.0;
};

export const calculateCostOfLiving = (
  baseMonthlyBudgetUSD: number,
  countryId: string
): Record<string, number> => {
  const costs: Record<string, number> = {};
  
  categoryWeights.forEach(cat => {
    const adjustment = getCategoryAdjustment(countryId, cat.category);
    costs[cat.category] = baseMonthlyBudgetUSD * cat.weight * adjustment;
  });
  
  return costs;
};

export const getMonthlyCostByCountry = (
  baseBudgetUSD: number,
  countryId: string
): number => {
  const costs = calculateCostOfLiving(baseBudgetUSD, countryId);
  return Object.values(costs).reduce((sum, val) => sum + val, 0);
};
