export interface TaxRate {
  federal: number;
  state: number;
  social: number;
  total: number;
  notes: string;
}

export const taxRatesData: Record<string, TaxRate> = {
  us: {
    federal: 0.22,
    state: 0.05,
    social: 0.076,
    total: 0.30,
    notes: 'Federal + average state + FICA'
  },
  es: {
    federal: 0.25,
    state: 0,
    social: 0.065,
    total: 0.47,
    notes: 'IRPF progressive + Social Security'
  },
  de: {
    federal: 0.42,
    state: 0,
    social: 0.20,
    total: 0.50,
    notes: 'Income tax + Solidarity surcharge + Social'
  },
  gb: {
    federal: 0.20,
    state: 0,
    social: 0.12,
    total: 0.32,
    notes: 'Income tax + National Insurance'
  },
  fr: {
    federal: 0.30,
    state: 0,
    social: 0.22,
    total: 0.45,
    notes: 'Income tax + CSG + CRDS'
  },
  it: {
    federal: 0.35,
    state: 0.023,
    social: 0.10,
    total: 0.43,
    notes: 'IRPEF + Regional + Social'
  },
  pt: {
    federal: 0.28,
    state: 0,
    social: 0.11,
    total: 0.37,
    notes: 'IRS + Social Security'
  },
  nl: {
    federal: 0.37,
    state: 0,
    social: 0.10,
    total: 0.47,
    notes: 'Income tax + Social premiums'
  },
  be: {
    federal: 0.40,
    state: 0,
    social: 0.13,
    total: 0.50,
    notes: 'Income tax + Social Security'
  },
  ch: {
    federal: 0.20,
    state: 0.10,
    social: 0.06,
    total: 0.25,
    notes: 'Federal + Canton + AHV'
  },
  at: {
    federal: 0.42,
    state: 0,
    social: 0.18,
    total: 0.50,
    notes: 'Income tax + Social contributions'
  },
  ie: {
    federal: 0.25,
    state: 0,
    social: 0.04,
    total: 0.30,
    notes: 'Income tax + USC + PRSI'
  },
  se: {
    federal: 0.30,
    state: 0,
    social: 0.07,
    total: 0.35,
    notes: 'Income tax + Municipal + Social'
  },
  no: {
    federal: 0.22,
    state: 0,
    social: 0.08,
    total: 0.30,
    notes: 'Income tax + Social Security'
  },
  dk: {
    federal: 0.37,
    state: 0,
    social: 0.12,
    total: 0.45,
    notes: 'Income tax + AM + Labour market'
  },
  fi: {
    federal: 0.31,
    state: 0,
    social: 0.08,
    total: 0.37,
    notes: 'Income tax + Municipal + Social'
  },
  pl: {
    federal: 0.17,
    state: 0,
    social: 0.14,
    total: 0.29,
    notes: 'PIT + Social Security'
  },
  cz: {
    federal: 0.15,
    state: 0,
    social: 0.11,
    total: 0.24,
    notes: 'Income tax + Social'
  },
  hu: {
    federal: 0.15,
    state: 0,
    social: 0.18,
    total: 0.33,
    notes: 'PIT + Social contributions'
  },
  ro: {
    federal: 0.10,
    state: 0,
    social: 0.25,
    total: 0.35,
    notes: 'Income tax + Social'
  },
  gr: {
    federal: 0.22,
    state: 0,
    social: 0.16,
    total: 0.36,
    notes: 'Income tax + Social'
  },
  jp: {
    federal: 0.20,
    state: 0.10,
    social: 0.15,
    total: 0.38,
    notes: 'National + Resident tax + Social'
  },
  ca: {
    federal: 0.15,
    state: 0.10,
    social: 0.07,
    total: 0.28,
    notes: 'Federal + Provincial average'
  },
  au: {
    federal: 0.32,
    state: 0,
    social: 0.10,
    total: 0.38,
    notes: 'Income tax + Medicare'
  },
  br: {
    federal: 0.275,
    state: 0,
    social: 0.11,
    total: 0.34,
    notes: 'IRPF + Social contributions'
  },
  mx: {
    federal: 0.30,
    state: 0.03,
    social: 0.05,
    total: 0.35,
    notes: 'ISR + State tax + INFONAVIT'
  },
  ar: {
    federal: 0.35,
    state: 0,
    social: 0.10,
    total: 0.42,
    notes: 'Ganancias + Social'
  },
  co: {
    federal: 0.39,
    state: 0,
    social: 0.04,
    total: 0.42,
    notes: 'Income tax + Social'
  },
  cl: {
    federal: 0.40,
    state: 0,
    social: 0.03,
    total: 0.43,
    notes: 'Impuesto Global Complementario'
  },
  in: {
    federal: 0.30,
    state: 0.10,
    social: 0.12,
    total: 0.40,
    notes: 'Central + State average + PF'
  },
  kr: {
    federal: 0.24,
    state: 0,
    social: 0.09,
    total: 0.33,
    notes: 'Income tax + National pension'
  },
  sg: {
    federal: 0.22,
    state: 0,
    social: 0.20,
    total: 0.20,
    notes: 'Progressive + CPF (employer)'
  },
  ae: {
    federal: 0,
    state: 0,
    social: 0.05,
    total: 0.05,
    notes: 'No income tax + Social (E国强)'
  },
  cn: {
    federal: 0.25,
    state: 0.10,
    social: 0.11,
    total: 0.37,
    notes: 'IT + Local + Social'
  },
  ru: {
    federal: 0.13,
    state: 0,
    social: 0.30,
    total: 0.43,
    notes: 'FLAT tax + Social'
  },
  za: {
    federal: 0.26,
    state: 0,
    social: 0.01,
    total: 0.27,
    notes: 'Income tax + UIF'
  },
  ng: {
    federal: 0.24,
    state: 0.05,
    social: 0.08,
    total: 0.32,
    notes: 'PAYE + State + Social'
  },
  eg: {
    federal: 0.25,
    state: 0,
    social: 0.14,
    total: 0.37,
    notes: 'Income tax + Social'
  },
  th: {
    federal: 0.35,
    state: 0,
    social: 0.05,
    total: 0.37,
    notes: 'Progressive + Social'
  },
  my: {
    federal: 0.28,
    state: 0,
    social: 0.13,
    total: 0.35,
    notes: 'Income tax + EPF + SOCSO'
  },
  id: {
    federal: 0.30,
    state: 0,
    social: 0.02,
    total: 0.32,
    notes: 'PPh + BPJS'
  },
  ph: {
    federal: 0.32,
    state: 0,
    social: 0.04,
    total: 0.35,
    notes: 'Income tax + PhilHealth + Pag-IBIG'
  },
  vn: {
    federal: 0.35,
    state: 0,
    social: 0.105,
    total: 0.42,
    notes: 'Personal income tax + Social'
  },
  tr: {
    federal: 0.35,
    state: 0,
    social: 0.15,
    total: 0.45,
    notes: 'Income tax + Stamp duty'
  },
  sa: {
    federal: 0,
    state: 0,
    social: 0.10,
    total: 0.10,
    notes: 'No income tax + Social (GOSI)'
  },
  il: {
    federal: 0.35,
    state: 0,
    social: 0.12,
    total: 0.42,
    notes: 'Income tax + National Insurance'
  }
};

export const getTaxRate = (countryCode: string): TaxRate => {
  return taxRatesData[countryCode.toLowerCase()] || {
    federal: 0.25,
    state: 0,
    social: 0.10,
    total: 0.35,
    notes: 'Estimated average'
  };
};

export const calculateNetSalary = (grossSalary: number, countryCode: string): number => {
  const tax = getTaxRate(countryCode);
  return grossSalary * (1 - tax.total);
};

export const calculateGrossFromNet = (netSalary: number, countryCode: string): number => {
  const tax = getTaxRate(countryCode);
  return netSalary / (1 - tax.total);
};

export const getTaxBreakdown = (grossSalary: number, countryCode: string) => {
  const tax = getTaxRate(countryCode);
  return {
    gross: grossSalary,
    federalTax: grossSalary * tax.federal,
    stateTax: grossSalary * tax.state,
    socialTax: grossSalary * tax.social,
    totalTax: grossSalary * tax.total,
    netSalary: grossSalary * (1 - tax.total),
    effectiveRate: tax.total
  };
};
