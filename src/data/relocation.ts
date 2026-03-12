export interface RelocationCostItem {
  category: string;
  categoryEs: string;
  minCostUSD: number;
  maxCostUSD: number;
  notes: string;
  notesEs: string;
}

export interface VisaRequirement {
  visaType: string;
  visaTypeEs: string;
  minCostUSD: number;
  maxCostUSD: number;
  processingTime: string;
  processingTimeEs: string;
  requirements: string[];
  requirementsEs: string[];
}

export interface CountryRelocationData {
  countryId: string;
  initialCosts: RelocationCostItem[];
  monthlyBuffer: {
    minUSD: number;
    maxUSD: number;
  };
  visas: VisaRequirement[];
  averageSetupMonths: number;
}

export const relocationData: CountryRelocationData[] = [
  {
    countryId: 'us',
    averageSetupMonths: 2,
    monthlyBuffer: { minUSD: 3000, maxUSD: 6000 },
    initialCosts: [
      { category: 'flight', categoryEs: 'Vuelo', minCostUSD: 400, maxCostUSD: 2000, notes: 'Round trip', notesEs: 'Ida y vuelta' },
      { category: 'housing_deposit', categoryEs: 'Depósito vivienda', minCostUSD: 1500, maxCostUSD: 6000, notes: 'Usually 1-2 months rent', notesEs: 'Usually 1-2 months rent' },
      { category: 'first_month_rent', categoryEs: 'Primer mes alquiler', minCostUSD: 1200, maxCostUSD: 4000, notes: 'Varies by city', notesEs: 'Varía por ciudad' },
      { category: 'moving_company', categoryEs: 'Empresa mudanza', minCostUSD: 800, maxCostUSD: 5000, notes: 'International move', notesEs: 'Mudanza internacional' },
      { category: 'furniture_kit', categoryEs: 'Muebles básicos', minCostUSD: 1000, maxCostUSD: 5000, notes: 'Basic furniture', notesEs: 'Muebles básicos' },
      { category: 'electronics', categoryEs: 'Electrónica', minCostUSD: 500, maxCostUSD: 2000, notes: 'Laptop, phone, etc', notesEs: 'Laptop, teléfono, etc' },
      { category: 'paperwork', categoryEs: 'Trámites legales', minCostUSD: 300, maxCostUSD: 1500, notes: 'Documents, certifications', notesEs: 'Documentos, certificaciones' },
      { category: 'health_insurance', categoryEs: 'Seguro médico inicial', minCostUSD: 500, maxCostUSD: 2000, notes: 'First month + setup', notesEs: 'Primer mes + alta' },
      { category: 'bank_account', categoryEs: 'Cuenta bancaria', minCostUSD: 0, maxCostUSD: 500, notes: 'Some banks charge setup', notesEs: 'Algunas bancos cobran' },
      { category: 'transport_initial', categoryEs: 'Transporte inicial', minCostUSD: 500, maxCostUSD: 3000, notes: 'Car or public transport', notesEs: 'Coche o transporte público' },
      { category: 'miscellaneous', categoryEs: 'Varios', minCostUSD: 500, maxCostUSD: 2000, notes: 'Unexpected expenses', notesEs: 'Gastos inesperados' }
    ],
    visas: [
      {
        visaType: 'H1B',
        visaTypeEs: 'H1B',
        minCostUSD: 3000,
        maxCostUSD: 7000,
        processingTime: '6-12 months',
        processingTimeEs: '6-12 meses',
        requirements: ['Job offer', ' LCA', ' Petition filing'],
        requirementsEs: ['Oferta de trabajo', ' LCA', ' Petición']
      },
      {
        visaType: 'L1',
        visaTypeEs: 'L1',
        minCostUSD: 2000,
        maxCostUSD: 5000,
        processingTime: '1-3 months',
        processingTimeEs: '1-3 meses',
        requirements: ['Intra-company transfer', '1 year employment'],
        requirementsEs: ['Traslado intraempresa', '1 año empleado']
      },
      {
        visaType: 'O1',
        visaTypeEs: 'O1',
        minCostUSD: 5000,
        maxCostUSD: 15000,
        processingTime: '2-4 months',
        processingTimeEs: '2-4 meses',
        requirements: ['Extraordinary ability evidence', 'US employer'],
        requirementsEs: ['Evidencia de habilidad extraordinaria', 'Empleador USA']
      }
    ]
  },
  {
    countryId: 'gb',
    averageSetupMonths: 1,
    monthlyBuffer: { minUSD: 2500, maxUSD: 5000 },
    initialCosts: [
      { category: 'flight', categoryEs: 'Vuelo', minCostUSD: 400, maxCostUSD: 1500, notes: 'Round trip', notesEs: 'Ida y vuelta' },
      { category: 'housing_deposit', categoryEs: 'Depósito vivienda', minCostUSD: 1200, maxCostUSD: 4000, notes: 'Usually 5 weeks rent', notesEs: 'Usually 5 weeks rent' },
      { category: 'first_month_rent', categoryEs: 'Primer mes alquiler', minCostUSD: 1000, maxCostUSD: 3500, notes: 'Varies by city', notesEs: 'Varía por ciudad' },
      { category: 'moving_company', categoryEs: 'Empresa mudanza', minCostUSD: 600, maxCostUSD: 3000, notes: 'International move', notesEs: 'Mudanza internacional' },
      { category: 'furniture_kit', categoryEs: 'Muebles básicos', minCostUSD: 800, maxCostUSD: 4000, notes: 'Basic furniture', notesEs: 'Muebles básicos' },
      { category: 'electronics', categoryEs: 'Electrónica', minCostUSD: 400, maxCostUSD: 1500, notes: 'Laptop, phone, etc', notesEs: 'Laptop, teléfono, etc' },
      { category: 'paperwork', categoryEs: 'Trámites legales', minCostUSD: 200, maxCostUSD: 1000, notes: 'Documents, certifications', notesEs: 'Documentos, certificaciones' },
      { category: 'health_surcharge', categoryEs: 'NHS surcharge', minCostUSD: 400, maxCostUSD: 800, notes: 'Immigration health surcharge', notesEs: 'Carga sanitaria inmigración' },
      { category: 'bank_account', categoryEs: 'Cuenta bancaria', minCostUSD: 0, maxCostUSD: 300, notes: 'Usually free', notesEs: 'Usually free' },
      { category: 'transport_initial', categoryEs: 'Transporte inicial', minCostUSD: 300, maxCostUSD: 2000, notes: 'Oyster card, bike, etc', notesEs: 'Oyster card, bici, etc' },
      { category: 'miscellaneous', categoryEs: 'Varios', minCostUSD: 400, maxCostUSD: 1500, notes: 'Unexpected expenses', notesEs: 'Gastos esperados' }
    ],
    visas: [
      {
        visaType: 'Skilled Worker',
        visaTypeEs: 'Skilled Worker',
        minCostUSD: 1500,
        maxCostUSD: 4000,
        processingTime: '3-8 weeks',
        processingTimeEs: '3-8 semanas',
        requirements: ['Job offer', 'Certificate of sponsorship', 'English test'],
        requirementsEs: ['Oferta de trabajo', 'Certificado de patrocinio', 'Test inglés']
      },
      {
        visaType: 'Global Talent',
        visaTypeEs: 'Global Talent',
        minCostUSD: 1000,
        maxCostUSD: 3000,
        processingTime: '5-8 weeks',
        processingTimeEs: '5-8 semanas',
        requirements: ['Endorsement', 'Field evidence'],
        requirementsEs: ['Endorsement', 'Evidencia del campo']
      }
    ]
  },
  {
    countryId: 'de',
    averageSetupMonths: 2,
    monthlyBuffer: { minUSD: 2000, maxUSD: 4500 },
    initialCosts: [
      { category: 'flight', categoryEs: 'Vuelo', minCostUSD: 400, maxCostUSD: 1200, notes: 'Round trip', notesEs: 'Ida y vuelta' },
      { category: 'housing_deposit', categoryEs: 'Depósito vivienda', minCostUSD: 1000, maxCostUSD: 3000, notes: 'Usually 3 months cold rent', notesEs: 'Usually 3 months cold rent' },
      { category: 'first_month_rent', categoryEs: 'Primer mes alquiler', minCostUSD: 800, maxCostUSD: 2500, notes: 'Varies by city', notesEs: 'Varía por ciudad' },
      { category: 'moving_company', categoryEs: 'Empresa mudanza', minCostUSD: 500, maxCostUSD: 2500, notes: 'International move', notesEs: 'Mudanza internacional' },
      { category: 'furniture_kit', categoryEs: 'Muebles básicos', minCostUSD: 600, maxCostUSD: 3000, notes: 'Basic furniture', notesEs: 'Muebles básicos' },
      { category: 'electronics', categoryEs: 'Electrónica', minCostUSD: 400, maxCostUSD: 1500, notes: 'Laptop, phone, etc', notesEs: 'Laptop, teléfono, etc' },
      { category: 'paperwork', categoryEs: 'Trámites legales', minCostUSD: 200, maxCostUSD: 800, notes: 'Documents, certifications', notesEs: 'Documentos, certificaciones' },
      { category: 'health_insurance', categoryEs: 'Seguro médico inicial', minCostUSD: 200, maxCostUSD: 600, notes: 'Public or private', notesEs: 'Público o privado' },
      { category: 'bank_account', categoryEs: 'Cuenta bancaria', minCostUSD: 0, maxCostUSD: 200, notes: 'Usually free', notesEs: 'Usually free' },
      { category: 'transport_initial', categoryEs: 'Transporte inicial', minCostUSD: 300, maxCostUSD: 1500, notes: 'Public transport', notesEs: 'Transporte público' },
      { category: 'miscellaneous', categoryEs: 'Varios', minCostUSD: 300, maxCostUSD: 1200, notes: 'Unexpected expenses', notesEs: 'Gastos inesperados' }
    ],
    visas: [
      {
        visaType: 'EU Blue Card',
        visaTypeEs: 'EU Blue Card',
        minCostUSD: 1000,
        maxCostUSD: 2500,
        processingTime: '4-12 weeks',
        processingTimeEs: '4-12 semanas',
        requirements: ['University degree', 'Job offer above threshold', 'Health insurance'],
        requirementsEs: ['Carrera universitaria', 'Oferta sobre umbral', 'Seguro médico']
      },
      {
        visaType: 'Work Permit',
        visaTypeEs: 'Permiso de trabajo',
        minCostUSD: 800,
        maxCostUSD: 2000,
        processingTime: '4-12 weeks',
        processingTimeEs: '4-12 semanas',
        requirements: ['Job offer', 'Labor market test'],
        requirementsEs: ['Oferta de trabajo', 'Test mercado laboral']
      }
    ]
  },
  {
    countryId: 'es',
    averageSetupMonths: 1,
    monthlyBuffer: { minUSD: 1500, maxUSD: 3000 },
    initialCosts: [
      { category: 'flight', categoryEs: 'Vuelo', minCostUSD: 300, maxCostUSD: 1000, notes: 'Round trip', notesEs: 'Ida y vuelta' },
      { category: 'housing_deposit', categoryEs: 'Depósito vivienda', minCostUSD: 600, maxCostUSD: 2000, notes: 'Usually 1 month', notesEs: 'Usually 1 month' },
      { category: 'first_month_rent', categoryEs: 'Primer mes alquiler', minCostUSD: 600, maxCostUSD: 2000, notes: 'Varies by city', notesEs: 'Varía por ciudad' },
      { category: 'moving_company', categoryEs: 'Empresa mudanza', minCostUSD: 300, maxCostUSD: 1500, notes: 'International or local', notesEs: 'Internacional o local' },
      { category: 'furniture_kit', categoryEs: 'Muebles básicos', minCostUSD: 400, maxCostUSD: 2000, notes: 'Basic furniture', notesEs: 'Muebles básicos' },
      { category: 'electronics', categoryEs: 'Electrónica', minCostUSD: 300, maxCostUSD: 1000, notes: 'Laptop, phone, etc', notesEs: 'Laptop, teléfono, etc' },
      { category: 'paperwork', categoryEs: 'Trámites legales', minCostUSD: 150, maxCostUSD: 500, notes: 'NIE, empadronamiento', notesEs: 'NIE, empadronamiento' },
      { category: 'health_insurance', categoryEs: 'Seguro médico', minCostUSD: 100, maxCostUSD: 400, notes: 'Public or private', notesEs: 'Público o privado' },
      { category: 'bank_account', categoryEs: 'Cuenta bancaria', minCostUSD: 0, maxCostUSD: 100, notes: 'Usually free', notesEs: 'Usually free' },
      { category: 'transport_initial', categoryEs: 'Transporte inicial', minCostUSD: 200, maxCostUSD: 1000, notes: 'Public transport', notesEs: 'Transporte público' },
      { category: 'miscellaneous', categoryEs: 'Varios', minCostUSD: 200, maxCostUSD: 800, notes: 'Unexpected expenses', notesEs: 'Gastos inesperados' }
    ],
    visas: [
      {
        visaType: 'Work Permit',
        visaTypeEs: 'Permiso de trabajo',
        minCostUSD: 500,
        maxCostUSD: 1500,
        processingTime: '1-3 months',
        processingTimeEs: '1-3 meses',
        requirements: ['Job offer', 'Work authorization'],
        requirementsEs: ['Oferta de trabajo', 'Autorización de trabajo']
      },
      {
        visaType: 'EU Blue Card',
        visaTypeEs: 'EU Blue Card',
        minCostUSD: 800,
        maxCostUSD: 2000,
        processingTime: '1-2 months',
        processingTimeEs: '1-2 meses',
        requirements: ['University degree', 'Job offer above threshold'],
        requirementsEs: ['Carrera universitaria', 'Oferta sobre umbral']
      }
    ]
  },
  {
    countryId: 'fr',
    averageSetupMonths: 2,
    monthlyBuffer: { minUSD: 2200, maxUSD: 4500 },
    initialCosts: [
      { category: 'flight', categoryEs: 'Vuelo', minCostUSD: 400, maxCostUSD: 1200, notes: 'Round trip', notesEs: 'Ida y vuelta' },
      { category: 'housing_deposit', categoryEs: 'Depósito vivienda', minCostUSD: 1000, maxCostUSD: 3000, notes: 'Usually 2-3 months', notesEs: 'Usually 2-3 months' },
      { category: 'first_month_rent', categoryEs: 'Primer mes alquiler', minCostUSD: 800, maxCostUSD: 2500, notes: 'Varies by city', notesEs: 'Varía por ciudad' },
      { category: 'moving_company', categoryEs: 'Empresa mudanza', minCostUSD: 400, maxCostUSD: 2000, notes: 'International move', notesEs: 'Mudanza internacional' },
      { category: 'furniture_kit', categoryEs: 'Muebles básicos', minCostUSD: 500, maxCostUSD: 2500, notes: 'Basic furniture', notesEs: 'Muebles básicos' },
      { category: 'electronics', categoryEs: 'Electrónica', minCostUSD: 400, maxCostUSD: 1200, notes: 'Laptop, phone, etc', notesEs: 'Laptop, teléfono, etc' },
      { category: 'paperwork', categoryEs: 'Trámites legales', minCostUSD: 200, maxCostUSD: 800, notes: 'Documents, certifications', notesEs: 'Documentos, certificaciones' },
      { category: 'health_insurance', categoryEs: 'Seguro médico', minCostUSD: 150, maxCostUSD: 500, notes: 'Sécurité sociale', notesEs: 'Seguridad social' },
      { category: 'bank_account', categoryEs: 'Cuenta bancaria', minCostUSD: 0, maxCostUSD: 150, notes: 'Usually free', notesEs: 'Usually free' },
      { category: 'transport_initial', categoryEs: 'Transporte inicial', minCostUSD: 300, maxCostUSD: 1200, notes: 'Navigo, bike, etc', notesEs: 'Navigo, bici, etc' },
      { category: 'miscellaneous', categoryEs: 'Varios', minCostUSD: 300, maxCostUSD: 1000, notes: 'Unexpected expenses', notesEs: 'Gastos inesperados' }
    ],
    visas: [
      {
        visaType: 'Passeport Talent',
        visaTypeEs: 'Passeport Talent',
        minCostUSD: 800,
        maxCostUSD: 2000,
        processingTime: '2-4 weeks',
        processingTimeEs: '2-4 semanas',
        requirements: ['Employment contract', 'Skills evaluation'],
        requirementsEs: ['Contrato de trabajo', 'Evaluación de habilidades']
      },
      {
        visaType: 'Work Permit',
        visaTypeEs: 'Permiso de trabajo',
        minCostUSD: 600,
        maxCostUSD: 1500,
        processingTime: '2-4 months',
        processingTimeEs: '2-4 meses',
        requirements: ['Job offer', 'Work authorization'],
        requirementsEs: ['Oferta de trabajo', 'Autorización de trabajo']
      }
    ]
  },
  {
    countryId: 'pt',
    averageSetupMonths: 1,
    monthlyBuffer: { minUSD: 1200, maxUSD: 2500 },
    initialCosts: [
      { category: 'flight', categoryEs: 'Vuelo', minCostUSD: 300, maxCostUSD: 900, notes: 'Round trip', notesEs: 'Ida y vuelta' },
      { category: 'housing_deposit', categoryEs: 'Depósito vivienda', minCostUSD: 500, maxCostUSD: 1500, notes: 'Usually 1-2 months', notesEs: 'Usually 1-2 months' },
      { category: 'first_month_rent', categoryEs: 'Primer mes alquiler', minCostUSD: 500, maxCostUSD: 1500, notes: 'Varies by city', notesEs: 'Varía por ciudad' },
      { category: 'moving_company', categoryEs: 'Empresa mudanza', minCostUSD: 250, maxCostUSD: 1200, notes: 'International or local', notesEs: 'Internacional o local' },
      { category: 'furniture_kit', categoryEs: 'Muebles básicos', minCostUSD: 300, maxCostUSD: 1500, notes: 'Basic furniture', notesEs: 'Muebles básicos' },
      { category: 'electronics', categoryEs: 'Electrónica', minCostUSD: 250, maxCostUSD: 800, notes: 'Laptop, phone, etc', notesEs: 'Laptop, teléfono, etc' },
      { category: 'paperwork', categoryEs: 'Trámites legales', minCostUSD: 150, maxCostUSD: 500, notes: 'NIF, residency', notesEs: 'NIF, residencia' },
      { category: 'health_insurance', categoryEs: 'Seguro médico', minCostUSD: 80, maxCostUSD: 300, notes: 'Public or private', notesEs: 'Público o privado' },
      { category: 'bank_account', categoryEs: 'Cuenta bancaria', minCostUSD: 0, maxCostUSD: 100, notes: 'Usually free', notesEs: 'Usually free' },
      { category: 'transport_initial', categoryEs: 'Transporte inicial', minCostUSD: 150, maxCostUSD: 600, notes: 'Public transport', notesEs: 'Transporte público' },
      { category: 'miscellaneous', categoryEs: 'Varios', minCostUSD: 200, maxCostUSD: 600, notes: 'Unexpected expenses', notesEs: 'Gastos inesperados' }
    ],
    visas: [
      {
        visaType: 'EU Blue Card',
        visaTypeEs: 'EU Blue Card',
        minCostUSD: 600,
        maxCostUSD: 1500,
        processingTime: '2-3 months',
        processingTimeEs: '2-3 meses',
        requirements: ['University degree', 'Job offer above threshold'],
        requirementsEs: ['Carrera universitaria', 'Oferta sobre umbral']
      },
      {
        visaType: 'D7 Visa',
        visaTypeEs: 'Visa D7',
        minCostUSD: 400,
        maxCostUSD: 1000,
        processingTime: '2-3 months',
        processingTimeEs: '2-3 meses',
        requirements: ['Passive income', 'Clean record'],
        requirementsEs: ['Ingreso pasivo', 'Sin antecedentes']
      }
    ]
  },
  {
    countryId: 'nl',
    averageSetupMonths: 1,
    monthlyBuffer: { minUSD: 2500, maxUSD: 5000 },
    initialCosts: [
      { category: 'flight', categoryEs: 'Vuelo', minCostUSD: 400, maxCostUSD: 1200, notes: 'Round trip', notesEs: 'Ida y vuelta' },
      { category: 'housing_deposit', categoryEs: 'Depósito vivienda', minCostUSD: 1200, maxCostUSD: 3500, notes: 'Usually 1-3 months', notesEs: 'Usually 1-3 months' },
      { category: 'first_month_rent', categoryEs: 'Primer mes alquiler', minCostUSD: 1000, maxCostUSD: 3000, notes: 'Varies by city', notesEs: 'Varía por ciudad' },
      { category: 'moving_company', categoryEs: 'Empresa mudanza', minCostUSD: 500, maxCostUSD: 2500, notes: 'International move', notesEs: 'Mudanza internacional' },
      { category: 'furniture_kit', categoryEs: 'Muebles básicos', minCostUSD: 600, maxCostUSD: 3000, notes: 'Basic furniture', notesEs: 'Muebles básicos' },
      { category: 'electronics', categoryEs: 'Electrónica', minCostUSD: 400, maxCostUSD: 1500, notes: 'Laptop, phone, etc', notesEs: 'Laptop, teléfono, etc' },
      { category: 'paperwork', categoryEs: 'Trámites legales', minCostUSD: 200, maxCostUSD: 800, notes: 'Documents, IND', notesEs: 'Documentos, IND' },
      { category: 'health_insurance', categoryEs: 'Seguro médico', minCostUSD: 150, maxCostUSD: 500, notes: 'Monthly premium', notesEs: 'Prima mensual' },
      { category: 'bank_account', categoryEs: 'Cuenta bancaria', minCostUSD: 0, maxCostUSD: 200, notes: 'Usually free', notesEs: 'Usually free' },
      { category: 'transport_initial', categoryEs: 'Transporte inicial', minCostUSD: 300, maxCostUSD: 1500, notes: 'OV chipkaart, bike', notesEs: 'OV chipkaart, bici' },
      { category: 'miscellaneous', categoryEs: 'Varios', minCostUSD: 400, maxCostUSD: 1200, notes: 'Unexpected expenses', notesEs: 'Gastos inesperados' }
    ],
    visas: [
      {
        visaType: 'KM Visa',
        visaTypeEs: 'KM Visa',
        minCostUSD: 1000,
        maxCostUSD: 2500,
        processingTime: '2-4 weeks',
        processingTimeEs: '2-4 semanas',
        requirements: ['Job offer', 'Salary threshold', 'Employer sponsorship'],
        requirementsEs: ['Oferta de trabajo', 'Umbral salarial', 'Patrocinador']
      },
      {
        visaType: 'EU Blue Card',
        visaTypeEs: 'EU Blue Card',
        minCostUSD: 1000,
        maxCostUSD: 2500,
        processingTime: '3-6 weeks',
        processingTimeEs: '3-6 semanas',
        requirements: ['University degree', 'Job offer above threshold'],
        requirementsEs: ['Carrera universitaria', 'Oferta sobre umbral']
      }
    ]
  },
  {
    countryId: 'ca',
    averageSetupMonths: 2,
    monthlyBuffer: { minUSD: 2500, maxUSD: 5000 },
    initialCosts: [
      { category: 'flight', categoryEs: 'Vuelo', minCostUSD: 400, maxCostUSD: 1500, notes: 'Round trip', notesEs: 'Ida y vuelta' },
      { category: 'housing_deposit', categoryEs: 'Depósito vivienda', minCostUSD: 1000, maxCostUSD: 3000, notes: 'Usually first month + last', notesEs: 'Usually first month + last' },
      { category: 'first_month_rent', categoryEs: 'Primer mes alquiler', minCostUSD: 1000, maxCostUSD: 3000, notes: 'Varies by city', notesEs: 'Varía por ciudad' },
      { category: 'moving_company', categoryEs: 'Empresa mudanza', minCostUSD: 600, maxCostUSD: 3000, notes: 'International move', notesEs: 'Mudanza internacional' },
      { category: 'furniture_kit', categoryEs: 'Muebles básicos', minCostUSD: 700, maxCostUSD: 3500, notes: 'Basic furniture', notesEs: 'Muebles básicos' },
      { category: 'electronics', categoryEs: 'Electrónica', minCostUSD: 500, maxCostUSD: 1800, notes: 'Laptop, phone, etc', notesEs: 'Laptop, teléfono, etc' },
      { category: 'paperwork', categoryEs: 'Trámites legales', minCostUSD: 300, maxCostUSD: 1200, notes: 'PR card, SIN', notesEs: 'PR card, SIN' },
      { category: 'health_insurance', categoryEs: 'Seguro médico', minCostUSD: 200, maxCostUSD: 600, notes: 'Provincial coverage waiting', notesEs: 'Espera cobertura provincial' },
      { category: 'bank_account', categoryEs: 'Cuenta bancaria', minCostUSD: 0, maxCostUSD: 300, notes: 'Usually free', notesEs: 'Usually free' },
      { category: 'transport_initial', categoryEs: 'Transporte inicial', minCostUSD: 400, maxCostUSD: 2000, notes: 'Car or transit', notesEs: 'Coche o tránsito' },
      { category: 'miscellaneous', categoryEs: 'Varios', minCostUSD: 500, maxCostUSD: 1500, notes: 'Unexpected expenses', notesEs: 'Gastos inesperados' }
    ],
    visas: [
      {
        visaType: 'Work Permit',
        visaTypeEs: 'Permiso de trabajo',
        minCostUSD: 1500,
        maxCostUSD: 3500,
        processingTime: '2-4 months',
        processingTimeEs: '2-4 meses',
        requirements: ['LMIA', 'Job offer', 'Medical exam'],
        requirementsEs: ['LMIA', 'Oferta de trabajo', 'Examen médico']
      },
      {
        visaType: 'Express Entry',
        visaTypeEs: 'Express Entry',
        minCostUSD: 2000,
        maxCostUSD: 5000,
        processingTime: '6-12 months',
        processingTimeEs: '6-12 meses',
        requirements: ['Points system', 'Language test', 'Education评估'],
        requirementsEs: ['Sistema de puntos', 'Test idioma', 'Evaluación educativa']
      }
    ]
  },
  {
    countryId: 'au',
    averageSetupMonths: 2,
    monthlyBuffer: { minUSD: 2500, maxUSD: 5000 },
    initialCosts: [
      { category: 'flight', categoryEs: 'Vuelo', minCostUSD: 600, maxCostUSD: 2000, notes: 'Round trip', notesEs: 'Ida y vuelta' },
      { category: 'housing_deposit', categoryEs: 'Depósito vivienda', minCostUSD: 1200, maxCostUSD: 3500, notes: 'Usually 2-4 weeks rent', notesEs: 'Usually 2-4 weeks rent' },
      { category: 'first_month_rent', categoryEs: 'Primer mes alquiler', minCostUSD: 1000, maxCostUSD: 3500, notes: 'Varies by city', notesEs: 'Varía por ciudad' },
      { category: 'moving_company', categoryEs: 'Empresa mudanza', minCostUSD: 800, maxCostUSD: 4000, notes: 'International move', notesEs: 'Mudanza internacional' },
      { category: 'furniture_kit', categoryEs: 'Muebles básicos', minCostUSD: 700, maxCostUSD: 3500, notes: 'Basic furniture', notesEs: 'Muebles básicos' },
      { category: 'electronics', categoryEs: 'Electrónica', minCostUSD: 500, maxCostUSD: 1800, notes: 'Laptop, phone, etc', notesEs: 'Laptop, teléfono, etc' },
      { category: 'paperwork', categoryEs: 'Trámites legales', minCostUSD: 300, maxCostUSD: 1200, notes: 'Visa, TFN', notesEs: 'Visa, TFN' },
      { category: 'health_insurance', categoryEs: 'Seguro médico', minCostUSD: 200, maxCostUSD: 600, notes: 'Private required', notesEs: 'Privado requerido' },
      { category: 'bank_account', categoryEs: 'Cuenta bancaria', minCostUSD: 0, maxCostUSD: 300, notes: 'Usually free', notesEs: 'Usually free' },
      { category: 'transport_initial', categoryEs: 'Transporte inicial', minCostUSD: 400, maxCostUSD: 2000, notes: 'Car or transit', notesEs: 'Coche o tránsito' },
      { category: 'miscellaneous', categoryEs: 'Varios', minCostUSD: 500, maxCostUSD: 1500, notes: 'Unexpected expenses', notesEs: 'Gastos inesperados' }
    ],
    visas: [
      {
        visaType: '482 Visa',
        visaTypeEs: 'Visa 482',
        minCostUSD: 2000,
        maxCostUSD: 5000,
        processingTime: '1-3 months',
        processingTimeEs: '1-3 meses',
        requirements: ['Employer sponsorship', 'Skill assessment'],
        requirementsEs: ['Patrocinador empleadora', 'Evaluación habilidades']
      },
      {
        visaType: '189 Visa',
        visaTypeEs: 'Visa 189',
        minCostUSD: 2500,
        maxCostUSD: 6000,
        processingTime: '6-12 months',
        processingTimeEs: '6-12 meses',
        requirements: ['Points test', 'Occupation list', 'Skills评估'],
        requirementsEs: ['Test puntos', 'Lista occupations', 'Evaluación']
      }
    ]
  },
  {
    countryId: 'jp',
    averageSetupMonths: 2,
    monthlyBuffer: { minUSD: 2000, maxUSD: 4000 },
    initialCosts: [
      { category: 'flight', categoryEs: 'Vuelo', minCostUSD: 500, maxCostUSD: 1500, notes: 'Round trip', notesEs: 'Ida y vuelta' },
      { category: 'housing_deposit', categoryEs: 'Depósito vivienda', minCostUSD: 1000, maxCostUSD: 4000, notes: 'Usually 2-6 months', notesEs: 'Usually 2-6 months' },
      { category: 'first_month_rent', categoryEs: 'Primer mes alquiler', minCostUSD: 800, maxCostUSD: 3000, notes: 'Varies by city', notesEs: 'Varía por ciudad' },
      { category: 'moving_company', categoryEs: 'Empresa mudanza', minCostUSD: 600, maxCostUSD: 3000, notes: 'International move', notesEs: 'Mudanza internacional' },
      { category: 'furniture_kit', categoryEs: 'Muebles básicos', minCostUSD: 500, maxCostUSD: 2500, notes: 'Basic furniture', notesEs: 'Muebles básicos' },
      { category: 'electronics', categoryEs: 'Electrónica', minCostUSD: 600, maxCostUSD: 2000, notes: 'Laptop, phone, etc', notesEs: 'Laptop, teléfono, etc' },
      { category: 'paperwork', categoryEs: 'Trámites legales', minCostUSD: 300, maxCostUSD: 1000, notes: 'Residence card', notesEs: 'Tarjeta de residencia' },
      { category: 'health_insurance', categoryEs: 'Seguro médico', minCostUSD: 150, maxCostUSD: 500, notes: 'National health', notesEs: 'Salud nacional' },
      { category: 'bank_account', categoryEs: 'Cuenta bancaria', minCostUSD: 0, maxCostUSD: 300, notes: 'Usually free', notesEs: 'Usually free' },
      { category: 'transport_initial', categoryEs: 'Transporte inicial', minCostUSD: 300, maxCostUSD: 1200, notes: 'JR Pass, bike', notesEs: 'JR Pass, bici' },
      { category: 'miscellaneous', categoryEs: 'Varios', minCostUSD: 400, maxCostUSD: 1200, notes: 'Unexpected expenses', notesEs: 'Gastos inesperados' }
    ],
    visas: [
      {
        visaType: 'Engineer Visa',
        visaTypeEs: 'Visa Ingeniero',
        minCostUSD: 800,
        maxCostUSD: 2000,
        processingTime: '1-3 months',
        processingTimeEs: '1-3 meses',
        requirements: ['Job offer', 'Degree or 10 years experience'],
        requirementsEs: ['Oferta de trabajo', 'Carrera o 10 años experiencia']
      },
      {
        visaType: 'Specified Visa',
        visaTypeEs: 'Visa Específica',
        minCostUSD: 800,
        maxCostUSD: 2000,
        processingTime: '1-3 months',
        processingTimeEs: '1-3 meses',
        requirements: ['Employer sponsorship', 'Skilled work'],
        requirementsEs: ['Patrocinador', 'Trabajo calificado']
      }
    ]
  }
];

export const getRelocationData = (countryId: string): CountryRelocationData | undefined => {
  return relocationData.find(d => d.countryId === countryId);
};

export const getTotalRelocationCost = (countryId: string): { min: number; max: number } => {
  const data = getRelocationData(countryId);
  if (!data) return { min: 5000, max: 20000 };
  
  const min = data.initialCosts.reduce((sum, item) => sum + item.minCostUSD, 0);
  const max = data.initialCosts.reduce((sum, item) => sum + item.maxCostUSD, 0);
  
  return { min, max };
};

export const getMonthlyBuffer = (countryId: string): { min: number; max: number } => {
  const data = getRelocationData(countryId);
  if (!data) return { min: 2000, max: 5000 };
  return data.monthlyBuffer;
};
