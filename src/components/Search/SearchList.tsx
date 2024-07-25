import { Coin } from '../../types/types.tsx';

function SearchList({ coinList, id }) {
  return (
      <datalist id={id}>
        { coinList.map((coin :Coin) => <option value={coin.id}>{coin.name}</option>) }
      </datalist>
  );
}

export default SearchList;
