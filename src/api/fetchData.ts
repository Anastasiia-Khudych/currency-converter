import { ConvertionData } from '../types/ConvertionData';
import { ExchangeRatesData } from '../types/ExchangeRates';

const BASE_URL = 'https://v6.exchangerate-api.com/v6/aaa137c33234525faff81023';

async function request<T>(
  url: string,
): Promise<T> {
  const options: RequestInit = {
    method: 'GET',
  };

  try {
    const data = await fetch(BASE_URL + url, options);
    return data.json();
  } catch {
    throw new Error();
  }
}


const client = {
  get: <T>(url: string) => request<T>(url),
};

export const getLatestExchangeRate = () => {
  return client.get<ExchangeRatesData>('/latest/UAH');
};

export const getConvertionValues = (params: string) => {
  return client.get<ConvertionData>(`/pair/${params}`);
};
