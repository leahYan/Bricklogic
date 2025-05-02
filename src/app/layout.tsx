import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bricklogic - Property Guidance',
  description: 'Property guidance app for Australian buyers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-text min-h-screen">
        {children}
      </body>
    </html>
  );
}