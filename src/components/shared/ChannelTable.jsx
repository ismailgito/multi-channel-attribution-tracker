import styles from './ChannelTable.module.css';

export default function ChannelTable({ data = [], loading = false }) {
  if (loading) {
    return (
      <div className={styles.container}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.skeletonRow}>
            <div className={`${styles.skeleton} ${styles.skeletonCell}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonCell}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonCell}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonCell}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonCell}`}></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>No channel data available</div>
      </div>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value || 0);
  };

  const calculateROI = (channel) => {
    if (!channel.cost || channel.cost === 0) return 'N/A';
    return `${(((channel.revenue - channel.cost) / channel.cost) * 100).toFixed(1)}%`;
  };

  const getROIClass = (channel) => {
    if (!channel.cost || channel.cost === 0) return styles.roiNeutral;
    const roi = ((channel.revenue - channel.cost) / channel.cost) * 100;
    if (roi > 100) return styles.roiHigh;
    if (roi > 0) return styles.roiMedium;
    return styles.roiLow;
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Channel</th>
            <th>Spend</th>
            <th>Revenue</th>
            <th>Conversions</th>
            <th>ROI</th>
          </tr>
        </thead>
        <tbody>
          {data.map((channel, index) => (
            <tr key={channel.channel || index} className={styles.row}>
              <td>
                <div className={styles.channelCell}>
                  <span className={styles.channelDot} data-index={index % 5}></span>
                  <span className={styles.channelName}>{channel.channel}</span>
                </div>
              </td>
              <td className={styles.numberCell}>{formatCurrency(channel.cost)}</td>
              <td className={styles.numberCell}>{formatCurrency(channel.revenue)}</td>
              <td className={styles.numberCell}>{formatNumber(channel.conversions)}</td>
              <td>
                <span className={`${styles.roi} ${getROIClass(channel)}`}>
                  {calculateROI(channel)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}