import React, { createContext, useContext, ReactNode } from 'react';

interface ConverterContextProps {
  celsiusToFahrenheit: (value: number) => number;
  fahrenheitToCelsius: (value: number) => number;
  sqYardToSqFt: (value: number) => number;
  sqFtToSqYard: (value: number) => number;
  cmToM: (value: number) => number;
  mToCm: (value: number) => number;
}

const ConverterContext = createContext<ConverterContextProps | undefined>(undefined);

interface ConverterProviderProps {
  children: ReactNode;
}

const ConverterProvider: React.FC<ConverterProviderProps> = ({ children }) => {
  const celsiusToFahrenheit = (celsius: number) => (celsius * 9/5) + 32;
  const fahrenheitToCelsius = (fahrenheit: number) => (fahrenheit - 32) * 5/9;
  const sqYardToSqFt = (sqYard: number) => sqYard * 9; // Assuming 1 sq yard = 9 sq ft
  const sqFtToSqYard = (sqFt: number) => sqFt / 9;
  const cmToM = (cm: number) => cm / 100;
  const mToCm = (m: number) => m * 100;

  return (
    <ConverterContext.Provider value={{ celsiusToFahrenheit, fahrenheitToCelsius, sqYardToSqFt, sqFtToSqYard, cmToM, mToCm }}>
      {children}
    </ConverterContext.Provider>
  );
};

const useConverter = () => {
  const context = useContext(ConverterContext);
  if (!context) {
    throw new Error('useConverter must be used within a ConverterProvider');
  }
  return context;
};

export { ConverterProvider, useConverter };
