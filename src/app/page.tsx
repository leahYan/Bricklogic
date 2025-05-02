'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  // Redirect to the first screen in the flow (InvestmentProfile)
  useEffect(() => {
    router.push('/investment-profile');
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-accent mb-4">Bricklogic</h1>
        <p className="text-lg mb-8">Property guidance for Australian buyers</p>
        <div className="animate-pulse">
          <p>Loading...</p>
        </div>
      </div>
    </main>
  );
}