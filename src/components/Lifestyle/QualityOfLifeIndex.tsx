import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import styles from './QualityOfLifeIndex.module.scss';

interface QualityMetric {
  key: string;
  name: string;
  nameEs: string;
  icon: string;
  description: string;
  descriptionEs: string;
}

const qualityMetrics: QualityMetric[] = [
  { key: 'healthcare', name: 'Healthcare', nameEs: 'Sanidad', icon: '🏥', description: 'Quality and access to healthcare', descriptionEs: 'Calidad y acceso a la sanidad' },
  { key: 'safety', name: 'Safety', nameEs: 'Seguridad', icon: '🔒', description: 'Crime rates and personal safety', descriptionEs: 'Tasas de criminalidad y seguridad personal' },
  { key: 'education', name: 'Education', nameEs: 'Educación', icon: '🎓', description: 'Quality of education system', descriptionEs: 'Calidad del sistema educativo' },
  { key: 'climate', name: 'Climate', nameEs: 'Clima', icon: '☀️', description: 'Weather and climate conditions', descriptionEs: 'Condiciones climáticas' },
  { key: 'pollution', name: 'Environment', nameEs: 'Medio ambiente', icon: '🌿', description: 'Air quality and pollution levels', descriptionEs: 'Calidad del aire y niveles de contaminación' }
];

const QualityOfLifeIndex: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { originCountry, calculatedResults } = useAppStore();

  const qualityData = useMemo(() => {
    if (!originCountry || !calculatedResults.length) return null;

    const origin = originCountry;
    const destResults = calculatedResults.slice(0, 3);

    const getScore = (value: number) => {
      if (value >= 80) return { score: value, grade: 'A', color: '#22c55e' };
      if (value >= 60) return { score: value, grade: 'B', color: '#3b82f6' };
      if (value >= 40) return { score: value, grade: 'C', color: '#f59e0b' };
      return { score: value, grade: 'D', color: '#ef4444' };
    };

    const originScores = {
      healthcare: getScore(origin.qualityOfLife.healthcare),
      safety: getScore(origin.qualityOfLife.safety),
      education: getScore(origin.qualityOfLife.education),
      climate: getScore(origin.qualityOfLife.climate),
      pollution: getScore(origin.qualityOfLife.pollution)
    };

    const overallOrigin = Object.values(originScores).reduce((sum, s) => sum + s.score, 0) / 5;

    const comparison = destResults.map(dest => {
      const destCountry = dest.country;
      const destScores = {
        healthcare: getScore(destCountry.qualityOfLife.healthcare),
        safety: getScore(destCountry.qualityOfLife.safety),
        education: getScore(destCountry.qualityOfLife.education),
        climate: getScore(destCountry.qualityOfLife.climate),
        pollution: getScore(destCountry.qualityOfLife.pollution)
      };

      const overallDest = Object.values(destScores).reduce((sum, s) => sum + s.score, 0) / 5;
      const diff = overallDest - overallOrigin;

      return {
        country: destCountry,
        flag: destCountry.flag,
        name: i18n.language === 'es' ? destCountry.nameEs : destCountry.name,
        scores: destScores,
        overall: overallDest,
        diff,
        better: diff > 5,
        worse: diff < -5
      };
    });

    return {
      origin: {
        name: i18n.language === 'es' ? origin.nameEs : origin.name,
        flag: origin.flag,
        scores: originScores,
        overall: overallOrigin
      },
      comparison
    };
  }, [originCountry, calculatedResults, i18n.language]);

  if (!qualityData) return null;

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          📊 {t('quality.title') || 'Índice de Calidad de Vida'}
        </h3>
        <p className={styles.subtitle}>
          {t('quality.subtitle') || 'Compara la calidad de vida entre países'}
        </p>
      </div>

      <div className={styles.originSection}>
        <span className={styles.sectionLabel}>{t('quality.yourCountry') || 'Tu país actual'}</span>
        <div className={styles.originCard}>
          <span className={styles.originFlag}>{qualityData.origin.flag}</span>
          <span className={styles.originName}>{qualityData.origin.name}</span>
          <div className={styles.originScore}>
            <span className={styles.scoreValue}>{qualityData.origin.overall.toFixed(0)}</span>
            <span className={styles.scoreLabel}>/100</span>
          </div>
        </div>

        <div className={styles.metricsGrid}>
          {qualityMetrics.map((metric, index) => {
            const score = qualityData.origin.scores[metric.key as keyof typeof qualityData.origin.scores];
            return (
              <motion.div 
                key={metric.key}
                className={styles.metricItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <div className={styles.metricHeader}>
                  <span className={styles.metricIcon}>{metric.icon}</span>
                  <span className={styles.metricName}>
                    {i18n.language === 'es' ? metric.nameEs : metric.name}
                  </span>
                </div>
                <div className={styles.metricBar}>
                  <motion.div 
                    className={styles.metricFill}
                    style={{ background: score.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${score.score}%` }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                  />
                </div>
                <span className={styles.metricScore} style={{ color: score.color }}>
                  {score.score}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className={styles.comparisonSection}>
        <h4 className={styles.comparisonTitle}>
          🌎 {t('quality.comparison') || 'Comparación con otros países'}
        </h4>

        <div className={styles.comparisonList}>
          {qualityData.comparison.map((dest, index) => (
            <motion.div 
              key={dest.country.id}
              className={`${styles.comparisonCard} ${dest.better ? styles.better : dest.worse ? styles.worse : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <div className={styles.comparisonHeader}>
                <span className={styles.comparisonFlag}>{dest.flag}</span>
                <span className={styles.comparisonName}>{dest.name}</span>
                <span className={`${styles.comparisonBadge} ${dest.better ? styles.badgeBetter : dest.worse ? styles.badgeWorse : ''}`}>
                  {dest.better ? '↑ Mejor' : dest.worse ? '↓ Peor' : '→ Similar'}
                </span>
              </div>

              <div className={styles.comparisonMetrics}>
                {qualityMetrics.slice(0, 3).map(metric => {
                  const score = dest.scores[metric.key as keyof typeof dest.scores];
                  const originScore = qualityData.origin.scores[metric.key as keyof typeof qualityData.origin.scores];
                  const diff = score.score - originScore.score;
                  return (
                    <div key={metric.key} className={styles.compMetric}>
                      <span className={styles.compMetricName}>{metric.icon}</span>
                      <span className={styles.compMetricScore} style={{ color: score.color }}>
                        {score.score}
                      </span>
                      {diff !== 0 && (
                        <span className={styles.compMetricDiff} style={{ color: diff > 0 ? '#22c55e' : '#ef4444' }}>
                          {diff > 0 ? '+' : ''}{diff}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={styles.comparisonOverall}>
                <span className={styles.overallLabel}>{t('quality.overall') || 'Puntuación total'}</span>
                <span className={styles.overallValue}>{dest.overall.toFixed(0)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#22c55e' }} />
          <span>80-100: Excelente</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#3b82f6' }} />
          <span>60-79: Bueno</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#f59e0b' }} />
          <span>40-59: Regular</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#ef4444' }} />
          <span>0-39: Bajo</span>
        </div>
      </div>
    </motion.div>
  );
};

export default QualityOfLifeIndex;
