import { Country, Currency, ExchangeRates, CostItems, TaxRates, Industry } from '../types';

export const countries: Country[] = [
  {
    id: "us",
    name: "United States",
    nameEs: "Estados Unidos",
    code: "US",
    currency: "USD",
    currencySymbol: "$",
    flag: "🇺🇸",
    lat: 37.0902,
    lng: -95.7129,
    gdpPppPerCapita: 73637,
    costOfLivingIndex: 100,
    purchasingPowerIndex: 100,
    qualityOfLife: { healthcare: 77, safety: 50, education: 78, climate: 65, pollution: 55 },
    regions: [
      { id: "us-ny", name: "New York", nameEs: "Nueva York", costOfLivingIndex: 100, rentIndex: 100, purchasingPowerIndex: 100 },
      { id: "us-ca", name: "California", nameEs: "California", costOfLivingIndex: 92, rentIndex: 88, purchasingPowerIndex: 105 },
      { id: "us-tx", name: "Texas", nameEs: "Texas", costOfLivingIndex: 68, rentIndex: 52, purchasingPowerIndex: 95 },
      { id: "us-fl", name: "Florida", nameEs: "Florida", costOfLivingIndex: 72, rentIndex: 58, purchasingPowerIndex: 88 },
      { id: "us-il", name: "Illinois", nameEs: "Illinois", costOfLivingIndex: 77, rentIndex: 55, purchasingPowerIndex: 92 },
      { id: "us-wa", name: "Washington", nameEs: "Washington", costOfLivingIndex: 85, rentIndex: 72, purchasingPowerIndex: 108 },
      { id: "us-ma", name: "Massachusetts", nameEs: "Massachusetts", costOfLivingIndex: 88, rentIndex: 82, purchasingPowerIndex: 102 },
      { id: "us-co", name: "Colorado", nameEs: "Colorado", costOfLivingIndex: 78, rentIndex: 65, purchasingPowerIndex: 98 }
    ]
  },
  {
    id: "gb",
    name: "United Kingdom",
    nameEs: "Reino Unido",
    code: "GB",
    currency: "GBP",
    currencySymbol: "£",
    flag: "🇬🇧",
    lat: 55.3781,
    lng: -3.4360,
    gdpPppPerCapita: 48913,
    costOfLivingIndex: 72,
    purchasingPowerIndex: 82,
    qualityOfLife: { healthcare: 75, safety: 70, education: 82, climate: 55, pollution: 45 },
    regions: [
      { id: "gb-lon", name: "London", nameEs: "Londres", costOfLivingIndex: 95, rentIndex: 95, purchasingPowerIndex: 85 },
      { id: "gb-se", name: "South East", nameEs: "Sureste", costOfLivingIndex: 72, rentIndex: 65, purchasingPowerIndex: 88 },
      { id: "gb-sc", name: "Scotland", nameEs: "Escocia", costOfLivingIndex: 62, rentIndex: 48, purchasingPowerIndex: 80 },
      { id: "gb-nw", name: "North West", nameEs: "Noroeste", costOfLivingIndex: 58, rentIndex: 45, purchasingPowerIndex: 78 },
      { id: "gb-we", name: "West Midlands", nameEs: "Midlands Occidentales", costOfLivingIndex: 55, rentIndex: 42, purchasingPowerIndex: 76 }
    ]
  },
  {
    id: "de",
    name: "Germany",
    nameEs: "Alemania",
    code: "DE",
    currency: "EUR",
    currencySymbol: "€",
    flag: "🇩🇪",
    lat: 51.1657,
    lng: 10.4515,
    gdpPppPerCapita: 56429,
    costOfLivingIndex: 62,
    purchasingPowerIndex: 95,
    qualityOfLife: { healthcare: 87, safety: 78, education: 88, climate: 52, pollution: 42 },
    regions: [
      { id: "de-be", name: "Berlin", nameEs: "Berlín", costOfLivingIndex: 65, rentIndex: 55, purchasingPowerIndex: 90 },
      { id: "de-by", name: "Bavaria", nameEs: "Baviera", costOfLivingIndex: 68, rentIndex: 58, purchasingPowerIndex: 98 },
      { id: "de-nw", name: "North Rhine-Westphalia", nameEs: "Renania del Norte-Westfalia", costOfLivingIndex: 60, rentIndex: 48, purchasingPowerIndex: 92 },
      { id: "de-he", name: "Hesse", nameEs: "Hesse", costOfLivingIndex: 64, rentIndex: 52, purchasingPowerIndex: 96 },
      { id: "de-bw", name: "Baden-Württemberg", nameEs: "Baden-Württemberg", costOfLivingIndex: 63, rentIndex: 50, purchasingPowerIndex: 97 }
    ]
  },
  {
    id: "fr",
    name: "France",
    nameEs: "Francia",
    code: "FR",
    currency: "EUR",
    currencySymbol: "€",
    flag: "🇫🇷",
    lat: 46.2276,
    lng: 2.2137,
    gdpPppPerCapita: 49413,
    costOfLivingIndex: 68,
    purchasingPowerIndex: 80,
    qualityOfLife: { healthcare: 85, safety: 75, education: 84, climate: 62, pollution: 48 },
    regions: [
      { id: "fr-idf", name: "Île-de-France", nameEs: "Isla de Francia", costOfLivingIndex: 85, rentIndex: 80, purchasingPowerIndex: 82 },
      { id: "fr-pac", name: "Provence-Alpes-Côte d'Azur", nameEs: "Provenza-Alpes-Costa Azul", costOfLivingIndex: 72, rentIndex: 62, purchasingPowerIndex: 78 },
      { id: "fr-occ", name: "Occitanie", nameEs: "Occitania", costOfLivingIndex: 58, rentIndex: 42, purchasingPowerIndex: 75 },
      { id: "fr-au", name: "Auvergne-Rhône-Alpes", nameEs: "Auvernia-Ródano-Alpes", costOfLivingIndex: 62, rentIndex: 48, purchasingPowerIndex: 82 },
      { id: "fr-naq", name: "Nouvelle-Aquitaine", nameEs: "Nueva Aquitania", costOfLivingIndex: 55, rentIndex: 38, purchasingPowerIndex: 76 }
    ]
  },
  {
    id: "es",
    name: "Spain",
    nameEs: "España",
    code: "ES",
    currency: "EUR",
    currencySymbol: "€",
    flag: "🇪🇸",
    lat: 40.4637,
    lng: -3.7492,
    gdpPppPerCapita: 45432,
    costOfLivingIndex: 54,
    purchasingPowerIndex: 72,
    qualityOfLife: { healthcare: 80, safety: 78, education: 75, climate: 85, pollution: 35 },
    regions: [
      { id: "es-md", name: "Madrid", nameEs: "Madrid", costOfLivingIndex: 58, rentIndex: 52, purchasingPowerIndex: 78 },
      { id: "es-ba", name: "Barcelona", nameEs: "Barcelona", costOfLivingIndex: 62, rentIndex: 58, purchasingPowerIndex: 75 },
      { id: "es-pv", name: "Basque Country", nameEs: "País Vasco", costOfLivingIndex: 55, rentIndex: 42, purchasingPowerIndex: 85 },
      { id: "es-an", name: "Andalusia", nameEs: "Andalucía", costOfLivingIndex: 45, rentIndex: 32, purchasingPowerIndex: 68 },
      { id: "es-vc", name: "Valencia", nameEs: "Valencia", costOfLivingIndex: 48, rentIndex: 35, purchasingPowerIndex: 70 },
      { id: "es-ga", name: "Galicia", nameEs: "Galicia", costOfLivingIndex: 42, rentIndex: 28, purchasingPowerIndex: 65 },
      { id: "es-cn", name: "Canary Islands", nameEs: "Islas Canarias", costOfLivingIndex: 48, rentIndex: 36, purchasingPowerIndex: 66 }
    ]
  },
  {
    id: "it",
    name: "Italy",
    nameEs: "Italia",
    code: "IT",
    currency: "EUR",
    currencySymbol: "€",
    flag: "🇮🇹",
    lat: 41.8719,
    lng: 12.5674,
    gdpPppPerCapita: 45813,
    costOfLivingIndex: 58,
    purchasingPowerIndex: 70,
    qualityOfLife: { healthcare: 82, safety: 72, education: 76, climate: 75, pollution: 52 },
    regions: [
      { id: "it-lo", name: "Lombardy", nameEs: "Lombardía", costOfLivingIndex: 68, rentIndex: 58, purchasingPowerIndex: 78 },
      { id: "it-la", name: "Lazio", nameEs: "Lacio", costOfLivingIndex: 65, rentIndex: 55, purchasingPowerIndex: 72 },
      { id: "it-ve", name: "Veneto", nameEs: "Veneto", costOfLivingIndex: 55, rentIndex: 42, purchasingPowerIndex: 75 },
      { id: "it-em", name: "Emilia-Romagna", nameEs: "Emilia-Romaña", costOfLivingIndex: 56, rentIndex: 44, purchasingPowerIndex: 76 },
      { id: "it-to", name: "Piedmont", nameEs: "Piamonte", costOfLivingIndex: 52, rentIndex: 38, purchasingPowerIndex: 74 }
    ]
  },
  {
    id: "ca",
    name: "Canada",
    nameEs: "Canadá",
    code: "CA",
    currency: "CAD",
    currencySymbol: "$",
    flag: "🇨🇦",
    lat: 56.1304,
    lng: -106.3468,
    gdpPppPerCapita: 54966,
    costOfLivingIndex: 72,
    purchasingPowerIndex: 88,
    qualityOfLife: { healthcare: 82, safety: 78, education: 85, climate: 45, pollution: 38 },
    regions: [
      { id: "ca-on", name: "Ontario", nameEs: "Ontario", costOfLivingIndex: 75, rentIndex: 65, purchasingPowerIndex: 90 },
      { id: "ca-bc", name: "British Columbia", nameEs: "Columbia Británica", costOfLivingIndex: 78, rentIndex: 72, purchasingPowerIndex: 85 },
      { id: "ca-qc", name: "Quebec", nameEs: "Quebec", costOfLivingIndex: 62, rentIndex: 48, purchasingPowerIndex: 82 },
      { id: "ca-ab", name: "Alberta", nameEs: "Alberta", costOfLivingIndex: 68, rentIndex: 52, purchasingPowerIndex: 95 },
      { id: "ca-ma", name: "Manitoba", nameEs: "Manitoba", costOfLivingIndex: 58, rentIndex: 42, purchasingPowerIndex: 80 }
    ]
  },
  {
    id: "au",
    name: "Australia",
    nameEs: "Australia",
    code: "AU",
    currency: "AUD",
    currencySymbol: "$",
    flag: "🇦🇺",
    lat: -25.2744,
    lng: 133.7751,
    gdpPppPerCapita: 64674,
    costOfLivingIndex: 82,
    purchasingPowerIndex: 95,
    qualityOfLife: { healthcare: 85, safety: 82, education: 88, climate: 78, pollution: 32 },
    regions: [
      { id: "au-nsw", name: "New South Wales", nameEs: "Nueva Gales del Sur", costOfLivingIndex: 88, rentIndex: 85, purchasingPowerIndex: 98 },
      { id: "au-vic", name: "Victoria", nameEs: "Victoria", costOfLivingIndex: 82, rentIndex: 75, purchasingPowerIndex: 92 },
      { id: "au-qld", name: "Queensland", nameEs: "Queensland", costOfLivingIndex: 75, rentIndex: 62, purchasingPowerIndex: 90 },
      { id: "au-wa", name: "Western Australia", nameEs: "Australia Occidental", costOfLivingIndex: 78, rentIndex: 65, purchasingPowerIndex: 102 },
      { id: "au-sa", name: "South Australia", nameEs: "Australia Meridional", costOfLivingIndex: 65, rentIndex: 48, purchasingPowerIndex: 82 }
    ]
  },
  {
    id: "jp",
    name: "Japan",
    nameEs: "Japón",
    code: "JP",
    currency: "JPY",
    currencySymbol: "¥",
    flag: "🇯🇵",
    lat: 36.2048,
    lng: 138.2529,
    gdpPppPerCapita: 47793,
    costOfLivingIndex: 75,
    purchasingPowerIndex: 85,
    qualityOfLife: { healthcare: 89, safety: 92, education: 86, climate: 72, pollution: 40 },
    regions: [
      { id: "jp-13", name: "Tokyo", nameEs: "Tokio", costOfLivingIndex: 92, rentIndex: 85, purchasingPowerIndex: 88 },
      { id: "jp-27", name: "Osaka", nameEs: "Osaka", costOfLivingIndex: 72, rentIndex: 58, purchasingPowerIndex: 82 },
      { id: "jp-14", name: "Kanagawa", nameEs: "Kanagawa", costOfLivingIndex: 70, rentIndex: 55, purchasingPowerIndex: 84 },
      { id: "jp-23", name: "Aichi", nameEs: "Aichi", costOfLivingIndex: 62, rentIndex: 45, purchasingPowerIndex: 80 },
      { id: "jp-01", name: "Hokkaido", nameEs: "Hokkaido", costOfLivingIndex: 55, rentIndex: 38, purchasingPowerIndex: 72 }
    ]
  },
  {
    id: "cn",
    name: "China",
    nameEs: "China",
    code: "CN",
    currency: "CNY",
    currencySymbol: "¥",
    flag: "🇨🇳",
    lat: 35.8617,
    lng: 104.1954,
    gdpPppPerCapita: 21469,
    costOfLivingIndex: 45,
    purchasingPowerIndex: 65,
    qualityOfLife: { healthcare: 70, safety: 85, education: 72, climate: 55, pollution: 75 },
    regions: [
      { id: "cn-sh", name: "Shanghai", nameEs: "Shanghái", costOfLivingIndex: 65, rentIndex: 72, purchasingPowerIndex: 75 },
      { id: "cn-bj", name: "Beijing", nameEs: "Pekín", costOfLivingIndex: 62, rentIndex: 68, purchasingPowerIndex: 72 },
      { id: "cn-gd", name: "Guangdong", nameEs: "Guangdong", costOfLivingIndex: 52, rentIndex: 48, purchasingPowerIndex: 68 },
      { id: "cn-js", name: "Jiangsu", nameEs: "Jiangsu", costOfLivingIndex: 48, rentIndex: 42, purchasingPowerIndex: 62 },
      { id: "cn-zj", name: "Zhejiang", nameEs: "Zhejiang", costOfLivingIndex: 50, rentIndex: 45, purchasingPowerIndex: 65 }
    ]
  },
  {
    id: "br",
    name: "Brazil",
    nameEs: "Brasil",
    code: "BR",
    currency: "BRL",
    currencySymbol: "R$",
    flag: "🇧🇷",
    lat: -14.2350,
    lng: -51.9253,
    gdpPppPerCapita: 18426,
    costOfLivingIndex: 42,
    purchasingPowerIndex: 55,
    qualityOfLife: { healthcare: 65, safety: 42, education: 62, climate: 72, pollution: 48 },
    regions: [
      { id: "br-sp", name: "São Paulo", nameEs: "São Paulo", costOfLivingIndex: 52, rentIndex: 48, purchasingPowerIndex: 62 },
      { id: "br-rj", name: "Rio de Janeiro", nameEs: "Río de Janeiro", costOfLivingIndex: 55, rentIndex: 52, purchasingPowerIndex: 58 },
      { id: "br-df", name: "Distrito Federal", nameEs: "Distrito Federal", costOfLivingIndex: 48, rentIndex: 42, purchasingPowerIndex: 65 },
      { id: "br-mg", name: "Minas Gerais", nameEs: "Minas Gerais", costOfLivingIndex: 38, rentIndex: 32, purchasingPowerIndex: 52 },
      { id: "br-pr", name: "Paraná", nameEs: "Paraná", costOfLivingIndex: 40, rentIndex: 35, purchasingPowerIndex: 55 }
    ]
  },
  {
    id: "mx",
    name: "Mexico",
    nameEs: "México",
    code: "MX",
    currency: "MXN",
    currencySymbol: "$",
    flag: "🇲🇽",
    lat: 23.6345,
    lng: -102.5528,
    gdpPppPerCapita: 23985,
    costOfLivingIndex: 38,
    purchasingPowerIndex: 52,
    qualityOfLife: { healthcare: 68, safety: 45, education: 64, climate: 72, pollution: 55 },
    regions: [
      { id: "mx-cdmx", name: "Mexico City", nameEs: "Ciudad de México", costOfLivingIndex: 48, rentIndex: 52, purchasingPowerIndex: 58 },
      { id: "mx-jal", name: "Jalisco", nameEs: "Jalisco", costOfLivingIndex: 38, rentIndex: 35, purchasingPowerIndex: 52 },
      { id: "mx-nle", name: "Nuevo León", nameEs: "Nuevo León", costOfLivingIndex: 42, rentIndex: 38, purchasingPowerIndex: 58 },
      { id: "mx-gto", name: "Guanajuato", nameEs: "Guanajuato", costOfLivingIndex: 32, rentIndex: 28, purchasingPowerIndex: 45 },
      { id: "mx-pue", name: "Puebla", nameEs: "Puebla", costOfLivingIndex: 30, rentIndex: 25, purchasingPowerIndex: 42 }
    ]
  },
  {
    id: "ar",
    name: "Argentina",
    nameEs: "Argentina",
    code: "AR",
    currency: "ARS",
    currencySymbol: "$",
    flag: "🇦🇷",
    lat: -38.4161,
    lng: -63.6167,
    gdpPppPerCapita: 24224,
    costOfLivingIndex: 35,
    purchasingPowerIndex: 45,
    qualityOfLife: { healthcare: 70, safety: 48, education: 68, climate: 65, pollution: 42 },
    regions: [
      { id: "ar-c", name: "Capital Federal", nameEs: "Capital Federal", costOfLivingIndex: 45, rentIndex: 42, purchasingPowerIndex: 52 },
      { id: "ar-b", name: "Buenos Aires Province", nameEs: "Provincia de Buenos Aires", costOfLivingIndex: 38, rentIndex: 35, purchasingPowerIndex: 48 },
      { id: "ar-x", name: "Córdoba", nameEs: "Córdoba", costOfLivingIndex: 32, rentIndex: 28, purchasingPowerIndex: 42 },
      { id: "ar-s", name: "Santa Fe", nameEs: "Santa Fe", costOfLivingIndex: 30, rentIndex: 25, purchasingPowerIndex: 40 },
      { id: "ar-m", name: "Mendoza", nameEs: "Mendoza", costOfLivingIndex: 28, rentIndex: 22, purchasingPowerIndex: 38 }
    ]
  },
  {
    id: "co",
    name: "Colombia",
    nameEs: "Colombia",
    code: "CO",
    currency: "COP",
    currencySymbol: "$",
    flag: "🇨🇴",
    lat: 4.5709,
    lng: -74.2973,
    gdpPppPerCapita: 19028,
    costOfLivingIndex: 35,
    purchasingPowerIndex: 48,
    qualityOfLife: { healthcare: 62, safety: 42, education: 60, climate: 68, pollution: 45 },
    regions: [
      { id: "co-cun", name: "Cundinamarca", nameEs: "Cundinamarca", costOfLivingIndex: 42, rentIndex: 38, purchasingPowerIndex: 52 },
      { id: "co-ant", name: "Antioquia", nameEs: "Antioquia", costOfLivingIndex: 38, rentIndex: 32, purchasingPowerIndex: 48 },
      { id: "co-val", name: "Valle del Cauca", nameEs: "Valle del Cauca", costOfLivingIndex: 35, rentIndex: 30, purchasingPowerIndex: 45 },
      { id: "co-atl", name: "Atlántico", nameEs: "Atlántico", costOfLivingIndex: 32, rentIndex: 28, purchasingPowerIndex: 42 },
      { id: "co-bol", name: "Bolívar", nameEs: "Bolívar", costOfLivingIndex: 30, rentIndex: 25, purchasingPowerIndex: 40 }
    ]
  },
  {
    id: "in",
    name: "India",
    nameEs: "India",
    code: "IN",
    currency: "INR",
    currencySymbol: "₹",
    flag: "🇮🇳",
    lat: 20.5937,
    lng: 78.9629,
    gdpPppPerCapita: 7465,
    costOfLivingIndex: 25,
    purchasingPowerIndex: 38,
    qualityOfLife: { healthcare: 58, safety: 62, education: 55, climate: 52, pollution: 85 },
    regions: [
      { id: "in-dl", name: "Delhi", nameEs: "Delhi", costOfLivingIndex: 32, rentIndex: 28, purchasingPowerIndex: 42 },
      { id: "in-mh", name: "Maharashtra", nameEs: "Maharastra", costOfLivingIndex: 30, rentIndex: 32, purchasingPowerIndex: 45 },
      { id: "in-ka", name: "Karnataka", nameEs: "Karnataka", costOfLivingIndex: 28, rentIndex: 25, purchasingPowerIndex: 40 },
      { id: "in-tn", name: "Tamil Nadu", nameEs: "Tamil Nadu", costOfLivingIndex: 25, rentIndex: 22, purchasingPowerIndex: 35 },
      { id: "in-up", name: "Uttar Pradesh", nameEs: "Uttar Pradesh", costOfLivingIndex: 22, rentIndex: 18, purchasingPowerIndex: 32 }
    ]
  },
  {
    id: "kr",
    name: "South Korea",
    nameEs: "Corea del Sur",
    code: "KR",
    currency: "KRW",
    currencySymbol: "₩",
    flag: "🇰🇷",
    lat: 35.9078,
    lng: 127.7669,
    gdpPppPerCapita: 48414,
    costOfLivingIndex: 72,
    purchasingPowerIndex: 82,
    qualityOfLife: { healthcare: 88, safety: 85, education: 90, climate: 55, pollution: 50 },
    regions: [
      { id: "kr-11", name: "Seoul", nameEs: "Seúl", costOfLivingIndex: 85, rentIndex: 88, purchasingPowerIndex: 88 },
      { id: "kr-28", name: "Gyeonggi-do", nameEs: "Gyeonggi-do", costOfLivingIndex: 68, rentIndex: 62, purchasingPowerIndex: 80 },
      { id: "kr-26", name: "Busan", nameEs: "Busan", costOfLivingIndex: 58, rentIndex: 45, purchasingPowerIndex: 72 },
      { id: "kr-27", name: "Daegu", nameEs: "Daegu", costOfLivingIndex: 52, rentIndex: 38, purchasingPowerIndex: 68 },
      { id: "kr-30", name: "Incheon", nameEs: "Incheon", costOfLivingIndex: 55, rentIndex: 42, purchasingPowerIndex: 70 }
    ]
  },
  {
    id: "nl",
    name: "Netherlands",
    nameEs: "Países Bajos",
    code: "NL",
    currency: "EUR",
    currencySymbol: "€",
    flag: "🇳🇱",
    lat: 52.1326,
    lng: 5.2913,
    gdpPppPerCapita: 58923,
    costOfLivingIndex: 72,
    purchasingPowerIndex: 88,
    qualityOfLife: { healthcare: 86, safety: 80, education: 90, climate: 48, pollution: 38 },
    regions: [
      { id: "nl-nh", name: "North Holland", nameEs: "Holanda Septentrional", costOfLivingIndex: 82, rentIndex: 78, purchasingPowerIndex: 92 },
      { id: "nl-zh", name: "South Holland", nameEs: "Holanda Meridional", costOfLivingIndex: 72, rentIndex: 68, purchasingPowerIndex: 85 },
      { id: "nl-ut", name: "Utrecht", nameEs: "Utrecht", costOfLivingIndex: 68, rentIndex: 62, purchasingPowerIndex: 90 },
      { id: "nl-ov", name: "Overijssel", nameEs: "Overijssel", costOfLivingIndex: 55, rentIndex: 42, purchasingPowerIndex: 80 },
      { id: "nl-fr", name: "Friesland", nameEs: "Friesland", costOfLivingIndex: 52, rentIndex: 38, purchasingPowerIndex: 78 }
    ]
  },
  {
    id: "ch",
    name: "Switzerland",
    nameEs: "Suiza",
    code: "CH",
    currency: "CHF",
    currencySymbol: "Fr",
    flag: "🇨🇭",
    lat: 46.8182,
    lng: 8.2275,
    gdpPppPerCapita: 78335,
    costOfLivingIndex: 125,
    purchasingPowerIndex: 155,
    qualityOfLife: { healthcare: 92, safety: 88, education: 92, climate: 55, pollution: 28 },
    regions: [
      { id: "ch-zh", name: "Zurich", nameEs: "Zúrich", costOfLivingIndex: 135, rentIndex: 95, purchasingPowerIndex: 165 },
      { id: "ch-ge", name: "Geneva", nameEs: "Ginebra", costOfLivingIndex: 130, rentIndex: 92, purchasingPowerIndex: 160 },
      { id: "ch-be", name: "Bern", nameEs: "Berna", costOfLivingIndex: 115, rentIndex: 75, purchasingPowerIndex: 145 },
      { id: "ch-vd", name: "Vaud", nameEs: "Vaud", costOfLivingIndex: 118, rentIndex: 78, purchasingPowerIndex: 150 },
      { id: "ch-ti", name: "Ticino", nameEs: "Ticino", costOfLivingIndex: 108, rentIndex: 68, purchasingPowerIndex: 140 }
    ]
  },
  {
    id: "se",
    name: "Sweden",
    nameEs: "Suecia",
    code: "SE",
    currency: "SEK",
    currencySymbol: "kr",
    flag: "🇸🇪",
    lat: 60.1282,
    lng: 18.6435,
    gdpPppPerCapita: 56029,
    costOfLivingIndex: 68,
    purchasingPowerIndex: 88,
    qualityOfLife: { healthcare: 88, safety: 85, education: 91, climate: 38, pollution: 25 },
    regions: [
      { id: "se-ab", name: "Stockholm", nameEs: "Estocolmo", costOfLivingIndex: 78, rentIndex: 72, purchasingPowerIndex: 92 },
      { id: "se-k", name: "Skåne", nameEs: "Escania", costOfLivingIndex: 62, rentIndex: 52, purchasingPowerIndex: 82 },
      { id: "se-o", name: "Västra Götaland", nameEs: "Västra Götaland", costOfLivingIndex: 58, rentIndex: 48, purchasingPowerIndex: 85 },
      { id: "se-c", name: "Uppsala", nameEs: "Uppsala", costOfLivingIndex: 55, rentIndex: 45, purchasingPowerIndex: 80 },
      { id: "se-d", name: "Södermanland", nameEs: "Södermanland", costOfLivingIndex: 52, rentIndex: 42, purchasingPowerIndex: 78 }
    ]
  },
  {
    id: "no",
    name: "Norway",
    nameEs: "Noruega",
    code: "NO",
    currency: "NOK",
    currencySymbol: "kr",
    flag: "🇳🇴",
    lat: 60.4720,
    lng: 8.4689,
    gdpPppPerCapita: 67415,
    costOfLivingIndex: 85,
    purchasingPowerIndex: 98,
    qualityOfLife: { healthcare: 90, safety: 88, education: 90, climate: 32, pollution: 22 },
    regions: [
      { id: "no-03", name: "Oslo", nameEs: "Oslo", costOfLivingIndex: 95, rentIndex: 85, purchasingPowerIndex: 102 },
      { id: "no-11", name: "Rogaland", nameEs: "Rogaland", costOfLivingIndex: 72, rentIndex: 58, purchasingPowerIndex: 95 },
      { id: "no-15", name: "Møre og Romsdal", nameEs: "Møre og Romsdal", costOfLivingIndex: 65, rentIndex: 48, purchasingPowerIndex: 88 },
      { id: "no-16", name: "Sør-Trøndelag", nameEs: "Sør-Trøndelag", costOfLivingIndex: 68, rentIndex: 52, purchasingPowerIndex: 90 },
      { id: "no-17", name: "Nordland", nameEs: "Nordland", costOfLivingIndex: 62, rentIndex: 45, purchasingPowerIndex: 85 }
    ]
  },
  {
    id: "dk",
    name: "Denmark",
    nameEs: "Dinamarca",
    code: "DK",
    currency: "DKK",
    currencySymbol: "kr",
    flag: "🇩🇰",
    lat: 56.2639,
    lng: 9.5018,
    gdpPppPerCapita: 60913,
    costOfLivingIndex: 78,
    purchasingPowerIndex: 92,
    qualityOfLife: { healthcare: 89, safety: 86, education: 92, climate: 45, pollution: 28 },
    regions: [
      { id: "dk-101", name: "Copenhagen", nameEs: "Copenhague", costOfLivingIndex: 92, rentIndex: 88, purchasingPowerIndex: 95 },
      { id: "dk-83", name: "Southern Denmark", nameEs: "Dinamarca del Sur", costOfLivingIndex: 65, rentIndex: 52, purchasingPowerIndex: 88 },
      { id: "dk-82", name: "Central Jutland", nameEs: "Jutlandia Central", costOfLivingIndex: 62, rentIndex: 48, purchasingPowerIndex: 85 },
      { id: "dk-85", name: "Zealand", nameEs: "Selandia", costOfLivingIndex: 68, rentIndex: 55, purchasingPowerIndex: 82 },
      { id: "dk-81", name: "North Jutland", nameEs: "Jutlandia del Norte", costOfLivingIndex: 58, rentIndex: 42, purchasingPowerIndex: 80 }
    ]
  },
  {
    id: "sg",
    name: "Singapore",
    nameEs: "Singapur",
    code: "SG",
    currency: "SGD",
    currencySymbol: "$",
    flag: "🇸🇬",
    lat: 1.3521,
    lng: 103.8198,
    gdpPppPerCapita: 72795,
    costOfLivingIndex: 88,
    purchasingPowerIndex: 95,
    qualityOfLife: { healthcare: 85, safety: 90, education: 88, climate: 45, pollution: 35 },
    regions: [
      { id: "sg-01", name: "Central Region", nameEs: "Región Central", costOfLivingIndex: 92, rentIndex: 95, purchasingPowerIndex: 98 },
      { id: "sg-02", name: "East Region", nameEs: "Región Este", costOfLivingIndex: 78, rentIndex: 72, purchasingPowerIndex: 90 },
      { id: "sg-03", name: "North Region", nameEs: "Región Norte", costOfLivingIndex: 72, rentIndex: 65, purchasingPowerIndex: 88 },
      { id: "sg-04", name: "North-East Region", nameEs: "Región Noreste", costOfLivingIndex: 75, rentIndex: 68, purchasingPowerIndex: 88 },
      { id: "sg-05", name: "West Region", nameEs: "Región Oeste", costOfLivingIndex: 70, rentIndex: 62, purchasingPowerIndex: 85 }
    ]
  },
  {
    id: "ae",
    name: "United Arab Emirates",
    nameEs: "Emiratos Árabes Unidos",
    code: "AE",
    currency: "AED",
    currencySymbol: "د.إ",
    flag: "🇦🇪",
    lat: 23.4241,
    lng: 53.8478,
    gdpPppPerCapita: 67713,
    costOfLivingIndex: 72,
    purchasingPowerIndex: 92,
    qualityOfLife: { healthcare: 75, safety: 88, education: 78, climate: 25, pollution: 65 },
    regions: [
      { id: "ae-dxb", name: "Dubai", nameEs: "Dubái", costOfLivingIndex: 82, rentIndex: 85, purchasingPowerIndex: 95 },
      { id: "ae-abu", name: "Abu Dhabi", nameEs: "Abu Dabi", costOfLivingIndex: 78, rentIndex: 78, purchasingPowerIndex: 98 },
      { id: "ae-shj", name: "Sharjah", nameEs: "Sharjah", costOfLivingIndex: 58, rentIndex: 48, purchasingPowerIndex: 82 },
      { id: "ae-raj", name: "Ras Al Khaimah", nameEs: "Ras Al Khaimah", costOfLivingIndex: 52, rentIndex: 42, purchasingPowerIndex: 78 },
      { id: "ae-fuj", name: "Fujairah", nameEs: "Fujairah", costOfLivingIndex: 48, rentIndex: 38, purchasingPowerIndex: 75 }
    ]
  },
  {
    id: "cl",
    name: "Chile",
    nameEs: "Chile",
    code: "CL",
    currency: "CLP",
    currencySymbol: "$",
    flag: "🇨🇱",
    lat: -35.6751,
    lng: -71.5430,
    gdpPppPerCapita: 30926,
    costOfLivingIndex: 48,
    purchasingPowerIndex: 62,
    qualityOfLife: { healthcare: 76, safety: 65, education: 72, climate: 72, pollution: 38 },
    regions: [
      { id: "cl-rm", name: "Santiago Metropolitan", nameEs: "Santiago Metropolitano", costOfLivingIndex: 55, rentIndex: 52, purchasingPowerIndex: 68 },
      { id: "cl-v", name: "Valparaíso", nameEs: "Valparaíso", costOfLivingIndex: 45, rentIndex: 38, purchasingPowerIndex: 58 },
      { id: "cl-viii", name: "Biobío", nameEs: "Biobío", costOfLivingIndex: 38, rentIndex: 32, purchasingPowerIndex: 52 },
      { id: "cl-iii", name: "Coquimbo", nameEs: "Coquimbo", costOfLivingIndex: 35, rentIndex: 28, purchasingPowerIndex: 48 },
      { id: "cl-x", name: "Los Lagos", nameEs: "Los Lagos", costOfLivingIndex: 40, rentIndex: 32, purchasingPowerIndex: 55 }
    ]
  },
  {
    id: "pt",
    name: "Portugal",
    nameEs: "Portugal",
    code: "PT",
    currency: "EUR",
    currencySymbol: "€",
    flag: "🇵🇹",
    lat: 39.3999,
    lng: -8.2245,
    gdpPppPerCapita: 40522,
    costOfLivingIndex: 48,
    purchasingPowerIndex: 65,
    qualityOfLife: { healthcare: 80, safety: 78, education: 78, climate: 82, pollution: 32 },
    regions: [
      { id: "pt-11", name: "Lisbon", nameEs: "Lisboa", costOfLivingIndex: 55, rentIndex: 52, purchasingPowerIndex: 68 },
      { id: "pt-13", name: "Porto", nameEs: "Oporto", costOfLivingIndex: 45, rentIndex: 38, purchasingPowerIndex: 62 },
      { id: "pt-14", name: "Algarve", nameEs: "Algarve", costOfLivingIndex: 48, rentIndex: 42, purchasingPowerIndex: 60 },
      { id: "pt-15", name: "Center", nameEs: "Centro", costOfLivingIndex: 38, rentIndex: 28, purchasingPowerIndex: 55 },
      { id: "pt-16", name: "North", nameEs: "Norte", costOfLivingIndex: 40, rentIndex: 30, purchasingPowerIndex: 58 }
    ]
  },
  {
    id: "ie",
    name: "Ireland",
    nameEs: "Irlanda",
    code: "IE",
    currency: "EUR",
    currencySymbol: "€",
    flag: "🇮🇪",
    lat: 53.1424,
    lng: -7.6921,
    gdpPppPerCapita: 90715,
    costOfLivingIndex: 78,
    purchasingPowerIndex: 92,
    qualityOfLife: { healthcare: 78, safety: 80, education: 85, climate: 48, pollution: 35 },
    regions: [
      { id: "ie-d", name: "Dublin", nameEs: "Dublín", costOfLivingIndex: 92, rentIndex: 95, purchasingPowerIndex: 95 },
      { id: "ie-cw", name: "Cork", nameEs: "Cork", costOfLivingIndex: 68, rentIndex: 62, purchasingPowerIndex: 88 },
      { id: "ie-g", name: "Galway", nameEs: "Galway", costOfLivingIndex: 62, rentIndex: 55, purchasingPowerIndex: 82 },
      { id: "ie-l", name: "Limerick", nameEs: "Limerick", costOfLivingIndex: 58, rentIndex: 48, purchasingPowerIndex: 80 },
      { id: "ie-w", name: "Waterford", nameEs: "Waterford", costOfLivingIndex: 52, rentIndex: 42, purchasingPowerIndex: 75 }
    ]
  }
];

export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", nameEs: "Dólar estadounidense", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", nameEs: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", nameEs: "Libra esterlina", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", nameEs: "Yen japonés", symbol: "¥", flag: "🇯🇵" },
  { code: "CNY", name: "Chinese Yuan", nameEs: "Yuan chino", symbol: "¥", flag: "🇨🇳" },
  { code: "CAD", name: "Canadian Dollar", nameEs: "Dólar canadiense", symbol: "$", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", nameEs: "Dólar australiano", symbol: "$", flag: "🇦🇺" },
  { code: "CHF", name: "Swiss Franc", nameEs: "Franco suizo", symbol: "Fr", flag: "🇨🇭" },
  { code: "MXN", name: "Mexican Peso", nameEs: "Peso mexicano", symbol: "$", flag: "🇲🇽" },
  { code: "BRL", name: "Brazilian Real", nameEs: "Real brasileño", symbol: "R$", flag: "🇧🇷" },
  { code: "ARS", name: "Argentine Peso", nameEs: "Peso argentino", symbol: "$", flag: "🇦🇷" },
  { code: "COP", name: "Colombian Peso", nameEs: "Peso colombiano", symbol: "$", flag: "🇨🇴" },
  { code: "CLP", name: "Chilean Peso", nameEs: "Peso chileno", symbol: "$", flag: "🇨🇱" },
  { code: "INR", name: "Indian Rupee", nameEs: "Rupia india", symbol: "₹", flag: "🇮🇳" },
  { code: "KRW", name: "South Korean Won", nameEs: "Won surcoreano", symbol: "₩", flag: "🇰🇷" },
  { code: "SEK", name: "Swedish Krona", nameEs: "Corona sueca", symbol: "kr", flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone", nameEs: "Corona noruega", symbol: "kr", flag: "🇳🇴" },
  { code: "DKK", name: "Danish Krone", nameEs: "Corona danesa", symbol: "kr", flag: "🇩🇰" },
  { code: "SGD", name: "Singapore Dollar", nameEs: "Dólar de Singapur", symbol: "$", flag: "🇸🇬" },
  { code: "AED", name: "UAE Dirham", nameEs: "Dírham emiratí", symbol: "د.إ", flag: "🇦🇪" },
  { code: "PEN", name: "Peruvian Sol", nameEs: "Sol peruano", symbol: "S/", flag: "🇵🇪" }
];

export const exchangeRates: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CNY: 7.24,
  CAD: 1.36,
  AUD: 1.53,
  CHF: 0.88,
  MXN: 17.15,
  BRL: 4.97,
  ARS: 875.00,
  COP: 3950.00,
  CLP: 925.00,
  INR: 83.12,
  KRW: 1320.50,
  SEK: 10.45,
  NOK: 10.65,
  DKK: 6.88,
  SGD: 1.34,
  AED: 3.67,
  PEN: 3.72
};

export const costItems: CostItems = {
  bread: { name: "Bread (500g)", nameEs: "Pan (500g)", avgPrice: 1.5, unit: "loaf" },
  cheese: { name: "Cheese (1kg)", nameEs: "Queso (1kg)", avgPrice: 12, unit: "kg" },
  beef: { name: "Beef (1kg)", nameEs: "Carne de res (1kg)", avgPrice: 15, unit: "kg" },
  chicken: { name: "Chicken (1kg)", nameEs: "Pollo (1kg)", avgPrice: 6, unit: "kg" },
  milk: { name: "Milk (1 liter)", nameEs: "Leche (1 litro)", avgPrice: 1.2, unit: "liter" },
  eggs: { name: "Eggs (12)", nameEs: "Huevos (12)", avgPrice: 2.5, unit: "dozen" },
  coffee: { name: "Coffee (250g)", nameEs: "Café (250g)", avgPrice: 4, unit: "pack" },
  rice: { name: "Rice (1kg)", nameEs: "Arroz (1kg)", avgPrice: 2, unit: "kg" },
  vegetables: { name: "Vegetables (1kg)", nameEs: "Verduras (1kg)", avgPrice: 3, unit: "kg" },
  fruits: { name: "Fruits (1kg)", nameEs: "Frutas (1kg)", avgPrice: 4, unit: "kg" },
  beer: { name: "Beer (0.5l)", nameEs: "Cerveza (0.5l)", avgPrice: 2, unit: "bottle" },
  wine: { name: "Wine (bottle)", nameEs: "Vino (botella)", avgPrice: 8, unit: "bottle" },
  restaurant: { name: "Restaurant meal", nameEs: "Comida en restaurante", avgPrice: 15, unit: "meal" },
  rent1br: { name: "Rent 1BR city center", nameEs: "Alquiler 1 hab centro", avgPrice: 1200, unit: "month" },
  rent3br: { name: "Rent 3BR city center", nameEs: "Alquiler 3 hab centro", avgPrice: 2000, unit: "month" },
  utilities: { name: "Utilities (85m²)", nameEs: "Servicios (85m²)", avgPrice: 150, unit: "month" },
  internet: { name: "Internet (60Mbps)", nameEs: "Internet (60Mbps)", avgPrice: 40, unit: "month" },
  transport: { name: "Monthly transport", nameEs: "Transporte mensual", avgPrice: 50, unit: "month" },
  gym: { name: "Gym membership", nameEs: "Gimnasio", avgPrice: 50, unit: "month" },
  cinema: { name: "Cinema ticket", nameEs: "Entrada cine", avgPrice: 12, unit: "ticket" }
};

export const taxRates: TaxRates = {
  us: { federal: 0.22, state: 0.05, social: 0.076, total: 0.30 },
  gb: { federal: 0.20, state: 0, social: 0.12, total: 0.32 },
  de: { federal: 0.14, state: 0.14, social: 0.20, total: 0.48 },
  fr: { federal: 0.14, state: 0, social: 0.22, total: 0.36 },
  es: { federal: 0.15, state: 0.135, social: 0.065, total: 0.35 },
  it: { federal: 0.13, state: 0.135, social: 0.10, total: 0.365 },
  ca: { federal: 0.15, state: 0.10, social: 0.07, total: 0.32 },
  au: { federal: 0.19, state: 0, social: 0.115, total: 0.305 },
  jp: { federal: 0.10, state: 0.10, social: 0.15, total: 0.35 },
  cn: { federal: 0.10, state: 0, social: 0.105, total: 0.205 },
  br: { federal: 0.15, state: 0, social: 0.11, total: 0.26 },
  mx: { federal: 0.30, state: 0, social: 0.06, total: 0.36 },
  ar: { federal: 0.35, state: 0, social: 0.11, total: 0.46 },
  co: { federal: 0.28, state: 0, social: 0.09, total: 0.37 },
  in: { federal: 0.20, state: 0.05, social: 0.12, total: 0.37 },
  kr: { federal: 0.15, state: 0.06, social: 0.09, total: 0.30 },
  nl: { federal: 0.10, state: 0.104, social: 0.274, total: 0.478 },
  ch: { federal: 0.08, state: 0.12, social: 0.063, total: 0.263 },
  se: { federal: 0.20, state: 0.113, social: 0.113, total: 0.426 },
  no: { federal: 0.17, state: 0, social: 0.18, total: 0.35 },
  dk: { federal: 0.12, state: 0, social: 0.11, total: 0.23 },
  sg: { federal: 0, state: 0, social: 0.20, total: 0.20 },
  ae: { federal: 0, state: 0, social: 0.05, total: 0.05 },
  cl: { federal: 0.08, state: 0, social: 0.07, total: 0.15 },
  pt: { federal: 0.145, state: 0.105, social: 0.11, total: 0.36 },
  ie: { federal: 0.20, state: 0, social: 0.04, total: 0.24 }
};

export const industries: Industry[] = [
  { id: "tech", name: "Technology", nameEs: "Tecnología", salaryMultiplier: 1.4 },
  { id: "finance", name: "Finance", nameEs: "Finanzas", salaryMultiplier: 1.35 },
  { id: "healthcare", name: "Healthcare", nameEs: "Sanidad", salaryMultiplier: 1.1 },
  { id: "education", name: "Education", nameEs: "Educación", salaryMultiplier: 0.85 },
  { id: "retail", name: "Retail", nameEs: "Comercio", salaryMultiplier: 0.75 },
  { id: "manufacturing", name: "Manufacturing", nameEs: "Manufactura", salaryMultiplier: 0.90 },
  { id: "hospitality", name: "Hospitality", nameEs: "Hostelería", salaryMultiplier: 0.70 },
  { id: "construction", name: "Construction", nameEs: "Construcción", salaryMultiplier: 0.95 },
  { id: "media", name: "Media & Entertainment", nameEs: "Medios y Entretenimiento", salaryMultiplier: 0.85 },
  { id: "legal", name: "Legal", nameEs: "Legal", salaryMultiplier: 1.25 },
  { id: "consulting", name: "Consulting", nameEs: "Consultoría", salaryMultiplier: 1.20 },
  { id: "general", name: "General", nameEs: "General", salaryMultiplier: 1.0 }
];

export const getCountryById = (id: string): Country | undefined => 
  countries.find(c => c.id === id);

export const getRegionById = (countryId: string, regionId: string) => {
  const country = getCountryById(countryId);
  return country?.regions.find(r => r.id === regionId);
};

export const getCurrencyByCode = (code: string): Currency | undefined =>
  currencies.find(c => c.code === code);

export default countries;
