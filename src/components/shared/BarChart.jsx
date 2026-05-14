import styles from './BarChart.module.css';

export default function BarChart({ data = [], loading = false }) {
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton} style={{ height: '300px' }}></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>No data available</div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.revenue));

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        {data.map((item, index) => {
          const barHeight = maxValue > 0 ? (item.revenue / maxValue) * 100 : 0;
          return (
            <div key={item.channel || index} className={styles.barContainer}>
              <div className={styles.barWrapper}>
                <div
                  className={styles.bar}
                  style={{ height: `${barHeight}%` }}
                  data-label={formatCurrency(item.revenue)}
                >
                  <div className={styles.barGlow}></div>
                </div>
              </div>
              <span className={styles.label}>{item.channel}</span>
              <span className={styles.value}>{formatCurrency(item.revenue)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}