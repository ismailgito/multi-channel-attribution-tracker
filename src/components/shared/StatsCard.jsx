import styles from './StatsCard.module.css';

export default function StatsCard({ title, value, subtitle, icon, trend, color = 'blue', loading = false }) {
  const colorMap = {
    blue: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: '#3b82f6' },
    green: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', text: '#10b981' },
    purple: { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.3)', text: '#8b5cf6' },
    orange: { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', text: '#f59e0b' },
    red: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#ef4444' },
  };

  const colors = colorMap[color] || colorMap.blue;

  if (loading) {
    return (
      <div className={styles.card}>
        <div className={`${styles.skeleton} ${styles.skeletonIcon}`}></div>
        <div className={styles.content}>
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonValue}`}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card} style={{ '--card-color': colors.text, '--card-bg': colors.bg, '--card-border': colors.border }}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        {trend !== undefined && (
          <span className={styles.trend} data-positive={trend >= 0}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
    </div>
  );
}