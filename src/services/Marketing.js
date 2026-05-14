// Marketing.js
class MarketingDatabase {
    constructor() {
        this.attributionData = [];
        this.budgetSimulations = [];
        this.reportsHistory = [];
        this.dailyMarketingSnapshot = [];
        this.initializeData();
    }

    initializeData() {
        // Generate full year 2025 data - 365 days of marketing data
        const channels = [
            { name: "Google Ads", baseCost: 320, baseRevenue: 1984, seasonality: [1.2, 1.15, 1.1, 1.05, 1.0, 0.95, 0.9, 0.95, 1.1, 1.3, 1.8, 2.0] },
            { name: "Meta Ads", baseCost: 280, baseRevenue: 1400, seasonality: [0.9, 0.95, 1.1, 1.3, 1.5, 1.4, 1.3, 1.2, 1.4, 1.6, 1.7, 1.6] },
            { name: "SEO", baseCost: 110, baseRevenue: 1375, seasonality: [0.95, 0.98, 1.05, 1.1, 1.15, 1.18, 1.2, 1.25, 1.3, 1.35, 1.5, 1.55] },
            { name: "Email", baseCost: 70, baseRevenue: 490, seasonality: [0.8, 0.85, 0.9, 1.0, 1.05, 1.1, 1.2, 1.15, 1.1, 1.2, 1.4, 1.45] },
            { name: "Referral", baseCost: 30, baseRevenue: 180, seasonality: [0.9, 0.92, 0.95, 1.0, 1.05, 1.08, 1.1, 1.12, 1.15, 1.2, 1.4, 1.45] }
        ];

        let id = 1;

        // Generate daily data for entire year
        for (let month = 1; month <= 12; month++) {
            const daysInMonth = new Date(2025, month, 0).getDate();

            for (let day = 1; day <= daysInMonth; day++) {
                const date = `2025-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const weekOfYear = this.getWeekNumber(new Date(date));

                channels.forEach(channel => {
                    const seasonalFactor = channel.seasonality[month - 1];
                    const dayFactor = this.getDayFactor(day, daysInMonth);
                    const weekendFactor = this.getWeekendFactor(new Date(date));

                    const dailyCost = Math.round(channel.baseCost * seasonalFactor * dayFactor * weekendFactor);
                    const dailyRevenue = Math.round(channel.baseRevenue * seasonalFactor * dayFactor * weekendFactor);
                    const dailyConversions = Math.round(dailyRevenue / (channel.name === "Google Ads" ? 65 :
                        channel.name === "Meta Ads" ? 55 :
                            channel.name === "SEO" ? 90 :
                                channel.name === "Email" ? 45 : 70));

                    this.attributionData.push({
                        id: id++,
                        channel: channel.name,
                        cost: dailyCost,
                        revenue: dailyRevenue,
                        conversions: dailyConversions,
                        attribution_model: "linear",
                        start_date: date,
                        end_date: date,
                        created_at: `${date} 08:00:00`,
                        week: weekOfYear,
                        month: month
                    });
                });
            }
        }

        // Generate budget simulations
        const simulationScenarios = [
            { source: "Meta Ads", target: "Google Ads", shift: [1000, 2000, 3000, 5000], month: [3, 6, 9, 11] },
            { source: "Email", target: "SEO", shift: [500, 1000, 1500, 2000], month: [4, 7, 10, 12] },
            { source: "Referral", target: "Meta Ads", shift: [300, 600, 900, 1200], month: [2, 5, 8, 10] },
            { source: "Google Ads", target: "SEO", shift: [1500, 2500, 3500, 4500], month: [1, 4, 7, 10] }
        ];

        let simId = 1;
        simulationScenarios.forEach(scenario => {
            scenario.shift.forEach((amount, idx) => {
                const month = scenario.month[idx % scenario.month.length];
                const monthRevenue = this.getMonthlyRevenue(month, scenario.source);
                const projectedLoss = monthRevenue * (amount / this.getMonthlySpend(month, scenario.source));
                const targetRevenue = this.getMonthlyRevenue(month, scenario.target);
                const projectedGain = targetRevenue * (amount / this.getMonthlySpend(month, scenario.target)) * 1.2;

                this.budgetSimulations.push({
                    id: simId++,
                    source_channel: scenario.source,
                    target_channel: scenario.target,
                    shift_amount: amount,
                    projected_revenue_loss: Math.round(projectedLoss),
                    projected_revenue_gain: Math.round(projectedGain),
                    net_impact: Math.round(projectedGain - projectedLoss),
                    recommendation: projectedGain > projectedLoss ? "reallocate" : "keep",
                    attribution_model: "linear",
                    created_at: `2025-${String(month).padStart(2, '0')}-15 10:30:00`
                });
            });
        });

        // Generate reports history (weekly reports)
        let reportId = 1;
        for (let week = 1; week <= 52; week++) {
            const date = this.getDateOfWeek(week, 2025);
            if (date) {
                const reportSize = 200 + (week * 3.5);
                this.reportsHistory.push({
                    id: reportId++,
                    recipient_email: ["marketing@company.com", "ceo@company.com", "analytics@company.com"][week % 3],
                    contact_id: `C${String(Math.floor(week / 17) + 1).padStart(3, '0')}`,
                    channels_tracked: 5,
                    pdf_size_kb: Math.round(reportSize * 10) / 10,
                    attribution_model: "linear",
                    date_range_start: date,
                    date_range_end: this.addDays(date, 6),
                    created_at: `${this.addDays(date, 7)} 09:00:00`
                });
            }
        }

        // Generate daily snapshots (one per week for variety)
        let snapshotId = 1;
        for (let week = 1; week <= 52; week++) {
            const date = this.getDateOfWeek(week, 2025);
            if (date) {
                const month = parseInt(date.split('-')[1]);
                channels.forEach(channel => {
                    const dailyData = this.getDailyData(date, channel.name);
                    if (dailyData) {
                        this.dailyMarketingSnapshot.push({
                            id: snapshotId++,
                            snapshot_date: date,
                            channel: channel.name,
                            cost: dailyData.cost,
                            revenue: dailyData.revenue,
                            conversions: dailyData.conversions,
                            roas: Math.round((dailyData.revenue / dailyData.cost) * 100) / 100,
                            created_at: `${date} 23:59:59`
                        });
                    }
                });
            }
        }
    }

    getWeekNumber(date) {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + startDate.getDay() + 1) / 7);
    }

    getDayFactor(day, daysInMonth) {
        // Mid-month tends to have higher activity
        const midPoint = daysInMonth / 2;
        return 1 + (0.3 * Math.sin((day - midPoint) / midPoint * Math.PI));
    }

    getWeekendFactor(date) {
        const dayOfWeek = date.getDay();
        // Weekend boost for some channels, slight dip for B2B channels
        return dayOfWeek === 0 || dayOfWeek === 6 ? 1.15 : 0.95;
    }

    getMonthlyRevenue(month, channel) {
        return this.attributionData
            .filter(d => d.month === month && d.channel === channel)
            .reduce((sum, d) => sum + d.revenue, 0);
    }

    getMonthlySpend(month, channel) {
        return this.attributionData
            .filter(d => d.month === month && d.channel === channel)
            .reduce((sum, d) => sum + d.cost, 0);
    }

    getDateOfWeek(week, year) {
        const simple = new Date(year, 0, 1 + (week - 1) * 7);
        if (simple.getFullYear() > year) return null;
        return simple.toISOString().split('T')[0];
    }

    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString().split('T')[0];
    }

    getDailyData(date, channel) {
        return this.attributionData.find(d => d.start_date === date && d.channel === channel);
    }

    // Query methods
    getChannelPerformance(startDate, endDate) {
        const filtered = this.attributionData.filter(d => d.start_date >= startDate && d.end_date <= endDate);
        const results = {};

        filtered.forEach(record => {
            if (!results[record.channel]) {
                results[record.channel] = { cost: 0, revenue: 0, conversions: 0 };
            }
            results[record.channel].cost += record.cost;
            results[record.channel].revenue += record.revenue;
            results[record.channel].conversions += record.conversions;
        });

        return Object.entries(results).map(([channel, data]) => ({
            channel,
            total_cost: data.cost,
            total_revenue: data.revenue,
            roas: Math.round((data.revenue / data.cost) * 100) / 100,
            total_conversions: data.conversions
        })).sort((a, b) => b.roas - a.roas);
    }

    getWeeklyTrends(startDate, endDate) {
        const filtered = this.attributionData.filter(d => d.start_date >= startDate && d.end_date <= endDate);
        const weeklyData = {};

        filtered.forEach(record => {
            if (!weeklyData[record.week]) {
                weeklyData[record.week] = {};
            }
            if (!weeklyData[record.week][record.channel]) {
                weeklyData[record.week][record.channel] = { cost: 0, revenue: 0 };
            }
            weeklyData[record.week][record.channel].cost += record.cost;
            weeklyData[record.week][record.channel].revenue += record.revenue;
        });

        return weeklyData;
    }

    getBudgetSimulations(days = 90) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        return this.budgetSimulations.filter(s => new Date(s.created_at) >= cutoffDate);
    }

    getReportMetrics(startDate, endDate) {
        const filtered = this.reportsHistory.filter(r => r.created_at >= startDate && r.created_at <= endDate);
        const weeklyData = {};

        filtered.forEach(report => {
            const week = this.getWeekNumber(new Date(report.created_at));
            if (!weeklyData[week]) {
                weeklyData[week] = { count: 0, totalChannels: 0, totalSize: 0 };
            }
            weeklyData[week].count++;
            weeklyData[week].totalChannels += report.channels_tracked;
            weeklyData[week].totalSize += report.pdf_size_kb;
        });

        return Object.entries(weeklyData).map(([week, data]) => ({
            week: parseInt(week),
            reports_generated: data.count,
            avg_channels: Math.round(data.totalChannels / data.count),
            avg_pdf_size: Math.round(data.totalSize / data.count)
        }));
    }

    getDailySnapshot(days = 7) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        const filtered = this.dailyMarketingSnapshot.filter(s => new Date(s.snapshot_date) >= cutoffDate);
        const dailyTotals = {};

        filtered.forEach(snapshot => {
            if (!dailyTotals[snapshot.snapshot_date]) {
                dailyTotals[snapshot.snapshot_date] = { cost: 0, revenue: 0 };
            }
            dailyTotals[snapshot.snapshot_date].cost += snapshot.cost;
            dailyTotals[snapshot.snapshot_date].revenue += snapshot.revenue;
        });

        return Object.entries(dailyTotals).map(([date, data]) => ({
            snapshot_date: date,
            daily_cost: data.cost,
            daily_revenue: data.revenue,
            daily_roas: Math.round((data.revenue / data.cost) * 100) / 100
        })).sort((a, b) => new Date(a.snapshot_date) - new Date(b.snapshot_date));
    }

    getYearSummary() {
        const yearData = {
            total_cost: 0,
            total_revenue: 0,
            total_conversions: 0,
            channels: {},
            monthly: {}
        };

        this.attributionData.forEach(record => {
            yearData.total_cost += record.cost;
            yearData.total_revenue += record.revenue;
            yearData.total_conversions += record.conversions;

            if (!yearData.channels[record.channel]) {
                yearData.channels[record.channel] = { cost: 0, revenue: 0, conversions: 0 };
            }
            yearData.channels[record.channel].cost += record.cost;
            yearData.channels[record.channel].revenue += record.revenue;
            yearData.channels[record.channel].conversions += record.conversions;

            if (!yearData.monthly[record.month]) {
                yearData.monthly[record.month] = { cost: 0, revenue: 0, conversions: 0 };
            }
            yearData.monthly[record.month].cost += record.cost;
            yearData.monthly[record.month].revenue += record.revenue;
            yearData.monthly[record.month].conversions += record.conversions;
        });

        return yearData;
    }
}

const marketingDB = new MarketingDatabase();
export default marketingDB;
export { MarketingDatabase };