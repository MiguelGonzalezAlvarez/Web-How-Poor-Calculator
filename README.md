# How Poor I Am - Calculadora de Poder Adquisitivo Internacional

[![Tests](https://img.shields.io/badge/tests-72%20passed-green)](https://github.com/MiguelGonzalezAlvarez/Web-How-Poor-Calculator)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-GitHub%20Pages-brightgreen)](https://miguelgonzalezalvarez.github.io/Web-How-Poor-Calculator/)

> Descubre el salario que NECESITAS para mantener tu nivel de vida actual si te mudas a otro país - no solo cuánto ganarías, sino cuánto puedes AHORRAR realmente.

## 🌐 Demo

**URL:** https://miguelgonzalezalvarez.github.io/Web-How-Poor-Calculator/

**Nota:** La app usa HashRouter, por lo que la URL incluye `#/` al final.

---

## 📱 Funcionalidades

### Core
- ✅ Calculadora de poder adquisitivo internacional (173 países)
- ✅ Comparación por país y región específica
- ✅ Cálculo de salario neto después de impuestos
- ✅ Soporte multiidioma (Español / Inglés)
- ✅ Modo oscuro/claro
- ✅ PWA (Progressive Web App)

### Características Principales
- 💰 **Real Savings Card**: Muestra el ahorro real como métrica principal
- 🔄 **Modo Inverso**: Toggle entre "Cuánto necesito" ↔ "Cuánto es mi oferta"
- ⚠️ **Alertas Visuales**: Indica cuando tu nivel de vida bajaría
- 👁️ **Quick Preview**: Vista rápida mientras escribes
- 📄 **PDF para Entrevistas**: Genera documento de una página para negociar salario
- 💾 **Escenarios Guardados**: Guarda y compara diferentes situaciones
- 🔗 **Deep Links**: Comparte cálculos via URL

### Módulos Avanzados
| Módulo | Descripción |
|--------|-------------|
| Net Salary | Desglose de impuestos y salario neto |
| Tax Comparison | Comparación de impuestos entre países |
| Savings Potential | Proyección de ahorros |
| Rent vs Buy | Análisis de alquiler vs compra |
| Family Cost | Coste familiar |
| Healthcare | Comparación de sistema sanitario |
| Quality of Life | Índice de calidad de vida |
| Climate | Comparación de clima |
| Safety | Índice de seguridad |
| Visa Requirements | Requisitos de visa |

---

## 🛠️ Tech Stack

| Tecnología | Uso |
|------------|-----|
| React 19 | UI Framework |
| TypeScript | Tipado estático |
| Vite | Build tool |
| Zustand | State management |
| i18next | Internacionalización |
| Framer Motion | Animaciones |
| Recharts | Gráficos |
| Leaflet | Mapas |
| jsPDF | Generación PDF |
| Vitest | Testing |
| ESLint | Linting |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/MiguelGonzalezAlvarez/Web-How-Poor-Calculator.git
cd Web-How-Poor-Calculator/how-poor-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |
| `npm run lint` | Verificar código |
| `npm test` | Ejecutar tests |
| `npm run deploy` | Desplegar a GitHub Pages |

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

**Estado actual:** 72 tests passing

---

## 📂 Estructura del Proyecto

```
how-poor-app/
├── src/
│   ├── components/      # Componentes React
│   │   ├── UI/         # Componentes de UI
│   │   ├── Input/      # Inputs del formulario
│   │   ├── Cards/      # Tarjetas de información
│   │   ├── Finance/    # Componentes financieros
│   │   ├── Career/     # Componentes de carrera
│   │   └── ...
│   ├── services/       # Lógica de negocio
│   │   ├── CalculationService.ts
│   │   └── RealTimeDataService.ts
│   ├── store/          # Zustand store
│   ├── data/           # Datos estáticos (países, impuestos, etc.)
│   ├── lib/           # Utilidades (PDF, analytics, export)
│   ├── hooks/         # Custom hooks
│   ├── i18n/          # Traducciones
│   ├── types/         # TypeScript types
│   └── pages/         # Páginas
├── public/            # Archivos públicos (PWA)
└── dist/              # Build de producción
```

---

## 🎯 Decisiones de Diseño

### Enfoque en el Ahorro Real
A diferencia de otras calculadoras que solo muestran el salario equivalente, esta app enfatiza el **ahorro real mensual** - la métrica que determina si puedes mantener tu nivel de vida.

### Modo Inverso
Permite tanto calcular "cuánto necesito" como validar "cuánto es mi oferta" - útil para negociaciones salariales.

### Code Splitting
El bundle principal se ha optimizado a ~650KB (vs 1.7MB original) separando librerías en chunks independientes.

---

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir cambios mayores.

---

## 📊 Estado del Proyecto

| Métrica | Valor |
|---------|-------|
| Tests | 72 passing |
| Cobertura | ~70% |
| Países | 173 |
| Regiones | 500+ |
| Lighthouse Score | 85+ |

---

## 📝 Changelog

### v1.0.0 (2026-03-12)
- ✅ Lanzamiento inicial
- ✅ Calculadora de poder adquisitivo
- ✅ Modo inverso
- ✅ Real Savings Card
- ✅ PDF para entrevistas
- ✅ GitHub Pages deployment
- ✅ 72 tests
- ✅ Code splitting

---

**Built with ❤️ for expats, remote workers, and anyone considering a move abroad.**
