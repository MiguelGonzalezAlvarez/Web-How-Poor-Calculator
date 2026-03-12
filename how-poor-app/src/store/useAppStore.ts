import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { countries, exchangeRates } from '../data/countries';
import { AppState, CalculationResult, Country, Region, Filters, SearchHistoryItem, Scenario } from '../types';

const initialFilters: Filters = {
  countries: [],
  status: [],
  minSalary: undefined,
  maxSalary: undefined,
};

const initialSearchHistory: SearchHistoryItem[] = [];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      salary: '',
      currency: 'USD',
      selectedCountry: null,
      selectedRegion: null,
      industry: 'general',
      calculatedResults: [],
      isCalculated: false,
      selectedDetailCountry: null,
      language: 'es',
      viewMode: 'table',
      showLifestyleCalculator: false,
      isLoading: false,
      originCountry: null,
      originRegion: null,
      salaryInUSD: 0,
      filters: initialFilters,
  searchHistory: initialSearchHistory,
  darkMode: false,
  salaryType: 'gross',
  savedScenarios: [],

      setSalary: (salary: string) => set({ salary }),
      
      setCurrency: (currency: string) => set({ currency }),
      
      setSelectedCountry: (country: string | null) => set({ 
        selectedCountry: country, 
        selectedRegion: null 
      }),
      
      setSelectedRegion: (region: string | null) => set({ selectedRegion: region }),
      
      setIndustry: (industry: string) => set({ industry }),
      
      setSelectedDetailCountry: (country: string | null) => set({ selectedDetailCountry: country }),
      
      setLanguage: (language: string) => set({ language }),
      
      setViewMode: (mode: string) => set({ viewMode: mode }),
      
      toggleLifestyleCalculator: () => set((state) => ({ 
        showLifestyleCalculator: !state.showLifestyleCalculator 
      })),

      toggleDarkMode: () => set((state) => ({ 
        darkMode: !state.darkMode 
      })),

      setSalaryType: (type: 'gross' | 'net') => set({ salaryType: type }),
      
      toggleSalaryType: () => set((state) => ({ 
        salaryType: state.salaryType === 'gross' ? 'net' : 'gross'
      })),
      
      setShowLifestyleCalculator: (show: boolean) => set({ 
        showLifestyleCalculator: show 
      }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),

      setFilters: (filters: Filters) => set({ filters }),

      updateFilter: (key: keyof Filters, value: unknown) => 
        set((state) => ({
          filters: { ...state.filters, [key]: value }
        })),

      clearFilters: () => set({ filters: initialFilters }),

      addToHistory: (item: Omit<SearchHistoryItem, 'id' | 'timestamp'>) => {
        const newItem: SearchHistoryItem = {
          ...item,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        };
        set((state) => ({
          searchHistory: [newItem, ...state.searchHistory].slice(0, 10)
        }));
      },

      clearHistory: () => set({ searchHistory: [] }),

      saveScenario: (name: string, description?: string) => {
        const state = get();
        const newScenario: Scenario = {
          id: crypto.randomUUID(),
          name,
          description,
          salary: parseFloat(state.salary) || 0,
          currency: state.currency,
          originCountry: state.selectedCountry || '',
          originRegion: state.selectedRegion || '',
          industry: state.industry,
          salaryType: state.salaryType,
          results: state.calculatedResults,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          isFavorite: false
        };
        set((state) => ({
          savedScenarios: [...state.savedScenarios, newScenario]
        }));
      },

      loadScenario: (id: string) => {
        const scenario = get().savedScenarios.find(s => s.id === id);
        if (scenario) {
          set({
            salary: scenario.salary.toString(),
            currency: scenario.currency,
            selectedCountry: scenario.originCountry,
            selectedRegion: scenario.originRegion,
            industry: scenario.industry,
            salaryType: scenario.salaryType,
            calculatedResults: scenario.results,
            isCalculated: true
          });
        }
      },

      deleteScenario: (id: string) => {
        set((state) => ({
          savedScenarios: state.savedScenarios.filter(s => s.id !== id)
        }));
      },

      toggleScenarioFavorite: (id: string) => {
        set((state) => ({
          savedScenarios: state.savedScenarios.map(s => 
            s.id === id ? { ...s, isFavorite: !s.isFavorite, updatedAt: Date.now() } : s
          )
        }));
      },

      calculateEquivalences: () => {
        const { salary, currency, selectedCountry, selectedRegion, industry } = get();
        
        if (!salary || !selectedCountry || !selectedRegion) {
          return;
        }

        const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, ''));
        if (isNaN(salaryNum)) return;

        set({ isLoading: true });

        const originCountry = countries.find(c => c.id === selectedCountry);
        const originRegion = originCountry?.regions.find(r => r.id === selectedRegion);
        
        if (!originRegion) {
          set({ isLoading: false });
          return;
        }

        const originCurrency = currency;
        const originRate = exchangeRates[originCurrency] || 1;
        const salaryInUSD = salaryNum / originRate;

        const originPPIndex = originRegion.purchasingPowerIndex || originCountry!.purchasingPowerIndex;
        const originCOLIndex = originRegion.costOfLivingIndex || originCountry!.costOfLivingIndex;

        const results: CalculationResult[] = countries
          .filter(c => c.id !== selectedCountry)
          .map(country => {
            return country.regions.slice(0, 3).map(region => {
              const destPPIndex = region.purchasingPowerIndex || country.purchasingPowerIndex;
              const destCOLIndex = region.costOfLivingIndex || country.costOfLivingIndex;
              
              let equivalentSalary: number;
              if (destPPIndex && originPPIndex) {
                equivalentSalary = salaryNum * (destPPIndex / originPPIndex);
              } else if (destCOLIndex && originCOLIndex) {
                equivalentSalary = salaryNum * (originCOLIndex / destCOLIndex);
              } else {
                equivalentSalary = salaryNum * (country.gdpPppPerCapita / originCountry!.gdpPppPerCapita);
              }

              const industryMultiplier = industry === 'general' ? 1 : 
                (country as any).industries?.find((i: any) => i.id === industry)?.salaryMultiplier || 1;
              
              const adjustedSalary = equivalentSalary * industryMultiplier;
              const destRate = exchangeRates[country.currency] || 1;
              const salaryInOriginCurrency = adjustedSalary * destRate;

              const ratio = adjustedSalary / salaryNum;
              let status: 'better' | 'similar' | 'worse' = 'similar';
              if (ratio > 1.2) status = 'better';
              else if (ratio < 0.8) status = 'worse';

              return {
                country: country,
                region: region,
                equivalentSalary: Math.round(adjustedSalary),
                salaryInOriginCurrency: Math.round(salaryInOriginCurrency),
                currency: country.currency,
                currencySymbol: country.currencySymbol,
                costOfLivingIndex: destCOLIndex,
                rentIndex: region.rentIndex || destCOLIndex * 0.8,
                purchasingPowerIndex: destPPIndex,
                ratio: ratio,
                status: status,
                gdpPpp: country.gdpPppPerCapita
              };
            });
          })
          .flat()
          .sort((a, b) => b.ratio - a.ratio);

        set({ 
          calculatedResults: results, 
          isCalculated: true,
          originCountry: originCountry as Country,
          originRegion: originRegion as Region,
          salaryInUSD,
          isLoading: false
        });

        get().addToHistory({
          salary,
          currency,
          country: selectedCountry,
          region: selectedRegion,
          industry
        });
      },

      reset: () => set({
        salary: '',
        currency: 'USD',
        selectedCountry: null,
        selectedRegion: null,
        industry: 'general',
        calculatedResults: [],
        isCalculated: false,
        selectedDetailCountry: null,
        originCountry: null,
        originRegion: null,
        salaryInUSD: 0,
        filters: initialFilters
      }),

      getCountryById: (id: string): Country | undefined => 
        countries.find(c => c.id === id),
      
      getRegionById: (countryId: string, regionId: string): Region | undefined => {
        const country = countries.find(c => c.id === countryId);
        return country?.regions.find(r => r.id === regionId);
      }
    }),
    {
      name: 'how-poor-app-storage',
      partialize: (state) => ({
        searchHistory: state.searchHistory,
        language: state.language,
        savedScenarios: state.savedScenarios,
        darkMode: state.darkMode
      }),
    }
  )
);

export default useAppStore;
