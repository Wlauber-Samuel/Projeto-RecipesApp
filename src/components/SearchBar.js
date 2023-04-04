import React from 'react';

function SearchBar() {
  return (
    <div>
      <input data-testid="search-input" type="text" />
      <button data-testid="exec-search-btn" type="button">Buscar</button>
    </div>
  );
}

export default SearchBar;
