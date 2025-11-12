
import React from 'react';

const ButterflyLogo: React.FC = () => (
  <svg
    className="h-12 w-12 md:h-16 md:w-16 text-lime-400"
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M45 20 C20 10, 10 40, 25 50 C10 60, 20 90, 45 80 L45 50 Z" />
    <path d="M55 20 C80 10, 90 40, 75 50 C90 60, 80 90, 55 80 L55 50 Z" />
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-center space-x-4">
        <ButterflyLogo />
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-blue-900">
            Saberê!
          </h1>
          <p className="text-sm md:text-base text-gray-600">AI Project Planner</p>
        </div>
      </div>
    </header>
  );
};
