import './App.css';

import { CoinList, GlobalState } from './types/types.tsx';

import BaseTemplate     from './components/BaseTemplate/BaseTemplate.tsx';
import Search           from './components/Search/Search.tsx';
import CurrencySelector from './components/CurrencySelector/CurrencySelector.tsx';
import Tracker          from './components/Tracker/Tracker.tsx';
import Pinned           from './components/Pinned/Pinned.tsx';

import { useState } from 'react';

function App() {

  const [coins, setCoins] = useState<CoinList>([]);
  const [pinned, setPinned] = useState<CoinList>([]);

  const [selectedCurrency, setSelectedCurrency] = useState<string>("INR");

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
