export type Coin = {
  data: {
    amount: number,
    base: string,
    currency: string,
  }
};

export type CoinList = Coin[];

export type Currency = {
  data: {
    id: string,
    name: string,
    min_size: number
  }
};

export type CurrencyList = Currency[];

export type GlobalState = {
  coins: CoinList,
  setCoins: any,

  pinned: CoinList,
  setPinned: any,

  selectedCurrency: string,
  setSelectedCurrency: any
};
