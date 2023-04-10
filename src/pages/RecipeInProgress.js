import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Erro from '../components/Erro';
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './RecipeInProgress.css';

const MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

function RecipeInProgress() {
  const { isLoading, fetchData, data, errors } = useFetch([]);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [favorite, setFavorite] = useState(false);
  const [markedList, setMarkedList] = useState({});
  const [parsedData, setParsedData] = useState({
    name: '',
    image: '',
    type: '',
    instructions: '',
    ingredients: [''],
  });

  // Functions
  const handleData = useCallback(() => {
    const recipeData = data.drinks || data.meals;
    const recipeKeys = Object.keys(recipeData[0]);

    const ingredientKeys = Object.keys(recipeData[0]).filter((key) => (
      key.includes('Ingredient')
      && recipeData[0][key] !== null
      && recipeData[0][key] !== ''
    ));

    setParsedData({
      name: recipeData[0].strMeal || recipeData[0].strDrink,
      image: recipeData[0][recipeKeys.find((element) => element.includes('Thumb'))],
      type: recipeData[0].strAlcoholic || recipeData[0].strCategory,
      instructions: recipeData[0].strInstructions,
      ingredients: ingredientKeys.map((ingredient) => recipeData[0][ingredient]),
    });
  }, [data]);

  const handleShare = () => {
    console.log('share!');
  };

  const handleClickFavorite = () => {
    console.log('favorite!!');
  };

  const handleMarking = ({ target: { checked, parentNode } }) => {
    if (checked) {
      parentNode.className = 'marked';
      console.log(parentNode.textContent);
    } else {
      console.log(parentNode.textContent);
      parentNode.className = 'unmarked';
    }
  };

  // Effects
  useEffect(() => {
    const requestData = async () => {
      if (pathname.includes('drinks')) {
        await fetchData(`${DRINK_URL}${id}`);
      } else await fetchData(`${MEAL_URL}${id}`);
    };

    requestData();
  }, [fetchData, id, pathname]);

  useEffect(() => {
    if (!isLoading && !errors) {
      handleData();
    }
  }, [isLoading, handleData, errors]);

  if (errors) {
    return <Erro message={ errors.message } />;
  }

  return (
    isLoading ? <Loading />
      : (
        <div>
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

          <h6 data-testid="recipe-category">{ parsedData.type }</h6>
          <h1 data-testid="recipe-title">{ parsedData.name }</h1>

          <img
            src={ parsedData.image }
            alt={ parsedData.name }
            data-testid="recipe-photo"
            width="250px"
          />

          <section>
            <h2>Ingredients</h2>

            <ul className="list-reset">
              {
                parsedData.ingredients.map((item, index) => (
                  <li key={ index }>
                    <label data-testid={ `${index}-ingredient-step` }>
                      <input
                        type="checkbox"
                        onChange={ handleMarking }
                      />
                      { item }
                    </label>
                  </li>
                ))
              }
            </ul>
          </section>

          <section>
            <h2>Instructions</h2>
            <p data-testid="instructions">{ parsedData.instructions }</p>
          </section>

          <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
        </div>
      )
  );
}

export default RecipeInProgress;
