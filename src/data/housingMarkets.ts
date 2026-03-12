export interface HousingMarketData {
  countryId: string;
  cityId: string;
  cityName: string;
  averageRent1BR: number;
  averageRent2BR: number;
  averageRent3BR: number;
  averageBuyPricePerSqm: number;
  avgBuyPrice1BR: number;
  avgBuyPrice2BR: number;
  avgBuyPrice3BR: number;
  priceToRentRatio: number;
  mortgageRate5yr: number;
  rentalYield: number;
  priceGrowth1yr: number;
  priceGrowth5yr: number;
  inventoryMonths: number;
}

export const housingMarketData: HousingMarketData[] = [
  {
    countryId: 'us', cityId: 'nyc', cityName: 'New York',
    averageRent1BR: 3200, averageRent2BR: 4500, averageRent3BR: 6000,
    averageBuyPricePerSqm: 11000, avgBuyPrice1BR: 650000, avgBuyPrice2BR: 950000, avgBuyPrice3BR: 1400000,
    priceToRentRatio: 18, mortgageRate5yr: 6.5, rentalYield: 4.2, priceGrowth1yr: 3.5, priceGrowth5yr: 25, inventoryMonths: 4
  },
  {
    countryId: 'us', cityId: 'sf', cityName: 'San Francisco',
    averageRent1BR: 2800, averageRent2BR: 4000, averageRent3BR: 5500,
    averageBuyPricePerSqm: 10500, avgBuyPrice1BR: 800000, avgBuyPrice2BR: 1100000, avgBuyPrice3BR: 1500000,
    priceToRentRatio: 22, mortgageRate5yr: 6.5, rentalYield: 3.5, priceGrowth1yr: 2.0, priceGrowth5yr: 15, inventoryMonths: 3
  },
  {
    countryId: 'us', cityId: 'austin', cityName: 'Austin',
    averageRent1BR: 1800, averageRent2BR: 2400, averageRent3BR: 3200,
    averageBuyPricePerSqm: 4500, avgBuyPrice1BR: 420000, avgBuyPrice2BR: 580000, avgBuyPrice3BR: 750000,
    priceToRentRatio: 16, mortgageRate5yr: 6.5, rentalYield: 5.5, priceGrowth1yr: -2.0, priceGrowth5yr: 45, inventoryMonths: 6
  },
  {
    countryId: 'us', cityId: 'miami', cityName: 'Miami',
    averageRent1BR: 2400, averageRent2BR: 3400, averageRent3BR: 4600,
    averageBuyPricePerSqm: 6500, avgBuyPrice1BR: 520000, avgBuyPrice2BR: 750000, avgBuyPrice3BR: 980000,
    priceToRentRatio: 18, mortgageRate5yr: 6.5, rentalYield: 4.0, priceGrowth1yr: 4.0, priceGrowth5yr: 55, inventoryMonths: 5
  },
  {
    countryId: 'es', cityId: 'madrid', cityName: 'Madrid',
    averageRent1BR: 1200, averageRent2BR: 1600, averageRent3BR: 2100,
    averageBuyPricePerSqm: 3800, avgBuyPrice1BR: 320000, avgBuyPrice2BR: 450000, avgBuyPrice3BR: 580000,
    priceToRentRatio: 20, mortgageRate5yr: 3.8, rentalYield: 4.5, priceGrowth1yr: 3.0, priceGrowth5yr: 15, inventoryMonths: 5
  },
  {
    countryId: 'es', cityId: 'barcelona', cityName: 'Barcelona',
    averageRent1BR: 1400, averageRent2BR: 1900, averageRent3BR: 2500,
    averageBuyPricePerSqm: 4500, avgBuyPrice1BR: 380000, avgBuyPrice2BR: 520000, avgBuyPrice3BR: 680000,
    priceToRentRatio: 22, mortgageRate5yr: 3.8, rentalYield: 4.0, priceGrowth1yr: 2.5, priceGrowth5yr: 18, inventoryMonths: 4
  },
  {
    countryId: 'es', cityId: 'valencia', cityName: 'Valencia',
    averageRent1BR: 900, averageRent2BR: 1200, averageRent3BR: 1600,
    averageBuyPricePerSqm: 2500, avgBuyPrice1BR: 220000, avgBuyPrice2BR: 310000, avgBuyPrice3BR: 400000,
    priceToRentRatio: 18, mortgageRate5yr: 3.8, rentalYield: 5.2, priceGrowth1yr: 4.0, priceGrowth5yr: 25, inventoryMonths: 3
  },
  {
    countryId: 'de', cityId: 'berlin', cityName: 'Berlin',
    averageRent1BR: 1100, averageRent2BR: 1500, averageRent3BR: 2000,
    averageBuyPricePerSqm: 5500, avgBuyPrice1BR: 420000, avgBuyPrice2BR: 600000, avgBuyPrice3BR: 850000,
    priceToRentRatio: 28, mortgageRate5yr: 3.5, rentalYield: 3.0, priceGrowth1yr: 2.0, priceGrowth5yr: 35, inventoryMonths: 3
  },
  {
    countryId: 'de', cityId: 'munich', cityName: 'Munich',
    averageRent1BR: 1500, averageRent2BR: 2100, averageRent3BR: 2800,
    averageBuyPricePerSqm: 8000, avgBuyPrice1BR: 680000, avgBuyPrice2BR: 950000, avgBuyPrice3BR: 1300000,
    priceToRentRatio: 32, mortgageRate5yr: 3.5, rentalYield: 2.5, priceGrowth1yr: 1.5, priceGrowth5yr: 30, inventoryMonths: 2
  },
  {
    countryId: 'gb', cityId: 'london', cityName: 'London',
    averageRent1BR: 2000, averageRent2BR: 2800, averageRent3BR: 3800,
    averageBuyPricePerSqm: 8500, avgBuyPrice1BR: 550000, avgBuyPrice2BR: 780000, avgBuyPrice3BR: 1100000,
    priceToRentRatio: 20, mortgageRate5yr: 5.2, rentalYield: 3.8, priceGrowth1yr: 1.0, priceGrowth5yr: 12, inventoryMonths: 4
  },
  {
    countryId: 'gb', cityId: 'manchester', cityName: 'Manchester',
    averageRent1BR: 1100, averageRent2BR: 1500, averageRent3BR: 1900,
    averageBuyPricePerSqm: 3200, avgBuyPrice1BR: 250000, avgBuyPrice2BR: 350000, avgBuyPrice3BR: 450000,
    priceToRentRatio: 16, mortgageRate5yr: 5.2, rentalYield: 5.0, priceGrowth1yr: 3.5, priceGrowth5yr: 28, inventoryMonths: 3
  },
  {
    countryId: 'pt', cityId: 'lisbon', cityName: 'Lisbon',
    averageRent1BR: 1400, averageRent2BR: 1900, averageRent3BR: 2500,
    averageBuyPricePerSqm: 5200, avgBuyPrice1BR: 450000, avgBuyPrice2BR: 620000, avgBuyPrice3BR: 820000,
    priceToRentRatio: 24, mortgageRate5yr: 4.0, rentalYield: 3.5, priceGrowth1yr: 5.0, priceGrowth5yr: 60, inventoryMonths: 2
  },
  {
    countryId: 'pt', cityId: 'porto', cityName: 'Porto',
    averageRent1BR: 950, averageRent2BR: 1300, averageRent3BR: 1700,
    averageBuyPricePerSqm: 3200, avgBuyPrice1BR: 280000, avgBuyPrice2BR: 390000, avgBuyPrice3BR: 500000,
    priceToRentRatio: 20, mortgageRate5yr: 4.0, rentalYield: 4.2, priceGrowth1yr: 6.0, priceGrowth5yr: 55, inventoryMonths: 2
  },
  {
    countryId: 'fr', cityId: 'paris', cityName: 'Paris',
    averageRent1BR: 1500, averageRent2BR: 2100, averageRent3BR: 2800,
    averageBuyPricePerSqm: 9500, avgBuyPrice1BR: 680000, avgBuyPrice2BR: 950000, avgBuyPrice3BR: 1300000,
    priceToRentRatio: 32, mortgageRate5yr: 3.8, rentalYield: 2.8, priceGrowth1yr: 2.0, priceGrowth5yr: 20, inventoryMonths: 3
  },
  {
    countryId: 'nl', cityId: 'amsterdam', cityName: 'Amsterdam',
    averageRent1BR: 1800, averageRent2BR: 2400, averageRent3BR: 3200,
    averageBuyPricePerSqm: 6500, avgBuyPrice1BR: 520000, avgBuyPrice2BR: 720000, avgBuyPrice3BR: 950000,
    priceToRentRatio: 24, mortgageRate5yr: 4.0, rentalYield: 3.8, priceGrowth1yr: 3.0, priceGrowth5yr: 35, inventoryMonths: 2
  },
  {
    countryId: 'ca', cityId: 'toronto', cityName: 'Toronto',
    averageRent1BR: 2200, averageRent2BR: 3000, averageRent3BR: 4000,
    averageBuyPricePerSqm: 9500, avgBuyPrice1BR: 720000, avgBuyPrice2BR: 980000, avgBuyPrice3BR: 1250000,
    priceToRentRatio: 22, mortgageRate5yr: 5.2, rentalYield: 3.5, priceGrowth1yr: -1.0, priceGrowth5yr: 30, inventoryMonths: 4
  },
  {
    countryId: 'ca', cityId: 'vancouver', cityName: 'Vancouver',
    averageRent1BR: 2400, averageRent2BR: 3300, averageRent3BR: 4400,
    averageBuyPricePerSqm: 10500, avgBuyPrice1BR: 850000, avgBuyPrice2BR: 1150000, avgBuyPrice3BR: 1500000,
    priceToRentRatio: 25, mortgageRate5yr: 5.2, rentalYield: 3.2, priceGrowth1yr: -2.0, priceGrowth5yr: 25, inventoryMonths: 5
  },
  {
    countryId: 'au', cityId: 'sydney', cityName: 'Sydney',
    averageRent1BR: 2800, averageRent2BR: 3800, averageRent3BR: 5000,
    averageBuyPricePerSqm: 10000, avgBuyPrice1BR: 900000, avgBuyPrice2BR: 1250000, avgBuyPrice3BR: 1650000,
    priceToRentRatio: 25, mortgageRate5yr: 6.2, rentalYield: 3.5, priceGrowth1yr: 2.0, priceGrowth5yr: 28, inventoryMonths: 3
  },
  {
    countryId: 'au', cityId: 'melbourne', cityName: 'Melbourne',
    averageRent1BR: 2200, averageRent2BR: 3000, averageRent3BR: 4000,
    averageBuyPricePerSqm: 6500, avgBuyPrice1BR: 620000, avgBuyPrice2BR: 850000, avgBuyPrice3BR: 1100000,
    priceToRentRatio: 20, mortgageRate5yr: 6.2, rentalYield: 4.2, priceGrowth1yr: 1.5, priceGrowth5yr: 22, inventoryMonths: 4
  },
  {
    countryId: 'mx', cityId: 'mexico-city', cityName: 'Mexico City',
    averageRent1BR: 700, averageRent2BR: 1100, averageRent3BR: 1600,
    averageBuyPricePerSqm: 3200, avgBuyPrice1BR: 350000, avgBuyPrice2BR: 520000, avgBuyPrice3BR: 720000,
    priceToRentRatio: 30, mortgageRate5yr: 9.5, rentalYield: 4.8, priceGrowth1yr: 4.5, priceGrowth5yr: 35, inventoryMonths: 3
  },
  {
    countryId: 'mx', cityId: 'guadalajara', cityName: 'Guadalajara',
    averageRent1BR: 550, averageRent2BR: 850, averageRent3BR: 1200,
    averageBuyPricePerSqm: 2200, avgBuyPrice1BR: 280000, avgBuyPrice2BR: 400000, avgBuyPrice3BR: 550000,
    priceToRentRatio: 26, mortgageRate5yr: 9.5, rentalYield: 5.2, priceGrowth1yr: 5.0, priceGrowth5yr: 40, inventoryMonths: 2
  },
];

export const getHousingByCountry = (countryId: string): HousingMarketData[] => {
  return housingMarketData.filter(h => h.countryId === countryId);
};

export const getHousingByCity = (cityId: string): HousingMarketData | undefined => {
  return housingMarketData.find(h => h.cityId === cityId);
};

export const getAllHousingMarkets = (): HousingMarketData[] => {
  return housingMarketData;
};

export const calculateRentVsBuy = (
  rent1BR: number,
  buyPrice: number,
  mortgageRate: number,
  years: number = 30,
  downPaymentPercent: number = 20
): {
  totalRentCost: number;
  totalBuyCost: number;
  monthlyMortgage: number;
  rentBreakEven: number;
  recommendation: 'rent' | 'buy' | 'neutral';
} => {
  const monthlyRent = rent1BR;
  const totalRentCost = monthlyRent * 12 * years;
  
  const downPayment = buyPrice * (downPaymentPercent / 100);
  const loanAmount = buyPrice - downPayment;
  const monthlyRate = mortgageRate / 100 / 12;
  const numPayments = years * 12;
  
  const monthlyMortgage = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  const totalBuyCost = (monthlyMortgage * numPayments) + downPayment;
  
  const rentBreakEven = totalBuyCost / (monthlyRent * 12);
  
  let recommendation: 'rent' | 'buy' | 'neutral';
  if (rentBreakEven > years + 2) {
    recommendation = 'buy';
  } else if (rentBreakEven < years - 2) {
    recommendation = 'rent';
  } else {
    recommendation = 'neutral';
  }
  
  return {
    totalRentCost,
    totalBuyCost,
    monthlyMortgage,
    rentBreakEven,
    recommendation
  };
};
