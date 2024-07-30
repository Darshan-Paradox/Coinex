import { Coin, SearchListProps } from '../../types/types.tsx';

function SearchList({ coinList, id } : SearchListProps) {
  return (
      <datalist id={id}>
        { coinList.map((coin :Coin) => <option key={coin.id} value={coin.id}>{coin.name}</option>) }
      </datalist>
  );
}

export default SearchList;
