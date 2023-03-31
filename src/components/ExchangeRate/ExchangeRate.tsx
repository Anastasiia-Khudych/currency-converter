import React, { useState, useEffect } from 'react';
import { getLatestExchangeRate } from '../../api/fetchData';
import { getNeededExchangeRate } from '../../utils/getNeededExchangeRates';

export const ExchangeRate: React.FC = () => {
  const [conversionRates, setConversionRates] = useState<Record<string, number>[]>([]);

  useEffect(() => {
    const loadExchangeRate = async () => {
      const currentExchangeRate = await getLatestExchangeRate();
      const neededConversionRates = getNeededExchangeRate(currentExchangeRate);
      setConversionRates(neededConversionRates);
    };

    loadExchangeRate();
  }, []);

  const today = new Date().toLocaleDateString();

  return (
    <header className='exchange-rate'>
      <div className='exchange-rate__description'>
        <p className='exchange-rate__title'>Exchange rate in Ukraine</p>
        <p className='exchange-rate__date'>{today}</p>
      </div>

      <div className='exchange-rate__values'>
        {conversionRates.map((rate) => (
          <div key={Object.keys(rate)[0]} className='exchange-rate__block'>
            <span className='exchange-rate__currency-name'>{Object.keys(rate)[0]}</span>
            <span className='exchange-rate__currency-value'>{rate[Object.keys(rate)[0]]}</span>
          </div>
        ))}
      </div>
    </header>
  );
};
