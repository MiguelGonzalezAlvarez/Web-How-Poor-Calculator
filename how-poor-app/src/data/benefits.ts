export interface BenefitDefault {
  typicalBonus: number;
  bonusRange: [number, number];
  equityType: 'none' | 'stock' | 'options' | 'rsu';
  equityTypical: number;
  equityRange: [number, number];
  healthInsuranceCovered: boolean;
  healthInsuranceValue: number;
  vacationDays: number;
  vacationRange: [number, number];
  remoteStipend: number;
  pensionContribution: number;
  otherBenefits: string[];
  otherBenefitsEs: string[];
}

export interface RemoteSalaryData {
  countryId: string;
  baseSalaryMultiplier: number;
  typicalRoles: { role: string; roleEs: string; salaryUSD: number }[];
}

export const benefitsData: Record<string, BenefitDefault> = {
  us: {
    typicalBonus: 0.15,
    bonusRange: [0.05, 0.30],
    equityType: 'rsu',
    equityTypical: 0.15,
    equityRange: [0.05, 0.40],
    healthInsuranceCovered: false,
    healthInsuranceValue: 800,
    vacationDays: 15,
    vacationRange: [10, 25],
    remoteStipend: 100,
    pensionContribution: 0.04,
    otherBenefits: ['401k match', 'Stock options', 'Unlimited PTO'],
    otherBenefitsEs: ['401k match', 'Opciones sobre acciones', 'PTO ilimitado']
  },
  gb: {
    typicalBonus: 0.10,
    bonusRange: [0.05, 0.20],
    equityType: 'none',
    equityTypical: 0,
    equityRange: [0, 0.10],
    healthInsuranceCovered: true,
    healthInsuranceValue: 0,
    vacationDays: 25,
    vacationRange: [20, 30],
    remoteStipend: 50,
    pensionContribution: 0.03,
    otherBenefits: ['Pension', 'Private healthcare', 'Cycle to work'],
    otherBenefitsEs: ['Pensión', 'Salud privada', 'Bicicleta al trabajo']
  },
  de: {
    typicalBonus: 0.08,
    bonusRange: [0.02, 0.15],
    equityType: 'stock',
    equityTypical: 0.05,
    equityRange: [0, 0.15],
    healthInsuranceCovered: true,
    healthInsuranceValue: 0,
    vacationDays: 30,
    vacationRange: [25, 30],
    remoteStipend: 0,
    pensionContribution: 0.09,
    otherBenefits: ['Public transport ticket', 'Gym subsidy', 'Lunch vouchers'],
    otherBenefitsEs: ['Ticket transporte público', 'Subvención gimnasio', 'Tickets comida']
  },
  es: {
    typicalBonus: 0.08,
    bonusRange: [0.02, 0.15],
    equityType: 'none',
    equityTypical: 0,
    equityRange: [0, 0.05],
    healthInsuranceCovered: true,
    healthInsuranceValue: 0,
    vacationDays: 22,
    vacationRange: [22, 30],
    remoteStipend: 0,
    pensionContribution: 0.06,
    otherBenefits: ['Ticket restaurante', 'Plan de pensiones', 'Seguro médico'],
    otherBenefitsEs: ['Meal voucher', 'Pension plan', 'Health insurance']
  },
  fr: {
    typicalBonus: 0.10,
    bonusRange: [0.05, 0.20],
    equityType: 'none',
    equityTypical: 0,
    equityRange: [0, 0.05],
    healthInsuranceCovered: true,
    healthInsuranceValue: 0,
    vacationDays: 25,
    vacationRange: [25, 30],
    remoteStipend: 0,
    pensionContribution: 0.07,
    otherBenefits: ['Tickets restaurant', 'CE', 'Transport'],
    otherBenefitsEs: ['Meal tickets', 'CE', 'Transport']
  },
  nl: {
    typicalBonus: 0.12,
    bonusRange: [0.05, 0.20],
    equityType: 'stock',
    equityTypical: 0.10,
    equityRange: [0, 0.25],
    healthInsuranceCovered: false,
    healthInsuranceValue: 200,
    vacationDays: 25,
    vacationRange: [20, 30],
    remoteStipend: 80,
    pensionContribution: 0.05,
    otherBenefits: ['Pension', 'Health insurance', 'Learning budget'],
    otherBenefitsEs: ['Pensión', 'Seguro médico', 'Presupuesto aprendizaje']
  },
  pt: {
    typicalBonus: 0.05,
    bonusRange: [0.02, 0.10],
    equityType: 'none',
    equityTypical: 0,
    equityRange: [0, 0.03],
    healthInsuranceCovered: false,
    healthInsuranceValue: 100,
    vacationDays: 22,
    vacationRange: [22, 25],
    remoteStipend: 50,
    pensionContribution: 0.04,
    otherBenefits: ['Meal cards', 'Health insurance', 'Car'],
    otherBenefitsEs: ['Tarjetas comida', 'Seguro médico', 'Coche']
  },
  ca: {
    typicalBonus: 0.10,
    bonusRange: [0.05, 0.20],
    equityType: 'rsu',
    equityTypical: 0.10,
    equityRange: [0.03, 0.25],
    healthInsuranceCovered: false,
    healthInsuranceValue: 150,
    vacationDays: 15,
    vacationRange: [10, 25],
    remoteStipend: 75,
    pensionContribution: 0.05,
    otherBenefits: ['RRSP match', 'Stock options', 'Extended health'],
    otherBenefitsEs: ['RRSP match', 'Opciones acciones', 'Salud extendida']
  },
  au: {
    typicalBonus: 0.15,
    bonusRange: [0.05, 0.25],
    equityType: 'options',
    equityTypical: 0.08,
    equityRange: [0.02, 0.20],
    healthInsuranceCovered: false,
    healthInsuranceValue: 200,
    vacationDays: 20,
    vacationRange: [15, 25],
    remoteStipend: 60,
    pensionContribution: 0.10,
    otherBenefits: ['Superannuation', 'Stock options', 'Sick leave'],
    otherBenefitsEs: ['Superannuation', 'Opciones acciones', 'Enfermedad']
  },
  ch: {
    typicalBonus: 0.10,
    bonusRange: [0.05, 0.20],
    equityType: 'stock',
    equityTypical: 0.08,
    equityRange: [0.02, 0.15],
    healthInsuranceCovered: false,
    healthInsuranceValue: 400,
    vacationDays: 25,
    vacationRange: [20, 30],
    remoteStipend: 0,
    pensionContribution: 0.07,
    otherBenefits: ['Pension 2nd pillar', 'Language courses', 'Lunch'],
    otherBenefitsEs: ['Pensión 2do pilar', 'Cursos idiomas', 'Comida']
  },
  jp: {
    typicalBonus: 0.20,
    bonusRange: [0.10, 0.30],
    equityType: 'none',
    equityTypical: 0,
    equityRange: [0, 0.03],
    healthInsuranceCovered: true,
    healthInsuranceValue: 0,
    vacationDays: 20,
    vacationRange: [10, 25],
    remoteStipend: 0,
    pensionContribution: 0.09,
    otherBenefits: ['Housing allowance', 'Transportation', 'Family support'],
    otherBenefitsEs: ['Subsidio vivienda', 'Transporte', 'Apoyo familia']
  },
  br: {
    typicalBonus: 0.10,
    bonusRange: [0.05, 0.20],
    equityType: 'none',
    equityTypical: 0,
    equityRange: [0, 0.05],
    healthInsuranceCovered: false,
    healthInsuranceValue: 200,
    vacationDays: 30,
    vacationRange: [20, 30],
    remoteStipend: 50,
    pensionContribution: 0.08,
    otherBenefits: ['VR/VA', 'Health insurance', 'Profit sharing'],
    otherBenefitsEs: ['VR/VA', 'Seguro médico', 'Participación beneficios']
  },
  mx: {
    typicalBonus: 0.10,
    bonusRange: [0.02, 0.20],
    equityType: 'none',
    equityTypical: 0,
    equityRange: [0, 0.03],
    healthInsuranceCovered: false,
    healthInsuranceValue: 150,
    vacationDays: 15,
    vacationRange: [10, 20],
    remoteStipend: 50,
    pensionContribution: 0.05,
    otherBenefits: ['Vales de despensa', 'Seguro de vida', 'FONACOT'],
    otherBenefitsEs: ['Food vouchers', 'Life insurance', 'FONACOT']
  }
};

export const remoteSalaryData: RemoteSalaryData[] = [
  {
    countryId: 'us_remote',
    baseSalaryMultiplier: 1.0,
    typicalRoles: [
      { role: 'Software Engineer', roleEs: 'Ingeniero de Software', salaryUSD: 120000 },
      { role: 'Senior Engineer', roleEs: 'Ingeniero Senior', salaryUSD: 180000 },
      { role: 'Staff Engineer', roleEs: 'Ingeniero Staff', salaryUSD: 250000 },
      { role: 'Product Manager', roleEs: 'Gerente de Producto', salaryUSD: 150000 },
      { role: 'Designer', roleEs: 'Diseñador', salaryUSD: 110000 }
    ]
  },
  {
    countryId: 'latam_remote',
    baseSalaryMultiplier: 0.30,
    typicalRoles: [
      { role: 'Software Engineer', roleEs: 'Ingeniero de Software', salaryUSD: 36000 },
      { role: 'Senior Engineer', roleEs: 'Ingeniero Senior', salaryUSD: 54000 },
      { role: 'Staff Engineer', roleEs: 'Ingeniero Staff', salaryUSD: 75000 },
      { role: 'Product Manager', roleEs: 'Gerente de Producto', salaryUSD: 45000 },
      { role: 'Designer', roleEs: 'Diseñador', salaryUSD: 33000 }
    ]
  },
  {
    countryId: 'eu_remote',
    baseSalaryMultiplier: 0.70,
    typicalRoles: [
      { role: 'Software Engineer', roleEs: 'Ingeniero de Software', salaryUSD: 84000 },
      { role: 'Senior Engineer', roleEs: 'Ingeniero Senior', salaryUSD: 126000 },
      { role: 'Staff Engineer', roleEs: 'Ingeniero Staff', salaryUSD: 175000 },
      { role: 'Product Manager', roleEs: 'Gerente de Producto', salaryUSD: 105000 },
      { role: 'Designer', roleEs: 'Diseñador', salaryUSD: 77000 }
    ]
  }
];

export const getBenefits = (countryId: string): BenefitDefault => {
  return benefitsData[countryId] || benefitsData.us;
};

export const calculateTotalCompensation = (
  baseSalary: number,
  countryId: string
): { base: number; bonus: number; equity: number; benefits: number; total: number } => {
  const benefits = getBenefits(countryId);
  
  const bonus = baseSalary * benefits.typicalBonus;
  const equity = baseSalary * benefits.equityTypical;
  const benefitsValue = benefits.healthInsuranceValue + (benefits.remoteStipend * 12);
  
  return {
    base: baseSalary,
    bonus,
    equity,
    benefits: benefitsValue,
    total: baseSalary + bonus + equity + benefitsValue
  };
};

export const getRemoteSalary = (
  remoteRegion: string,
  role: string
): number => {
  const data = remoteSalaryData.find(d => d.countryId === remoteRegion);
  const roleData = data?.typicalRoles.find(r => r.role === role || r.roleEs === role);
  return roleData?.salaryUSD || 0;
};
