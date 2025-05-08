'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function InvestmentProfilePage() {
  const router = useRouter();
  const [goal, setGoal] = useState<string>('First Home');
  const [budgetRange, setBudgetRange] = useState<string>('$500k-$700k');
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  // Available options
  const goalOptions = ['First Home', 'Investment', 'Upgrading'];
  const budgetRangeOptions = [
    '$500k-$700k',
    '$700k-$900k',
    '$900k-$1.1M',
    '$1.1M-$1.4M'
  ];

  // Handle continue button press
  const handleContinue = () => {
    // Validate form
    if (!goal || !budgetRange) {
      setIsFormValid(false);
      return;
    }

    // Store user profile data (in a real app, this would be saved to a database)
    localStorage.setItem('userProfile', JSON.stringify({
      goal,
      budgetRange
    }));

    // Navigate to Strategy Insights screen
    router.push('/strategy-insights');
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-text">
      <Navigation 
        title="Your Property Goals" 
        showBackButton={false}
        currentStep={1}
        totalSteps={6}
        stepDescription="Basic Profile"
      />
      
      <div className="flex-1 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Tell us about your goals</h1>
        
        <div className="space-y-6 flex-1">
          {/* Goal Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">What's your property goal?</label>
            <div className="grid grid-cols-1 gap-2">
              {goalOptions.map((option) => (
                <button
                  key={option}
                  className={`p-3 rounded-lg border ${goal === option ? 'border-accent bg-input-bg' : 'border-gray-700 bg-transparent'}`}
                  onClick={() => setGoal(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Range Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Your budget range</label>
            <div className="grid grid-cols-1 gap-2">
              {budgetRangeOptions.map((option) => (
                <button
                  key={option}
                  className={`p-3 rounded-lg border ${budgetRange === option ? 'border-accent bg-input-bg' : 'border-gray-700 bg-transparent'}`}
                  onClick={() => setBudgetRange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>



          {!isFormValid && (
            <p className="text-error text-sm">Please select a property goal and budget range before continuing.</p>
          )}
        </div>

        <button
          className="w-full bg-accent hover:bg-accent-dark text-black font-bold py-3 px-4 rounded-lg mt-6"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </main>
  );
}