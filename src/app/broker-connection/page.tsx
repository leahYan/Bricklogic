'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { IoCheckmarkCircle } from 'react-icons/io5';

// Mock broker data for MVP
const mockBroker = {
  name: 'Sarah Johnson',
  company: 'Mortgage Solutions Australia',
  experience: '12 years',
  specialization: 'First home buyers & investors',
  phone: '0412 345 678',
  email: 'sarah.j@mortgagesolutions.com.au'
};

export default function BrokerConnectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [showBrokerInfo, setShowBrokerInfo] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredContact: 'phone',
    bestTimeToCall: 'morning'
  });

  // Get location data from URL params if available
  const locationName = searchParams.get('locationName');
  
  // Handle connect button press
  const handleConnect = () => {
    setShowBrokerInfo(true);
  };

  // Handle skip button press
  const handleSkip = () => {
    // In MVP, just go to a simple end screen
    router.push('/thank-you');
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // After a short delay, navigate to thank you page
    setTimeout(() => {
      router.push('/thank-you');
    }, 2000);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-text">
      <Navigation 
        title="Broker Connection" 
        currentStep={4}
        totalSteps={4}
        stepDescription="Connect with Expert"
      />
      
      <div className="flex-1 p-4 flex flex-col">
        {!showBrokerInfo ? (
          // Broker connection prompt
          <div className="flex-1 flex flex-col">
            <h1 className="text-2xl font-bold mb-2">Ready for the next step?</h1>
            
            <div className="bg-input-bg border border-gray-700 rounded-lg p-4 my-4">
              <p className="mb-4">
                {locationName ? 
                  `Now that you've explored ${locationName} and other locations, would you like to speak with a mortgage broker to understand your borrowing options?` :
                  "Now that you've explored potential locations, would you like to speak with a mortgage broker to understand your borrowing options?"}
              </p>
              
              <div className="space-y-3">
                <h3 className="font-semibold">A broker can help you:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Understand your borrowing capacity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Compare loan options across multiple lenders</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Navigate first home buyer grants and incentives</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg mb-6">
              <p className="text-xs text-gray-400">
                <span className="text-warning font-semibold">Disclosure:</span> Bricklogic may receive a referral fee if you choose to engage with this broker. This does not affect the service you receive.
              </p>
            </div>
            
            <div className="mt-auto space-y-3">
              <button
                className="w-full bg-accent hover:bg-accent-dark text-black font-bold py-3 px-4 rounded-lg"
                onClick={handleConnect}
              >
                Connect with a Broker
              </button>
              
              <button
                className="w-full bg-transparent border border-gray-700 text-gray-400 py-3 px-4 rounded-lg"
                onClick={handleSkip}
              >
                Maybe Later
              </button>
            </div>
          </div>
        ) : formSubmitted ? (
          // Success message after form submission
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <IoCheckmarkCircle className="text-success text-5xl mb-4" />
            <h2 className="text-xl font-bold mb-2">Request Sent!</h2>
            <p className="text-gray-400">
              {mockBroker.name} will contact you shortly to discuss your property financing options.
            </p>
          </div>
        ) : (
          // Broker info and contact form
          <div className="flex-1 flex flex-col">
            <h1 className="text-2xl font-bold mb-6">Your Mortgage Broker</h1>
            
            <div className="bg-input-bg border border-gray-700 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-accent">{mockBroker.name}</h2>
              <p className="text-sm text-gray-400">{mockBroker.company}</p>
              
              <div className="mt-4 space-y-2">
                <p className="text-sm"><span className="text-gray-400">Experience:</span> {mockBroker.experience}</p>
                <p className="text-sm"><span className="text-gray-400">Specializes in:</span> {mockBroker.specialization}</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-input-bg border border-gray-700 text-input-text"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-input-bg border border-gray-700 text-input-text"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-input-bg border border-gray-700 text-input-text"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Preferred Contact Method</label>
                <select
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-input-bg border border-gray-700 text-input-text"
                >
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Best Time to Call</label>
                <select
                  name="bestTimeToCall"
                  value={formData.bestTimeToCall}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-input-bg border border-gray-700 text-input-text"
                >
                  <option value="morning">Morning (9am-12pm)</option>
                  <option value="afternoon">Afternoon (12pm-5pm)</option>
                  <option value="evening">Evening (5pm-7pm)</option>
                </select>
              </div>
              
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-xs text-gray-400">
                  By submitting this form, you consent to being contacted by the broker regarding property financing options.
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-dark text-black font-bold py-3 px-4 rounded-lg mt-4"
              >
                Submit Request
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}