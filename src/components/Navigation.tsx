'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoArrowBack, IoInformationCircleOutline } from 'react-icons/io5';

interface NavigationProps {
  title: string;
  showBackButton?: boolean;
  showInfoButton?: boolean;
  currentStep?: number;
  totalSteps?: number;
  stepDescription?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  title,
  showBackButton = true,
  showInfoButton = true,
  currentStep,
  totalSteps,
  stepDescription,
}) => {
  const pathname = usePathname();
  
  // Determine the previous page for back button
  const getPreviousPath = (): string => {
    const routes = [
      '/investment-profile',
      '/strategy-insights',
      '/location-criteria',
      '/location-results',
      '/suburb-detail',
      '/broker-connection',
    ];
    
    const currentIndex = routes.findIndex(route => pathname.startsWith(route));
    if (currentIndex > 0) {
      return routes[currentIndex - 1];
    }
    return '/';
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-5 py-4">
        {showBackButton ? (
          <Link href={getPreviousPath()} className="p-1">
            <IoArrowBack size={24} className="text-text" />
          </Link>
        ) : (
          <div className="w-6" />
        )}
        
        <h1 className="text-xl font-bold text-text">{title}</h1>
        
        {showInfoButton ? (
          <button className="p-1">
            <IoInformationCircleOutline size={24} className="text-text" />
          </button>
        ) : (
          <div className="w-6" />
        )}
      </div>
      
      {currentStep && totalSteps && (
        <div className="px-5 mb-5">
          <p className="text-sm text-gray-400">Step {currentStep} of {totalSteps}</p>
          {stepDescription && (
            <p className="text-base font-bold my-1">{stepDescription}</p>
          )}
          <div className="h-1.5 bg-progress-track rounded-full mt-2.5">
            <div 
              className="h-full bg-progress-fill rounded-full" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;