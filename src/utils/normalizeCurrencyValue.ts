export const normalizeCurrencyValue = (value: number) => {
  const normalizedValue = Math.floor(value * 100) / 100;

  return `${normalizedValue}`;
};

