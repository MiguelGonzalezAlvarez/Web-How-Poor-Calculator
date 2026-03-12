export interface FamilyCostData {
  countryId: string;
  childcare: {
    nurseryMonthly: number;
    nannyMonthly: number;
    auPairMonthly: number;
    babysitterHourly: number;
  };
  education: {
    publicAnnual: number;
    privateAnnual: number;
    internationalAnnual: number;
    booksAndMaterials: number;
    uniforms: number;
  };
  healthcare: {
    pediatricVisit: number;
    dentalAnnual: number;
    vaccinations: number;
    healthInsuranceMonthly: number;
  };
  activities: {
    sportsMonthly: number;
    musicMonthly: number;
    campsSummer: number;
    extracurricular: number;
  };
  government: {
    childAllowanceMonthly: number;
    taxCreditsAnnual: number;
  };
}

export const familyCostsData: FamilyCostData[] = [
  {
    countryId: 'us',
    childcare: {
      nurseryMonthly: 1500,
      nannyMonthly: 3500,
      auPairMonthly: 2000,
      babysitterHourly: 18
    },
    education: {
      publicAnnual: 0,
      privateAnnual: 15000,
      internationalAnnual: 35000,
      booksAndMaterials: 500,
      uniforms: 300
    },
    healthcare: {
      pediatricVisit: 150,
      dentalAnnual: 400,
      vaccinations: 500,
      healthInsuranceMonthly: 400
    },
    activities: {
      sportsMonthly: 150,
      musicMonthly: 120,
      campsSummer: 2500,
      extracurricular: 200
    },
    government: {
      childAllowanceMonthly: 0,
      taxCreditsAnnual: 3000
    }
  },
  {
    countryId: 'es',
    childcare: {
      nurseryMonthly: 350,
      nannyMonthly: 1200,
      auPairMonthly: 800,
      babysitterHourly: 8
    },
    education: {
      publicAnnual: 0,
      privateAnnual: 5000,
      internationalAnnual: 12000,
      booksAndMaterials: 200,
      uniforms: 150
    },
    healthcare: {
      pediatricVisit: 80,
      dentalAnnual: 200,
      vaccinations: 0,
      healthInsuranceMonthly: 100
    },
    activities: {
      sportsMonthly: 50,
      musicMonthly: 40,
      campsSummer: 800,
      extracurricular: 80
    },
    government: {
      childAllowanceMonthly: 100,
      taxCreditsAnnual: 1200
    }
  },
  {
    countryId: 'de',
    childcare: {
      nurseryMonthly: 300,
      nannyMonthly: 1800,
      auPairMonthly: 700,
      babysitterHourly: 12
    },
    education: {
      publicAnnual: 0,
      privateAnnual: 8000,
      internationalAnnual: 18000,
      booksAndMaterials: 250,
      uniforms: 100
    },
    healthcare: {
      pediatricVisit: 60,
      dentalAnnual: 250,
      vaccinations: 0,
      healthInsuranceMonthly: 120
    },
    activities: {
      sportsMonthly: 40,
      musicMonthly: 50,
      campsSummer: 1200,
      extracurricular: 60
    },
    government: {
      childAllowanceMonthly: 219,
      taxCreditsAnnual: 0
    }
  },
  {
    countryId: 'gb',
    childcare: {
      nurseryMonthly: 1200,
      nannyMonthly: 2800,
      auPairMonthly: 1600,
      babysitterHourly: 14
    },
    education: {
      publicAnnual: 0,
      privateAnnual: 18000,
      internationalAnnual: 40000,
      booksAndMaterials: 400,
      uniforms: 250
    },
    healthcare: {
      pediatricVisit: 100,
      dentalAnnual: 300,
      vaccinations: 0,
      healthInsuranceMonthly: 150
    },
    activities: {
      sportsMonthly: 80,
      musicMonthly: 60,
      campsSummer: 2000,
      extracurricular: 100
    },
    government: {
      childAllowanceMonthly: 0,
      taxCreditsAnnual: 2000
    }
  },
  {
    countryId: 'fr',
    childcare: {
      nurseryMonthly: 700,
      nannyMonthly: 1800,
      auPairMonthly: 900,
      babysitterHourly: 10
    },
    education: {
      publicAnnual: 0,
      privateAnnual: 7000,
      internationalAnnual: 15000,
      booksAndMaterials: 200,
      uniforms: 150
    },
    healthcare: {
      pediatricVisit: 30,
      dentalAnnual: 200,
      vaccinations: 0,
      healthInsuranceMonthly: 80
    },
    activities: {
      sportsMonthly: 50,
      musicMonthly: 40,
      campsSummer: 1000,
      extracurricular: 60
    },
    government: {
      childAllowanceMonthly: 130,
      taxCreditsAnnual: 1500
    }
  },
  {
    countryId: 'pt',
    childcare: {
      nurseryMonthly: 250,
      nannyMonthly: 800,
      auPairMonthly: 600,
      babysitterHourly: 6
    },
    education: {
      publicAnnual: 0,
      privateAnnual: 3500,
      internationalAnnual: 9000,
      booksAndMaterials: 150,
      uniforms: 100
    },
    healthcare: {
      pediatricVisit: 50,
      dentalAnnual: 150,
      vaccinations: 0,
      healthInsuranceMonthly: 50
    },
    activities: {
      sportsMonthly: 30,
      musicMonthly: 25,
      campsSummer: 500,
      extracurricular: 40
    },
    government: {
      childAllowanceMonthly: 35,
      taxCreditsAnnual: 600
    }
  },
  {
    countryId: 'nl',
    childcare: {
      nurseryMonthly: 800,
      nannyMonthly: 2500,
      auPairMonthly: 1100,
      babysitterHourly: 15
    },
    education: {
      publicAnnual: 0,
      privateAnnual: 10000,
      internationalAnnual: 20000,
      booksAndMaterials: 300,
      uniforms: 150
    },
    healthcare: {
      pediatricVisit: 80,
      dentalAnnual: 300,
      vaccinations: 0,
      healthInsuranceMonthly: 130
    },
    activities: {
      sportsMonthly: 50,
      musicMonthly: 45,
      campsSummer: 1500,
      extracurricular: 70
    },
    government: {
      childAllowanceMonthly: 200,
      taxCreditsAnnual: 0
    }
  },
  {
    countryId: 'ca',
    childcare: {
      nurseryMonthly: 900,
      nannyMonthly: 2500,
      auPairMonthly: 1400,
      babysitterHourly: 15
    },
    education: {
      publicAnnual: 0,
      privateAnnual: 12000,
      internationalAnnual: 28000,
      booksAndMaterials: 400,
      uniforms: 200
    },
    healthcare: {
      pediatricVisit: 100,
      dentalAnnual: 300,
      vaccinations: 0,
      healthInsuranceMonthly: 100
    },
    activities: {
      sportsMonthly: 100,
      musicMonthly: 80,
      campsSummer: 1800,
      extracurricular: 120
    },
    government: {
      childAllowanceMonthly: 0,
      taxCreditsAnnual: 2500
    }
  },
  {
    countryId: 'au',
    childcare: {
      nurseryMonthly: 1100,
      nannyMonthly: 2800,
      auPairMonthly: 1500,
      babysitterHourly: 20
    },
    education: {
      publicAnnual: 0,
      privateAnnual: 15000,
      internationalAnnual: 30000,
      booksAndMaterials: 450,
      uniforms: 250
    },
    healthcare: {
      pediatricVisit: 120,
      dentalAnnual: 350,
      vaccinations: 0,
      healthInsuranceMonthly: 120
    },
    activities: {
      sportsMonthly: 120,
      musicMonthly: 90,
      campsSummer: 2200,
      extracurricular: 140
    },
    government: {
      childAllowanceMonthly: 0,
      taxCreditsAnnual: 3000
    }
  },
  {
    countryId: 'mx',
    childcare: {
      nurseryMonthly: 250,
      nannyMonthly: 500,
      auPairMonthly: 400,
      babysitterHourly: 4
    },
    education: {
      publicAnnual: 0,
      privateAnnual: 3000,
      internationalAnnual: 8000,
      booksAndMaterials: 150,
      uniforms: 80
    },
    healthcare: {
      pediatricVisit: 30,
      dentalAnnual: 100,
      vaccinations: 200,
      healthInsuranceMonthly: 50
    },
    activities: {
      sportsMonthly: 25,
      musicMonthly: 20,
      campsSummer: 400,
      extracurricular: 30
    },
    government: {
      childAllowanceMonthly: 0,
      taxCreditsAnnual: 500
    }
  }
];

export const getFamilyCosts = (countryId: string): FamilyCostData | undefined => {
  return familyCostsData.find(d => d.countryId === countryId);
};

export const calculateFamilyCosts = (
  countryId: string,
  numberOfChildren: number,
  childrenAges: number[],
  schoolType: 'public' | 'private' | 'international',
  needsChildcare: boolean,
  childcareHours: number
): {
  monthlyChildcare: number;
  annualEducation: number;
  annualHealthcare: number;
  annualActivities: number;
  totalAnnual: number;
  monthly: number;
  governmentBenefits: number;
  netAnnualCost: number;
} => {
  const data = getFamilyCosts(countryId);
  if (!data) return { monthlyChildcare: 0, annualEducation: 0, annualHealthcare: 0, annualActivities: 0, totalAnnual: 0, monthly: 0, governmentBenefits: 0, netAnnualCost: 0 };

  let monthlyChildcare = 0;
  if (needsChildcare) {
    const childrenUnder3 = childrenAges.filter(a => a < 3).length;
    const children3to5 = childrenAges.filter(a => a >= 3 && a <= 5).length;
    
    if (childcareHours < 20) {
      monthlyChildcare = (data.childcare.nurseryMonthly * 0.5 * childrenUnder3) + (data.childcare.nurseryMonthly * 0.3 * children3to5);
    } else {
      monthlyChildcare = (data.childcare.nurseryMonthly * childrenUnder3) + (data.childcare.nurseryMonthly * 0.6 * children3to5);
    }
  }

  let annualEducation = 0;
  const schoolAgeChildren = childrenAges.filter(a => a >= 5 && a <= 18).length;
  if (schoolType === 'public') {
    annualEducation = data.education.publicAnnual * schoolAgeChildren;
  } else if (schoolType === 'private') {
    annualEducation = data.education.privateAnnual * schoolAgeChildren;
  } else {
    annualEducation = data.education.internationalAnnual * schoolAgeChildren;
  }
  annualEducation += (data.education.booksAndMaterials + data.education.uniforms) * numberOfChildren;

  const annualHealthcare = data.healthcare.healthInsuranceMonthly * 12 * numberOfChildren + 
                          data.healthcare.pediatricVisit * numberOfChildren +
                          data.healthcare.dentalAnnual * numberOfChildren;

  const annualActivities = (data.activities.sportsMonthly + data.activities.musicMonthly + data.activities.extracurricular) * 12 * numberOfChildren +
                         data.activities.campsSummer * numberOfChildren;

  const totalAnnual = monthlyChildcare * 12 + annualEducation + annualHealthcare + annualActivities;
  const governmentBenefits = data.government.childAllowanceMonthly * 12 * numberOfChildren + data.government.taxCreditsAnnual;

  return {
    monthlyChildcare,
    annualEducation,
    annualHealthcare,
    annualActivities,
    totalAnnual,
    monthly: totalAnnual / 12,
    governmentBenefits,
    netAnnualCost: totalAnnual - governmentBenefits
  };
};
