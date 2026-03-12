import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../store/useAppStore';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { SalaryInput, CurrencySelector, CountrySelector, RegionSelector, IndustrySelector, SalaryTypeToggle } from '../components/Input/InputGroup';
import CurrentSituationCard from '../components/Cards/CurrentSituationCard';
import CostBreakdown from '../components/Cards/CostBreakdown';
import SalaryInsight from '../components/Cards/SalaryInsight';
import RealItemsComparison from '../components/RealItemsComparison/RealItemsComparison';
import SalaryTargetCalculator from '../components/SalaryTarget/SalaryTargetCalculator';
import NetSalaryBreakdown from '../components/NetSalary/NetSalaryBreakdown';
import TaxComparisonCard from '../components/TaxComparison/TaxComparisonCard';
import RelocationCosts from '../components/Relocation/RelocationCosts';
import SavingsPotential from '../components/Savings/SavingsPotential';
import LifestyleComparison from '../components/Lifestyle/LifestyleComparison';
import QualityOfLifeIndex from '../components/Lifestyle/QualityOfLifeIndex';
import BenefitsEvaluator from '../components/Benefits/BenefitsEvaluator';
import TotalCompensation from '../components/Benefits/TotalCompensation';
import SalaryWizard from '../components/Wizard/SalaryWizard';
import OneClickComparison from '../components/Wizard/OneClickComparison';
import RemoteWorkScenario from '../components/Remote/RemoteWorkScenario';
import FamilyCostCalculator from '../components/Family/FamilyCostCalculator';
import CityCostIndex from '../components/City/CityCostIndex';
import RentVsBuyAnalyzer from '../components/Housing/RentVsBuyAnalyzer';
import InflationAdjusted from '../components/Inflation/InflationAdjusted';
import CareerGrowthEstimator from '../components/Career/CareerGrowthEstimator';
import EmergencyFundCalculator from '../components/Finance/EmergencyFundCalculator';
import CostOfLivingTrends from '../components/Trends/CostOfLivingTrends';
import WorkLifeBalance from '../components/Lifestyle/WorkLifeBalance';
import SalaryNegotiationTips from '../components/Career/SalaryNegotiationTips';
import TaxOptimization from '../components/Finance/TaxOptimization';
import HealthcareComparison from '../components/Lifestyle/HealthcareComparison';
import RemoteSalaryCalculator from '../components/Career/RemoteSalaryCalculator';
import VisaRequirements from '../components/Immigration/VisaRequirements';
import ClimateComparison from '../components/Lifestyle/ClimateComparison';
import LanguageBarrier from '../components/Lifestyle/LanguageBarrier';
import SafetyIndex from '../components/Lifestyle/SafetyIndex';
import InvestmentPotential from '../components/Finance/InvestmentPotential';
import ComparisonTable from '../components/Tables/ComparisonTable';
import FilterPanel from '../components/Tables/FilterPanel';
import SalaryChart from '../components/Charts/SalaryChart';
import CountryDetail from '../components/Cards/CountryDetail';
import WorldMap from '../components/Maps/WorldMap';
import LifestyleCalculator from '../components/Cards/LifestyleCalculator';
import ShareButton from '../components/UI/ShareButton';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ToastContainer from '../components/UI/ToastContainer';
import HistoryPanel from '../components/UI/HistoryPanel';
import ScenariosManager from '../components/UI/ScenariosManager';
import WhatIfCalculator from '../components/UI/WhatIfCalculator';
import ErrorBoundary from '../components/UI/ErrorBoundary';
import ExecutiveSummary from '../components/UI/ExecutiveSummary';
import QuickActions from '../components/UI/QuickActions';
import QuickModeToggle from '../components/UI/QuickModeToggle';
import ReverseCalculatorToggle from '../components/UI/ReverseCalculatorToggle';
import RealSavingsCard from '../components/UI/RealSavingsCard';
import { CardSkeleton, TableSkeleton, ChartSkeleton } from '../components/UI/SectionSkeleton';
import { ToastProvider } from '../context/ToastContext';
import { useSEO } from '../components/SEO/useSEO';
import AdSense from '../components/UI/AdSense';
import ExportButton from '../components/UI/ExportButton';
import EnhancedExportButton from '../components/UI/EnhancedExportButton';
import AffiliateLinks from '../components/UI/AffiliateLinks';
import OnboardingTour from '../components/UI/OnboardingTour';
import QuickPreview from '../components/UI/QuickPreview';
import styles from './Home.module.scss';

const ONBOARDING_KEY = 'how-poor-onboarding-seen';

const HomeContent: React.FC = () => {
  const { t } = useTranslation();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { 
    selectedCountry, 
    selectedRegion, 
    salary, 
    currency,
    isCalculated, 
    calculateEquivalences,
    reset,
    showLifestyleCalculator,
    toggleLifestyleCalculator,
    isLoading,
    originCountry
  } = useAppStore();

  useEffect(() => {
    const seenOnboarding = localStorage.getItem(ONBOARDING_KEY);
    if (!seenOnboarding && !isCalculated) {
      setShowOnboarding(true);
    }
  }, [isCalculated]);

  const handleOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setShowOnboarding(false);
  };

  useSEO({
    salary,
    currency,
    country: selectedCountry || undefined,
    countryName: originCountry?.nameEs
  });

  const isValid = Boolean(salary && selectedCountry && selectedRegion);
  const salaryNum = salary ? parseFloat(salary.replace(/[^0-9.-]/g, '')) : 0;
  const isSalaryValid = !salary || (salaryNum > 0 && salaryNum < 10000000);
  const canCalculate = isValid && isSalaryValid && !isLoading;

  const handleCalculate = () => {
    if (canCalculate) {
      calculateEquivalences();
    }
  };

  return (
    <div className={styles.app}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.inputSection} aria-label="Formulario de búsqueda">
            <ReverseCalculatorToggle />
            
            <div className={styles.inputGrid}>
              <SalaryInput />
              <CurrencySelector />
              <CountrySelector />
              <RegionSelector />
              <IndustrySelector />
              <SalaryTypeToggle />
            </div>
            
            <div className={styles.actions}>
              <button 
                className={styles.calculateButton}
                onClick={handleCalculate}
                disabled={!canCalculate}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner size="small" />
                ) : (
                  t('input.calculate')
                )}
              </button>
              
              {isCalculated && !isLoading && (
                <button 
                  className={styles.resetButton} 
                  onClick={reset}
                  type="button"
                >
                  {t('input.reset')}
                </button>
              )}
            </div>
          </section>

          <QuickPreview />

          <HistoryPanel />

          <ScenariosManager />

          <WhatIfCalculator />

          <section className={styles.wizardSection}>
            <OneClickComparison />
          </section>

          {isCalculated && !isLoading && (
            <>
              <motion.div 
                className={styles.secondaryActions}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button 
                  className={styles.lifestyleButton} 
                  onClick={toggleLifestyleCalculator}
                  type="button"
                >
                  🏠 {t('scenario.openCalculator')}
                </button>
                <ShareButton />
                <EnhancedExportButton />
                <QuickModeToggle />
              </motion.div>

              <ExecutiveSummary />

              <RealSavingsCard />

              <QuickActions />

              <motion.section 
                className={styles.resultsHeader}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h2 className={styles.resultsTitle}>{t('results.title')}</h2>
              </motion.section>

              <motion.section 
                className={styles.situationSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <CurrentSituationCard />
              </motion.section>

              <motion.section 
                className={styles.wizardResultsSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.22 }}
              >
                <SalaryWizard />
              </motion.section>

              <motion.section 
                className={styles.remoteSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.24 }}
              >
                <RemoteWorkScenario />
              </motion.section>

              <motion.section 
                className={styles.costBreakdownSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <CostBreakdown />
              </motion.section>

              <motion.section 
                className={styles.insightSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <SalaryInsight />
              </motion.section>

              <motion.section 
                className={styles.salaryTargetSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                <SalaryTargetCalculator />
              </motion.section>

              <motion.section 
                className={styles.netSalarySection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <NetSalaryBreakdown />
              </motion.section>

              <motion.section 
                className={styles.taxCompareSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
              >
                <TaxComparisonCard />
              </motion.section>

              <motion.section 
                className={styles.relocationSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <RelocationCosts />
              </motion.section>

              <motion.section 
                className={styles.savingsSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.55 }}
              >
                <SavingsPotential />
              </motion.section>

              <motion.section 
                className={styles.lifestyleSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <LifestyleComparison />
              </motion.section>

              <motion.section 
                className={styles.qualitySection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.65 }}
              >
                <QualityOfLifeIndex />
              </motion.section>

              <motion.section 
                className={styles.benefitsSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <BenefitsEvaluator />
              </motion.section>

              <motion.section 
                className={styles.compensationSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.75 }}
              >
                <TotalCompensation />
              </motion.section>

              <motion.section 
                className={styles.familySection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <FamilyCostCalculator />
              </motion.section>

              <motion.section 
                className={styles.citySection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.85 }}
              >
                <CityCostIndex />
              </motion.section>

              <motion.section 
                className={styles.rentVsBuySection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
              >
                <RentVsBuyAnalyzer />
              </motion.section>

              <motion.section 
                className={styles.inflationSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.95 }}
              >
                <InflationAdjusted />
              </motion.section>

              <motion.section 
                className={styles.careerSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 }}
              >
                <CareerGrowthEstimator />
              </motion.section>

              <motion.section 
                className={styles.emergencySection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.05 }}
              >
                <EmergencyFundCalculator />
              </motion.section>

              <motion.section 
                className={styles.colTrendsSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 }}
              >
                <CostOfLivingTrends />
              </motion.section>

              <motion.section 
                className={styles.workLifeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.15 }}
              >
                <WorkLifeBalance />
              </motion.section>

              <motion.section 
                className={styles.negotiationSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                <SalaryNegotiationTips />
              </motion.section>

              <motion.section 
                className={styles.taxOptSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.25 }}
              >
                <TaxOptimization />
              </motion.section>

              <motion.section 
                className={styles.healthcareSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.3 }}
              >
                <HealthcareComparison />
              </motion.section>

              <motion.section 
                className={styles.remoteCalcSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.35 }}
              >
                <RemoteSalaryCalculator />
              </motion.section>

              <motion.section 
                className={styles.visaSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.4 }}
              >
                <VisaRequirements />
              </motion.section>

              <motion.section 
                className={styles.climateSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.45 }}
              >
                <ClimateComparison />
              </motion.section>

              <motion.section 
                className={styles.languageSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.5 }}
              >
                <LanguageBarrier />
              </motion.section>

              <motion.section 
                className={styles.safetySection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.55 }}
              >
                <SafetyIndex />
              </motion.section>

              <motion.section 
                className={styles.investmentSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.6 }}
              >
                <InvestmentPotential />
              </motion.section>

              <motion.section 
                className={styles.filterSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <FilterPanel />
              </motion.section>

              <motion.section 
                className={styles.tableSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <ComparisonTable />
              </motion.section>

              <section className={styles.chartSection}>
                <ErrorBoundary>
                  {isLoading ? <ChartSkeleton /> : <SalaryChart />}
                </ErrorBoundary>
              </section>

              <section className={styles.realItemsSection}>
                <RealItemsComparison />
              </section>

              <section className={styles.mapSection}>
                <ErrorBoundary>
                  {isLoading ? <CardSkeleton /> : <WorldMap />}
                </ErrorBoundary>
              </section>
            </>
          )}

          {isLoading && (
            <div className={styles.loadingOverlay}>
              <LoadingSpinner size="large" />
              <p className={styles.loadingText}>Calculando equivalencias...</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <AdSense />
      <AffiliateLinks />
      <CountryDetail />
      {showLifestyleCalculator && <LifestyleCalculator onClose={toggleLifestyleCalculator} />}
      {showOnboarding && <OnboardingTour onComplete={handleOnboardingComplete} />}
      <ToastContainer />
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  );
};

export default Home;
