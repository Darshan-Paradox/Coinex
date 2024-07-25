import { Coin, CoinList } from '../types/types.tsx';

export const interval :number = 10*1000;

async function updatePrice(tmpCoinsArray :CoinList, coin :Coin, idx :number) {

  const response = await fetch(`${import.meta.env.VITE_API_SPOT_PRICE}/${coin.data.base}-${coin.data.currency}/spot`);
  const data :Coin = await response.json();

  tmpCoinsArray[idx].data.amount = data.data.amount;
}

export function updatePrices(currentCoins :CoinList) :CoinList {
  const tmpCoinsArray :CoinList = [...currentCoins];

  tmpCoinsArray.forEach(async (coin :Coin , idx :number) => {await updatePrice(tmpCoinsArray, coin, idx);});
  return tmpCoinsArray;
}
