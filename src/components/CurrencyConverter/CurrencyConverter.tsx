import React, { ChangeEvent, useState, useEffect } from 'react';
import { Currency } from '../../types/Currency';
import { getConvertionValues } from '../../api/fetchData';
import { normalizeCurrencyValue } from '../../utils/normalizeCurrencyValue';
import { neededCurrencies } from '../../api/neededCurrencies';

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState<Currency>('PLN');
  const [toCurrency, setToCurrency] = useState<Currency>('UAH');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [loadingError, setLoadingError] = useState(false);

  const loadConversionData = async (from: string, to: string, amount: string) => {
    try {
      setLoadingError(false);
      const conversionParams = `${from}/${to}/${amount}`;
      const conversionData = await getConvertionValues(conversionParams);
      const convertedAmount = normalizeCurrencyValue(conversionData?.conversion_result) || '';
      setConvertedAmount(`${convertedAmount}`);
    } catch {
      setLoadingError(true);
    }
  };

  useEffect(() => {
    loadConversionData(fromCurrency, toCurrency, amount);
  }, [fromCurrency, toCurrency]);

  const convertCurrency = async (from: string, to: string, amount: string) => {
    try {
      setLoadingError(false);
      const conversionParams = `${from}/${to}/${amount}`;
      const conversionData = await getConvertionValues(conversionParams);
      return normalizeCurrencyValue(conversionData?.conversion_result) || '';
    } catch {
      setLoadingError(true);
    }
  };

  const onCurrencyChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, id } = event.target;

    if (id === 'first-currency') {
      setFromCurrency(value as Currency);
    } else {
      setToCurrency(value as Currency);
    }
  };

  const onAmountChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;

    if (id === 'first-amount') {
      setAmount(value);
      const converted = await convertCurrency(fromCurrency, toCurrency, value);
      setConvertedAmount(`${converted}`);
    } else {
      setConvertedAmount(value);
      const converted = await convertCurrency(toCurrency, fromCurrency, value);
      setAmount(`${converted}`);
    }
  };

  const removeError = () => {
    window.setTimeout(() => setLoadingError(false), 3000);
  };

  useEffect(() => {
    removeError();
  }, [loadingError]);

  return (
    <div className='currency-converter'>
      <div className='currency-converter__title'>
        Currency Converter
      </div>

      <div className='currency-converter__content converter'>
        <div className='converter__form'>
          <input
            id="first-amount"
            className='mr-4 input is-primary'
            type="number"
            value={amount}
            onChange={onAmountChange}
          />

          <div className="select is-primary is-normal">
            <select
              id="first-currency"
              name="first-currency"
              value={fromCurrency}
              onChange={onCurrencyChange}
            >
              {neededCurrencies.map(currencyName => (
                <option
                  key={currencyName}
                  value={currencyName}
                >
                  {currencyName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='converter__form'>
          <input
            id="second-amount"
            className='mr-4 input is-primary'
            type="number"
            value={convertedAmount}
            onChange={onAmountChange}
          />

          <div className="select is-primary">
            <select
              id="second-currency"
              name="second-currency"
              value={toCurrency}
              onChange={onCurrencyChange}
            >
              {neededCurrencies.map(currencyName => (
                <option
                  key={currencyName}
                  value={currencyName}>
                  {currencyName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
