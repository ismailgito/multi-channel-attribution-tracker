// Attribution.js
const attributionData = [
    // January 2025 - Google dominates
    { channel: "Google Ads", cost: 12500, revenue: 78000, conversions: 1240, attribution_model: "linear", start_date: "2025-01-01", end_date: "2025-01-31", week: 1, month: 1 },
    { channel: "Meta Ads", cost: 8200, revenue: 41000, conversions: 890, attribution_model: "linear", start_date: "2025-01-01", end_date: "2025-01-31", week: 1, month: 1 },
    { channel: "SEO", cost: 3400, revenue: 42500, conversions: 560, attribution_model: "linear", start_date: "2025-01-01", end_date: "2025-01-31", week: 1, month: 1 },
    { channel: "Email", cost: 2100, revenue: 14700, conversions: 340, attribution_model: "linear", start_date: "2025-01-01", end_date: "2025-01-31", week: 1, month: 1 },
    { channel: "Referral", cost: 950, revenue: 5700, conversions: 120, attribution_model: "linear", start_date: "2025-01-01", end_date: "2025-01-31", week: 1, month: 1 },

    // February 2025 - Google still strong
    { channel: "Google Ads", cost: 11800, revenue: 73160, conversions: 1180, attribution_model: "linear", start_date: "2025-02-01", end_date: "2025-02-28", week: 5, month: 2 },
    { channel: "Meta Ads", cost: 7900, revenue: 42660, conversions: 920, attribution_model: "linear", start_date: "2025-02-01", end_date: "2025-02-28", week: 5, month: 2 },
    { channel: "SEO", cost: 3500, revenue: 45500, conversions: 600, attribution_model: "linear", start_date: "2025-02-01", end_date: "2025-02-28", week: 5, month: 2 },
    { channel: "Email", cost: 2200, revenue: 15400, conversions: 360, attribution_model: "linear", start_date: "2025-02-01", end_date: "2025-02-28", week: 5, month: 2 },
    { channel: "Referral", cost: 980, revenue: 5880, conversions: 125, attribution_model: "linear", start_date: "2025-02-01", end_date: "2025-02-28", week: 5, month: 2 },

    // March 2025 - Meta starts rising
    { channel: "Google Ads", cost: 11200, revenue: 69440, conversions: 1120, attribution_model: "linear", start_date: "2025-03-01", end_date: "2025-03-31", week: 9, month: 3 },
    { channel: "Meta Ads", cost: 8500, revenue: 49300, conversions: 1060, attribution_model: "linear", start_date: "2025-03-01", end_date: "2025-03-31", week: 9, month: 3 },
    { channel: "SEO", cost: 3600, revenue: 48600, conversions: 640, attribution_model: "linear", start_date: "2025-03-01", end_date: "2025-03-31", week: 9, month: 3 },
    { channel: "Email", cost: 2300, revenue: 16100, conversions: 380, attribution_model: "linear", start_date: "2025-03-01", end_date: "2025-03-31", week: 9, month: 3 },
    { channel: "Referral", cost: 1020, revenue: 6120, conversions: 130, attribution_model: "linear", start_date: "2025-03-01", end_date: "2025-03-31", week: 9, month: 3 },

    // April 2025 - Meta overtakes Google
    { channel: "Google Ads", cost: 10500, revenue: 65100, conversions: 1050, attribution_model: "linear", start_date: "2025-04-01", end_date: "2025-04-30", week: 14, month: 4 },
    { channel: "Meta Ads", cost: 9500, revenue: 61750, conversions: 1280, attribution_model: "linear", start_date: "2025-04-01", end_date: "2025-04-30", week: 14, month: 4 },
    { channel: "SEO", cost: 3700, revenue: 51800, conversions: 680, attribution_model: "linear", start_date: "2025-04-01", end_date: "2025-04-30", week: 14, month: 4 },
    { channel: "Email", cost: 2400, revenue: 16800, conversions: 400, attribution_model: "linear", start_date: "2025-04-01", end_date: "2025-04-30", week: 14, month: 4 },
    { channel: "Referral", cost: 1050, revenue: 6300, conversions: 135, attribution_model: "linear", start_date: "2025-04-01", end_date: "2025-04-30", week: 14, month: 4 },

    // May 2025 - Meta peak
    { channel: "Google Ads", cost: 9800, revenue: 60760, conversions: 980, attribution_model: "linear", start_date: "2025-05-01", end_date: "2025-05-31", week: 18, month: 5 },
    { channel: "Meta Ads", cost: 11200, revenue: 78400, conversions: 1520, attribution_model: "linear", start_date: "2025-05-01", end_date: "2025-05-31", week: 18, month: 5 },
    { channel: "SEO", cost: 3800, revenue: 55100, conversions: 720, attribution_model: "linear", start_date: "2025-05-01", end_date: "2025-05-31", week: 18, month: 5 },
    { channel: "Email", cost: 2500, revenue: 17500, conversions: 420, attribution_model: "linear", start_date: "2025-05-01", end_date: "2025-05-31", week: 18, month: 5 },
    { channel: "Referral", cost: 1100, revenue: 7150, conversions: 145, attribution_model: "linear", start_date: "2025-05-01", end_date: "2025-05-31", week: 18, month: 5 },

    // June 2025 - Summer slowdown
    { channel: "Google Ads", cost: 9500, revenue: 57000, conversions: 920, attribution_model: "linear", start_date: "2025-06-01", end_date: "2025-06-30", week: 22, month: 6 },
    { channel: "Meta Ads", cost: 10800, revenue: 64800, conversions: 1260, attribution_model: "linear", start_date: "2025-06-01", end_date: "2025-06-30", week: 22, month: 6 },
    { channel: "SEO", cost: 3900, revenue: 58500, conversions: 760, attribution_model: "linear", start_date: "2025-06-01", end_date: "2025-06-30", week: 22, month: 6 },
    { channel: "Email", cost: 2600, revenue: 18200, conversions: 440, attribution_model: "linear", start_date: "2025-06-01", end_date: "2025-06-30", week: 22, month: 6 },
    { channel: "Referral", cost: 1150, revenue: 7475, conversions: 150, attribution_model: "linear", start_date: "2025-06-01", end_date: "2025-06-30", week: 22, month: 6 },

    // July 2025 - Email campaigns peak
    { channel: "Google Ads", cost: 9200, revenue: 55200, conversions: 890, attribution_model: "linear", start_date: "2025-07-01", end_date: "2025-07-31", week: 27, month: 7 },
    { channel: "Meta Ads", cost: 10500, revenue: 63000, conversions: 1220, attribution_model: "linear", start_date: "2025-07-01", end_date: "2025-07-31", week: 27, month: 7 },
    { channel: "SEO", cost: 4000, revenue: 62000, conversions: 800, attribution_model: "linear", start_date: "2025-07-01", end_date: "2025-07-31", week: 27, month: 7 },
    { channel: "Email", cost: 3200, revenue: 25600, conversions: 580, attribution_model: "linear", start_date: "2025-07-01", end_date: "2025-07-31", week: 27, month: 7 },
    { channel: "Referral", cost: 1200, revenue: 8400, conversions: 160, attribution_model: "linear", start_date: "2025-07-01", end_date: "2025-07-31", week: 27, month: 7 },

    // August 2025 - SEO shines
    { channel: "Google Ads", cost: 8900, revenue: 53400, conversions: 860, attribution_model: "linear", start_date: "2025-08-01", end_date: "2025-08-31", week: 31, month: 8 },
    { channel: "Meta Ads", cost: 10200, revenue: 61200, conversions: 1180, attribution_model: "linear", start_date: "2025-08-01", end_date: "2025-08-31", week: 31, month: 8 },
    { channel: "SEO", cost: 4500, revenue: 81000, conversions: 980, attribution_model: "linear", start_date: "2025-08-01", end_date: "2025-08-31", week: 31, month: 8 },
    { channel: "Email", cost: 3100, revenue: 24800, conversions: 560, attribution_model: "linear", start_date: "2025-08-01", end_date: "2025-08-31", week: 31, month: 8 },
    { channel: "Referral", cost: 1250, revenue: 8750, conversions: 165, attribution_model: "linear", start_date: "2025-08-01", end_date: "2025-08-31", week: 31, month: 8 },

    // September 2025 - Back to school boost
    { channel: "Google Ads", cost: 10500, revenue: 69300, conversions: 1100, attribution_model: "linear", start_date: "2025-09-01", end_date: "2025-09-30", week: 36, month: 9 },
    { channel: "Meta Ads", cost: 11500, revenue: 80500, conversions: 1450, attribution_model: "linear", start_date: "2025-09-01", end_date: "2025-09-30", week: 36, month: 9 },
    { channel: "SEO", cost: 4700, revenue: 89300, conversions: 1060, attribution_model: "linear", start_date: "2025-09-01", end_date: "2025-09-30", week: 36, month: 9 },
    { channel: "Email", cost: 3300, revenue: 26400, conversions: 600, attribution_model: "linear", start_date: "2025-09-01", end_date: "2025-09-30", week: 36, month: 9 },
    { channel: "Referral", cost: 1350, revenue: 9450, conversions: 175, attribution_model: "linear", start_date: "2025-09-01", end_date: "2025-09-30", week: 36, month: 9 },

    // October 2025 - Pre-holiday ramp
    { channel: "Google Ads", cost: 11800, revenue: 82600, conversions: 1280, attribution_model: "linear", start_date: "2025-10-01", end_date: "2025-10-31", week: 40, month: 10 },
    { channel: "Meta Ads", cost: 12800, revenue: 97280, conversions: 1680, attribution_model: "linear", start_date: "2025-10-01", end_date: "2025-10-31", week: 40, month: 10 },
    { channel: "SEO", cost: 4900, revenue: 102900, conversions: 1180, attribution_model: "linear", start_date: "2025-10-01", end_date: "2025-10-31", week: 40, month: 10 },
    { channel: "Email", cost: 3600, revenue: 32400, conversions: 700, attribution_model: "linear", start_date: "2025-10-01", end_date: "2025-10-31", week: 40, month: 10 },
    { channel: "Referral", cost: 1450, revenue: 10875, conversions: 190, attribution_model: "linear", start_date: "2025-10-01", end_date: "2025-10-31", week: 40, month: 10 },

    // November 2025 - Black Friday peak - Google dominates again
    { channel: "Google Ads", cost: 18500, revenue: 148000, conversions: 2200, attribution_model: "linear", start_date: "2025-11-01", end_date: "2025-11-30", week: 44, month: 11 },
    { channel: "Meta Ads", cost: 16500, revenue: 123750, conversions: 2050, attribution_model: "linear", start_date: "2025-11-01", end_date: "2025-11-30", week: 44, month: 11 },
    { channel: "SEO", cost: 5500, revenue: 121000, conversions: 1350, attribution_model: "linear", start_date: "2025-11-01", end_date: "2025-11-30", week: 44, month: 11 },
    { channel: "Email", cost: 4200, revenue: 42000, conversions: 880, attribution_model: "linear", start_date: "2025-11-01", end_date: "2025-11-30", week: 44, month: 11 },
    { channel: "Referral", cost: 1800, revenue: 16200, conversions: 230, attribution_model: "linear", start_date: "2025-11-01", end_date: "2025-11-30", week: 44, month: 11 },

    // December 2025 - Holiday season - all channels peak
    { channel: "Google Ads", cost: 19200, revenue: 153600, conversions: 2280, attribution_model: "linear", start_date: "2025-12-01", end_date: "2025-12-31", week: 49, month: 12 },
    { channel: "Meta Ads", cost: 17200, revenue: 129000, conversions: 2150, attribution_model: "linear", start_date: "2025-12-01", end_date: "2025-12-31", week: 49, month: 12 },
    { channel: "SEO", cost: 5800, revenue: 127600, conversions: 1420, attribution_model: "linear", start_date: "2025-12-01", end_date: "2025-12-31", week: 49, month: 12 },
    { channel: "Email", cost: 4400, revenue: 46200, conversions: 950, attribution_model: "linear", start_date: "2025-12-01", end_date: "2025-12-31", week: 49, month: 12 },
    { channel: "Referral", cost: 1950, revenue: 18525, conversions: 260, attribution_model: "linear", start_date: "2025-12-01", end_date: "2025-12-31", week: 49, month: 12 }
];

const budgetSimulations = [
    { source_channel: "Meta Ads", target_channel: "Google Ads", shift_amount: 2000, projected_revenue_loss: 7200, projected_revenue_gain: 10400, net_impact: 3200, recommendation: "reallocate", attribution_model: "linear", created_at: "2025-03-15" },
    { source_channel: "Email", target_channel: "SEO", shift_amount: 1500, projected_revenue_loss: 4200, projected_revenue_gain: 9150, net_impact: 4950, recommendation: "reallocate", attribution_model: "linear", created_at: "2025-04-10" },
    { source_channel: "Referral", target_channel: "Meta Ads", shift_amount: 800, projected_revenue_loss: 4800, projected_revenue_gain: 2880, net_impact: -1920, recommendation: "keep", attribution_model: "linear", created_at: "2025-05-20" },
    { source_channel: "Google Ads", target_channel: "SEO", shift_amount: 3000, projected_revenue_loss: 15600, projected_revenue_gain: 18300, net_impact: 2700, recommendation: "reallocate", attribution_model: "linear", created_at: "2025-07-05" },
    { source_channel: "Meta Ads", target_channel: "Email", shift_amount: 1000, projected_revenue_loss: 3600, projected_revenue_gain: 2800, net_impact: -800, recommendation: "keep", attribution_model: "linear", created_at: "2025-08-12" },
    { source_channel: "Google Ads", target_channel: "Meta Ads", shift_amount: 2500, projected_revenue_loss: 13000, projected_revenue_gain: 9000, net_impact: -4000, recommendation: "keep", attribution_model: "linear", created_at: "2025-09-25" },
    { source_channel: "Email", target_channel: "Google Ads", shift_amount: 2000, projected_revenue_loss: 5600, projected_revenue_gain: 10400, net_impact: 4800, recommendation: "reallocate", attribution_model: "linear", created_at: "2025-10-30" },
    { source_channel: "SEO", target_channel: "Meta Ads", shift_amount: 1800, projected_revenue_loss: 10980, projected_revenue_gain: 6480, net_impact: -4500, recommendation: "keep", attribution_model: "linear", created_at: "2025-11-15" }
];

const reportsHistory = [
    { recipient_email: "marketing@company.com", contact_id: "C001", channels_tracked: 5, pdf_size_kb: 245.5, attribution_model: "linear", date_range_start: "2025-01-01", date_range_end: "2025-01-31", created_at: "2025-02-01" },
    { recipient_email: "marketing@company.com", contact_id: "C001", channels_tracked: 5, pdf_size_kb: 258.3, attribution_model: "linear", date_range_start: "2025-02-01", date_range_end: "2025-02-28", created_at: "2025-03-01" },
    { recipient_email: "ceo@company.com", contact_id: "C002", channels_tracked: 5, pdf_size_kb: 267.8, attribution_model: "linear", date_range_start: "2025-03-01", date_range_end: "2025-03-31", created_at: "2025-04-01" },
    { recipient_email: "marketing@company.com", contact_id: "C001", channels_tracked: 5, pdf_size_kb: 272.1, attribution_model: "linear", date_range_start: "2025-04-01", date_range_end: "2025-04-30", created_at: "2025-05-01" },
    { recipient_email: "sales@company.com", contact_id: "C003", channels_tracked: 5, pdf_size_kb: 289.4, attribution_model: "linear", date_range_start: "2025-05-01", date_range_end: "2025-05-31", created_at: "2025-06-01" },
    { recipient_email: "marketing@company.com", contact_id: "C001", channels_tracked: 5, pdf_size_kb: 295.7, attribution_model: "linear", date_range_start: "2025-06-01", date_range_end: "2025-06-30", created_at: "2025-07-01" },
    { recipient_email: "ceo@company.com", contact_id: "C002", channels_tracked: 5, pdf_size_kb: 312.5, attribution_model: "linear", date_range_start: "2025-07-01", date_range_end: "2025-07-31", created_at: "2025-08-01" },
    { recipient_email: "marketing@company.com", contact_id: "C001", channels_tracked: 5, pdf_size_kb: 325.8, attribution_model: "linear", date_range_start: "2025-08-01", date_range_end: "2025-08-31", created_at: "2025-09-01" },
    { recipient_email: "sales@company.com", contact_id: "C003", channels_tracked: 5, pdf_size_kb: 341.2, attribution_model: "linear", date_range_start: "2025-09-01", date_range_end: "2025-09-30", created_at: "2025-10-01" },
    { recipient_email: "marketing@company.com", contact_id: "C001", channels_tracked: 5, pdf_size_kb: 358.6, attribution_model: "linear", date_range_start: "2025-10-01", date_range_end: "2025-10-31", created_at: "2025-11-01" },
    { recipient_email: "ceo@company.com", contact_id: "C002", channels_tracked: 5, pdf_size_kb: 389.3, attribution_model: "linear", date_range_start: "2025-11-01", date_range_end: "2025-11-30", created_at: "2025-12-01" },
    { recipient_email: "marketing@company.com", contact_id: "C001", channels_tracked: 5, pdf_size_kb: 412.7, attribution_model: "linear", date_range_start: "2025-12-01", date_range_end: "2025-12-31", created_at: "2026-01-01" }
];

const dailyMarketingSnapshot = [
    // January
    { snapshot_date: "2025-01-15", channel: "Google Ads", cost: 4166.67, revenue: 26000, conversions: 413, roas: 6.24 },
    { snapshot_date: "2025-01-15", channel: "Meta Ads", cost: 2733.33, revenue: 13666.67, conversions: 297, roas: 5.0 },
    { snapshot_date: "2025-01-15", channel: "SEO", cost: 1133.33, revenue: 14166.67, conversions: 187, roas: 12.5 },
    // February
    { snapshot_date: "2025-02-15", channel: "Google Ads", cost: 3933.33, revenue: 24386.67, conversions: 393, roas: 6.20 },
    { snapshot_date: "2025-02-15", channel: "Meta Ads", cost: 2633.33, revenue: 14220, conversions: 307, roas: 5.40 },
    { snapshot_date: "2025-02-15", channel: "SEO", cost: 1166.67, revenue: 15166.67, conversions: 200, roas: 13.0 },
    // March
    { snapshot_date: "2025-03-15", channel: "Google Ads", cost: 3733.33, revenue: 23146.67, conversions: 373, roas: 6.20 },
    { snapshot_date: "2025-03-15", channel: "Meta Ads", cost: 2833.33, revenue: 16433.33, conversions: 353, roas: 5.80 },
    { snapshot_date: "2025-03-15", channel: "SEO", cost: 1200, revenue: 16200, conversions: 213, roas: 13.5 },
    // April
    { snapshot_date: "2025-04-15", channel: "Google Ads", cost: 3500, revenue: 21700, conversions: 350, roas: 6.20 },
    { snapshot_date: "2025-04-15", channel: "Meta Ads", cost: 3166.67, revenue: 20583.33, conversions: 427, roas: 6.50 },
    { snapshot_date: "2025-04-15", channel: "SEO", cost: 1233.33, revenue: 17266.67, conversions: 227, roas: 14.0 },
    // May
    { snapshot_date: "2025-05-15", channel: "Google Ads", cost: 3266.67, revenue: 20253.33, conversions: 327, roas: 6.20 },
    { snapshot_date: "2025-05-15", channel: "Meta Ads", cost: 3733.33, revenue: 26133.33, conversions: 507, roas: 7.0 },
    { snapshot_date: "2025-05-15", channel: "SEO", cost: 1266.67, revenue: 18366.67, conversions: 240, roas: 14.5 },
    // June
    { snapshot_date: "2025-06-15", channel: "Google Ads", cost: 3166.67, revenue: 19000, conversions: 307, roas: 6.0 },
    { snapshot_date: "2025-06-15", channel: "Meta Ads", cost: 3600, revenue: 21600, conversions: 420, roas: 6.0 },
    { snapshot_date: "2025-06-15", channel: "SEO", cost: 1300, revenue: 19500, conversions: 253, roas: 15.0 },
    // July
    { snapshot_date: "2025-07-15", channel: "Google Ads", cost: 3066.67, revenue: 18400, conversions: 297, roas: 6.0 },
    { snapshot_date: "2025-07-15", channel: "Meta Ads", cost: 3500, revenue: 21000, conversions: 407, roas: 6.0 },
    { snapshot_date: "2025-07-15", channel: "SEO", cost: 1333.33, revenue: 20666.67, conversions: 267, roas: 15.5 },
    { snapshot_date: "2025-07-15", channel: "Email", cost: 1066.67, revenue: 8533.33, conversions: 193, roas: 8.0 },
    // August
    { snapshot_date: "2025-08-15", channel: "Google Ads", cost: 2966.67, revenue: 17800, conversions: 287, roas: 6.0 },
    { snapshot_date: "2025-08-15", channel: "Meta Ads", cost: 3400, revenue: 20400, conversions: 393, roas: 6.0 },
    { snapshot_date: "2025-08-15", channel: "SEO", cost: 1500, revenue: 27000, conversions: 327, roas: 18.0 },
    { snapshot_date: "2025-08-15", channel: "Email", cost: 1033.33, revenue: 8266.67, conversions: 187, roas: 8.0 },
    // September
    { snapshot_date: "2025-09-15", channel: "Google Ads", cost: 3500, revenue: 23100, conversions: 367, roas: 6.6 },
    { snapshot_date: "2025-09-15", channel: "Meta Ads", cost: 3833.33, revenue: 26833.33, conversions: 483, roas: 7.0 },
    { snapshot_date: "2025-09-15", channel: "SEO", cost: 1566.67, revenue: 29766.67, conversions: 353, roas: 19.0 },
    { snapshot_date: "2025-09-15", channel: "Email", cost: 1100, revenue: 8800, conversions: 200, roas: 8.0 },
    // October
    { snapshot_date: "2025-10-15", channel: "Google Ads", cost: 3933.33, revenue: 27533.33, conversions: 427, roas: 7.0 },
    { snapshot_date: "2025-10-15", channel: "Meta Ads", cost: 4266.67, revenue: 32426.67, conversions: 560, roas: 7.6 },
    { snapshot_date: "2025-10-15", channel: "SEO", cost: 1633.33, revenue: 34300, conversions: 393, roas: 21.0 },
    { snapshot_date: "2025-10-15", channel: "Email", cost: 1200, revenue: 10800, conversions: 233, roas: 9.0 },
    { snapshot_date: "2025-10-15", channel: "Referral", cost: 483.33, revenue: 3625, conversions: 63, roas: 7.5 },
    // November
    { snapshot_date: "2025-11-15", channel: "Google Ads", cost: 6166.67, revenue: 49333.33, conversions: 733, roas: 8.0 },
    { snapshot_date: "2025-11-15", channel: "Meta Ads", cost: 5500, revenue: 41250, conversions: 683, roas: 7.5 },
    { snapshot_date: "2025-11-15", channel: "SEO", cost: 1833.33, revenue: 40333.33, conversions: 450, roas: 22.0 },
    { snapshot_date: "2025-11-15", channel: "Email", cost: 1400, revenue: 14000, conversions: 293, roas: 10.0 },
    { snapshot_date: "2025-11-15", channel: "Referral", cost: 600, revenue: 5400, conversions: 77, roas: 9.0 },
    // December
    { snapshot_date: "2025-12-15", channel: "Google Ads", cost: 6400, revenue: 51200, conversions: 760, roas: 8.0 },
    { snapshot_date: "2025-12-15", channel: "Meta Ads", cost: 5733.33, revenue: 43000, conversions: 717, roas: 7.5 },
    { snapshot_date: "2025-12-15", channel: "SEO", cost: 1933.33, revenue: 42533.33, conversions: 473, roas: 22.0 },
    { snapshot_date: "2025-12-15", channel: "Email", cost: 1466.67, revenue: 15400, conversions: 317, roas: 10.5 },
    { snapshot_date: "2025-12-15", channel: "Referral", cost: 650, revenue: 6175, conversions: 87, roas: 9.5 }
];

export { attributionData, budgetSimulations, reportsHistory, dailyMarketingSnapshot };