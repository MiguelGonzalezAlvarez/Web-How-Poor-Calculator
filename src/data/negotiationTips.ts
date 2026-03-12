export const negotiationTips = {
  us: {
    general: [
      "Research salary ranges on Glassdoor, Payscale, and Levels.fyi",
      "Always negotiate - employers expect it for roles above $100k",
      "Don't discuss salary with other employees",
      "Practice your pitch with a friend or mirror",
      "Get the job offer in writing before negotiating"
    ],
    tactics: [
      "Start with a 10-20% higher number than your target",
      "Use total compensation (base + bonus + equity) in negotiations",
      "Mention competing offers if you have them",
      "Ask for time to consider before giving a final answer",
      "Negotiate benefits if salary is capped"
    ],
    common: [
      "Always negotiate base salary first - it's harder to increase later",
      "RSUs/stock options are negotiable at most tech companies",
      "Signing bonuses are often easier to get than salary bumps",
      "Remote work can be part of your compensation package"
    ]
  },
  es: {
    general: [
      "Investigar salarios en Glassdoor, LinkedIn Salary",
      "La negociación es menos común pero cada vez más habitual",
      "Preparar una justificación basada en experiencia y estudios",
      "Conocer la banda salarial del puesto en la empresa"
    ],
    tactics: [
      "Comenzar con una propuesta 10% superior a la objetivo",
      "Negociar beneficios adicionales si el salario está limitado",
      "Pedir tiempo para pensar antes de responder",
      "Tener datos concretos de mercado paraArgumentar"
    ],
    common: [
      "Los beneficios sociales son muy importantes en España",
      "Plan de pensiones, seguro médico, tickets restaurant",
      "La flexibilidad horaria es muy valorada",
      "Las empresas españolas negocian menos que las estadounidenses"
    ]
  },
  de: {
    general: [
      "Research on Glassdoor, Kununu, and StepStone",
      "German companies have clear salary bands (Gehaltsbänder)",
      "Negotiation is expected for senior positions",
      "Prepare documentation of your qualifications"
    ],
    tactics: [
      "Start with market rate + 10%",
      "Focus on total package (bonus, vacation days)",
      "German employers value direct and honest communication",
      "Ask about career development opportunities"
    ],
    common: [
      "Vacation days (Urlaubstage) are very important - typically 30",
      "Remote work arrangements are increasingly negotiable",
      "Company car (Dienstwagen) is a common perk",
      "Public transport benefits (Jobticket)"
    ]
  },
  gb: {
    general: [
      "Research on Glassdoor, Reed, and Totaljobs",
      "Negotiation is expected especially in tech and finance",
      "Have a clear minimum acceptable salary",
      "Consider the full package including bonus"
    ],
    tactics: [
      "Start 10-15% above your target",
      "Negotiate if you have multiple offers",
      "Focus on work-life balance benefits",
      "Don't accept on the spot - ask for time"
    ],
    common: [
      "Pension contributions are a key benefit",
      "Private health insurance (Bupa, etc.)",
      "Flexible working is highly valued",
      "Annual bonus typically 5-20% of salary"
    ]
  }
};

export const industryMultipliers: Record<string, number> = {
  tech: 1.3,
  finance: 1.25,
  consulting: 1.15,
  healthcare: 1.0,
  retail: 0.85,
  manufacturing: 0.9,
  education: 0.8,
  government: 0.75
};

export const getTips = (countryId: string) => {
  return negotiationTips[countryId] || negotiationTips.us;
};
