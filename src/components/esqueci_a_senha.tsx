// PasswordInput.tsx

"use client"
import React from 'react';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, placeholder, className }) => {
  return (
    <input
      type="password"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-2 bg-[#2a2d3e] text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
      required
    />
  );
};

export default PasswordInput;
