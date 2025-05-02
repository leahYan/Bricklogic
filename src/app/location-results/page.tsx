'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { InvestmentPriority, Location } from '@/types';

// Mock data for demonstration purposes
const mockLocations: Location[] = [
  {
    name: 'Parramatta',
    state: 'NSW',
    postcode: '2150',
    priceIndicator: 'MEDIUM',
    growthRate: '3.2%',
    yieldRate: '4.1%',
    medianPrice: '$850,000',
    vacancyRate: '2.1%',
    populationGrowth: '1.8%',
    dataAsOfDate: 'June 2023'
  },
  {
    name: 'Liverpool',
    state: 'NSW',
    postcode: '2170',
    priceIndicator: 'LOW',
    growthRate: '2.8%',
    yieldRate: '4.5%',
    medianPrice: '$750,000',
    vacancyRate: '2.3%',
    populationGrowth: '2.0%',
    dataAsOfDate: 'June 2023'
  },
  {
    name: 'Blacktown',
    state: 'NSW',
    postcode: '2148',
    priceIndicator: 'LOW',
    growthRate: '2.5%',
    yieldRate: '4.7%',
    medianPrice: '$720,000',
    vacancyRate: '2.2%',
    populationGrowth: '2.2%',
    dataAsOfDate: 'June 2023'
  }
];

export default function LocationResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get parameters from URL
  const prioritiesParam = searchParams.get('priorities');
  const stateParam = searchParams.get('state');
  const budgetParam = searchParams.get('budget');
  
  const selectedPriorities = prioritiesParam 
    ? JSON.parse(decodeURIComponent(prioritiesParam)) as InvestmentPriority[]
    : [];
  const selectedState = stateParam || 'NSW';
  const budget = budgetParam ? parseInt(budgetParam, 10) : 700000;

  // Filter locations based on criteria
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call with the criteria
    // For now, just filter the mock data by state
    const filtered = mockLocations.filter(location => 
      location.state === selectedState
    );
    setFilteredLocations(filtered);
  }, [selectedState]);

  // Handle location selection
  const handleLocationSelect = (location: Location) => {
    // In a real app, navigate to suburb detail page
    console.log('Selected location:', location);
    // router.push(`/suburb-detail?location=${encodeURIComponent(JSON.stringify(location))}`);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navigation 
        title="Location Results" 
        currentStep={3}
        totalSteps={3}
        stepDescription="Matching Locations"
      />
      
      <div className="flex-1 px-5 pb-8 overflow-y-auto">
        {/* Search Criteria Summary */}
        <div className="mb-6">
          <h2 className="text-base font-bold mb-2">Your Search Criteria</h2>
          <div className="bg-card p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-input-text">State:</span>
              <span className="font-medium">{selectedState}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-input-text">Budget:</span>
              <span className="font-medium">${budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-input-text">Priorities:</span>
              <span className="font-medium text-right">{selectedPriorities.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <h2 className="text-base font-bold">Results ({filteredLocations.length})</h2>
          <p className="text-sm text-input-text">Tap on a location to view details</p>
        </div>

        {/* Location Results */}
        <div className="space-y-4">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location, index) => (
              <button
                key={index}
                className="w-full bg-card p-4 rounded-lg text-left hover:bg-card-hover transition-colors"
                onClick={() => handleLocationSelect(location)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{location.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    location.priceIndicator === 'LOW' ? 'bg-green-900/30 text-green-400' :
                    location.priceIndicator === 'MEDIUM' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-red-900/30 text-red-400'
                  }`}>
                    {location.priceIndicator}
                  </span>
                </div>
                <p className="text-sm text-input-text mb-2">{location.state}, {location.postcode}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-input-text">Median Price:</span>
                    <span className="ml-2 font-medium">{location.medianPrice}</span>
                  </div>
                  <div>
                    <span className="text-input-text">Growth:</span>
                    <span className="ml-2 font-medium">{location.growthRate}</span>
                  </div>
                  <div>
                    <span className="text-input-text">Yield:</span>
                    <span className="ml-2 font-medium">{location.yieldRate}</span>
                  </div>
                  <div>
                    <span className="text-input-text">Vacancy:</span>
                    <span className="ml-2 font-medium">{location.vacancyRate}</span>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-input-text">No locations found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}