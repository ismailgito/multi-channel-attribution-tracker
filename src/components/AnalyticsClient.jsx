// src/components/AnalyticsClient.jsx
'use client'; // <--- THIS IS THE KEY!

import dynamic from 'next/dynamic';

// Now these dynamic imports run safely inside a Client Component
const GoogleTagManager = dynamic(
  () => import('@/components/GoogleTagManager'),
  { ssr: false }
);

const UTMPreserver = dynamic(
  () => import('@/components/UTMPreserver'),
  { ssr: false }
);

export default function AnalyticsClient() {
  return (
    <>
      <GoogleTagManager />
      <UTMPreserver />
    </>
  );
}