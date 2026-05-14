'use client';

import { useState, useEffect } from 'react';
import styles from './UTMBuild.module.css';

const PRESET_TEMPLATES = [
  {
    name: 'Google Ads - Search Campaign',
    params: { utm_source: 'google', utm_medium: 'cpc', utm_campaign: '' }
  },
  {
    name: 'Facebook - Brand Awareness',
    params: { utm_source: 'facebook', utm_medium: 'social', utm_campaign: '' }
  },
  {
    name: 'Email Newsletter',
    params: { utm_source: 'email', utm_medium: 'newsletter', utm_campaign: '' }
  },
  {
    name: 'LinkedIn - Lead Generation',
    params: { utm_source: 'linkedin', utm_medium: 'paidsocial', utm_campaign: '' }
  },
  {
    name: 'Instagram - Product Launch',
    params: { utm_source: 'instagram', utm_medium: 'social', utm_campaign: '' }
  },
];

const PRESET_CAMPAIGNS = [
  'summer-sale-2024', 'product-launch', 'black-friday', 'cyber-monday',
  'new-arrivals', ' clearance', 'seasonal-promo', 'brand-awareness',
  'lead-generation', 'retargeting'
];

export default function UTMBuild() {
  const [baseUrl, setBaseUrl] = useState('');
  const [params, setParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  });
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const url = new URL(baseUrl || 'https://example.com');
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.set(key, value);
        else url.searchParams.delete(key);
      });
      const urlStr = baseUrl ? url.toString() : '';
      setGeneratedUrl(urlStr);
    } catch (err) {
      // Ignore invalid URL errors while typing
      setGeneratedUrl('');
    }
  }, [baseUrl, params]);

  const applyTemplate = (template) => {
    setParams(prev => ({
      ...prev,
      utm_source: template.params.utm_source,
      utm_medium: template.params.utm_medium,
      utm_campaign: template.params.utm_campaign || prev.utm_campaign,
    }));
  };

  const copyToClipboard = async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const clearAll = () => {
    setBaseUrl('');
    setParams({
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
    });
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleQuickCampaign = (campaign) => {
    setParams(prev => ({ ...prev, utm_campaign: campaign }));
  };

  return (
    <div className={styles.builder}>
      <header className={styles.header}>
        <h1 className={styles.title}>UTM Builder</h1>
        <p className={styles.subtitle}>
          Create standardized UTM parameters for consistent tracking
        </p>
      </header>

      <div className={styles.layout}>
        <div className={styles.mainSection}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>URL Configuration</h3>
            <div className={styles.formGroup}>
              <label className={styles.label}>Base URL</label>
              <input
                type="url"
                className={styles.input}
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://www.yoursite.com/landing-page"
              />
              {baseUrl && !isValidUrl(baseUrl) && (
                <span className={styles.inputError}>Please enter a valid URL</span>
              )}
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>UTM Parameters</h3>
            <div className={styles.paramsGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  utm_source <span className={styles.required}>*</span>
                </label>
                <span className={styles.hint}>The referrer (e.g., google, facebook, newsletter)</span>
                <input
                  type="text"
                  className={styles.input}
                  value={params.utm_source}
                  onChange={(e) => setParams(p => ({ ...p, utm_source: e.target.value.toLowerCase().replace(/\s/g, '-') }))}
                  placeholder="google"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  utm_medium <span className={styles.required}>*</span>
                </label>
                <span className={styles.hint}>Marketing medium (e.g., cpc, email, social)</span>
                <input
                  type="text"
                  className={styles.input}
                  value={params.utm_medium}
                  onChange={(e) => setParams(p => ({ ...p, utm_medium: e.target.value.toLowerCase().replace(/\s/g, '-') }))}
                  placeholder="cpc"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  utm_campaign <span className={styles.required}>*</span>
                </label>
                <span className={styles.hint}>Campaign identifier (e.g., summer-sale-2024)</span>
                <input
                  type="text"
                  className={styles.input}
                  value={params.utm_campaign}
                  onChange={(e) => setParams(p => ({ ...p, utm_campaign: e.target.value.toLowerCase().replace(/\s/g, '-') }))}
                  placeholder="summer-sale-2024"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>utm_term</label>
                <span className={styles.hint}>Paid search keyword (optional)</span>
                <input
                  type="text"
                  className={styles.input}
                  value={params.utm_term}
                  onChange={(e) => setParams(p => ({ ...p, utm_term: e.target.value }))}
                  placeholder="running+shoes"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>utm_content</label>
                <span className={styles.hint}>Differentiate ads (optional)</span>
                <input
                  type="text"
                  className={styles.input}
                  value={params.utm_content}
                  onChange={(e) => setParams(p => ({ ...p, utm_content: e.target.value }))}
                  placeholder="text-link"
                />
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Generated URL</h3>
            <div className={styles.outputSection}>
              <div className={styles.outputBox}>
                <code className={styles.outputCode}>
                  {generatedUrl || 'Enter a base URL and parameters to generate...'}
                </code>
              </div>
              <div className={styles.outputActions}>
                <button
                  className={styles.btnPrimary}
                  onClick={copyToClipboard}
                  disabled={!generatedUrl}
                >
                  {copied ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" className={styles.btnIcon}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" className={styles.btnIcon}>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy URL
                    </>
                  )}
                </button>
                <button className={styles.btnSecondary} onClick={clearAll}>
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Quick Templates</h3>
            <div className={styles.templateList}>
              {PRESET_TEMPLATES.map((template, i) => (
                <button
                  key={i}
                  className={styles.templateBtn}
                  onClick={() => applyTemplate(template)}
                >
                  <span className={styles.templateIcon}>
                    {template.params.utm_source.charAt(0).toUpperCase()}
                  </span>
                  <span className={styles.templateName}>{template.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Quick Campaign Names</h3>
            <div className={styles.campaignList}>
              {PRESET_CAMPAIGNS.map((campaign, i) => (
                <button
                  key={i}
                  className={styles.campaignBtn}
                  onClick={() => handleQuickCampaign(campaign)}
                >
                  {campaign}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Best Practices</h3>
            <ul className={styles.tipsList}>
              <li>Use lowercase for all UTM parameters</li>
              <li>Use hyphens (-) instead of spaces</li>
              <li>Be consistent with naming conventions</li>
              <li>Document your naming structure</li>
              <li>Track parameters in GA4 for analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}