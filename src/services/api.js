// src/services/api.js
import { attributionData as staticAttribution, budgetSimulations as staticSimulations, reportsHistory as staticReports, dailyMarketingSnapshot as staticDaily } from './Attribution.js';
import marketingDB from './Marketing.js';

const attributionData = [...staticAttribution, ...marketingDB.attributionData];
const budgetSimulations = [...staticSimulations, ...marketingDB.budgetSimulations];
const reportsHistory = [...staticReports, ...marketingDB.reportsHistory];
const dailyMarketingSnapshot = [...staticDaily, ...marketingDB.dailyMarketingSnapshot];

export const api = {
  attribution: {
    getData: async (params = {}) => {
      let filtered = attributionData;

      // Find the max date in the data to represent "today"
      const maxDateTimestamp = Math.max(...attributionData.map(d => new Date(d.end_date || d.start_date).getTime()));
      const mockToday = new Date(maxDateTimestamp);
      
      let startDateStr = params.startDate;
      let endDateStr = params.endDate;

      if (!startDateStr || startDateStr.endsWith('daysAgo')) {
        const days = startDateStr ? parseInt(startDateStr.replace('daysAgo', '')) : 7;
        const d = new Date(mockToday);
        d.setDate(d.getDate() - days);
        startDateStr = d.toISOString().split('T')[0];
      }

      if (!endDateStr || endDateStr === 'today') {
        endDateStr = mockToday.toISOString().split('T')[0];
      }

      filtered = attributionData.filter(item => {
        const itemStart = new Date(item.start_date);
        const itemEnd = new Date(item.end_date || item.start_date);
        const filterStart = new Date(startDateStr);
        const filterEnd = new Date(endDateStr);
        
        // Include items that overlap with the date range
        return itemStart <= filterEnd && itemEnd >= filterStart;
      });

      const channelMap = new Map();
      filtered.forEach(d => {
        if (!channelMap.has(d.channel)) {
          channelMap.set(d.channel, { cost: 0, revenue: 0, conversions: 0 });
        }
        const existing = channelMap.get(d.channel);
        existing.cost += d.cost;
        existing.revenue += d.revenue;
        existing.conversions += d.conversions;
      });

      const channels = Array.from(channelMap.entries()).map(([name, data]) => ({
        channel: name,
        cost: data.cost,
        revenue: data.revenue,
        conversions: data.conversions,
        roas: data.cost > 0 ? Number((data.revenue / data.cost).toFixed(2)) : 0
      }));

      const totalCost = channels.reduce((sum, c) => sum + c.cost, 0);
      const totalRevenue = channels.reduce((sum, c) => sum + c.revenue, 0);

      return {
        success: true,
        data: {
          summary: {
            totalCost,
            totalRevenue,
            roas: totalCost > 0 ? Number((totalRevenue / totalCost).toFixed(2)) : 0
          },
          channels,
          attribution_model: params.model || 'lastClick',
          date_range: { start: startDateStr, end: endDateStr }
        }
      };
    },

    simulate: async (data) => {
      let sourceSpend = 0;
      let sourceRev = 0;
      let targetSpend = 0;
      let targetRev = 0;
      let totalSpend = 0;
      let totalRev = 0;

      attributionData.forEach(d => {
        totalSpend += d.cost;
        totalRev += d.revenue;
        if (d.channel === data.sourceChannel) {
          sourceSpend += d.cost;
          sourceRev += d.revenue;
        }
        if (d.channel === data.targetChannel) {
          targetSpend += d.cost;
          targetRev += d.revenue;
        }
      });

      const sourceRoas = sourceSpend > 0 ? sourceRev / sourceSpend : 0;
      const targetRoas = targetSpend > 0 ? targetRev / targetSpend : 0;

      const loss = data.shiftAmount * sourceRoas;
      const gain = data.shiftAmount * targetRoas * 1.2;
      const net = gain - loss;

      const formatCur = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);

      const isApproved = net >= 0;
      const recommendation = isApproved
        ? `APPROVED: Reallocating ${formatCur(data.shiftAmount)} from ${data.sourceChannel} to ${data.targetChannel} is projected to yield a net positive impact of ${formatCur(net)}.`
        : `NOT RECOMMENDED: Reallocating ${formatCur(data.shiftAmount)} from ${data.sourceChannel} to ${data.targetChannel} is projected to yield a net negative impact of -${formatCur(Math.abs(net))}.`;

      return {
        success: true,
        data: {
          simulation: {
            shift: {
              from: data.sourceChannel,
              to: data.targetChannel,
              amount: data.shiftAmount,
              projectedRevenueLoss: Math.round(loss),
              projectedRevenueGain: Math.round(gain),
              netImpact: Math.round(net),
              recommendation: recommendation
            },
            currentTotalSpend: totalSpend,
            currentTotalRevenue: totalRev
          }
        }
      };
    },

    generateReport: async (data) => {
      // Create a dummy but valid minimal PDF in Base64
      const blankPdfBase64 = 'JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nDPQM1Qo5ypUMFAwALJMLU31jBQsTAz1LBSKikB8EMXAAEQpKxgYcgEAx9EHVQplbmRzdHJlYW0KZW5kb2JqCgozIDAgb2JqCjQxCmVuZG9iagoKNSAwIG9iago8PC9MZW5ndGggNiAwIFIvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aDEgMjMyPj4Kc3RyZWFtCnicY2BgYGZgYDCQYmAAIQ4GBlAAwSAiBgZGIK7jYGBgZIAAAH7jAQgKZW5kc3RyZWFtCmVuZG9iagoKNiAwIG9iago1OQplbmRvYmoKCjQgMCBvYmoKPDwvVHlwZS9Gb250RGVzY3JpcHRvci9Gb250TmFtZS9CQUFBQUErSGVsdmV0aWNhL0ZvbnRCQm94WzAgMCBNYWludGFpbjBdL0ZsYWdzIDQvRm9udEZpbGUyIDUgMCBSPj4KZW5kb2JqCgo3IDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1RydWVUeXBlL0Jhc2VGb250L0JBQUFBQStIZWx2ZXRpY2EvRmlyc3RDaGFyIDAvTGFzdENoYXIgMC9XaWR0aHNbMF0vRm9udERlc2NyaXB0b3IgNCAwIFI+PgplbmRvYmoKCjEgMCBvYmoKPDwvVHlwZS9QYWdlL01lZGlhQm94WzAgMCA1OTUgODQyXS9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNyAwIFI+Pj4+L0NvbnRlbnRzIDIgMCBSL1BhcmVudCA4IDAgUj4+CmVuZG9iagoKOCAwIG9iago8PC9UeXBlL1BhZ2VzL0NvdW50IDEvS2lkc1sxIDAgUl0+PgplbmRvYmoKCjkgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDggMCBSPj4KZW5kb2JqCgp4cmVmCjAgMTAKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMzM5IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDEwNSAwMDAwMCBuIAowMDAwMDAwMjM5IDAwMDAwIG4gCjAwMDAwMDAxMjYgMDAwMDAgbiAKMDAwMDAwMDIxOCAwMDAwMCBuIAowMDAwMDAwMzU5IDAwMDAwIG4gCjAwMDAwMDA0NTggMDAwMDAgbiAKMDAwMDAwMDUxNyAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgMTAvUm9vdCA5IDAgUj4+CnN0YXJ0eHJlZgo1NjcKJSVFT0YK';
      
      // Determine channels tracked for the selected period
      const channelsTracked = new Set(attributionData.map(d => d.channel)).size || 5;

      return {
        success: true,
        data: {
          reportMetadata: {
            pdfBase64: blankPdfBase64,
            dataSource: 'mock (Attribution + Marketing)',
            channelsTracked: channelsTracked,
            pdfSizeKB: 245.5
          }
        }
      };
    },

    getHistory: async (params = {}) => {
      let filtered = [...attributionData];
      if (params.channel) {
        filtered = filtered.filter(d => d.channel === params.channel);
      }
      if (params.startDate) {
        filtered = filtered.filter(d => new Date(d.start_date) >= new Date(params.startDate));
      }
      if (params.endDate) {
        filtered = filtered.filter(d => new Date(d.end_date || d.start_date) <= new Date(params.endDate));
      }

      return {
        success: true,
        data: filtered.slice(0, 100)
      };
    },

    getTopChannels: async (params = {}) => {
      const limit = params.limit || 5;
      const metric = params.metric || 'revenue';

      const channelMap = new Map();
      attributionData.forEach(d => {
        if (!channelMap.has(d.channel)) {
          channelMap.set(d.channel, { revenue: 0, cost: 0, conversions: 0 });
        }
        const existing = channelMap.get(d.channel);
        existing.revenue += d.revenue;
        existing.cost += d.cost;
        existing.conversions += d.conversions;
      });

      const sorted = Array.from(channelMap.entries())
        .map(([channel, data]) => ({
          channel,
          value: metric === 'revenue' ? data.revenue : metric === 'cost' ? data.cost : data.conversions
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, limit);

      return {
        success: true,
        data: sorted
      };
    }
  },

  cache: {
    getStatus: async () => {
      return {
        success: true,
        data: {
          status: 'healthy',
          hits: 12456,
          misses: 342,
          size_kb: 2450
        }
      };
    }
  }
};

export default api;