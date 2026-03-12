import { Country, Region, CalculationResult } from './index';

export interface CalculationParams {
  salary: number;
  currency: string;
  selectedCountry: string;
  selectedRegion: string;
  industry: string;
}

export interface CalculationOutput {
  results: CalculationResult[];
  originCountry: Country;
  originRegion: Region;
  salaryInUSD: number;
}
