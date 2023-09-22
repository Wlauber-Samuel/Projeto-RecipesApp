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
    <div className="w-[90%]">
      <input
        data-testid="search-input"
        type="text"
        value={ search }
        name="search"
        placeholder="...search"
        onChange={ handleChangeButton }
        className="border-2 border-gray-300 w-full rounded-t-lg py-2"
      />
      <div className="flex flex-col w-[100%] py-3 bg-[#41197F] justify-center items-center gap-2 rounded-b-lg text-white">
        <div className="flex gap-2">
          <label htmlFor="ingredient-search-radio" className="flex gap-1">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              name="radio"
              value="Ingredient"
              onChange={ handleChangeRadio }
            />
            Ingredient
          </label>
          <label htmlFor="name-search-radio" className="flex gap-1">
            <input
              data-testid="name-search-radio"
              type="radio"
              name="radio"
              value="Name"
              onChange={ handleChangeRadio }
            />
            Name
          </label>
          <label htmlFor="first-letter-search-radio" className="flex gap-1">
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              name="radio"
              value="First Letter"
              onChange={ handleChangeRadio }
            />
            First Letter
          </label>
        </div>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ handleClick }
          className="w-56 h-8 font-bold bg-[#FCC436] rounded-lg"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
