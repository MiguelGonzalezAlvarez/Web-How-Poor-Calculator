import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { countries, exchangeRates } from '../data/countries';
import { AppState, CalculationResult, Country, Region, Filters, SearchHistoryItem, Scenario } from '../types';
import { calculateEquivalences as calculateEquivalencesService, parseSalary, fetchLiveRates } from '../services/CalculationService';

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
  quickMode: false,
  liveDataMode: false,

  setQuickMode: (mode: boolean) => set({ quickMode: mode }),
  toggleQuickMode: () => set((state) => ({ quickMode: !state.quickMode })),
  setLiveDataMode: (mode: boolean) => set({ liveDataMode: mode }),
  toggleLiveDataMode: () => set((state) => ({ liveDataMode: !state.liveDataMode })),

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

      calculateEquivalences: async () => {
        const { salary, currency, selectedCountry, selectedRegion, industry, liveDataMode } = get();
        
        if (!salary || !selectedCountry || !selectedRegion) {
          return;
        }

        const salaryNum = parseSalary(salary);
        if (salaryNum === 0) return;

        set({ isLoading: true });

        let rates = exchangeRates;
        
        if (liveDataMode) {
          try {
            rates = await fetchLiveRates(currency);
          } catch (e) {
            console.warn('Failed to fetch live rates, using static data');
          }
        }

        const result = calculateEquivalences(
          {
            salary: salaryNum,
            currency,
            selectedCountry,
            selectedRegion,
            industry
          },
          countries,
          rates
        );

        if (!result) {
          set({ isLoading: false });
          return;
        }

        set({ 
          calculatedResults: result.results, 
          isCalculated: true,
          originCountry: result.originCountry,
          originRegion: result.originRegion,
          salaryInUSD: result.salaryInUSD,
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
