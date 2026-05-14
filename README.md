# Attribution Tracker

Attribution Tracker is a comprehensive Next.js web application designed to help marketing teams analyze their multi-channel attribution performance, simulate budget reallocations, and generate performance reports.

---

**⚠️ DISCLAIMER: MOCK DATA ONLY ⚠️**  
> *This application is a demonstration/prototype and is currently configured to use **mock data only**. No real marketing data is connected or displayed. All statistics, conversions, revenue, and channel performances are procedurally generated for the year 2025 for testing and demonstration purposes. Do not make real business decisions based on this data.*

---

## Benefits

- **Centralized Insights**: Brings fragmented marketing data across multiple channels (Google, Meta, SEO, etc.) into one unified, easy-to-read dashboard.
- **Data-Driven Decisions**: Empowers marketing teams to confidently reallocate budgets based on Return on Ad Spend (ROAS) projections rather than guesswork.
- **Time Savings**: The automated PDF Report Generator eliminates the manual effort of compiling weekly or monthly performance summaries for stakeholders.
- **Risk Mitigation**: The Budget Simulator instantly highlights the potential downsides of budget shifts, protecting overall revenue before any real money is moved.

## Features

### 1. Multi-Channel Performance Dashboard
- **Analytics Overview**: View high-level metrics including Total Revenue, Total Spend, Conversions, and Overall ROI.
- **Dynamic Date Filtering**: Filter performance data by predefined ranges (e.g., Last 7 Days, Last 30 Days) or a custom date range.
- **Channel Breakdown**: See exactly how individual channels (Google Ads, Meta Ads, SEO, Email, Referral) are contributing to your bottom line.

### 2. Budget Simulator
- **Interactive Reallocation**: Select a source channel (to decrease spend) and a target channel (to increase spend).
- **Impact Projections**: Enter a dollar amount to shift and instantly see projected revenue loss from the source, projected revenue gain from the target, and the overall net impact.
- **Data-Driven Recommendations**: Receive an automated `APPROVED` or `NOT RECOMMENDED` badge based on historical channel Return on Ad Spend (ROAS).

### 3. Report Generator
- **PDF Export**: Generate detailed multi-channel attribution reports as downloadable PDF files.
- **Custom Configuration**: Select specific date ranges and attribution models (e.g., Last Click, First Click, Linear) to include in your generated report.
- **Live Preview**: See a live preview of the metrics and channel list that will be included in the report before generating the file.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Technologies Used
- **Next.js**: React framework for server-side rendering and routing.
- **React**: UI component library.
- **CSS Modules**: For scoped and maintainable styling.
- **Vanilla API Hooks**: Custom React hooks (`useApi.js`) handling asynchronous mock data operations.
