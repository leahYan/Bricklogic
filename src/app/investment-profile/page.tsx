'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function InvestmentProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get parameters from URL
  const prioritiesParam = searchParams.get('priorities');
  const timeframeParam = searchParams.get('timeframe');
  const incomeParam = searchParams.get('income');
  const debtsParam = searchParams.get('debts');
  const savingsParam = searchParams.get('savings');
  const riskToleranceParam = searchParams.get('riskTolerance');
  const capitalAllocationParam = searchParams.get('capitalAllocation');
  
  const [goal, setGoal] = useState<string>('Buying my first home primarily for personal use.');
  const [budgetRange, setBudgetRange] = useState<string>('$500k-$700k');
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  // Available options
  const goalOptions = [
    'Buying my first home to live in.',
    'Upgrading my current home to a more suitable size.',
    'Investing in property to generate rental income.',
    'Investing in property for long-term capital growth.',
    'Diversifying my investments with property.'
  ];
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

    // Navigate to Investment Timeframe screen with all parameters
    const params = new URLSearchParams();
    if (prioritiesParam) params.set('priorities', prioritiesParam);
    if (timeframeParam) params.set('timeframe', timeframeParam);
    if (incomeParam) params.set('income', incomeParam);
    if (debtsParam) params.set('debts', debtsParam);
    if (savingsParam) params.set('savings', savingsParam);
    if (riskToleranceParam) params.set('riskTolerance', riskToleranceParam);
    if (capitalAllocationParam) params.set('capitalAllocation', capitalAllocationParam);
    
    router.push(`/investment-timeframe?${params.toString()}`);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-text">
      <Navigation 
        title="Your Property Goals" 
        showBackButton={true}
        currentStep={2}
        totalSteps={6}
        stepDescription="Basic Profile"
      />
      
      <div className="flex-1 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Tell us about your goals</h1>
        
        <div className="space-y-6 flex-1">
          {/* Goal Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Tell us about your property plans:</label>
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