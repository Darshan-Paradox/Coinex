function SearchButton({ onClick }) {
  return (
      <button onClick={onClick}>
        <span class="material-symbols-outlined">
          search
        </span>
      </button>
  );
}
export default SearchButton;
