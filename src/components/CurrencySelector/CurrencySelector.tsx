import { Currency, CurrencyList } from '../../types/types.tsx';
import { useState, useEffect } from 'react';

/*
 * Currency Selector handles fetching of all available currencies and letting users select currency to display value of coins
*/
function CurrencySelector({ selectedCurrency, setSelectedCurrency }: { selectedCurrency: string, setSelectedCurrency: any }) {
  const [allCurrencies, setAllCurrencies] = useState<CurrencyList>([]);

  //fetch all currencies as list
  async function getCurrencyList(): Promise<void> {
    const response: Response = await fetch(
      import.meta.env.VITE_API_ALL_CURRENCIES,
    );
    const data: { data: CurrencyList } = await response.json();

    setAllCurrencies(data.data);
  }

  function handleChange(e) {
    setSelectedCurrency(e.target.value);
  }

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
        <optgroup label={currency.name}>
          <option value={currency.id}>{currency.id}</option>
        </optgroup>
      ))}
    </select>
  );
}

export default CurrencySelector;
