'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
      <button 
        className="bg-accent hover:bg-accent-dark text-black font-bold py-2 px-4 rounded"
        onClick={() => router.push('/')}
      >
        Go Home
      </button>
    </div>
  );
}