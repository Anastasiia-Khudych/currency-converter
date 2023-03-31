import React from 'react';
import { ExchangeRate } from './components/ExchangeRate';
import { CurrencyConverter } from './components/CurrencyConverter';


export const App: React.FC = () => {
  return (
    <div className="App is-family-primary">
      <ExchangeRate />
      <CurrencyConverter />
    </div>
  );
};
