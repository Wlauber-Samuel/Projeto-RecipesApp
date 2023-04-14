import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import blackHeartIcon from '../images/like.png';
import shareIcon from '../images/Share.png';
import whiteHeartIcon from '../images/likeborder.png';
import './Favorite.css';

function Favorite({ testId1, testId2, recipeId, recipeType, recipeState }) {
  const history = useHistory();
  const { pathname } = history.location;
  const [done, setDone] = useState(false);
  const [fetchId, setFetchId] = useState([{}]);
  const [inProgress, setInProgress] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [share, setShare] = useState(false);
  const id = recipeId || history.location.pathname.split('/')[2];
  const pathnames = ['/favorite-recipes', '/done-recipes'];

  useEffect(() => {
    const fetchIdAPI = async () => {
      const urlMeals = 'https://www.themealdb.com/api/json/v1/1/';
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/';
      switch (pathname) {
      case `/meals/${id}`: {
        const response = await fetch(`${urlMeals}lookup.php?i=${id}`);
        const data = await response.json();
        setFetchId(data.meals);
        break;
      }
      case `/drinks/${id}`: {
        const response = await fetch(`${urlDrinks}lookup.php?i=${id}`);
        const data = await response.json();
        setFetchId(data.drinks);
        break;
      }
      default:
        break;
      }
    };
    fetchIdAPI();
    const areFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = areFavorite?.some((item) => item.id === id);
    setFavorite(isFavorite);
    const areDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const isDone = areDone?.some((item) => item.id === id);
    setDone(isDone);
    const areInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const isInProgress = areInProgress && Object.keys(areInProgress?.[
      pathname === `/meals/${id}` ? 'meals' : 'drinks'
    ])?.includes(id);
    setInProgress(isInProgress);
  }, [id, pathname]);

  const favoriteDrinks = () => {
    const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = fetchId[0];
    const array = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    if (pathname === `/drinks/${id}` || recipeType === 'drink') {
      if (localStorage.getItem('favoriteRecipes') === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([array]));
      } else {
        const favoriteRecipes = JSON.parse(
          localStorage.getItem('favoriteRecipes'),
        );
        if (favoriteRecipes?.some((item) => item.id === id)) {
          const newFavoriteRecipes = favoriteRecipes.filter(
            (item) => item.id !== id,
          );
          localStorage.setItem(
            'favoriteRecipes',
            JSON.stringify(newFavoriteRecipes),
          );
        } else {
          favoriteRecipes.push(array);
          localStorage.setItem(
            'favoriteRecipes',
            JSON.stringify(favoriteRecipes),
          );
        }
      }
    }
  };

  const favoriteMeals = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = fetchId[0];
    const array = {
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    if (pathname === `/meals/${id}` || recipeType === 'meal') {
      if (localStorage.getItem('favoriteRecipes') === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([array]));
      } else {
        const favoriteRecipes = JSON.parse(
          localStorage.getItem('favoriteRecipes'),
        );
        if (favoriteRecipes?.some((item) => item.id === id)) {
          const newFavoriteRecipes = favoriteRecipes.filter(
            (item) => item.id !== id,
          );
          localStorage.setItem(
            'favoriteRecipes',
            JSON.stringify(newFavoriteRecipes),
          );
        } else {
          favoriteRecipes.push(array);
          localStorage.setItem(
            'favoriteRecipes',
            JSON.stringify(favoriteRecipes),
          );
        }
      }
    }
  };

  const handleClickFavorite = () => {
    if (pathname === `/drinks/${id}` || recipeType === 'drink') favoriteDrinks();
    if (pathname === `/meals/${id}` || recipeType === 'meal') favoriteMeals();
    setFavorite((prevState) => !prevState);
    if (recipeState) {
      recipeState(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  };

  const handleShare = () => {
    const url = window.location.origin;
    console.log(window.location);
    if (!share) {
      if (pathname === `/drinks/${id}` || pathname === `/meals/${id}`) {
        clipboardCopy(window.location.href);
      } else {
        clipboardCopy(`${url}/${recipeType}s/${id}`);
      }
    }
    setShare((prevState) => !prevState);
  };

  return (
    <div className="">
      <div className="flex p-1 gap-2">
        <button
          onClick={ handleClickFavorite }
        >
          <img
            src={ !favorite ? whiteHeartIcon : blackHeartIcon }
            alt="compartilhar"
            data-testid={ testId1 }
          />
        </button>
        <button
          type="button"
          onClick={ handleShare }
          data-testid={ !pathnames.includes(pathname) ? testId2 : '' }
        >
          <img
            src={ shareIcon }
            alt="share"
            data-testid={ pathnames.includes(pathname) ? testId2 : '' }
          />
        </button>
      </div>
      {share ? <p>Link copied!</p> : ''}
      {!done && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="fixed bottom-1 left-4 w-[90%] bg-[#FCA311] text-white rounded-lg p-2 font-bold z-50"
          onClick={ () => (pathname === `/meals/${id}`
            ? history.push(`/meals/${id}/in-progress`)
            : history.push(`/drinks/${id}/in-progress`)) }
        >
          {inProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

Favorite.propTypes = {
  testId1: PropTypes.string.isRequired,
  testId2: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
  recipeState: PropTypes.func.isRequired,
};

export default Favorite;
