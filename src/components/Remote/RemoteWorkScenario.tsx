import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { countries } from '../../data/countries';
import { taxRatesData } from '../../data/taxes';
import { formatCurrency } from '../../services/utils/formatters';
import useAppStore from '../../store/useAppStore';
import styles from './RemoteWorkScenario.module.scss';

interface RemoteScenario {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  salaryMultiplier: number;
  taxNote: string;
  taxNoteEs: string;
}

const remoteScenarios: RemoteScenario[] = [
  {
    id: 'us_remote',
    name: 'US Company (Remote)',
    nameEs: 'Empresa USA (Remoto)',
    description: 'Working for a US company from your home country',
    descriptionEs: 'Trabajar para una empresa USA desde tu país de origen',
    salaryMultiplier: 0.25,
    taxNote: 'Tax treaty may apply',
    taxNoteEs: 'Pueden aplicar tratados fiscales'
  },
  {
    id: 'eu_remote',
    name: 'EU Company (Remote)',
    nameEs: 'Empresa UE (Remoto)',
    description: 'Working for a European company from your home country',
    descriptionEs: 'Trabajar para una empresa europea desde tu país de origen',
    salaryMultiplier: 0.50,
    taxNote: 'Usually local taxation',
    taxNoteEs: 'Usualmente tributación local'
  },
  {
    id: 'latam_remote',
    name: 'LATAM Tech Hub (Remote)',
    nameEs: 'Hub Tech LATAM (Remoto)',
    description: 'Working for a regional tech company',
    descriptionEs: 'Trabajar para una empresa tech regional',
    salaryMultiplier: 0.40,
    taxNote: 'Local or dual taxation',
    taxNoteEs: 'Tributación local o dual'
  }
];

const RemoteWorkScenario: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { salary, originCountry, salaryType } = useAppStore();
  
  const [selectedScenario, setSelectedScenario] = useState<string>('us_remote');
  const [remoteRole, setRemoteRole] = useState<string>('engineer');

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const isNet = salaryType === 'net';

  const remoteData = useMemo(() => {
    if (!salaryNum || !originCountry) return null;

    const scenario = remoteScenarios.find(s => s.id === selectedScenario);
    if (!scenario) return null;

    const originTax = taxRatesData[originCountry.id];
    const grossSalary = isNet && originTax 
      ? salaryNum / (1 - originTax.total) 
      : salaryNum;

    const baseUSSalary = 120000;
    const roleMultipliers: Record<string, number> = {
      junior: 0.6,
      engineer: 1.0,
      senior: 1.5,
      lead: 2.0,
      manager: 2.5
    };
    
    const roleMultiplier = roleMultipliers[remoteRole] || 1;
    const remoteSalary = Math.round(baseUSSalary * scenario.salaryMultiplier * roleMultiplier);
    
    const localTaxRate = originTax?.total || 0.30;
    const remoteNet = remoteSalary * (1 - localTaxRate);
    
    const diff = remoteNet - (isNet ? salaryNum : grossSalary * (1 - localTaxRate));
    const diffPct = ((diff / (isNet ? salaryNum : grossSalary * (1 - localTaxRate))) * 100);

    const roles = [
      { id: 'junior', name: 'Junior Developer', nameEs: 'Desarrollador Junior', salary: Math.round(baseUSSalary * scenario.salaryMultiplier * 0.6) },
      { id: 'engineer', name: 'Software Engineer', nameEs: 'Ingeniero de Software', salary: Math.round(baseUSSalary * scenario.salaryMultiplier) },
      { id: 'senior', name: 'Senior Engineer', nameEs: 'Ingeniero Senior', salary: Math.round(baseUSSalary * scenario.salaryMultiplier * 1.5) },
      { id: 'lead', name: 'Tech Lead', nameEs: 'Tech Lead', salary: Math.round(baseUSSalary * scenario.salaryMultiplier * 2.0) },
      { id: 'manager', name: 'Engineering Manager', nameEs: 'Gerente de Ingeniería', salary: Math.round(baseUSSalary * scenario.salaryMultiplier * 2.5) }
    ];

    return {
      scenario,
      remoteSalary,
      remoteNet,
      diff,
      diffPct,
      localTaxRate,
      roles,
      countryName: i18n.language === 'es' ? originCountry.nameEs : originCountry.name,
      currency: originCountry.currency,
      currencySymbol: originCountry.currencySymbol
    };
  }, [salaryNum, originCountry, selectedScenario, remoteRole, isNet]);

  if (!remoteData) return null;

  const formatAmount = (amount: number) => {
    return formatCurrency(Math.round(amount), remoteData.currency);
  };

  const getStatusClass = () => {
    if (remoteData.diffPct > 50) return styles.excellent;
    if (remoteData.diffPct > 20) return styles.good;
    if (remoteData.diffPct > -10) return styles.neutral;
    if (remoteData.diffPct > -30) return styles.poor;
    return styles.bad;
  };

  const getStatusLabel = () => {
    if (remoteData.diffPct > 50) return t('remote.excellent') || '¡Excelente!';
    if (remoteData.diffPct > 20) return t('remote.good') || 'Bueno';
    if (remoteData.diffPct > -10) return t('remote.similar') || 'Similar';
    if (remoteData.diffPct > -30) return t('remote.poor') || 'No recomendado';
    return t('remote.bad') || 'No conveniente';
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          🖥️ {t('remote.title') || 'Trabajo Remoto'}
        </h3>
        <p className={styles.subtitle}>
          {t('remote.subtitle') || `Compara tu salary local vs trabajo remoto para empresa internacional`}
        </p>
      </div>

      <div className={styles.scenariosGrid}>
        {remoteScenarios.map(scenario => (
          <button
            key={scenario.id}
            className={`${styles.scenarioBtn} ${selectedScenario === scenario.id ? styles.selected : ''}`}
            onClick={() => setSelectedScenario(scenario.id)}
          >
            <span className={styles.scenarioName}>
              {i18n.language === 'es' ? scenario.nameEs : scenario.name}
            </span>
            <span className={styles.scenarioDesc}>
              {i18n.language === 'es' ? scenario.descriptionEs : scenario.description}
            </span>
            <span className={styles.salaryHint}>
              ~{(scenario.salaryMultiplier * 100).toFixed(0)}% salary USA
            </span>
          </button>
        ))}
      </div>

      <div className={styles.roleSelector}>
        <label className={styles.roleLabel}>{t('remote.role') || 'Tu rol:'}</label>
        <div className={styles.roleButtons}>
          {[
            { id: 'junior', name: 'Junior', nameEs: 'Junior' },
            { id: 'engineer', name: 'Mid', nameEs: 'Mid' },
            { id: 'senior', name: 'Senior', nameEs: 'Senior' },
            { id: 'lead', name: 'Lead', nameEs: 'Lead' },
            { id: 'manager', name: 'Manager', nameEs: 'Manager' }
          ].map(role => (
            <button
              key={role.id}
              className={`${styles.roleBtn} ${remoteRole === role.id ? styles.active : ''}`}
              onClick={() => setRemoteRole(role.id)}
            >
              {i18n.language === 'es' ? role.nameEs : role.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.comparison}>
        <div className={styles.localCard}>
          <span className={styles.cardTitle}>{t('remote.local') || 'Salario local'}</span>
          <span className={styles.cardSalary}>{formatAmount(isNet ? salaryNum : salaryNum * 0.7)}</span>
          <span className={styles.cardNote}>/año {isNet ? 'neto' : 'bruto'}</span>
        </div>

        <div className={styles.arrow}>
          {remoteData.diff > 0 ? '→' : '←'}
        </div>

        <div className={styles.remoteCard}>
          <span className={styles.cardTitle}>{t('remote.remote') || 'Salario remoto'}</span>
          <span className={styles.cardSalary}>{formatAmount(remoteData.remoteSalary)}</span>
          <span className={styles.cardNote}>/año bruto</span>
          <span className={styles.cardNet}>
            ≈ {formatAmount(remoteData.remoteNet)} {t('remote.net') || 'neto'}
          </span>
        </div>
      </div>

      <div className={`${styles.status} ${getStatusClass()}`}>
        {getStatusLabel()}
      </div>

      <div className={styles.differences}>
        <div className={styles.diffItem}>
          <span className={styles.diffLabel}>{t('remote.difference') || 'Diferencia'}</span>
          <span className={`${styles.diffValue} ${remoteData.diff > 0 ? styles.positive : styles.negative}`}>
            {remoteData.diff > 0 ? '+' : ''}{formatAmount(remoteData.diff)}/año
          </span>
        </div>
        <div className={styles.diffItem}>
          <span className={styles.diffLabel}>{t('remote.percentage') || 'Porcentaje'}</span>
          <span className={`${styles.diffValue} ${remoteData.diffPct > 0 ? styles.positive : styles.negative}`}>
            {remoteData.diffPct > 0 ? '+' : ''}{remoteData.diffPct.toFixed(1)}%
          </span>
        </div>
        <div className={styles.diffItem}>
          <span className={styles.diffLabel}>{t('remote.taxRate') || 'Impuestos aprox'}</span>
          <span className={styles.diffValue}>
            {(remoteData.localTaxRate * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className={styles.salaryTable}>
        <h4 className={styles.tableTitle}>{t('remote.salaryTable') || 'Salarios por rol'} (USD)</h4>
        <div className={styles.tableGrid}>
          {remoteData.roles.map(role => (
            <div key={role.id} className={`${styles.tableRow} ${remoteRole === role.id ? styles.activeRow : ''}`}>
              <span className={styles.tableRole}>
                {i18n.language === 'es' ? role.nameEs : role.name}
              </span>
              <span className={styles.tableSalary}>
                ${role.salary.toLocaleString()}
              </span>
              <span className={styles.tableLocal}>
                ≈ {formatAmount(role.salary * (1 - remoteData.localTaxRate))}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.considerations}>
        <h4 className={styles.considerationsTitle}>⚠️ {t('remote.considerations') || 'Consideraciones importantes'}</h4>
        <ul className={styles.considerationsList}>
          <li>{t('remote.consideration1') || 'Los salaries son aproximados y varían por empresa'}</li>
          <li>{t('remote.consideration2') || 'Considera implicaciones fiscales de recibir ingresos en USD/EUR'}</li>
          <li>{t('remote.consideration3') || 'Valora beneficios: seguro médico, vacaciones, equity'}</li>
          <li>{t('remote.consideration4') || 'La estabilidad laboral puede variar vs trabajo local'}</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default RemoteWorkScenario;
