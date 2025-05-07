'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { InvestmentPriority } from '@/types';

// Define types for investment timeframe and risk tolerance
type InvestmentTimeframe = 'short' | 'medium' | 'long' | 'very-long' | 'undecided';
type RiskTolerance = 'conservative' | 'moderate' | 'aggressive';

export default function InvestmentTimeframePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get selected priorities from URL params
  const prioritiesParam = searchParams.get('priorities');
  const selectedPriorities = prioritiesParam 
    ? JSON.parse(decodeURIComponent(prioritiesParam)) as InvestmentPriority[]
    : [];

  // State for investment timeframe details
  const [timeframe, setTimeframe] = useState<InvestmentTimeframe>('undecided');
  const [riskTolerance, setRiskTolerance] = useState<RiskTolerance>('moderate');
  const [capitalAllocation, setCapitalAllocation] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  // Handle continue button press
  const handleContinue = () => {
    // Basic validation - ensure timeframe is selected
    if (timeframe === 'undecided') {
      setIsFormValid(false);
      return;
    }

    // Navigate to Strategy Insights screen with selected priorities and timeframe details
    const params = new URLSearchParams();
    params.set('priorities', prioritiesParam || '');
    params.set('timeframe', timeframe);
    params.set('riskTolerance', riskTolerance);
    params.set('capitalAllocation', capitalAllocation);
    
    router.push(`/strategy-insights?${params.toString()}`);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-text">
      <Navigation 
        title="Investment Details" 
        currentStep={3}
        totalSteps={4}
        stepDescription="Your Investment Profile"
      />
      
      <div className="flex-1 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-2">Your Investment Details</h1>
        <p className="text-sm text-gray-400 mb-6">
          This information helps us understand your investment goals. It's used for educational purposes only.
        </p>
        
        <div className="space-y-6 flex-1">
          {/* Investment Timeframe Selection */}
          <div className="space-y-2">
            <h2 className="text-base font-bold">How long do you plan to hold the property?</h2>
            <div className="space-y-2">
              {[
                { value: 'short', label: 'Less than 5 years (Short-term)' },
                { value: 'medium', label: '5-10 years (Medium-term)' },
                { value: 'long', label: '10-20 years (Long-term)' },
                { value: 'very-long', label: 'More than 20 years (Very Long-term)' },
                { value: 'undecided', label: 'Undecided' }
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`timeframe-${option.value}`}
                    name="timeframe"
                    value={option.value}
                    checked={timeframe === option.value}
                    onChange={() => setTimeframe(option.value as InvestmentTimeframe)}
                    className="mr-2"
                  />
                  <label htmlFor={`timeframe-${option.value}`}>{option.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Position section removed */}

          {/* Risk Tolerance */}
          <div className="space-y-2">
            <h2 className="text-base font-bold">What is your risk tolerance?</h2>
            <div className="space-y-2">
              {[
                { 
                  value: 'conservative', 
                  label: 'Conservative', 
                  description: 'Prefer low-risk investments with stable returns; would be significantly concerned by vacancies or unexpected costs.'
                },
                { 
                  value: 'moderate', 
                  label: 'Moderate', 
                  description: 'Comfortable with some level of risk for potentially higher returns; can handle some vacancies or minor unexpected costs.'
                },
                { 
                  value: 'aggressive', 
                  label: 'Aggressive', 
                  description: 'Willing to take on higher risk for the potential of significant returns; can handle extended vacancies or substantial unexpected costs.'
                }
              ].map((option) => (
                <div key={option.value} className="p-3 border border-gray-700 rounded-lg mb-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`risk-${option.value}`}
                      name="riskTolerance"
                      value={option.value}
                      checked={riskTolerance === option.value}
                      onChange={() => setRiskTolerance(option.value as RiskTolerance)}
                      className="mr-2"
                    />
                    <label htmlFor={`risk-${option.value}`} className="font-medium">{option.label}</label>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 ml-5">{option.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Capital Allocation */}
          <div className="space-y-2">
            <h2 className="text-base font-bold">How much capital are you willing to allocate to property investment?</h2>
            <input
              id="capitalAllocation"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 200000"
              className="w-full p-3 rounded-lg border border-gray-700 bg-input-bg text-text"
              value={capitalAllocation}
              onChange={(e) => setCapitalAllocation(e.target.value.replace(/[^0-9]/g, ''))}
            />
          </div>

          {!isFormValid && (
            <p className="text-error text-sm">Please select a timeframe or provide your income before continuing.</p>
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
          Next: Strategy Insights
        </button>
      </div>
    </main>
  );
}