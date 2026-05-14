'use client';

import { useState, useEffect } from 'react';
import { useAttributionData, useSimulation } from '../hooks/useApi';
import styles from './Simulator.module.css';

const MODEL_OPTIONS = [
  { label: 'Last Click', value: 'lastClick' },
  { label: 'First Click', value: 'firstClick' },
  { label: 'Linear', value: 'linear' },
];

export default function Simulator() {
  const [sourceChannel, setSourceChannel] = useState('');
  const [targetChannel, setTargetChannel] = useState('');
  const [shiftAmount, setShiftAmount] = useState('');
  const [selectedModel, setSelectedModel] = useState('lastClick');

  const { data: attributionData, loading: channelsLoading } = useAttributionData({
    startDate: '7daysAgo',
    endDate: 'today',
    model: selectedModel,
  });

  const { simulate, result, loading: simulationLoading, error: simulationError, reset } = useSimulation();

  const channels = attributionData?.channels || [];

  useEffect(() => {
    if (channels.length > 0 && !sourceChannel) {
      setSourceChannel(channels[0]?.channel || '');
    }
  }, [channels, sourceChannel]);

  const handleSimulate = async (e) => {
    e.preventDefault();
    if (!sourceChannel || !targetChannel || !shiftAmount) return;

    try {
      await simulate({
        sourceChannel,
        targetChannel,
        shiftAmount: parseFloat(shiftAmount),
        model: selectedModel,
      });
    } catch (err) {
      console.error('Simulation failed:', err);
    }
  };

  const handleReset = () => {
    setShiftAmount('');
    reset();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const simulation = result?.simulation;
  const isApproved = simulation?.shift?.recommendation?.includes('APPROVED');

  return (
    <div className={styles.simulator}>
      <header className={styles.header}>
        <h1 className={styles.title}>Budget Simulator</h1>
        <p className={styles.subtitle}>
          Analyze budget reallocation impact across channels
        </p>
      </header>

      <div className={styles.layout}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Simulation Parameters</h3>
            <form onSubmit={handleSimulate} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Source Channel (Decrease)</label>
                <select
                  className={styles.select}
                  value={sourceChannel}
                  onChange={(e) => setSourceChannel(e.target.value)}
                  disabled={channelsLoading}
                >
                  <option value="">Select channel...</option>
                  {channels.map((ch) => (
                    <option key={ch.channel} value={ch.channel}>
                      {ch.channel} - {formatCurrency(ch.cost)} spend
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Target Channel (Increase)</label>
                <select
                  className={styles.select}
                  value={targetChannel}
                  onChange={(e) => setTargetChannel(e.target.value)}
                  disabled={channelsLoading}
                >
                  <option value="">Select channel...</option>
                  {channels
                    .filter((ch) => ch.channel !== sourceChannel)
                    .map((ch) => (
                      <option key={ch.channel} value={ch.channel}>
                        {ch.channel} - {formatCurrency(ch.cost)} spend
                      </option>
                    ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Shift Amount ($)</label>
                <input
                  type="number"
                  className={styles.input}
                  value={shiftAmount}
                  onChange={(e) => setShiftAmount(e.target.value)}
                  placeholder="Enter amount to shift..."
                  min="0"
                  step="100"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Attribution Model</label>
                <select
                  className={styles.select}
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  {MODEL_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.btnPrimary}
                  disabled={simulationLoading || !sourceChannel || !targetChannel || !shiftAmount}
                >
                  {simulationLoading ? (
                    <>
                      <span className={styles.spinner}></span>
                      Analyzing...
                    </>
                  ) : (
                    'Run Simulation'
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

          {simulationError && (
            <div className={styles.error}>
              <span className={styles.errorIcon}>!</span>
              <span>{simulationError}</span>
            </div>
          )}
        </div>

        <div className={styles.resultSection}>
          {simulation ? (
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <h3 className={styles.resultTitle}>Simulation Results</h3>
                <span
                  className={`${styles.badge} ${isApproved ? styles.badgeSuccess : styles.badgeWarning}`}
                >
                  {isApproved ? 'APPROVED' : 'NOT RECOMMENDED'}
                </span>
              </div>

              <div className={styles.shiftVisual}>
                <div className={styles.channelBox} data-type="source">
                  <span className={styles.channelLabel}>From</span>
                  <span className={styles.channelName}>{simulation.shift.from}</span>
                  <span className={styles.channelAmount}>-{formatCurrency(simulation.shift.amount)}</span>
                </div>
                <div className={styles.arrow}>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <div className={styles.channelBox} data-type="target">
                  <span className={styles.channelLabel}>To</span>
                  <span className={styles.channelName}>{simulation.shift.to}</span>
                  <span className={styles.channelAmount}>+{formatCurrency(simulation.shift.amount)}</span>
                </div>
              </div>

              <div className={styles.impactGrid}>
                <div className={styles.impactItem}>
                  <span className={styles.impactLabel}>Projected Revenue Loss</span>
                  <span className={styles.impactValueLoss}>
                    {formatCurrency(simulation.shift.projectedRevenueLoss)}
                  </span>
                </div>
                <div className={styles.impactItem}>
                  <span className={styles.impactLabel}>Projected Revenue Gain</span>
                  <span className={styles.impactValueGain}>
                    +{formatCurrency(simulation.shift.projectedRevenueGain)}
                  </span>
                </div>
                <div className={styles.impactItem} data-full>
                  <span className={styles.impactLabel}>Net Impact</span>
                  <span
                    className={`${styles.impactValueNet} ${simulation.shift.netImpact >= 0 ? styles.positive : styles.negative}`}
                  >
                    {simulation.shift.netImpact >= 0 ? '+' : ''}
                    {formatCurrency(simulation.shift.netImpact)}
                  </span>
                </div>
              </div>

              <div className={styles.summarySection}>
                <h4 className={styles.summaryTitle}>Current Totals</h4>
                <div className={styles.summaryGrid}>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Total Spend</span>
                    <span className={styles.summaryValue}>
                      {formatCurrency(simulation.currentTotalSpend)}
                    </span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Total Revenue</span>
                    <span className={styles.summaryValue}>
                      {formatCurrency(simulation.currentTotalRevenue)}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.recommendation}>
                <h4 className={styles.recommendationTitle}>Recommendation</h4>
                <p className={styles.recommendationText}>
                  {simulation.shift.recommendation}
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className={styles.emptyTitle}>No Simulation Run Yet</h3>
              <p className={styles.emptyText}>
                Configure parameters and run a simulation to see budget reallocation impact
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}