import { Coin, GlobalState } from '../../types/types.tsx';
import { useState, useEffect, useCallback } from 'react';

import SearchButton from './SearchButton.tsx';
import SearchList   from './SearchList.tsx';

import './Search.css';


/**
 * Search component handles searching a particular coin from a list of all available coins
 * This also takes care of all the input errors that could occur, for e.g.
 * - Coin which doesn't exist in the list of all available coins
 * - Coin which is already pinned
 */
function Search({ coins, setCoins, selectedCurrency, setSelectedCurrency, pinned, setPinned } :GlobalState) {

  //state storing list of all available coins
  const [allCoins, setAllCoins] = useState<any>([]);
  //state storing the input coin code by user
  const [inputCoinId, setInputCoinId] = useState<string>("");


  const handleChange = useCallback((e) : void => {
    setInputCoinId(e.target.value.toUpperCase());
  }, [])

  //function to handle Enter/Return key as submission action
  const returnToSubmit = useCallback(async (e) : Promise<void> => {
    if (e.key == "Enter") {
      submit(e);
    }
  }, [coins, allCoins, inputCoinId])

  const submit = useCallback(async (e) : Promise<void> => {

    if (coins.find((coin :Coin) => coin.data.base === inputCoinId && coin.data.currency === selectedCurrency) !== undefined) {
      alert("Already attached to Dashboard");
      setInputCoinId("");
      return
    }
    if (pinned.find((coin :Coin) => coin.data.base === inputCoinId && coin.data.currency === selectedCurrency) !== undefined) {
      alert("Already attached to Dashboard");
      setInputCoinId("");
      return
    }
    if (allCoins.find((coin :any) => coin.id === inputCoinId) === undefined) {
      alert("Unable to find coin in database");
      setInputCoinId("");
      return
    }

    try {
      const response :Response = await fetch(`${import.meta.env.VITE_API_SPOT_PRICE}/${inputCoinId}-${selectedCurrency}/spot`);
      const data :Coin = await response.json();

      setCoins([...coins, data]);

      setInputCoinId("");
    } catch (err) {
      console.error("ERROR fetching initial prices: ", err);
    }

  }, [coins, allCoins, inputCoinId])

  //fetches all the available coins in API database from the API endpoint
  async function getCoinList() : Promise<void> {

    try {
      const response :Response = await fetch(import.meta.env.VITE_API_ALL_COINS);
      const data = await response.json();

      setAllCoins(data);
    } catch (err) {
      console.error("ERROR fetching available cryptocurrencies: ", err);
    }
  }

  //Loads the complete list of coins
  useEffect(() => { getCoinList(); }, []);

  const listId :string = "searchList";

  return (
    <div class="search">

      <input value={inputCoinId} list={listId} placeholder="Enter coin code..." onChange={handleChange} onKeyUp={returnToSubmit}/>

      <SearchButton onClick={submit}/>

      <SearchList coinList={allCoins} id={listId}/>

    </div>
  );
}

export default Search;
