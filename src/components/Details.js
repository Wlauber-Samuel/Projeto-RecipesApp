import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from './Header';
import Carousel from './Carousel';
import Favorite from './Favorite';
import './Details.css';

function Details() {
  const { id } = useParams();
  const [fetchId, setFetchId] = useState([{}]);
  const history = useHistory();
  const { pathname } = history.location;

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
  }, [id, pathname]);

  const ingredients = Object.keys(fetchId[0]).filter(
    (el) => el.includes('strIngredient')
        && fetchId[0][el] !== ''
        && fetchId[0][el] !== null,
  );

  return (
    <div className="recipe-details">
      <Header title="Recipe Details" />
      <Favorite testId1="favorite-btn" testId2="share-btn" />
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
              width={ 340 }
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
      <Carousel />
    </div>
  );
}

export default Details;
