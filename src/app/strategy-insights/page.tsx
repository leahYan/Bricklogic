'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { InvestmentPriority } from '@/types';

// Strategy archetypes data (static for MVP)
const strategyArchetypes = [
  {
    archetypeName: "Passive Income Generation",
    description: "Strategies focused on acquiring properties that generate consistent rental income to supplement current earnings.",
    prosCons: "Pros: Provides regular cash flow, can contribute to financial independence. Cons: Requires managing tenants and property, potential for vacancies and maintenance costs.",
    associatedPriority: "Passive Income"
  },
  {
    archetypeName: "Capital Appreciation (Growth)",
    description: "Strategies focused on identifying properties with strong potential for increasing in value over time, aiming for a profitable sale in the future.",
    prosCons: "Pros: Potential for significant returns when the property is sold. Cons: Income from rent may be lower, reliant on market conditions for value increases.",
    associatedPriority: "Capital Growth"
  },
  {
    archetypeName: "Personal Use/Future Residence",
    description: "Strategies focused on purchasing a property with the primary intention of living in it now or in the future (e.g., retirement home, family home).",
    prosCons: "Pros: Provides housing security, potential for long-term value growth, personal enjoyment. Cons: May not prioritize immediate financial returns, significant upfront costs and ongoing expenses.",
    associatedPriority: "Personal Use"
  },
  {
    archetypeName: "Upgrading/Moving Up the Property Ladder",
    description: "Strategies focused on purchasing a property with the intention of increasing equity and eventually selling to purchase a more desirable or larger property.",
    prosCons: "Pros: Opportunity to live in different types of properties over time, potential for wealth growth with each move. Cons: Transaction costs associated with buying and selling, market timing can impact outcomes.",
    associatedPriority: "Property Ladder"
  }
];

// No additional priorities outside of strategy archetypes

export default function StrategyInsightsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get parameters from URL
  const timeframeParam = searchParams.get('timeframe');
  const incomeParam = searchParams.get('income');
  const debtsParam = searchParams.get('debts');
  const savingsParam = searchParams.get('savings');
  const riskToleranceParam = searchParams.get('riskTolerance');
  const capitalAllocationParam = searchParams.get('capitalAllocation');
  
  const [primaryPriority, setPrimaryPriority] = useState<InvestmentPriority | null>(null);
  const [secondaryPriority, setSecondaryPriority] = useState<InvestmentPriority | null>(null);

  // Handle primary priority selection
  const handlePrimaryPrioritySelect = (priority: InvestmentPriority) => {
    if (primaryPriority === priority) {
      // Deselect if already selected
      setPrimaryPriority(null);
      setSecondaryPriority(null); // Reset secondary when primary is deselected
    } else {
      // If selecting a new primary that was previously secondary, clear secondary
      if (secondaryPriority === priority) {
        setSecondaryPriority(null);
      }
      setPrimaryPriority(priority);
    }
  };
  
  // Handle secondary priority selection
  const handleSecondaryPrioritySelect = (priority: InvestmentPriority) => {
    if (secondaryPriority === priority) {
      // Deselect if already selected
      setSecondaryPriority(null);
    } else {
      setSecondaryPriority(priority);
    }
  };

  // Handle next button press
  const handleNext = () => {
    if (!primaryPriority) {
      // Require at least primary priority
      return;
    }

    // Create array of selected priorities
    const selectedPriorities = secondaryPriority 
      ? [primaryPriority, secondaryPriority]
      : [primaryPriority];

    // Navigate to Investment Profile screen with selected priorities
    const params = new URLSearchParams();
    params.set('priorities', encodeURIComponent(JSON.stringify(selectedPriorities)));
    
    // Pass along any existing parameters
    if (timeframeParam) params.set('timeframe', timeframeParam);
    if (incomeParam) params.set('income', incomeParam);
    if (debtsParam) params.set('debts', debtsParam);
    if (savingsParam) params.set('savings', savingsParam);
    if (riskToleranceParam) params.set('riskTolerance', riskToleranceParam);
    if (capitalAllocationParam) params.set('capitalAllocation', capitalAllocationParam);
    
    router.push(`/investment-profile?${params.toString()}`);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-text">
      <Navigation 
        title="Strategy Insights" 
        currentStep={1}
        totalSteps={6}
        stepDescription="Explore Approaches"
        showBackButton={false}
      />
      
      <div className="flex-1 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-2">Explore Property Approaches</h1>
        <p className="text-sm text-gray-400 mb-6">
          Review these common property strategies and select up to 2 priorities that matter most to you.
        </p>
        
        <div className="space-y-6 flex-1">
          {/* Strategy Archetype Cards - Clickable for Primary Priority */}
          <div className="space-y-4">
            {strategyArchetypes.map((strategy) => (
              <div 
                key={strategy.archetypeName} 
                className={`p-4 rounded-lg border cursor-pointer ${primaryPriority === strategy.associatedPriority ? 'border-accent bg-input-bg' : 'border-gray-700 bg-input-bg hover:border-gray-500'}`}
                onClick={() => handlePrimaryPrioritySelect(strategy.associatedPriority)}
              >
                <h3 className="text-lg font-semibold text-accent mb-2">{strategy.archetypeName}</h3>
                <p className="text-sm mb-3">{strategy.description}</p>
                <p className="text-xs text-gray-400">{strategy.prosCons}</p>
                {primaryPriority === strategy.associatedPriority && (
                  <div className="mt-2 inline-block px-3 py-1 bg-accent/20 text-accent text-xs rounded-full">
                    Selected as Primary Focus
                  </div>
                )}
              </div>
            ))}
            
            {/* No additional priority options */}
          </div>

          {/* Secondary Priority Selection - only show if primary is selected */}
          {primaryPriority && (
            <div className="space-y-2 mt-6">
              <h3 className="text-lg font-semibold">Your Second Priority (Optional)</h3>
              <div className="space-y-3">
                {/* Show strategy archetypes that aren't selected as primary */}
                {strategyArchetypes
                  .filter(strategy => strategy.associatedPriority !== primaryPriority)
                  .map((strategy) => (
                    <div 
                      key={`secondary-${strategy.archetypeName}`} 
                      className={`p-3 rounded-lg border cursor-pointer ${secondaryPriority === strategy.associatedPriority ? 'border-accent bg-input-bg' : 'border-gray-700 bg-input-bg hover:border-gray-500'}`}
                      onClick={() => handleSecondaryPrioritySelect(strategy.associatedPriority)}
                    >
                      <h3 className="text-sm font-semibold text-accent">{strategy.archetypeName}</h3>
                      <p className="text-xs text-gray-300">{strategy.description.split('.')[0]}.</p>
                      {secondaryPriority === strategy.associatedPriority && (
                        <div className="mt-2 inline-block px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                          Selected as Secondary
                        </div>
                      )}
                    </div>
                  ))}
                
                {/* No additional priority options */}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-xs text-gray-400">
              <span className="text-warning font-semibold">Disclaimer:</span> This information is educational only and not financial advice. Always consult with a licensed financial professional before making investment decisions.
            </p>
          </div>
        </div>

        <button
          className={`w-full py-3 px-4 rounded-lg mt-6 font-bold ${primaryPriority ? 'bg-accent hover:bg-accent-dark text-black' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
          onClick={handleNext}
          disabled={!primaryPriority}
        >
          Next: Your Property Goals
        </button>
      </div>
    </main>
  );
}