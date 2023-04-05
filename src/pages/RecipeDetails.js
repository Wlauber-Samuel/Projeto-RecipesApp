import React, { useEffect, useState } from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom/cjs/react-router-dom.min';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './RecipeDetails.css';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

function RecipeDetails() {
  const { id } = useParams();
  const [fetchId, setFetchId] = useState([{}]);
  const [carousel, setCarousel] = useState([]);
  const [share, setShare] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    const fetchIdAPI = async () => {
      const urlMeals = 'https://www.themealdb.com/api/json/v1/1/';
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/';
      const maxNumber = 6;
      switch (pathname) {
      case `/meals/${id}`: {
        const response = await fetch(`${urlMeals}lookup.php?i=${id}`);
        const data = await response.json();
        setFetchId(data.meals);
        console.log(data.meals);
        const newResponse = await fetch(`${urlDrinks}search.php?s=`);
        const newData = await newResponse.json();
        console.log(newData);
        setCarousel(newData.drinks.slice(0, maxNumber));
        break;
      }
      case `/drinks/${id}`: {
        const response = await fetch(`${urlDrinks}lookup.php?i=${id}`);
        const data = await response.json();
        setFetchId(data.drinks);
        const newResponse = await fetch(`${urlMeals}search.php?s=`);
        const newData = await newResponse.json();
        console.log(newData);
        setCarousel(newData.meals.slice(0, maxNumber));
        break;
      }
      default:
        break;
      }
    };
    fetchIdAPI();
  }, [id, pathname]);

  const handleShare = () => {
    const url = window.location.href;
    if (!share) clipboardCopy(url);
    setShare((prevState) => !prevState);
  };

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
      }
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      favoriteRecipes.push(array);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
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
      }
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(favoriteRecipes);
      favoriteRecipes.push(array);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  };

  const handleClickFavorite = () => {
    if (pathname === `/drinks/${id}`) {
      favoriteDrinks();
    }
    if (pathname === `/meals/${id}`) {
      favoriteMeals();
    }
    setFavorite((prevState) => !prevState);
  };
  const ingredients = Object.keys(fetchId[0]).filter(
    (el) => el.includes('strIngredient')
      && fetchId[0][el] !== ''
      && fetchId[0][el] !== null,
  );

  return (
    <div className="recipe-details">
      <Header title="Recipe Details" />
      <button data-testid="share-btn" onClick={ handleShare }>
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      {share ? <span>Link copied!</span> : ''}
      <button data-testid="favorite-btn" onClick={ handleClickFavorite }>
        <img
          src={ !favorite ? whiteHeartIcon : blackHeartIcon }
          alt="compartilhar"
        />
      </button>
      {pathname === `/meals/${id}`
        ? fetchId?.map((food, index) => (
          <div key={ index } className="product-details">
            <img
              data-testid="recipe-photo"
              src={ food.strMealThumb }
              alt="food"
              width={ 300 }
            />
            <h1 data-testid="recipe-title">{food.strMeal}</h1>
            <p data-testid="recipe-category">{food.strCategory}</p>
            {ingredients.map((foods, i) => (
              <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                {fetchId[0][foods]}
                {fetchId[0][`strMeasure${i + 1}`]}
              </p>
            ))}
            <p data-testid="instructions">{food.strInstructions}</p>
            {console.log(food.strYoutube)}
            <iframe
              src={ food.strYoutube?.replace('watch?v=', 'embed/') }
              width={ 350 }
              height={ 250 }
              title="YouTube video player"
              data-testid="video"
            />
          </div>
        ))
        : fetchId?.map((drink, index) => (
          <div key={ index } className="product-details">
            <img
              data-testid="recipe-photo"
              src={ drink.strDrinkThumb }
              alt="drink"
              width={ 300 }
            />
            <h1 data-testid="recipe-title">{drink.strDrink}</h1>
            <p data-testid="recipe-category">
              {drink.strCategory}
              {drink.strAlcoholic}
            </p>
            {ingredients.map((drinks, i) => (
              <p data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                {fetchId[0][drinks]}
                {fetchId[0][`strMeasure${i + 1}`]}
              </p>
            ))}
            <p data-testid="instructions">{drink.strInstructions}</p>
          </div>
        ))}
      <h2>Recommendation</h2>
      <Swiper
        slidesPerView={ 2 }
        spaceBetween={ 30 }
        pagination={ {
          clickable: true,
        } }
        modules={ [Pagination] }
        className="mySwiper"
      >
        {pathname === `/meals/${id}`
          ? carousel?.map((drink, index) => (
            <SwiperSlide
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="container-carousel"
            >
              <img src={ drink.strDrinkThumb } alt="drink" width={ 160 } />
              <h3 data-testid={ `${index}-recommendation-title` }>
                {drink.strDrink}
              </h3>
            </SwiperSlide>
          ))
          : carousel?.map((food, index) => (
            <SwiperSlide
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="container-carousel"
            >
              <img src={ food.strMealThumb } alt="food" width={ 160 } />
              <h3 data-testid={ `${index}-recommendation-title` }>
                {food.strMeal}
              </h3>
            </SwiperSlide>
          ))}
      </Swiper>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe"
        onClick={ () => (pathname === `/meals/${id}`
          ? history.push(`/meals/${id}/in-progress`)
          : history.push(`/drinks/${id}/in-progress`)) }
      >
        Start Recipe
      </button>
    </div>
  );
}

export default RecipeDetails;
