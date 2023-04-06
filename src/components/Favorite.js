import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './Favorite.css';

function Favorite() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;
  const [done, setDone] = useState(false);
  const [fetchId, setFetchId] = useState([{}]);
  const [inProgress, setInProgress] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [share, setShare] = useState(false);

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
    if (pathname === `/drinks/${id}`) {
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
    if (pathname === `/meals/${id}`) {
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
    if (pathname === `/drinks/${id}`) favoriteDrinks();
    if (pathname === `/meals/${id}`) favoriteMeals();
    setFavorite((prevState) => !prevState);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (!share) clipboardCopy(url);
    setShare((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={ handleClickFavorite }>
        <img
          src={ !favorite ? whiteHeartIcon : blackHeartIcon }
          alt="compartilhar"
          data-testid="favorite-btn"
        />
      </button>
      <button type="button" data-testid="share-btn" onClick={ handleShare }>
        <img src={ shareIcon } alt="share" />
        {share ? <span>Link copied!</span> : ''}
      </button>
      {!done && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe"
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

export default Favorite;
