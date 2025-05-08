'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import BudgetSlider from '@/components/BudgetSlider';
import { InvestmentPriority } from '@/types';

export default function LocationCriteriaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get parameters from URL
  const prioritiesParam = searchParams.get('priorities');
  const timeframeParam = searchParams.get('timeframe');
  const incomeParam = searchParams.get('income');
  const expensesParam = searchParams.get('expenses');
  const liabilitiesParam = searchParams.get('liabilities');
  const debtsParam = searchParams.get('debts');
  const savingsParam = searchParams.get('savings');
  const riskToleranceParam = searchParams.get('riskTolerance');
  const capitalAllocationParam = searchParams.get('capitalAllocation');
  
  const selectedPriorities = prioritiesParam 
    ? JSON.parse(decodeURIComponent(prioritiesParam)) as InvestmentPriority[]
    : [];

  // State for location criteria
  const [state, setState] = useState<string>('NSW'); // Default state
  const [budget, setBudget] = useState<number>(700000); // Default budget
  const [locationFactors, setLocationFactors] = useState<string[]>([]);

  // Available states in Australia
  const australianStates = [
    'All',
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

  // Toggle location factor selection
  const toggleLocationFactor = (factor: string) => {
    setLocationFactors(prev => 
      prev.includes(factor) 
        ? prev.filter(item => item !== factor) 
        : [...prev, factor]
    );
  };

  // Handle find locations button press
  const handleFindLocations = () => {
    // Navigate to Location Results screen with all criteria
    const params = new URLSearchParams();
    params.set('priorities', encodeURIComponent(JSON.stringify(selectedPriorities)));
    // Only set state parameter if a specific state is selected (not 'All')
    if (state !== 'All') {
      params.set('state', state);
    }
    params.set('budget', budget.toString());
    
    // Add location factors if any are selected
    if (locationFactors.length > 0) {
      params.set('locationFactors', encodeURIComponent(JSON.stringify(locationFactors)));
    }
    
    // Pass along the investment timeframe parameters
    if (timeframeParam) params.set('timeframe', timeframeParam);
    if (incomeParam) params.set('income', incomeParam);
    if (expensesParam) params.set('expenses', expensesParam);
    if (liabilitiesParam) params.set('liabilities', liabilitiesParam);
    if (debtsParam) params.set('debts', debtsParam);
    if (savingsParam) params.set('savings', savingsParam);
    if (riskToleranceParam) params.set('riskTolerance', riskToleranceParam);
    if (capitalAllocationParam) params.set('capitalAllocation', capitalAllocationParam);
    
    router.push(`/location-results?${params.toString()}`);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navigation 
        title="Location Criteria" 
        currentStep={5}
        totalSteps={6}
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
          <div className="flex justify-center items-center gap-3 flex-wrap">
            {australianStates.map((stateOption, index) => (
              <button
                key={index}
                className={`w-16 h-16 flex items-center justify-center rounded-full ${state === stateOption 
                  ? 'bg-accent text-black font-bold' 
                  : 'bg-black/30 text-text border border-gray-700'}`}
                onClick={() => handleStateSelect(stateOption)}
              >
                {stateOption}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Range */}
        <div className="mb-6">
          <h2 className="text-base font-bold mb-2">Budget Range</h2>
          <BudgetSlider 
            minValue={500000}
            maxValue={1400000}
            initialValue={budget}
            onValueChange={setBudget}
          />
        </div>

        {/* Location Factors */}
        <div className="mb-8">
          <h2 className="text-base font-bold mb-2">Location Factors (Optional)</h2>
          <p className="text-sm text-gray-400 mb-3">Select factors that are important to you</p>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'schools', label: 'Schools' },
              { id: 'transport', label: 'Public Transport' },
              { id: 'shops', label: 'Shopping Centers' },
              { id: 'airport', label: 'Airport Proximity' }
            ].map((factor) => (
              <div 
                key={factor.id}
                onClick={() => toggleLocationFactor(factor.id)}
                className={`p-3 rounded-lg border ${locationFactors.includes(factor.id) 
                  ? 'border-accent bg-accent/10 text-accent' 
                  : 'border-gray-700 bg-black/30'} 
                  flex items-center cursor-pointer`}
              >
                <div className={`w-5 h-5 rounded border mr-2 flex items-center justify-center ${locationFactors.includes(factor.id) 
                  ? 'border-accent bg-accent text-black' 
                  : 'border-gray-600'}`}
                >
                  {locationFactors.includes(factor.id) && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span>{factor.label}</span>
              </div>
            ))}
          </div>
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