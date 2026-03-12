export interface Region {
  id: string;
  name: string;
  nameEs: string;
  costOfLivingIndex: number;
  rentIndex: number;
  purchasingPowerIndex: number;
  avgNetSalary?: number;
}

export interface QualityOfLife {
  healthcare: number;
  safety: number;
  education: number;
  climate: number;
  pollution: number;
}

export interface Country {
  id: string;
  name: string;
  nameEs: string;
  code: string;
  currency: string;
  currencySymbol: string;
  flag: string;
  lat: number;
  lng: number;
  gdpPppPerCapita: number;
  costOfLivingIndex: number;
  purchasingPowerIndex: number;
  rentIndex?: number;
  qualityOfLife: QualityOfLife;
  regions: Region[];
}

export interface Currency {
  code: string;
  name: string;
  nameEs: string;
  symbol: string;
  flag: string;
}

export interface ExchangeRates {
  [key: string]: number;
}

export interface CostItem {
  name: string;
  nameEs: string;
  avgPrice: number;
  unit: string;
}

export interface CostItems {
  [key: string]: CostItem;
}

export interface TaxRate {
  federal: number;
  state: number;
  social: number;
  total: number;
}

export interface TaxRates {
  [key: string]: TaxRate;
}

export interface Industry {
  id: string;
  name: string;
  nameEs: string;
  salaryMultiplier: number;
}

export interface CalculationResult {
  country: Country;
  region: Region;
  equivalentSalary: number;
  salaryInOriginCurrency: number;
  currency: string;
  currencySymbol: string;
  costOfLivingIndex: number;
  rentIndex: number;
  purchasingPowerIndex: number;
  ratio: number;
  status: 'better' | 'similar' | 'worse';
  gdpPpp: number;
}

export interface Filters {
  countries?: string[];
  status?: string[];
  minSalary?: number;
  maxSalary?: number;
}

export interface AppState {
  salary: string;
  currency: string;
  selectedCountry: string | null;
  selectedRegion: string | null;
  industry: string;
  calculatedResults: CalculationResult[];
  isCalculated: boolean;
  selectedDetailCountry: string | null;
  language: string;
  viewMode: string;
  showLifestyleCalculator: boolean;
  isLoading: boolean;
  originCountry: Country | null;
  originRegion: Region | null;
  salaryInUSD: number;
  filters: Filters;
  searchHistory: SearchHistoryItem[];
  darkMode: boolean;
  salaryType: 'gross' | 'net';
  savedScenarios: Scenario[];
  setSalary: (salary: string) => void;
  setCurrency: (currency: string) => void;
  setSelectedCountry: (country: string | null) => void;
  setSelectedRegion: (region: string | null) => void;
  setIndustry: (industry: string) => void;
  setLanguage: (language: string) => void;
  setViewMode: (viewMode: string) => void;
  setSelectedDetailCountry: (country: string | null) => void;
  setShowLifestyleCalculator: (show: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setLoading: (loading: boolean) => void;
  calculateEquivalences: () => void;
  reset: () => void;
  toggleLifestyleCalculator: () => void;
  setFilters: (filters: Filters) => void;
  updateFilter: (key: keyof Filters, value: unknown) => void;
  clearFilters: () => void;
  addToHistory: (item: Omit<SearchHistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  toggleDarkMode: () => void;
  setSalaryType: (type: 'gross' | 'net') => void;
  toggleSalaryType: () => void;
  saveScenario: (name: string, description?: string) => void;
  loadScenario: (id: string) => void;
  deleteScenario: (id: string) => void;
  toggleScenarioFavorite: (id: string) => void;
}

export interface SearchHistoryItem {
  id: string;
  salary: string;
  currency: string;
  country: string;
  region: string;
  industry: string;
  timestamp: number;
}

export interface TaxBreakdown {
  federal: number;
  state: number;
  social: number;
  total: number;
  netAnnual: number;
  netMonthly: number;
}

export interface SalaryTargetResult {
  minimum: number;
  recommended: number;
  optimal: number;
  currency: string;
  currencySymbol: string;
  reasoning: string;
}

export interface RelocationCostItem {
  category: string;
  categoryEs: string;
  cost: number;
}

export interface RelocationSummary {
  initialTotal: number;
  monthlyBuffer: number;
  breakdown: RelocationCostItem[];
  setupMonths: number;
}

export interface SavingsProjection {
  monthlySavings: number;
  annualSavings: number;
  yearsToFire: number;
  goalsTimeline: {
    goal: string;
    goalEs: string;
    monthsToReach: number;
    icon: string;
  }[];
}

export interface LifestyleTier {
  id: 'economy' | 'comfort' | 'premium';
  housing: { sqm: number; rooms: number; quality: string };
  transport: { type: string; quality: string };
  vacation: { frequency: string; type: string };
  dining: { type: string; frequency: string };
}

export interface CompensationBreakdown {
  base: number;
  bonus: number;
  equity: number;
  benefits: number;
  total: number;
}

export interface Scenario {
  id: string;
  name: string;
  description?: string;
  salary: number;
  currency: string;
  originCountry: string;
  originRegion: string;
  industry: string;
  salaryType: 'gross' | 'net';
  results: CalculationResult[];
  createdAt: number;
  updatedAt: number;
  isFavorite: boolean;
}
