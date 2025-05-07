'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function FinancialDetailsPage() {
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
  
  const selectedPriorities = prioritiesParam 
    ? JSON.parse(decodeURIComponent(prioritiesParam))
    : [];

  // State for financial details
  const [income, setIncome] = useState<string>('');
  const [expenses, setExpenses] = useState<string>('');
  const [liabilities, setLiabilities] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  // Handle continue button press
  const handleContinue = () => {
    // Basic validation - ensure at least income is provided
    if (!income.trim()) {
      setIsFormValid(false);
      return;
    }

    // Navigate to Location Criteria screen with selected priorities and all financial details
    const params = new URLSearchParams();
    params.set('priorities', prioritiesParam || '');
    params.set('income', income);
    params.set('expenses', expenses);
    params.set('liabilities', liabilities);
    
    // Pass along the investment timeframe parameters
    if (timeframeParam) params.set('timeframe', timeframeParam);
    if (debtsParam) params.set('debts', debtsParam);
    if (savingsParam) params.set('savings', savingsParam);
    if (riskToleranceParam) params.set('riskTolerance', riskToleranceParam);
    if (capitalAllocationParam) params.set('capitalAllocation', capitalAllocationParam);
    
    router.push(`/location-criteria?${params.toString()}`);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-text">
      <Navigation 
        title="Financial Details" 
        currentStep={4}
        totalSteps={5}
        stepDescription="Your Financial Position"
      />
      
      <div className="flex-1 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-2">Your Financial Position</h1>
        <p className="text-sm text-gray-400 mb-6">
          This information helps us understand your financial capacity. It's used for educational purposes only.
        </p>
        
        <div className="space-y-6 flex-1">
          {/* Income Input */}
          <div className="space-y-2">
            <label htmlFor="income" className="block text-sm font-medium">Annual Income (before tax)</label>
            <input
              id="income"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 120000"
              className="w-full p-3 rounded-lg border border-gray-700 bg-input-bg text-text"
              value={income}
              onChange={(e) => {
                setIncome(e.target.value.replace(/[^0-9]/g, ''));
                setIsFormValid(true);
              }}
            />
          </div>

          {/* Expenses Input */}
          <div className="space-y-2">
            <label htmlFor="expenses" className="block text-sm font-medium">Monthly Expenses</label>
            <input
              id="expenses"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 3000"
              className="w-full p-3 rounded-lg border border-gray-700 bg-input-bg text-text"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value.replace(/[^0-9]/g, ''))}
            />
          </div>

          {/* Liabilities Input */}
          <div className="space-y-2">
            <label htmlFor="liabilities" className="block text-sm font-medium">Existing Liabilities (total debt)</label>
            <input
              id="liabilities"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 50000"
              className="w-full p-3 rounded-lg border border-gray-700 bg-input-bg text-text"
              value={liabilities}
              onChange={(e) => setLiabilities(e.target.value.replace(/[^0-9]/g, ''))}
            />
          </div>

          {!isFormValid && (
            <p className="text-error text-sm">Please enter your annual income before continuing.</p>
          )}

          {/* Disclaimer */}
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-xs text-gray-400">
              <span className="text-warning font-semibold">Disclaimer:</span> This information is for educational purposes only and not financial advice. We do not store or share your financial details.
            </p>
          </div>
        </div>

        <button
          className={`w-full py-3 px-4 rounded-lg mt-6 font-bold ${isFormValid ? 'bg-accent hover:bg-accent-dark text-black' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
          onClick={handleContinue}
          disabled={!isFormValid}
        >
          Next: Find Locations
        </button>
      </div>
    </main>
  );
}