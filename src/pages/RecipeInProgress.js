import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

function RecipeInProgress() {
  const { isLoading, fetchData, data } = useFetch([]);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [favorite, setFavorite] = useState(false);
  const [parsedData, setParsedData] = useState({
    name: '',
    image: '',
    type: '',
    instructions: '',
    ingredients: '',
  });

  const handleData = useCallback(() => {
    console.log(data);
    const recipeData = data.drinks || data.meals;

    const recipeKeys = Object.keys(recipeData[0]);

    setParsedData({
      name: recipeData[0].strMeal || recipeData[0].strDrink,
      image: recipeData[0][recipeKeys.find((element) => element.includes('Thumb'))],
      instructions: recipeData[0].strInstructions,
      ingredients: '',

    });

    console.log(recipeData);
  }, [data]);

  useEffect(() => {
    const requestData = async () => {
      if (pathname.includes('drinks')) {
        await fetchData(`${DRINK_URL}${id}`);
      } else await fetchData(`${MEAL_URL}${id}`);
    };

    requestData();
  }, [fetchData, id, pathname]);

  useEffect(() => {
    if (!isLoading) {
      handleData();
    }
  }, [isLoading, handleData]);

  const handleShare = () => {
    console.log('share!');
  };

  const handleClickFavorite = () => {
    console.log('favorite!!');
  };

  return (
    isLoading ? <Loading /> : (
      <div>
        <Header
          title={
            pathname.includes('drinks')
              ? data.drinks[0].strAlcoholic : data.meals[0].strCategory
          }
        />

        <div className="buttons__container">
          <button data-testid="share-btn" onClick={ handleShare }>
            <img src={ shareIcon } alt="compartilhar" />
          </button>

          <button onClick={ handleClickFavorite }>
            <img
              src={ !favorite ? whiteHeartIcon : blackHeartIcon }
              alt="compartilhar"
              data-testid="favorite-btn"
            />
          </button>
        </div>

        <h1 data-testid="recipe-title">{ parsedData.name }</h1>
        <img
          src={ parsedData.image }
          alt={ parsedData.name }
          data-testid="recipe-photo"
          width="250px"
        />

        <p data-testid="instructions">{ parsedData.instructions }</p>

        <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>

      </div>
    )
  );
}

export default RecipeInProgress;
