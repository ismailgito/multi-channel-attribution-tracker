import './globals.css';

export const metadata = {
  title: 'Attribution Tracker - Multi-Channel Marketing Analytics',
  description: 'Track and optimize your marketing attribution across all channels',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}