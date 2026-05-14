'use client';

import { useState } from 'react';
import Dashboard from '../components/Dashboard';
import Simulator from '../components/Simulator';
import UTMBuild from '../components/UTMBuild';
import ReportGenerator from '../components/ReportGenerator';
import styles from './page.module.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'chart' },
  { id: 'simulator', label: 'Budget Simulator', icon: 'shift' },
  { id: 'utm', label: 'UTM Builder', icon: 'tag' },
  { id: 'reports', label: 'Reports', icon: 'file' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderIcon = (type) => {
    switch (type) {
      case 'chart':
        return (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
        );
      case 'shift':
        return (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        );
      case 'tag':
        return (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        );
      case 'file':
        return (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div className={styles.logoText}>
            <h1 className={styles.logoTitle}>Attribution Tracker</h1>
            <span className={styles.logoSubtitle}>Multi-Channel Analytics</span>
          </div>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className={styles.navIcon}>{renderIcon(item.icon)}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.headerRight}>
          <div className={styles.status}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>System Active</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'simulator' && <Simulator />}
        {activeTab === 'utm' && <UTMBuild />}
        {activeTab === 'reports' && <ReportGenerator />}
      </main>

      <footer className={styles.footer}>
        <p>Powered by GA4, Google Ads & HubSpot integration</p>
      </footer>
    </div>
  );
}