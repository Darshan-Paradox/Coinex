import { Currency, CurrencyList } from "../../types/types.tsx";
import { useState, useEffect } from "react";

function CurrencySelector({ selectedCurrency, setSelectedCurrency }: { selectedCurrency: string, setSelectedCurrency: any }) {
  const [allCurrencies, setAllCurrencies] = useState<CurrencyList>([]);

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
