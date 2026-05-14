import styles from './DonutChart.module.css';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4'];

export default function DonutChart({ data = [], loading = false, metric = 'revenue' }) {
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton}></div>
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

  const total = data.reduce((sum, item) => sum + (item[metric] || 0), 0);
  
  let cumulativePercent = 0;
  const segments = data.map((item, index) => {
    const percent = total > 0 ? ((item[metric] || 0) / total) * 100 : 0;
    const startPercent = cumulativePercent;
    cumulativePercent += percent;
    return {
      ...item,
      percent,
      startPercent,
      color: COLORS[index % COLORS.length],
      index
    };
  });

  const formatValue = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const createArcPath = (startPercent, endPercent) => {
    const startAngle = (startPercent / 100) * 360 - 90;
    const endAngle = (endPercent / 100) * 360 - 90;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const radius = 70;
    const centerX = 100;
    const centerY = 100;
    
    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <svg viewBox="0 0 200 200" className={styles.chart}>
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="var(--bg-tertiary)"
            strokeWidth="24"
          />
          {segments.map((segment, i) => (
            <path
              key={i}
              d={createArcPath(segment.startPercent, segment.startPercent + segment.percent)}
              fill="none"
              stroke={segment.color}
              strokeWidth="24"
              strokeLinecap="round"
              className={styles.segment}
              style={{ '--delay': `${i * 100}ms` }}
            />
          ))}
        </svg>
        <div className={styles.center}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>{formatValue(total)}</span>
        </div>
      </div>
      
      <div className={styles.legend}>
        {segments.map((segment, i) => (
          <div key={i} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: segment.color }}></span>
            <span className={styles.legendLabel}>{segment.channel}</span>
            <span className={styles.legendValue}>{formatValue(segment[metric])}</span>
          </div>
        ))}
      </div>
    </div>
  );
}