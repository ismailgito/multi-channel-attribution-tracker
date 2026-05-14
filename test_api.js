import { api } from './src/services/api.js';

async function test() {
  try {
    const data = await api.attribution.getData({ startDate: '7daysAgo', endDate: 'today' });
    console.log("Dashboard Data:");
    console.log(JSON.stringify(data, null, 2));

    const simData = await api.attribution.simulate({
      sourceChannel: 'Meta Ads',
      targetChannel: 'Google Ads',
      shiftAmount: 1000
    });
    console.log("Simulate Data:");
    console.log(JSON.stringify(simData, null, 2));

    const repData = await api.attribution.generateReport({});
    console.log("Report Data:");
    console.log(JSON.stringify(repData, null, 2));
  } catch(e) {
    console.error("Error:", e);
  }
}

test();
