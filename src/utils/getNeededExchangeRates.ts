import { ExchangeRatesData } from '../types/ExchangeRates';
import { neededCurrencies } from '../api/neededCurrencies';

export const getNeededExchangeRate = (data: ExchangeRatesData) => {
  const availableCurrencies = neededCurrencies.slice(1);

  const neededExchangeRates = [];

  for (const key in data['conversion_rates']) {
    if (availableCurrencies.includes(key)) {
      const exchangeRate = { [key]: data['conversion_rates'][key] } as Record<string, number>;
      neededExchangeRates.push(exchangeRate);
    }
  }

  return neededExchangeRates;
};
