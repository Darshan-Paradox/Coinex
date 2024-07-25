import './Pinned.css';

import { Coin, CoinList, GlobalState } from '../../types/types.tsx';
import { interval, updatePrices } from '../../util/LiveUpdatePrices.ts';
import { useEffect } from 'react';

function Pinned({ coins, setCoins, pinned, setPinned, selectedCurrency, setSelectedCurrency } :GlobalState) {

  function unpin(e) {

    const coin :Coin | undefined = pinned.find((coin :Coin) => (`${coin.data.base}_${coin.data.currency}` === e.target.id));

    const tmpCoins :CoinList = [...pinned];

    if (coin === undefined) {
      console.error("ERROR, coin is undefined :Pinned.tsx");
    }
    tmpCoins.splice(tmpCoins.indexOf(coin), 1);
    setPinned(tmpCoins);

  }

  useEffect(() => {
    const items :CoinList = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setPinned(items);
    }
  }, []);

  useEffect(() => {
    setInterval(() => {
      setPinned(updatePrices);
    }, interval);
  }, []);

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
