'use client';

import { useState } from 'react';
import { useAttributionData } from '../hooks/useApi';
import { StatsCard, BarChart, DonutChart, ChannelTable } from './shared';
import styles from './Dashboard.module.css';

const DATE_OPTIONS = [
  { label: 'Last 7 Days', value: { start: '7daysAgo', end: 'today' } },
  { label: 'Last 14 Days', value: { start: '14daysAgo', end: 'today' } },
  { label: 'Last 30 Days', value: { start: '30daysAgo', end: 'today' } },
  { label: 'Last 90 Days', value: { start: '90daysAgo', end: 'today' } },
  { label: 'Custom Range', value: { start: 'custom', end: 'custom' } },
];

const MODEL_OPTIONS = [
  { label: 'Last Click', value: 'lastClick' },
  { label: 'First Click', value: 'firstClick' },
  { label: 'Linear', value: 'linear' },
];

export default function Dashboard() {
  const [dateRange, setDateRange] = useState(DATE_OPTIONS[0]);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [model, setModel] = useState('lastClick');
  const [activeView, setActiveView] = useState('overview');

  const actualStart = dateRange.label === 'Custom Range' && customStart ? customStart : dateRange.value.start;
  const actualEnd = dateRange.label === 'Custom Range' && customEnd ? customEnd : dateRange.value.end;

  const { data, loading, error } = useAttributionData({
    startDate: actualStart === 'custom' ? '7daysAgo' : actualStart,
    endDate: actualEnd === 'custom' ? 'today' : actualEnd,
    model,
  });

  const channelData = data?.channels || [];
  const totalRevenue = channelData.reduce((sum, c) => sum + (c.revenue || 0), 0);
  const totalSpend = channelData.reduce((sum, c) => sum + (c.cost || 0), 0);
  const totalConversions = channelData.reduce((sum, c) => sum + (c.conversions || 0), 0);
  const overallROI = totalSpend > 0 ? (((totalRevenue - totalSpend) / totalSpend) * 100).toFixed(1) : 'N/A';

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Channel Performance</h1>
          <p className={styles.subtitle}>
            Multi-channel attribution analysis powered by GA4, Google Ads & HubSpot
          </p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.selectGroup}>
            {dateRange.label === 'Custom Range' && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="date"
                  className={styles.select}
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  title="Start Date"
                />
                <input
                  type="date"
                  className={styles.select}
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  title="End Date"
                />
              </div>
            )}
            <select
              className={styles.select}
              value={dateRange.label}
              onChange={(e) => setDateRange(DATE_OPTIONS.find(o => o.label === e.target.value) || DATE_OPTIONS[0])}
            >
              {DATE_OPTIONS.map(opt => (
                <option key={opt.label} value={opt.label}>{opt.label}</option>
              ))}
            </select>
            <select
              className={styles.select}
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              {MODEL_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className={styles.sourceBadge} data-source={data?.source}>
            <span className={styles.sourceDot}></span>
            <span>{data?.source === 'api' ? 'Live Data' : data?.source === 'supabase' ? 'Historical' : 'Demo'}</span>
          </div>
        </div>
      </header>

      <nav className={styles.nav}>
        <button
          className={`${styles.navBtn} ${activeView === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.navBtn} ${activeView === 'channels' ? styles.active : ''}`}
          onClick={() => setActiveView('channels')}
        >
          Channels
        </button>
        <button
          className={`${styles.navBtn} ${activeView === 'analytics' ? styles.active : ''}`}
          onClick={() => setActiveView('analytics')}
        >
          Analytics
        </button>
      </nav>

      {error && (
        <div className={styles.error}>
          <span className={styles.errorIcon}>!</span>
          <span>{error}</span>
        </div>
      )}

      <div className={styles.statsGrid}>
        <StatsCard
          title="Total Revenue"
          value={`$${(totalRevenue / 1000).toFixed(0)}K`}
          subtitle={`${channelData.length} channels tracked`}
          color="blue"
          loading={loading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />
        <StatsCard
          title="Total Spend"
          value={`$${(totalSpend / 1000).toFixed(0)}K`}
          subtitle="Marketing investment"
          color="purple"
          loading={loading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          }
        />
        <StatsCard
          title="Conversions"
          value={loading ? '...' : totalConversions.toLocaleString()}
          subtitle="Across all channels"
          color="green"
          loading={loading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        />
        <StatsCard
          title="Overall ROI"
          value={loading ? '...' : `${overallROI}%`}
          subtitle="Return on investment"
          color={parseFloat(overallROI) > 50 ? 'green' : 'orange'}
          loading={loading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          }
        />
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Revenue by Channel</h3>
            <span className={styles.chartSubtitle}>Performance comparison</span>
          </div>
          <div className={styles.chartContent}>
            <BarChart data={channelData} loading={loading} />
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Spend Distribution</h3>
            <span className={styles.chartSubtitle}>Budget allocation</span>
          </div>
          <div className={styles.chartContent}>
            <DonutChart data={channelData} loading={loading} metric="cost" />
          </div>
        </div>
      </div>

      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h3 className={styles.sectionTitle}>Channel Breakdown</h3>
          <span className={styles.tableSubtitle}>Detailed performance metrics</span>
        </div>
        <div className={styles.tableWrapper}>
          <ChannelTable data={channelData} loading={loading} />
        </div>
      </div>
    </div>
  );
}