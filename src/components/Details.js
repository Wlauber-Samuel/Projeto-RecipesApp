import React, { useEffect, useState } from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom/cjs/react-router-dom.min';
import Header from './Header';
import Carousel from './Carousel';
import Favorite from './Favorite';
import iconebebida from '../images/icone-bebida.png';
import iconeprato from '../images/icone-prato.png';
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
    <div className="mb-5">
      <Header
        title="RECIPE DETAILS"
        image={ pathname === `/meals/${id}` ? iconeprato : iconebebida }
      />
      {pathname === `/meals/${id}`
        ? fetchId?.map((food, index) => (
          <div
            key={ index }
            className="flex flex-col justify-center items-center"
          >
            <div className="flex flex-col text-center items-center justify-center rounded-lg border border-gray-300 w-[90%]">
              <div className="flex w-[100%] justify-between px-3 pt-3">
                <div className="flex flex-col">
                  <h1
                    data-testid="recipe-title"
                    className="text-[#41197F] uppercase text-xl font-bold"
                  >
                    {food.strMeal}
                  </h1>
                  <p
                    data-testid="recipe-category"
                    className="flex text-[#41197F]"
                  >
                    {food.strCategory}
                  </p>
                </div>
                <Favorite testId1="favorite-btn" testId2="share-btn" />
              </div>
              <img
                data-testid="recipe-photo"
                src={ food.strMealThumb }
                alt="food"
                className="w-72 mb-3 rounded-lg border border-gray-500"
              />
              <div className="flex flex-col w-[90%] border border-gray-300 p-2 rounded-xl gap-1 text-left text-[">
                <h3 className="text-[#41197F]">Ingredients</h3>
                {ingredients.map((foods, i) => (
                  <li
                    data-testid={ `${i}-ingredient-name-and-measure` }
                    key={ i }
                  >
                    {fetchId[0][foods]}
                    {' - '}
                    {fetchId[0][`strMeasure${i + 1}`]}
                  </li>
                ))}
              </div>
              <div className="flex flex-col w-[90%] border border-gray-300 p-3 rounded-xl gap-1 text-left my-3">
                <h3 className="text-[#41197F]">Instructions</h3>
                <p data-testid="instructions" className="text-sm">
                  {food.strInstructions}
                </p>
              </div>
            </div>
            <div className="w-[90%] mt-4">
              <h3 className="text-[#41197F]">Video</h3>
              <iframe
                src={ food.strYoutube?.replace('watch?v=', 'embed/') }
                className="w-full h-[250px] mt-3"
                title="YouTube video player"
                data-testid="video"
              />
            </div>
          </div>
        ))
        : fetchId?.map((drink, index) => (
          <div
            key={ index }
            className="flex flex-col justify-center items-center"
          >
            <div className="flex flex-col text-center items-center justify-center rounded-lg border border-gray-300 w-[90%]">
              <div className="flex w-[100%] justify-between px-3 pt-3">
                <div className="flex flex-col">
                  <h1
                    data-testid="recipe-title"
                    className="text-[#41197F] uppercase text-xl font-bold flex"
                  >
                    {drink.strDrink}
                  </h1>
                  <p
                    data-testid="recipe-category"
                    className="flex text-[#41197F]"
                  >
                    {drink.strCategory}
                    {' - '}
                    {drink.strAlcoholic}
                  </p>
                </div>
                <Favorite testId1="favorite-btn" testId2="share-btn" />
              </div>
              <img
                data-testid="recipe-photo"
                src={ drink.strDrinkThumb }
                alt="drink"
                className="w-72 mb-3 rounded-lg border border-gray-500"
              />
              <div className="flex flex-col w-[90%] border border-gray-300 p-2 rounded-xl gap-1 text-left text-[">
                <h3 className="text-[#41197F]">Ingredients</h3>
                {ingredients.map((drinks, i) => (
                  <li
                    data-testid={ `${i}-ingredient-name-and-measure` }
                    key={ i }
                  >
                    {fetchId[0][drinks]}
                    {' - '}
                    {fetchId[0][`strMeasure${i + 1}`]}
                  </li>
                ))}
              </div>
              <div className="flex flex-col w-[90%] border border-gray-300 p-3 rounded-xl gap-1 text-left my-3">
                <h3 className="text-[#41197F]">Instructions</h3>
                <p data-testid="instructions" className="text-sm">
                  {drink.strInstructions}
                </p>
              </div>
            </div>
          </div>
        ))}
      <div className="w-[90%] mt-4 ml-5">
        <h3 className="text-[#41197F]">Recommendation</h3>
      </div>
      <Carousel />
    </div>
  );
}

export default Details;
