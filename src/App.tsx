import './App.css';

import { CoinList, GlobalState } from './types/types.tsx';

import BaseTemplate     from './components/BaseTemplate/BaseTemplate.tsx';
import Search           from './components/Search/Search.tsx';
import CurrencySelector from './components/CurrencySelector/CurrencySelector.tsx';
import Tracker          from './components/Tracker/Tracker.tsx';
import Pinned           from './components/Pinned/Pinned.tsx';

import { useState } from 'react';

function App() {

  //State for showing current coins which are yet to be pinned
  const [coins, setCoins] = useState<CoinList>([]);
  //State for showing coins which are pinned
  const [pinned, setPinned] = useState<CoinList>([]);

  //State for storing the currency to display the value of crypto-coins
  const [selectedCurrency, setSelectedCurrency] = useState<string>("INR");

  //Global state of application
  const globalState :GlobalState = {
    coins: coins,
    setCoins: setCoins,

    pinned: pinned,
    setPinned: setPinned,

    selectedCurrency: selectedCurrency,
    setSelectedCurrency: setSelectedCurrency
  };

  return (
    <>

      <BaseTemplate/>

      <Search {...globalState}/>
      <CurrencySelector selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency}/>
      <Tracker {...globalState}/>
      <Pinned {...globalState}/>

    </>
  );
}

export default App;
