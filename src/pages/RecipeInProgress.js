import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
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
  const history = useHistory();
  const { pathname } = history.location;
  const [storedValue, setStoredValue] = useLocalStorage('inProgressRecipes', {
    drinks: {},
    meals: {},
  });
  const [storedFavorite, setStoredFavorite] = useLocalStorage('favoriteRecipes', []);
  const [storedDoneRecipes, setStoredDoneRecipes] = useLocalStorage('doneRecipes', []);
  const [parsedData, setParsedData] = useState({
    name: '',
    image: '',
    type: '',
    instructions: '',
    ingredients: [''],
  });
  const [favorite, setFavorite] = useState(false);
  const [ingredientList, setIngredientList] = useState({});
  const PATHNAME = pathname.includes('drinks') ? 'drinks' : 'meals';

  // Functions
  const parseData = useCallback(() => {
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

  };

  const handleDoneRecipe = () => {
    const doneRecipe = {
      id,
      type: pathname,
      nationality: data.strArea || '',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic || '',
      name: parsedData.name,
      image: parsedData.image,
      doneDate: 
    }
  }

  const handleClickFavorite = () => {
    const favoriteRecipe = {
      id,
      type: pathname,
      nationality: data.strArea || '',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic || '',
      name: parsedData.name,
      image: parsedData.image,
    };
  };

  const handleMarking = ({ target: { checked, parentNode } }) => {
    if (checked) {
      parentNode.className = 'marked';
      setIngredientList((prevState) => ({
        ...prevState,
        [parentNode.textContent]: true,
      }));
    } else {
      parentNode.className = 'unmarked';
      setIngredientList((prevState) => ({
        ...prevState,
        [parentNode.textContent]: false,
      }));
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
      parseData();
    }
  }, [isLoading, handleData, errors]);

  useEffect(() => {
    const parsedIngredients = {};

    parsedData.ingredients.forEach((ingredient) => {
      Object.assign(parsedIngredients, { [ingredient]: false });
    });

    setIngredientList(parsedIngredients);
  }, [parsedData.ingredients, PATHNAME, id]);

  useEffect(() => {
    setStoredValue((prevState) => ({
      ...prevState,
      [PATHNAME]: {
        ...prevState[PATHNAME],
        [id]: ingredientList,
      },
    }));
  }, [PATHNAME, id, ingredientList]);

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
                    <label
                      data-testid={ `${index}-ingredient-step` }
                      name={ item }
                      className={ ingredientList[item] ? 'marked' : 'unmarked' }
                    >
                      <input
                        type="checkbox"
                        onChange={ handleMarking }
                        checked={ ingredientList[item] || false }
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

          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !Object.values(ingredientList).every((item) => item === true) }
            onClick={ () => history.push('/done-recipes') }
          >
            Finish Recipe
          </button>
        </div>
      )
  );
}

export default RecipeInProgress;
