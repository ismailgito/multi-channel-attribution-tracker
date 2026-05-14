'use client';

import { useState } from 'react';
import { useReportGeneration, useAttributionData } from '../hooks/useApi';
import styles from './ReportGenerator.module.css';

const DATE_OPTIONS = [
  { label: 'Last 7 Days', value: { start: '7daysAgo', end: 'today' } },
  { label: 'Last 14 Days', value: { start: '14daysAgo', end: 'today' } },
  { label: 'Last 30 Days', value: { start: '30daysAgo', end: 'today' } },
  { label: 'Last 90 Days', value: { start: '90daysAgo', end: 'today' } },
];

const MODEL_OPTIONS = [
  { label: 'Last Click', value: 'lastClick' },
  { label: 'First Click', value: 'firstClick' },
  { label: 'Linear', value: 'linear' },
];

export default function ReportGenerator() {
  const [dateRange, setDateRange] = useState(DATE_OPTIONS[0]);
  const [model, setModel] = useState('lastClick');

  const { generate, result, loading, error, reset } = useReportGeneration();
  const { data: previewData } = useAttributionData({
    startDate: dateRange.value.start,
    endDate: dateRange.value.end,
    model,
  });

  const handleGenerate = async (e) => {
    e.preventDefault();

    try {
      const res = await generate({
        dateRange: {
          start: dateRange.value.start,
          end: dateRange.value.end,
        },
        model,
      });
      // Auto-trigger download
      if (res?.reportMetadata?.pdfBase64) {
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${res.reportMetadata.pdfBase64}`;
        link.download = `attribution-report-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error('Report generation failed:', err);
    }
  };

  const handleReset = () => {
    setDateRange(DATE_OPTIONS[0]);
    setModel('lastClick');
    reset();
  };

  const downloadPDF = () => {
    if (!result?.reportMetadata?.pdfBase64) return;
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${result.reportMetadata.pdfBase64}`;
    link.download = `attribution-report-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const channelData = previewData?.channels || [];
  const totalRevenue = channelData.reduce((sum, c) => sum + (c.revenue || 0), 0);
  const totalSpend = channelData.reduce((sum, c) => sum + (c.cost || 0), 0);
  const totalConversions = channelData.reduce((sum, c) => sum + (c.conversions || 0), 0);

  return (
    <div className={styles.generator}>
      <header className={styles.header}>
        <h1 className={styles.title}>Report Generator</h1>
        <p className={styles.subtitle}>
          Generate PDF attribution reports with channel performance data
        </p>
      </header>

      <div className={styles.layout}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Report Configuration</h3>
            <form onSubmit={handleGenerate} className={styles.form}>

              <div className={styles.formGroup}>
                <label className={styles.label}>Date Range</label>
                <select
                  className={styles.select}
                  value={dateRange.label}
                  onChange={(e) => setDateRange(DATE_OPTIONS.find(o => o.label === e.target.value) || DATE_OPTIONS[0])}
                >
                  {DATE_OPTIONS.map(opt => (
                    <option key={opt.label} value={opt.label}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Attribution Model</label>
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

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.btnPrimary}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className={styles.spinner}></span>
                      Generating...
                    </>
                  ) : (
                    'Generate Report'
                  )}
                </button>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {error && (
            <div className={styles.error}>
              <span className={styles.errorIcon}>!</span>
              <span>{error}</span>
            </div>
          )}

          {result?.success && (
            <div className={styles.success}>
              <div className={styles.successHeader}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" className={styles.successIcon}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Report Generated Successfully</span>
              </div>
              <p className={styles.successText}>
                Your report was successfully generated using {result.reportMetadata.dataSource} data.
              </p>
              <div className={styles.metadata}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Channels Tracked</span>
                  <span className={styles.metaValue}>{result.reportMetadata.channelsTracked}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>PDF Size</span>
                  <span className={styles.metaValue}>{result.reportMetadata.pdfSizeKB} KB</span>
                </div>
              </div>
              <button className={styles.downloadBtn} onClick={downloadPDF}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" className={styles.downloadIcon}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </button>
            </div>
          )}
        </div>

        <div className={styles.previewSection}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Report Preview</h3>
            <div className={styles.previewContent}>
              <div className={styles.previewHeader}>
                <h4 className={styles.previewTitle}>Multi-Channel Attribution Report</h4>
                <p className={styles.previewDate}>
                  Generated: {new Date().toLocaleString()}
                </p>
              </div>

              <div className={styles.previewMeta}>
                <div className={styles.previewMetaItem}>
                  <span className={styles.previewMetaLabel}>Attribution Model</span>
                  <span className={styles.previewMetaValue}>{model}</span>
                </div>
                <div className={styles.previewMetaItem}>
                  <span className={styles.previewMetaLabel}>Date Range</span>
                  <span className={styles.previewMetaValue}>
                    {dateRange.value.start} to {dateRange.value.end}
                  </span>
                </div>
              </div>

              <div className={styles.previewStats}>
                <div className={styles.previewStat}>
                  <span className={styles.previewStatValue}>
                    ${(totalRevenue / 1000).toFixed(0)}K
                  </span>
                  <span className={styles.previewStatLabel}>Total Revenue</span>
                </div>
                <div className={styles.previewStat}>
                  <span className={styles.previewStatValue}>
                    ${(totalSpend / 1000).toFixed(0)}K
                  </span>
                  <span className={styles.previewStatLabel}>Total Spend</span>
                </div>
                <div className={styles.previewStat}>
                  <span className={styles.previewStatValue}>
                    {totalConversions.toLocaleString()}
                  </span>
                  <span className={styles.previewStatLabel}>Conversions</span>
                </div>
              </div>

              <div className={styles.previewChannels}>
                <h5 className={styles.previewSectionTitle}>Channel Performance</h5>
                <div className={styles.channelList}>
                  {channelData.slice(0, 5).map((channel, i) => (
                    <div key={i} className={styles.channelItem}>
                      <span className={styles.channelDot} data-index={i}></span>
                      <span className={styles.channelName}>{channel.channel}</span>
                      <span className={styles.channelRevenue}>
                        ${channel.revenue?.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.previewFooter}>
                <span className={styles.previewBadge}>
                  {channelData.length} channels tracked
                </span>
                <span className={styles.previewBadge}>
                  {previewData?.source === 'api' ? 'Live Data' : previewData?.source === 'supabase' ? 'Historical' : 'Demo'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}