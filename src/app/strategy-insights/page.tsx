'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { InvestmentPriority } from '@/types';

// Strategy archetypes data (static for MVP)
const strategyArchetypes = [
  {
    archetypeName: "Growth Focus",
    description: "Strategies focusing on areas expected to increase in value over time. This approach prioritizes capital appreciation over immediate rental returns.",
    prosCons: "Pros: Potential for higher long-term returns. Cons: May have lower rental yield initially and require stronger cash flow position.",
    associatedPriority: "Prioritise Capital Growth"
  },
  {
    archetypeName: "Yield Focus",
    description: "Strategies focusing on properties generating strong rental income relative to cost. This approach aims to maximize cash flow from day one.",
    prosCons: "Pros: Positive cash flow potential and lower holding costs. Cons: Capital growth might be slower in some high-yield areas.",
    associatedPriority: "Prioritise Yield"
  },
  {
    archetypeName: "Balanced Approach",
    description: "Strategies that seek a middle ground between growth and yield. This approach aims for moderate performance in both capital growth and rental returns.",
    prosCons: "Pros: More balanced investment profile with less volatility. Cons: May not maximize either growth or yield compared to specialized strategies.",
    associatedPriority: "Balanced Investment"
  }
];

export default function StrategyInsightsPage() {
  const router = useRouter();
  const [selectedPriorities, setSelectedPriorities] = useState<InvestmentPriority[]>([]);
  
  // Available priorities
  const priorities: InvestmentPriority[] = [
    'Prioritise Capital Growth',
    'Prioritise Yield',
    'Balanced Investment',
    'Prioritise Affordability'
  ];

  // Handle priority selection
  const handlePrioritySelect = (priority: InvestmentPriority) => {
    if (selectedPriorities.includes(priority)) {
      // Remove if already selected
      setSelectedPriorities(selectedPriorities.filter(p => p !== priority));
    } else {
      // Add if not selected, but limit to 2 selections
      if (selectedPriorities.length < 2) {
        setSelectedPriorities([...selectedPriorities, priority]);
      }
    }
  };

  // Handle next button press
  const handleNext = () => {
    if (selectedPriorities.length === 0) {
      // Require at least one priority
      return;
    }

    // Navigate to Location Criteria screen with selected priorities
    const params = new URLSearchParams();
    params.set('priorities', encodeURIComponent(JSON.stringify(selectedPriorities)));
    
    router.push(`/location-criteria?${params.toString()}`);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-text">
      <Navigation 
        title="Strategy Insights" 
        currentStep={2}
        totalSteps={4}
        stepDescription="Explore Approaches"
      />
      
      <div className="flex-1 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-2">Explore Property Approaches</h1>
        <p className="text-sm text-gray-400 mb-6">
          Review these common property strategies and select up to 2 priorities that matter most to you.
        </p>
        
        <div className="space-y-6 flex-1">
          {/* Strategy Archetype Cards */}
          <div className="space-y-4">
            {strategyArchetypes.map((strategy) => (
              <div key={strategy.archetypeName} className="p-4 rounded-lg border border-gray-700 bg-input-bg">
                <h3 className="text-lg font-semibold text-accent mb-2">{strategy.archetypeName}</h3>
                <p className="text-sm mb-3">{strategy.description}</p>
                <p className="text-xs text-gray-400">{strategy.prosCons}</p>
              </div>
            ))}
          </div>

          {/* Priority Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Select Your Priorities (Max 2)</h3>
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority) => (
                <button
                  key={priority}
                  className={`px-3 py-2 rounded-full text-sm ${selectedPriorities.includes(priority) ? 'bg-accent text-black' : 'bg-input-bg text-white border border-gray-700'}`}
                  onClick={() => handlePrioritySelect(priority)}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-xs text-gray-400">
              <span className="text-warning font-semibold">Disclaimer:</span> This information is educational only and not financial advice. Always consult with a licensed financial professional before making investment decisions.
            </p>
          </div>
        </div>

        <button
          className={`w-full py-3 px-4 rounded-lg mt-6 font-bold ${selectedPriorities.length > 0 ? 'bg-accent hover:bg-accent-dark text-black' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
          onClick={handleNext}
          disabled={selectedPriorities.length === 0}
        >
          Next: Find Locations
        </button>
      </div>
    </main>
  );
}