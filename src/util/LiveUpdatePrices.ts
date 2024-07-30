import { Coin, CoinList } from '../types/types.tsx';

//interval for polling the api endpoint
export const interval :number = 10*1000;

//fetches the api for updated price
async function updatePrice(tmpCoinsArray :CoinList, coin :Coin, idx :number) {

  try {
    const response = await fetch(`${import.meta.env.VITE_API_SPOT_PRICE}/${coin.data.base}-${coin.data.currency}/spot`);
    const data :Coin = await response.json();

    tmpCoinsArray[idx].data.amount = data.data.amount;
  } catch (err) {
    console.error(err);
  }
}

//sets the state to the new updated prices
export function updatePrices(currentCoins :CoinList) :CoinList {
  const tmpCoinsArray :CoinList = [...currentCoins];

  tmpCoinsArray.forEach(async (coin :Coin , idx :number) => {await updatePrice(tmpCoinsArray, coin, idx);});
  return tmpCoinsArray;
}
