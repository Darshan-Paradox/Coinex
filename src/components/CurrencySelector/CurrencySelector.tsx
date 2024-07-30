import { Currency, CurrencyList, CurrencySelectorProps } from '../../types/types.tsx';
import { useState, useEffect, useCallback } from 'react';

/*
 * Currency Selector handles fetching of all available currencies and letting users select currency to display value of coins
*/
function CurrencySelector({ selectedCurrency, setSelectedCurrency }: CurrencySelectorProps) {
  const [allCurrencies, setAllCurrencies] = useState<CurrencyList>([]);

  //fetch all currencies as list
  async function getCurrencyList(): Promise<void> {
    try {
      const response: Response = await fetch(import.meta.env.VITE_API_ALL_CURRENCIES);
      const data: { data: CurrencyList } = await response.json();
      setAllCurrencies(data.data);
    } catch (err) {
      console.error("Error fetching FIAT currencies: ", err);
    }

  }

  const handleChange = useCallback((e) => {
    setSelectedCurrency(e.target.value);
  }, [allCurrencies, selectedCurrency])

  //load the list of currencies
  useEffect(() => {
    getCurrencyList();
  }, []);

  return (
    <select
      id="currecySelector"
      value={selectedCurrency}
      onChange={handleChange}
    >
      {allCurrencies.map((currency: Currency) => (
        <optgroup key={currency.name} label={currency.name}>
          <option key={currency.id} value={currency.id}>{currency.id}</option>
        </optgroup>
      ))}
    </select>
  );
}

export default CurrencySelector;
