import styles from './StatsCard.module.css';

export default function StatsCard({ title, value, subtitle, icon, trend, color = 'blue', loading = false }) {
  const colorMap = {
    blue: { bg: 'var(--accent-blue-glow)', border: 'rgba(37, 99, 235, 0.15)', text: 'var(--accent-blue)' },
    green: { bg: 'var(--accent-green-glow)', border: 'rgba(16, 185, 129, 0.15)', text: 'var(--accent-green)' },
    purple: { bg: 'var(--accent-purple-glow)', border: 'rgba(124, 58, 237, 0.15)', text: 'var(--accent-purple)' },
    orange: { bg: 'var(--accent-orange-glow)', border: 'rgba(234, 88, 12, 0.15)', text: 'var(--accent-orange)' },
    red: { bg: 'var(--accent-red-glow)', border: 'rgba(239, 68, 68, 0.15)', text: 'var(--accent-red)' },
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