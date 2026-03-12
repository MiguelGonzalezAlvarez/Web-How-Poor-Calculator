export interface NegotiationTip {
  topic: string;
  topicEs: string;
  tip: string;
  tipEs: string;
  importance: 'high' | 'medium' | 'low';
}

export interface CountryNegotiationData {
  countryId: string;
  tips: NegotiationTip[];
  salaryDiscussionTiming: string;
  salaryDiscussionTimingEs: string;
  benefitsNegotiable: string[];
  benefitsNegotiableEs: string[];
  redFlags: string[];
  redFlagsEs: string[];
}

export const negotiationData: CountryNegotiationData[] = [
  {
    countryId: 'us',
    salaryDiscussionTiming: 'After first offer, never before',
    salaryDiscussionTimingEs: 'Después de la primera oferta, nunca antes',
    benefitsNegotiable: ['Sign-on bonus', 'Stock units', 'Remote work', 'Vacation days', 'Title'],
    benefitsNegotiableEs: ['Bonus de firma', 'Stock units', 'Trabajo remoto', 'Días de vacaciones', 'Título'],
    redFlags: [
      'Salary negotiation seen as aggressive',
      'No equity discussion until offer',
      'Health insurance waiting periods'
    ],
    redFlagsEs: [
      'Negociación salarial vista como agresiva',
      'Sin discusión de equity hasta oferta',
      'Períodos de espera para seguro médico'
    ],
    tips: [
      { topic: 'Research', topicEs: 'Investigación', tip: 'Use Glassdoor, Levels.fyi for market data', tipEs: 'Usa Glassdoor, Levels.fyi para datos de mercado', importance: 'high' },
      { topic: 'Timing', topicEs: 'Tiempo', tip: 'Never reveal salary expectations first', tipEs: 'Nunca reveles expectativas salariales primero', importance: 'high' },
      { topic: 'Strategy', topicEs: 'Estrategia', tip: 'Present range based on research, aim high', tipEs: 'Presenta rango basado en investigación, apunta alto', importance: 'high' },
      { topic: 'Benefits', topicEs: 'Beneficios', tip: 'Everything is negotiable: equity, bonus, vacation', tipEs: 'Todo es negociable: equity, bonus, vacaciones', importance: 'medium' },
      { topic: 'Remote', topicEs: 'Remoto', tip: 'Remote work significantly reduces salary', tipEs: 'Trabajo remoto reduce significativamente el salario', importance: 'medium' }
    ]
  },
  {
    countryId: 'gb',
    salaryDiscussionTiming: 'During interview process, be transparent',
    salaryDiscussionTimingEs: 'Durante el proceso de entrevista, sé transparente',
    benefitsNegotiable: ['Pension contribution', 'Holiday days', 'Remote work', 'Professional development'],
    benefitsNegotiableEs: ['Contribución a pensión', 'Días de vacaciones', 'Trabajo remoto', 'Desarrollo profesional'],
    redFlags: [
      'Very rigid salary bands',
      'Benefits rarely negotiable',
      'Notice period expectations'
    ],
    redFlagsEs: [
      'Bandas salariales muy rígidas',
      'Beneficios raramente negociables',
      'Expectativas de período de aviso'
    ],
    tips: [
      { topic: 'Research', topicEs: 'Investigación', tip: 'Check Glassdoor, Reed, Totaljobs for ranges', tipEs: 'Consulta Glassdoor, Reed, Totaljobs para rangos', importance: 'high' },
      { topic: 'Transparency', topicEs: 'Transparencia', tip: 'UK values honest salary discussions', tipEs: 'UK valora discusiones salariales honestas', importance: 'medium' },
      { topic: 'Benefits', topicEs: 'Beneficios', tip: 'Focus on pension, holiday, flexibility', tipEs: 'Enfócate en pensión, vacaciones, flexibilidad', importance: 'medium' },
      { topic: 'Culture', topicEs: 'Cultura', tip: 'Underpromise, overdeliver approach works', tipEs: 'Enfócate en dar más de lo que prometes', importance: 'medium' }
    ]
  },
  {
    countryId: 'de',
    salaryDiscussionTiming: 'Standard process, salary bands are public',
    salarySalarioDiscussionTimingEs: 'Proceso estándar, las bandas salariales son públicas',
    benefitsNegotiable: ['Company car', 'Remote work', 'Additional vacation', 'Bonus'],
    benefitsNegotiableEs: ['Coche de empresa', 'Trabajo remoto', 'Vacaciones adicionales', 'Bonus'],
    redFlags: [
      'Strict hierarchical culture',
      '13th month often mandatory',
      'Strong worker protections'
    ],
    redFlagsEs: [
      'Cultura jerárquica estricta',
      '13º mes a menudo obligatorio',
      'Fuertes protecciones laborales'
    ],
    tips: [
      { topic: 'Research', topicEs: 'Investigación', tip: 'Use Gehalt.de, Kununu for salary data', tipEs: 'Usa Gehalt.de, Kununu para datos salariales', importance: 'high' },
      { topic: 'Benefits', topicEs: 'Beneficios', tip: 'Company car is highly negotiable', tipEs: 'Coche de empresa es muy negociable', importance: 'high' },
      { topic: 'Culture', topicEs: 'Cultura', tip: 'Be professional but not too aggressive', tipEs: 'Sé profesional pero no muy agresivo', importance: 'medium' },
      { topic: 'Skills', topicEs: 'Habilidades', tip: 'Show how you add specific value', tipEs: 'Muestra cómo añades valor específico', importance: 'medium' }
    ]
  },
  {
    countryId: 'es',
    salaryDiscussionTiming: 'Usually discussed in final interview',
    salaryDiscussionTimingEs: 'Generalmente discutido en entrevista final',
    benefitsNegotiable: ['Salary', 'Flexibility', 'Remote days', 'Training budget'],
    benefitsNegotiableEs: ['Salario', 'Flexibilidad', 'Días remotos', 'Presupuesto formación'],
    redFlags: [
      'Salary often non-negotiable in SMEs',
      'Trial period expectations',
      'Cost-to-company vs net confusion'
    ],
    redFlagsEs: [
      'Salario a menudo no negociable en PYMES',
      'Expectativas de período de prueba',
      'Confusión coste-empresa vs neto'
    ],
    tips: [
      { topic: 'Research', topicEs: 'Investigación', tip: 'Check Glassdoor, LinkedIn Salary', tipEs: 'Consulta Glassdoor, LinkedIn Salario', importance: 'high' },
      { topic: 'Culture', topicEs: 'Cultura', tip: 'Relationship first, business second', tipEs: 'Relación primero, negocio después', importance: 'high' },
      { topic: 'Benefits', topicEs: 'Beneficios', tip: 'Flexibility often more valuable than salary', tipEs: 'Flexibilidad a menudo más valiosa que salario', importance: 'medium' },
      { topic: 'Timing', topicEs: 'Tiempo', tip: 'Wait for offer before negotiating', tipEs: 'Espera la oferta antes de negociar', importance: 'medium' }
    ]
  },
  {
    countryId: 'fr',
    salaryDiscussionTiming: 'Discussed but within strict ranges',
    salaryDiscussionTimingEs: 'Discutido pero dentro de rangos estrictos',
    benefitsNegotiable: ['RTT', 'Telecommuting', 'Restaurant tickets', 'Profit sharing'],
    benefitsNegotiableEs: ['RTT', 'Telecomunicación', 'Tickets restaurante', 'Participación beneficios'],
    redFlags: [
      'Very formal negotiation process',
      'Collective agreements limit flexibility',
      'Cadre vs non-cadre distinction'
    ],
    redFlagsEs: [
      'Proceso de negociación muy formal',
      'Acuerdos colectivos limitan flexibilidad',
      'Distinción cadre vs no cadre'
    ],
    tips: [
      { topic: 'Research', topicEs: 'Investigación', tip: 'Use Glassdoor, Welcome to the Jungle', tipEs: 'Usa Glassdoor, Welcome to the Jungle', importance: 'high' },
      { topic: 'Benefits', topicEs: 'Benefits', tip: 'RTT days are valuable, negotiate extra', tipEs: 'Días RTT son valiosos, negocia extras', importance: 'high' },
      { topic: 'Culture', topicEs: 'Cultura', tip: 'Formal approach, respect hierarchy', tipEs: 'Enfoque formal, respeta jerarquía', importance: 'medium' },
      { topic: 'Language', topicEs: 'Idioma', tip: 'French CV format preferred', tipEs: 'Formato CV francés preferido', importance: 'low' }
    ]
  },
  {
    countryId: 'nl',
    salaryDiscussionTiming: 'Open discussion throughout process',
    salaryDiscussionTimingEs: 'Discusión abierta durante todo el proceso',
    benefitsNegotiable: ['Holiday allowance', '13th month', 'Remote work', 'Learning budget'],
    benefitsNegotiableEs: ['Vacaciones', '13º mes', 'Trabajo remoto', 'Presupuesto aprendizaje'],
    redFlags: [
      '30% ruling for expats (check eligibility)',
      'Strict pension contributions',
      'High taxes'
    ],
    redFlagsEs: [
      '30% ruling para expatriados (verifica elegibilidad)',
      'Contribuciones a pensión estrictas',
      'Impuestos altos'
    ],
    tips: [
      { topic: 'Research', topicEs: 'Investigación', tip: 'Check Glassdoor, Loonwijzer', tipEs: 'Consulta Glassdoor, Loonwijzer', importance: 'high' },
      { topic: 'Expat', topicEs: 'Expatriado', tip: 'Ask about 30% ruling for tax benefits', tipEs: 'Pregunta por 30% ruling para beneficios fiscales', importance: 'high' },
      { topic: 'Benefits', topicEs: 'Beneficios', tip: 'Holiday allowance (8%) is standard', tipEs: 'Vacaciones (8%) es estándar', importance: 'medium' },
      { topic: 'Directness', topicEs: 'Directitud', tip: 'Dutch value direct communication', tipEs: 'Holandeses valoran comunicación directa', importance: 'medium' }
    ]
  },
  {
    countryId: 'pt',
    salaryDiscussionTiming: 'Usually at offer stage',
    salaryDiscussionTimingEs: 'Generalmente en etapa de oferta',
    benefitsNegotiable: ['Remote work', 'Flexibility', 'Meal cards', 'Car allowance'],
    benefitsNegotiableEs: ['Trabajo remoto', 'Flexibilidad', 'Tarjetas comida', 'Subsidio coche'],
    redFlags: [
      'Salary significantly below EU average',
      ' probation period flexibility',
      'Cost-of-living differences between Lisbon/Porto'
    ],
    redFlagsEs: [
      'Salario significativamente debajo promedio UE',
      'Flexibilidad período de prueba',
      'Diferencias coste-vida Lisboa/Oporto'
    ],
    tips: [
      { topic: 'Research', topicEs: 'Investigación', tip: 'Check Glassdoor, Glassdoor Portugal', tipEs: 'Consulta Glassdoor Portugal', importance: 'high' },
      { topic: 'Location', topicEs: 'Ubicación', tip: 'Lisbon salaries higher but costlier', tipEs: 'Salarios Lisboa más altos pero más caros', importance: 'medium' },
      { topic: 'Benefits', topicEs: 'Benefits', tip: 'Remote work very negotiable', tipEs: 'Trabajo remoto muy negociable', importance: 'high' },
      { topic: 'Culture', topicEs: 'Cultura', tip: 'Relationship matters, be patient', tipEs: 'Las relaciones importan, sé paciente', importance: 'medium' }
    ]
  },
  {
    countryId: 'latam_remote',
    salaryDiscussionTiming: 'Before interview, often fixed budgets',
    salaryDiscussionTimingEs: 'Antes de entrevista, a menudo presupuestos fijos',
    benefitsNegotiable: ['Remote work', 'Equipment', 'Learning budget', 'Flexible hours'],
    benefitsNegotiableEs: ['Trabajo remoto', 'Equipamento', 'Presupuesto aprendizaje', 'Horarios flexibles'],
    redFlags: [
      'USD salaries vs local currency confusion',
      'Tax implications of USD income',
      ' timezone differences'
    ],
    redFlagsEs: [
      'Confusión salarios USD vs moneda local',
      'Implicaciones fiscales de ingreso USD',
      'Diferencias de zona horaria'
    ],
    tips: [
      { topic: 'Research', topicEs: 'Investigación', tip: 'Levels.fyi, AngelList for remote ranges', tipEs: 'Levels.fyi, AngelList para rangos remotos', importance: 'high' },
      { topic: 'Tax', topicEs: 'Impuestos', tip: 'Research tax implications in your country', tipEs: 'Investiga implicaciones fiscales en tu país', importance: 'high' },
      { topic: 'Benefits', topicEs: 'Benefits', tip: 'Equipment, learning often negotiable', tipEs: 'Equipamento, aprendizaje a menudo negociable', importance: 'medium' },
      { topic: 'Value', topicEs: 'Valor', tip: 'Show unique value to command premium', tipEs: 'Muestra valor único para exigir prima', importance: 'high' }
    ]
  }
];

export const getNegotiationData = (countryId: string): CountryNegotiationData | undefined => {
  return negotiationData.find(d => d.countryId === countryId);
};

export const getNegotiationTips = (countryId: string): NegotiationTip[] => {
  const data = getNegotiationData(countryId);
  return data?.tips || [];
};
