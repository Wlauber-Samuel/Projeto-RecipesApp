import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchBarContext } from '../context/SearchBarProvider';

function SearchBar() {
  const { setData, radio, handleChangeRadio } = useContext(SearchBarContext);
  const [search, setSearch] = useState('');
  const history = useHistory();
  const { pathname } = history.location;

  const handleChangeButton = ({ target: { name, value } }) => {
    if (name === 'search') setSearch(value);
  };

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = response.json();
    return data;
  };

  let data;
  const number = 12;

  const mealsSwitchCase = async () => {
    const urlMeals = 'https://www.themealdb.com/api/json/v1/1';
    if (radio === 'Ingredient') {
      data = await fetchData(`${urlMeals}/filter.php?i=${search}`);
    }
    if (radio === 'Name') {
      data = await fetchData(`${urlMeals}/search.php?s=${search}`);
    }
    if (radio === 'First Letter') {
      if (search.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      data = await fetchData(`${urlMeals}/search.php?f=${search}`);
    }
    console.log(data);
    if (data?.meals?.length === 1) {
      history.push(`/meals/${data.meals[0].idMeal}`);
    }
    if (await !data?.meals) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    data = await data?.meals?.slice(0, number);
  };

  const drinksSwitchCase = async () => {
    const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1';
    if (radio === 'Ingredient') {
      data = await fetchData(`${urlDrinks}/filter.php?i=${search}`);
    }
    if (radio === 'Name') {
      data = await fetchData(`${urlDrinks}/search.php?s=${search}`);
    }
    if (radio === 'First Letter') {
      if (search.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      data = await fetchData(`${urlDrinks}/search.php?f=${search}`);
    }
    if (await data?.drinks?.length === 1) {
      history.push(`/drinks/${data.drinks[0].idDrink}`);
    }
    if (await !data?.drinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    data = await data?.drinks?.slice(0, number);
  };

  const handleClick = async () => {
    switch (pathname) {
    case '/meals':
      await mealsSwitchCase();
      break;
    case '/drinks':
      await drinksSwitchCase();
      break;
    default:
      break;
    }
    setData(data);
  };

  return (
    <div>
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="radio"
          value="Ingredient"
          onChange={ handleChangeRadio }
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          name="radio"
          value="Name"
          onChange={ handleChangeRadio }
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="radio"
          value="First Letter"
          onChange={ handleChangeRadio }
        />
      </label>
      <input
        data-testid="search-input"
        type="text"
        value={ search }
        name="search"
        onChange={ handleChangeButton }
      />
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;