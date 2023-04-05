import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './RecipeDetails.css';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

function RecipeDetails() {
  const { id } = useParams();
  const [fetchId, setFetchId] = useState([{}]);
  const [carousel, setCarousel] = useState([]);
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

  const ingredients = Object.keys(fetchId[0]).filter(
    (el) => el.includes('strIngredient')
      && fetchId[0][el] !== ''
      && fetchId[0][el] !== null,
  );

  return (
    <div className="recipe-details">
      <Header title="Recipe Details" />
      <button type="button" data-testid="start-recipe-btn" className="start-recipe">
        Start Recipe
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
            <iframe
              src={ food.strYoutube }
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
              <img
                src={ drink.strDrinkThumb }
                alt="drink"
                width={ 160 }
              />
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
              <img
                src={ food.strMealThumb }
                alt="food"
                width={ 160 }
              />
              <h3 data-testid={ `${index}-recommendation-title` }>
                {food.strMeal}
              </h3>
            </SwiperSlide>
          ))}
      </Swiper>
      <Footer />
    </div>
  );
}

export default RecipeDetails;
