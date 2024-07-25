import './Tracker.css';

import { Coin, CoinList, GlobalState } from '../../types/types.tsx';
import { interval, updatePrices } from '../../util/LiveUpdatePrices.ts';
import { useEffect } from 'react';

/*
 * Tracker method tracks the currently selected coins by user, but it doesn't handle pinned coins
 * This methods also utilises utility functions defined in /src/util/ directory for live updating the prices
*/
function Tracker({ coins, setCoins, pinned, setPinned, selectedCurrency, setSelectedCurrency } :GlobalState) {

  //Pin the coin to dashboard and remove it from the currently selected coins list
  function pinCoin(e) {
    const coin :Coin | undefined = coins.find((coin :Coin) => (`${coin.data.base}_${coin.data.currency}` === e.target.id));

    if (coin === undefined) {
      console.error("ERROR, coin undefined :Tracker.tsx");
    }
    setPinned([...pinned, coin]);

    const tmpCoins :CoinList = [...coins];
    tmpCoins.splice(tmpCoins.indexOf(coin), 1);
    setCoins(tmpCoins);
  }

  //Remove a coin from the currently selected coins list by clicking on the element
  function removeCoin(e) {

    const coin :Coin | undefined = coins.find((coin :Coin) => (`${coin.data.base}_${coin.data.currency}` === e.target.id));

    const tmpCoins :CoinList = [...coins];

    if (coin === undefined) {
      console.error("ERROR, coin undefined :Tracker.tsx");
    }

    tmpCoins.splice(tmpCoins.indexOf(coin), 1);
    setCoins(tmpCoins);
  }

  //Live update the prices by short polling the api endpoint
  useEffect(() => {
    setInterval(() => {
      setCoins(updatePrices);
    }, interval);
  }, []);

  return (
      <div class="tracker">
        {
          coins.map((coin :Coin) => 
            <span class="bubble" id={`${coin.data.base}_${coin.data.currency}`} onClick={removeCoin}>
              <span class="material-symbols-outlined pin" id={`${coin.data.base}_${coin.data.currency}`} onClick={pinCoin}>
                keep
              </span>
              {coin.data.base}: {new Intl.NumberFormat(coin.data.currency, { style: 'currency', currency: coin.data.currency }).format(coin.data.amount)}
            </span>
          )
        }
      </div>
  );
}

export default Tracker;
