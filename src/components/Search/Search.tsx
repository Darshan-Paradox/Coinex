import { Coin, GlobalState } from '../../types/types.tsx';
import { useState, useEffect } from 'react';

import SearchButton from './SearchButton.tsx';
import SearchList   from './SearchList.tsx';

import './Search.css';


function Search({ coins, setCoins, selectedCurrency, setSelectedCurrency, pinned, setPinned } :GlobalState) {

  const [allCoins, setAllCoins] = useState<any>([]);
  const [inputCoinId, setInputCoinId] = useState<string>("");


  function  handleChange(e) : void {
    setInputCoinId(e.target.value.toUpperCase());
  }

  async function returnToSubmit(e) : Promise<void> {
    if (e.key == "Enter") {
      submit(e);
    }
  }

  async function submit(e) : Promise<void> {

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

    const response :Response = await fetch(`${import.meta.env.VITE_API_SPOT_PRICE}/${inputCoinId}-${selectedCurrency}/spot`);
    const data :Coin = await response.json();

    setCoins([...coins, data]);

    setInputCoinId("");
  }

  async function getCoinList() : Promise<void> {

    const response :Response = await fetch(import.meta.env.VITE_API_ALL_COINS);
    const data = await response.json();

    setAllCoins(data);
  }

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
