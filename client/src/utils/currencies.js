import { currencies } from 'config/currencies';

export const fetchCurrencyDetailsFromCode = (code) => {
  const obj = currencies.frequent[code]
    ? currencies.frequent[code]
    : currencies.rare[code];
  return obj;
};
