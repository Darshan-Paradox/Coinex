import './Pinned.css';

import { Coin, CoinList, GlobalState } from '../../types/types.tsx';
import { interval, updatePrices } from '../../util/LiveUpdatePrices.ts';
import { useEffect } from 'react';

/*
 * Pinned method tracks the pinned coins by user
 * This methods also utilises utility functions defined in /src/util/ directory for live updating the prices
*/

function Pinned({ coins, setCoins, pinned, setPinned, selectedCurrency, setSelectedCurrency } :GlobalState) {

  //Unpin the coin from dashboard and remove it from the application state
  function unpin(e) {

    const coin :Coin | undefined = pinned.find((coin :Coin) => (`${coin.data.base}_${coin.data.currency}` === e.target.id));

    const tmpCoins :CoinList = [...pinned];

    if (coin === undefined) {
      console.error("ERROR, coin is undefined :Pinned.tsx");
    }
    tmpCoins.splice(tmpCoins.indexOf(coin), 1);
    setPinned(tmpCoins);

  }

  //Fetch the pinned coins from local storage
  useEffect(() => {
    const items :CoinList = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setPinned(items);
    }
  }, []);

  //Live update the prices by short polling the api endpoint
  useEffect(() => {
    setInterval(() => {
      setPinned(updatePrices);
    }, interval);
  }, []);

  //Store the pinned coins to local storage for re-fetching the data on reloads/reopening of app
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(pinned));
  }, [pinned]);

  return (
      <div class="pinned">
        {
          pinned.map((pins :Coin) => 
                    <span class="bubble">
                      <span class="material-symbols-outlined pin" id={`${pins.data.base}_${pins.data.currency}`} onClick={unpin}>keep_off</span>
                      {pins.data.base}: {new Intl.NumberFormat(pins.data.currency, { style: 'currency', currency: pins.data.currency }).format(pins.data.amount)}
                    </span>
          )
        }
      </div>
  );
}

export default Pinned;
