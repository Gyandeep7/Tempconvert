import React from 'react';
import { ConverterProvider } from './contexts/ConverterContext';
import ConverterForm from './components/ConverterForm/ConverterForm';

const App: React.FC = () => {
  return (
    <ConverterProvider>
      <div>
      
        <div style={{ padding: '20px' }}>
          <h1>Unit Converter</h1>
          <ConverterForm />
        </div>
      
      </div>
    </ConverterProvider>
  );
};

export default App;
