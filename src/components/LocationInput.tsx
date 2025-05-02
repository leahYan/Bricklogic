'use client';

import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';

interface LocationInputProps {
  onPress?: () => void;
  placeholder?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  onPress,
  placeholder = 'Search location'
}) => {
  return (
    <button 
      className="flex flex-row items-center border border-accent rounded-md px-3 py-3 bg-input-bg w-full"
      onClick={onPress}
    >
      <IoLocationOutline size={20} className="text-accent" />
      <span className="text-input-placeholder ml-2">{placeholder}</span>
    </button>
  );
};

export default LocationInput;