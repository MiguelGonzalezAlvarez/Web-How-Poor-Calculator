export interface ProductPrice {
  id: string;
  name: string;
  nameEs: string;
  category: 'tech' | 'food' | 'transport' | 'housing' | 'entertainment' | 'fashion' | 'services';
  basePriceUSD: number;
  description: string;
  descriptionEs: string;
}

export interface CountryProductMultiplier {
  countryId: string;
  multiplier: number;
}

export const products: ProductPrice[] = [
  // TECH
  {
    id: 'iphone15pro',
    name: 'iPhone 15 Pro (256GB)',
    nameEs: 'iPhone 15 Pro (256GB)',
    category: 'tech',
    basePriceUSD: 999,
    description: 'Latest Apple flagship smartphone',
    descriptionEs: 'Smartphone insignia de Apple más reciente'
  },
  {
    id: 'macbookpro14',
    name: 'MacBook Pro 14" M3',
    nameEs: 'MacBook Pro 14" M3',
    category: 'tech',
    basePriceUSD: 1999,
    description: 'Professional laptop',
    descriptionEs: 'Portátil profesional'
  },
  {
    id: 'airpodspro',
    name: 'AirPods Pro 2nd Gen',
    nameEs: 'AirPods Pro 2ª Gen',
    category: 'tech',
    basePriceUSD: 249,
    description: 'Premium wireless earbuds',
    descriptionEs: 'Auriculares inalámbricos premium'
  },
  {
    id: 'ipadpro',
    name: 'iPad Pro 12.9"',
    nameEs: 'iPad Pro 12.9"',
    category: 'tech',
    basePriceUSD: 1099,
    description: 'Professional tablet',
    descriptionEs: 'Tableta profesional'
  },
  {
    id: 'samsungtv55',
    name: 'Samsung 55" 4K TV',
    nameEs: 'Samsung TV 4K 55"',
    category: 'tech',
    basePriceUSD: 799,
    description: '55-inch 4K Smart TV',
    descriptionEs: 'Televisor 4K inteligente de 55 pulgadas'
  },
  {
    id: 'ps5',
    name: 'PlayStation 5',
    nameEs: 'PlayStation 5',
    category: 'tech',
    basePriceUSD: 499,
    description: 'Next-gen gaming console',
    descriptionEs: 'Consola de videojuegos de siguiente generación'
  },
  {
    id: 'nintendoswitch',
    name: 'Nintendo Switch OLED',
    nameEs: 'Nintendo Switch OLED',
    category: 'tech',
    basePriceUSD: 349,
    description: 'Gaming handheld console',
    descriptionEs: 'Consola de videojuegos portátil'
  },
  {
    id: 'sonyheadphones',
    name: 'Sony WH-1000XM5',
    nameEs: 'Sony WH-1000XM5',
    category: 'tech',
    basePriceUSD: 399,
    description: 'Premium noise-canceling headphones',
    descriptionEs: 'Auriculares premium con cancelación de ruido'
  },

  // FOOD & DRINKS
  {
    id: 'starbuckslatte',
    name: 'Starbucks Latte (Grande)',
    nameEs: 'Café Latte Starbucks (Grande)',
    category: 'food',
    basePriceUSD: 5.50,
    description: 'Coffee drink at Starbucks',
    descriptionEs: 'Bebida de café en Starbucks'
  },
  {
    id: 'bigmac',
    name: 'Big Mac Meal',
    nameEs: 'Menú Big Mac',
    category: 'food',
    basePriceUSD: 10.50,
    description: 'Fast food meal',
    descriptionEs: 'Comida de comida rápida'
  },
  {
    id: 'dominospizza',
    name: 'Large Pizza (Dominos)',
    nameEs: 'Pizza Familiar (Dominos)',
    category: 'food',
    basePriceUSD: 24.99,
    description: 'Large pizza with toppings',
    descriptionEs: 'Pizza grande con ingredientes'
  },
  {
    id: 'waterbottle',
    name: 'Bottle of Water (1L)',
    nameEs: 'Botella de Agua (1L)',
    category: 'food',
    basePriceUSD: 1.50,
    description: 'Bottled water',
    descriptionEs: 'Agua embotellada'
  },
  {
    id: 'coffeehouse',
    name: 'Coffee at Café (Espresso)',
    nameEs: 'Café en cafetería (Espresso)',
    category: 'food',
    basePriceUSD: 3.00,
    description: 'Espresso at a cafe',
    descriptionEs: 'Espresso en una cafetería'
  },

  // TRANSPORT
  {
    id: 'toyotacamry',
    name: 'Toyota Camry (New)',
    nameEs: 'Toyota Camry (Nuevo)',
    category: 'transport',
    basePriceUSD: 28000,
    description: 'Mid-size sedan',
    descriptionEs: 'Sedán tamaño mediano'
  },
  {
    id: 'hondacivic',
    name: 'Honda Civic (New)',
    nameEs: 'Honda Civic (Nuevo)',
    category: 'transport',
    basePriceUSD: 24000,
    description: 'Compact car',
    descriptionEs: 'Coche compacto'
  },
  {
    id: 'teslamodel3',
    name: 'Tesla Model 3',
    nameEs: 'Tesla Model 3',
    category: 'transport',
    basePriceUSD: 42990,
    description: 'Electric sedan',
    descriptionEs: 'Sedán eléctrico'
  },
  {
    id: 'gastank',
    name: 'Gasoline (1 Gallon)',
    nameEs: 'Gasolina (1 Galón)',
    category: 'transport',
    basePriceUSD: 3.50,
    description: 'Average gas price',
    descriptionEs: 'Precio promedio de gasolina'
  },
  {
    id: 'uberx',
    name: 'Uber X (5 miles)',
    nameEs: 'Uber X (8 km)',
    category: 'transport',
    basePriceUSD: 15.00,
    description: 'Rideshare average trip',
    descriptionEs: 'Viaje promedio en rideshare'
  },
  {
    id: 'monthlypass',
    name: 'Monthly Public Transport',
    nameEs: 'Abono Transporte Mensual',
    category: 'transport',
    basePriceUSD: 80.00,
    description: 'Monthly public transit pass',
    descriptionEs: 'Abono mensual transporte público'
  },
  {
    id: 'airplane',
    name: 'Flight NYC-London (Economy)',
    nameEs: 'Vuelo NYC-Londres (Económica)',
    category: 'transport',
    basePriceUSD: 600,
    description: 'International flight',
    descriptionEs: 'Vuelo internacional'
  },

  // HOUSING
  {
    id: 'rent1brcenter',
    name: 'Rent: 1BR Apartment (City Center)',
    nameEs: 'Alquiler: Apartamento 1 Hab (Centro)',
    category: 'housing',
    basePriceUSD: 1800,
    description: 'Monthly rent for 1 bedroom in center',
    descriptionEs: 'Alquiler mensual de 1 habitación en centro'
  },
  {
    id: 'rent1broutside',
    name: 'Rent: 1BR Apartment (Outside Center)',
    nameEs: 'Alquiler: Apartamento 1 Hab (Afueras)',
    category: 'housing',
    basePriceUSD: 1400,
    description: 'Monthly rent for 1 bedroom outside center',
    descriptionEs: 'Alquiler mensual de 1 habitación en afueras'
  },
  {
    id: 'rent3brcenter',
    name: 'Rent: 3BR Apartment (City Center)',
    nameEs: 'Alquiler: Apartamento 3 Hab (Centro)',
    category: 'housing',
    basePriceUSD: 3200,
    description: 'Monthly rent for 3 bedrooms in center',
    descriptionEs: 'Alquiler mensual de 3 habitaciones en centro'
  },
  {
    id: 'utilities',
    name: 'Monthly Utilities (85m2)',
    nameEs: 'Servicios Mensuales (85m2)',
    category: 'housing',
    basePriceUSD: 180,
    description: 'Electricity, heating, water, garbage',
    descriptionEs: 'Electricidad, calefacción, agua, basura'
  },
  {
    id: 'internet',
    name: 'Internet (60 Mbps)',
    nameEs: 'Internet (60 Mbps)',
    category: 'housing',
    basePriceUSD: 50,
    description: 'Monthly broadband',
    descriptionEs: 'Banda ancha mensual'
  },

  // ENTERTAINMENT
  {
    id: 'netflix',
    name: 'Netflix Premium',
    nameEs: 'Netflix Premium',
    category: 'entertainment',
    basePriceUSD: 22.99,
    description: 'Streaming subscription',
    descriptionEs: 'Suscripción de streaming'
  },
  {
    id: 'spotify',
    name: 'Spotify Premium',
    nameEs: 'Spotify Premium',
    category: 'entertainment',
    basePriceUSD: 10.99,
    description: 'Music streaming',
    descriptionEs: 'Streaming de música'
  },
  {
    id: 'gym',
    name: 'Gym Membership',
    nameEs: 'Abono Gimnasio',
    category: 'entertainment',
    basePriceUSD: 50,
    description: 'Monthly gym membership',
    descriptionEs: 'Membresía mensual de gimnasio'
  },
  {
    id: 'movie',
    name: 'Movie Ticket',
    nameEs: 'Entrada de Cine',
    category: 'entertainment',
    basePriceUSD: 15,
    description: 'Cinema ticket',
    descriptionEs: 'Entrada de cine'
  },
  {
    id: 'concert',
    name: 'Concert Ticket (Average)',
    nameEs: 'Entrada de Concierto (Promedio)',
    category: 'entertainment',
    basePriceUSD: 100,
    description: 'Average concert ticket',
    descriptionEs: 'Entrada promedio de concierto'
  },

  // FASHION
  {
    id: 'zara',
    name: 'Zara Basic T-Shirt',
    nameEs: 'Camiseta Básica Zara',
    category: 'fashion',
    basePriceUSD: 15,
    description: 'Basic t-shirt',
    descriptionEs: 'Camiseta básica'
  },
  {
    id: 'nike',
    name: 'Nike Air Max',
    nameEs: 'Nike Air Max',
    category: 'fashion',
    basePriceUSD: 130,
    description: 'Popular sneaker',
    descriptionEs: 'Zapatilla popular'
  },
  {
    id: 'adidas',
    name: 'Adidas Ultraboost',
    nameEs: 'Adidas Ultraboost',
    category: 'fashion',
    basePriceUSD: 180,
    description: 'Premium running shoe',
    descriptionEs: 'Zapatilla premium para correr'
  },
  {
    id: 'levis',
    name: "Levi's 501 Jeans",
    nameEs: 'Vaqueros Levis 501',
    category: 'fashion',
    basePriceUSD: 69,
    description: 'Classic jeans',
    descriptionEs: 'Vaqueros clásicos'
  },
  {
    id: 'winterjacket',
    name: 'Winter Jacket (Quality)',
    nameEs: 'Abrigo de Invierno (Calidad)',
    category: 'fashion',
    basePriceUSD: 200,
    description: 'Quality winter coat',
    descriptionEs: 'Abrigo de invierno de calidad'
  },

  // SERVICES
  {
    id: 'hairstyle',
    name: "Men's Haircut",
    nameEs: 'Corte de Pelo (Hombre)',
    category: 'services',
    basePriceUSD: 30,
    description: 'Basic haircut',
    descriptionEs: 'Corte de pelo básico'
  },
  {
    id: 'carinsurance',
    name: 'Car Insurance (Monthly)',
    nameEs: 'Seguro de Coche (Mensual)',
    category: 'services',
    basePriceUSD: 120,
    description: 'Comprehensive car insurance',
    descriptionEs: 'Seguro de coche completo'
  },
  {
    id: 'healthinsurance',
    name: 'Health Insurance (Monthly)',
    nameEs: 'Seguro Médico (Mensual)',
    category: 'services',
    basePriceUSD: 350,
    description: 'Basic health insurance',
    descriptionEs: 'Seguro médico básico'
  },
  {
    id: 'dental',
    name: 'Dental Checkup',
    nameEs: 'Revisión Dental',
    category: 'services',
    basePriceUSD: 80,
    description: 'Basic dental cleaning',
    descriptionEs: 'Limpieza dental básica'
  },
  {
    id: 'kindle',
    name: 'Kindle Paperwhite',
    nameEs: 'Kindle Paperwhite',
    category: 'services',
    basePriceUSD: 139,
    description: 'E-reader',
    descriptionEs: 'Lector de libros electrónicos'
  }
];

// Multipliers for different countries (relative to US = 1.0)
export const countryMultipliers: Record<string, CountryProductMultiplier> = {
  us: { countryId: 'us', multiplier: 1.0 },
  es: { countryId: 'es', multiplier: 0.85 },
  gb: { countryId: 'gb', multiplier: 1.05 },
  de: { countryId: 'de', multiplier: 0.95 },
  fr: { countryId: 'fr', multiplier: 0.90 },
  it: { countryId: 'it', multiplier: 0.82 },
  pt: { countryId: 'pt', multiplier: 0.70 },
  nl: { countryId: 'nl', multiplier: 1.10 },
  be: { countryId: 'be', multiplier: 0.95 },
  ch: { countryId: 'ch', multiplier: 1.35 },
  at: { countryId: 'at', multiplier: 0.98 },
  ie: { countryId: 'ie', multiplier: 1.05 },
  se: { countryId: 'se', multiplier: 0.95 },
  no: { countryId: 'no', multiplier: 1.20 },
  dk: { countryId: 'dk', multiplier: 1.15 },
  fi: { countryId: 'fi', multiplier: 0.95 },
  jp: { countryId: 'jp', multiplier: 0.90 },
  ca: { countryId: 'ca', multiplier: 0.95 },
  au: { countryId: 'au', multiplier: 1.05 },
  br: { countryId: 'br', multiplier: 0.60 },
  mx: { countryId: 'mx', multiplier: 0.55 },
  ar: { countryId: 'ar', multiplier: 0.50 },
  co: { countryId: 'co', multiplier: 0.50 },
  cl: { countryId: 'cl', multiplier: 0.65 },
  in: { countryId: 'in', multiplier: 0.35 },
  kr: { countryId: 'kr', multiplier: 0.85 },
  sg: { countryId: 'sg', multiplier: 1.15 },
  ae: { countryId: 'ae', multiplier: 0.90 },
  cn: { countryId: 'cn', multiplier: 0.55 },
  ru: { countryId: 'ru', multiplier: 0.50 },
  za: { countryId: 'za', multiplier: 0.55 },
  ng: { countryId: 'ng', multiplier: 0.40 },
  th: { countryId: 'th', multiplier: 0.45 },
  my: { countryId: 'my', multiplier: 0.45 },
  id: { countryId: 'id', multiplier: 0.40 },
  ph: { countryId: 'ph', multiplier: 0.40 },
  vn: { countryId: 'vn', multiplier: 0.35 },
  tr: { countryId: 'tr', multiplier: 0.45 },
  sa: { countryId: 'sa', multiplier: 0.75 },
  il: { countryId: 'il', multiplier: 0.95 },
  pl: { countryId: 'pl', multiplier: 0.55 },
  cz: { countryId: 'cz', multiplier: 0.60 },
  hu: { countryId: 'hu', multiplier: 0.50 },
  ro: { countryId: 'ro', multiplier: 0.45 },
  gr: { countryId: 'gr', multiplier: 0.60 }
};

export const getProductPrice = (productId: string, countryCode: string): number => {
  const product = products.find(p => p.id === productId);
  if (!product) return 0;
  
  const multiplier = countryMultipliers[countryCode]?.multiplier || 0.8;
  return product.basePriceUSD * multiplier;
};

export const getProductPrices = (countryCode: string): Record<string, number> => {
  const prices: Record<string, number> = {};
  products.forEach(product => {
    prices[product.id] = getProductPrice(product.id, countryCode);
  });
  return prices;
};

export const calculateWorkHours = (
  productPriceUSD: number,
  hourlyRateUSD: number
): number => {
  if (hourlyRateUSD <= 0) return 0;
  return Math.round((productPriceUSD / hourlyRateUSD) * 10) / 10;
};

export const getHoursWorkedForProduct = (
  productId: string,
  countryCode: string,
  monthlySalaryUSD: number
): number => {
  const price = getProductPrice(productId, countryCode);
  const hourlyRate = monthlySalaryUSD / 160; // ~160 working hours/month
  return calculateWorkHours(price, hourlyRate);
};
