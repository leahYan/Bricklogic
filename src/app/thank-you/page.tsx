'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IoCheckmarkCircle } from 'react-icons/io5';

export default function ThankYouPage() {
  const router = useRouter();

  // Handle restart button press
  const handleRestart = () => {
    // Navigate back to the start of the flow
    router.push('/investment-profile');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-text p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <IoCheckmarkCircle className="text-accent text-6xl mx-auto" />
        
        <h1 className="text-3xl font-bold">Thank You!</h1>
        
        <p className="text-gray-400">
          You've completed the property guidance flow. We hope you found valuable insights for your property journey.
        </p>
        
        <div className="bg-input-bg border border-gray-700 rounded-lg p-4 my-4 text-left">
          <h3 className="font-semibold mb-2">What's next?</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Review the locations you've discovered</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Consider your financing options</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">•</span>
              <span>Visit areas of interest in person</span>
            </li>
          </ul>
        </div>
        
        <div className="pt-4">
          <button
            className="bg-accent hover:bg-accent-dark text-black font-bold py-3 px-6 rounded-lg"
            onClick={handleRestart}
          >
            Start Again
          </button>
        </div>
      </div>
    </main>
  );
}