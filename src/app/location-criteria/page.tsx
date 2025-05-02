'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import BudgetSlider from '@/components/BudgetSlider';
import { InvestmentPriority } from '@/types';

export default function LocationCriteriaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get selected priorities from URL params
  const prioritiesParam = searchParams.get('priorities');
  const selectedPriorities = prioritiesParam 
    ? JSON.parse(decodeURIComponent(prioritiesParam)) as InvestmentPriority[]
    : [];

  // State for location criteria
  const [state, setState] = useState<string>('NSW'); // Default state
  const [budget, setBudget] = useState<number>(700000); // Default budget

  // Available states in Australia
  const australianStates = [
    'NSW',
    'VIC',
    'QLD',
    'WA',
    'SA',
    'TAS',
    'ACT',
    'NT'
  ];

  // Handle state selection
  const handleStateSelect = (selectedState: string) => {
    setState(selectedState);
  };

  // Handle find locations button press
  const handleFindLocations = () => {
    // Navigate to Location Results screen with criteria
    const params = new URLSearchParams();
    params.set('priorities', encodeURIComponent(JSON.stringify(selectedPriorities)));
    params.set('state', state);
    params.set('budget', budget.toString());
    
    router.push(`/location-results?${params.toString()}`);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navigation 
        title="Location Criteria" 
        currentStep={3}
        totalSteps={3}
        stepDescription="Find Matching Locations"
      />
      
      <div className="flex-1 px-5 pb-8 overflow-y-auto">
        {/* Selected Priorities */}
        <div className="mb-6">
          <h2 className="text-base font-bold mb-2">Your Selected Priorities</h2>
          <div className="flex flex-wrap gap-2">
            {selectedPriorities.map((priority, index) => (
              <div key={index} className="bg-green-900/30 text-green-400 px-4 py-2 rounded-full">
                <span>{priority}</span>
              </div>
            ))}
          </div>
        </div>

        {/* State Selection */}
        <div className="mb-6">
          <h2 className="text-base font-bold mb-2">Select State</h2>
          <div className="flex flex-wrap gap-2">
            {australianStates.map((stateOption, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full border ${state === stateOption 
                  ? 'bg-accent text-black border-accent' 
                  : 'bg-transparent text-text border-gray-600'}`}
                onClick={() => handleStateSelect(stateOption)}
              >
                {stateOption}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Range */}
        <div className="mb-8">
          <h2 className="text-base font-bold mb-2">Budget Range</h2>
          <BudgetSlider 
            minValue={500000}
            maxValue={1400000}
            initialValue={budget}
            onValueChange={setBudget}
          />
        </div>

        {/* Find Locations Button */}
        <button 
          className="btn-primary w-full mt-auto"
          onClick={handleFindLocations}
        >
          Find Locations
        </button>
      </div>
    </main>
  );
}