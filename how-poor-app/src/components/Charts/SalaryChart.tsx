import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useAppStore from '../../store/useAppStore';
import { formatCompactCurrency } from '../../services/utils/formatters';
import { CalculationResult } from '../../types';
import styles from './SalaryChart.module.scss';

interface ChartData {
  name: string;
  fullName: string;
  salary: number;
  yourSalary: number;
  status: string;
  ratio: number;
}

const SalaryChart: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { calculatedResults, salary } = useAppStore();

  if (calculatedResults.length === 0) {
    return null;
  }

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  
  const topResults = useMemo(() => {
    return calculatedResults.slice(0, 15).map((result: CalculationResult) => {
      const countryName = i18n.language === 'es' ? result.country.nameEs : result.country.name;
      return {
        name: result.country.flag + ' ' + countryName.substring(0, 12),
        fullName: countryName,
        salary: result.equivalentSalary,
        yourSalary: salaryNum,
        status: result.status,
        ratio: result.ratio
      };
    });
  }, [calculatedResults, salaryNum, i18n.language]);

  const getBarColor = (status: string): string => {
    switch (status) {
      case 'better': return '#22c55e';
      case 'worse': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const CustomTooltip: React.FC<{ active?: boolean; payload?: Array<{ payload: ChartData }> }> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipTitle}>{data.fullName}</p>
          <p className={styles.tooltipSalary}>
            {t('chart.yourSalary')}: {formatCompactCurrency(data.yourSalary, 'USD')}
          </p>
          <p className={styles.tooltipEquivalent}>
            {t('results.columns.salary')}: {formatCompactCurrency(data.salary, 'USD')}
          </p>
          <p className={styles.tooltipRatio}>
            Ratio: {data.ratio.toFixed(2)}x
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>{t('chart.title')}</h3>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={topResults}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
            <XAxis 
              type="number" 
              tickFormatter={(value) => formatCompactCurrency(value, 'USD')}
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              stroke="#64748b"
              fontSize={12}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="salary" radius={[0, 4, 4, 0]}>
              {topResults.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendColor} style={{ background: '#22c55e' }} />
          <span>{t('filters.statusOptions.better')}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColor} style={{ background: '#6b7280' }} />
          <span>{t('filters.statusOptions.similar')}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColor} style={{ background: '#ef4444' }} />
          <span>{t('filters.statusOptions.worse')}</span>
        </div>
      </div>
    </div>
  );
};

export default SalaryChart;
