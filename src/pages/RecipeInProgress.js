import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
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
  const PATHNAME = pathname.includes('drinks') ? 'drinks' : 'meals';
  const [storedProgress, setStoredProgress] = useLocalStorage('inProgressRecipes', {
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
  const [favorite, setFavorite] = useState(
    storedFavorite.some((recipe) => recipe.id === id),
  );
  const [ingredientList, setIngredientList] = useState(
    storedProgress[PATHNAME][id] || [],
  );
  const [share, setShare] = useState(false);

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
      tags: recipeData[0].strTags?.split(',') || [],
    });
  }, [data]);

  const handleShare = () => {
    const url = window.location.href.replace(/\/in-progress/, '');
    clipboardCopy(url);
    setShare(true);
  };

  useEffect(() => {
    const time = 1000;
    const timeout = setTimeout(() => setShare(false), time);

    return () => {
      clearTimeout(timeout);
    };
  }, [share]);

  const handleDoneRecipe = () => {
    const date = new Date();
    const doneRecipe = {
      id,
      type: PATHNAME === 'drinks' ? 'drink' : 'meal',
      nationality: data[PATHNAME][0].strArea || '',
      category: data[PATHNAME][0].strCategory,
      alcoholicOrNot: data[PATHNAME][0].strAlcoholic || '',
      name: parsedData.name,
      image: parsedData.image,
      doneDate: date.toISOString(),
      tags: parsedData.tags,
    };
    setStoredDoneRecipes([...storedDoneRecipes, doneRecipe]);
    history.push('/done-recipes');
  };

  const handleClickFavorite = () => {
    console.log(data[PATHNAME][0]);
    const favoriteRecipe = {
      id,
      type: PATHNAME === 'drinks' ? 'drink' : 'meal',
      nationality: data[PATHNAME][0].strArea || '',
      category: data[PATHNAME][0].strCategory,
      alcoholicOrNot: data[PATHNAME][0].strAlcoholic || '',
      name: parsedData.name,
      image: parsedData.image,
    };
    if (storedFavorite === null) {
      setStoredFavorite([favoriteRecipe]);
    } else if (storedFavorite.some((recipe) => recipe.id === id)) {
      const newFavorite = storedFavorite.filter((recipe) => recipe.id !== id);
      setStoredFavorite(newFavorite);
    } else {
      setStoredFavorite([...storedFavorite, favoriteRecipe]);
    }
    setFavorite((prevState) => !prevState);
  };

  const handleMarking = ({ target: { checked, parentNode } }) => {
    if (checked) {
      parentNode.className = 'marked';
      setIngredientList((prevState) => ([...prevState, parentNode.textContent]));
    } else {
      parentNode.className = 'unmarked';
      setIngredientList((prevState) => (
        prevState.filter((ingredient) => parentNode.textContent !== ingredient)));
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
  }, [isLoading, parseData, errors]);

  useEffect(() => {
    setStoredProgress((prevState) => ({
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
            <button onClick={ handleClickFavorite }>
              <img
                src={ !favorite ? whiteHeartIcon : blackHeartIcon }
                alt="favoritar"
                data-testid="favorite-btn"
              />
            </button>

            <button data-testid="share-btn" onClick={ handleShare }>
              <img src={ shareIcon } alt="compartilhar" />
              { share ? <span>Link copied!</span> : '' }
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
                      className={
                        ingredientList.some(
                          (ingredient) => ingredient === item,
                        ) ? 'marked' : 'unmarked'
                      }
                    >
                      <input
                        type="checkbox"
                        onChange={ handleMarking }
                        checked={
                          ingredientList.some((ingredient) => ingredient === item)
                        }
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
            disabled={ ingredientList.length !== parsedData.ingredients.length }
            onClick={ handleDoneRecipe }
          >
            Finish Recipe
          </button>
        </div>
      )
  );
}

export default RecipeInProgress;
