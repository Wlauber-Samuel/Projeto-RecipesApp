import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="search-radio"
          value="Ingredient"
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          name="name-radio"
          value="Name"
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="first-letter-radio"
          value="First Letter"
        />
      </label>
      <input data-testid="search-input" type="text" />
      <button data-testid="exec-search-btn" type="button">Buscar</button>
    </div>
  );
}

export default SearchBar;
