import styles from './SectionSkeleton.module.scss';

interface SectionSkeletonProps {
  height?: string;
  lines?: number;
  showHeader?: boolean;
  headerHeight?: string;
}

const SectionSkeleton: React.FC<SectionSkeletonProps> = ({ 
  height = '200px', 
  lines = 3,
  showHeader = true,
  headerHeight = '24px'
}) => {
  return (
    <div className={styles.skeleton} style={{ height }}>
      {showHeader && (
        <div className={styles.header}>
          <div className={styles.headerLine} style={{ width: '40%', height: headerHeight }} />
        </div>
      )}
      <div className={styles.content}>
        {Array.from({ length: lines }).map((_, index) => (
          <div 
            key={index} 
            className={styles.line}
            style={{ 
              width: `${70 + Math.random() * 30}%`,
              animationDelay: `${index * 0.1}s`
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export const CardSkeleton: React.FC = () => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <div className={styles.cardTitle} />
      <div className={styles.cardSubtitle} />
    </div>
    <div className={styles.cardContent}>
      <div className={styles.cardLine} style={{ width: '60%' }} />
      <div className={styles.cardLine} style={{ width: '80%' }} />
      <div className={styles.cardLine} style={{ width: '45%' }} />
    </div>
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className={styles.table}>
    <div className={styles.tableHeader}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={styles.tableHeaderCell} />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className={styles.tableRow}>
        {Array.from({ length: 5 }).map((_, colIndex) => (
          <div 
            key={colIndex} 
            className={styles.tableCell}
            style={{ width: `${60 + Math.random() * 40}%` }}
          />
        ))}
      </div>
    ))}
  </div>
);

export const ChartSkeleton: React.FC = () => (
  <div className={styles.chart}>
    <div className={styles.chartHeader}>
      <div className={styles.chartTitle} />
    </div>
    <div className={styles.chartArea}>
      <div className={styles.chartBars}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i} 
            className={styles.chartBar}
            style={{ 
              height: `${30 + Math.random() * 50}%`,
              animationDelay: `${i * 0.05}s`
            }} 
          />
        ))}
      </div>
    </div>
  </div>
);

export default SectionSkeleton;
