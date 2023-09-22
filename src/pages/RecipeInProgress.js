import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import useLocalStorage from '../hooks/useLocalStorage';
import Erro from '../components/Erro';
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import shareIcon from '../images/Share.png';
import fullHeart from '../images/like.png';
import emptyHeart from '../images/likeborder.png';

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
    clipboardCopy(window.location.href.replace(/\/in-progress/, ''));
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
      doneDate: date.toDateString(),
      tags: parsedData.tags,
    };
    setStoredDoneRecipes([...storedDoneRecipes, doneRecipe]);
    history.push('/done-recipes');
  };
  const handleClickFavorite = () => {
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
      [PATHNAME]: { ...prevState[PATHNAME], [id]: ingredientList },
    }));
  }, [PATHNAME, id, ingredientList]);
  if (errors) {
    return <Erro message={ errors.message } />;
  }
  return (
    isLoading ? <Loading />
      : (
        <div>
          <div className="absolute w-full z-10">
            <div className="flex justify-between p-2">
              <h5
                data-testid="recipe-category"
                className="basis-2/3 text-yellow-500"
              >
                { parsedData.type }
              </h5>
              <button onClick={ handleClickFavorite }>
                <img
                  src={ !favorite ? emptyHeart : fullHeart }
                  alt="favoritar"
                  data-testid="favorite-btn"
                />
              </button>
              <button
                data-testid="share-btn"
                onClick={ handleShare }
                className="flex items-center"
              >
                <img src={ shareIcon } alt="compartilhar" className="fill-blue-500" />
                { share ? <span className="text-white">Link copied!</span> : '' }
              </button>
            </div>
            <div className="w-full h-20 flex justify-center">
              <h1
                data-testid="recipe-title"
                className="self-center text-white"
              >
                { parsedData.name }
              </h1>
            </div>
          </div>
          <img
            src={ parsedData.image }
            alt={ parsedData.name }
            data-testid="recipe-photo"
            className="h-[144px] w-full filter brightness-50 object-cover z-0"
          />
          <section className="p-4">
            <h2>Ingredients</h2>
            <div className="border w-full rounded-md">
              <ul className="p-2">
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
                          className="m-2
                          outline outline-2
                          outline-yellow-500
                          bg-yellow-800 accent-yellow-300"
                        />
                        { item }
                      </label>
                    </li>
                  ))
                }
              </ul>
            </div>
          </section>
          <section className="p-4">
            <h2>Instructions</h2>
            <p
              data-testid="instructions"
              className="p-2 border rounded-md"
            >
              { parsedData.instructions }
            </p>
          </section>
          <div className="flex justify-center">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ ingredientList.length !== parsedData.ingredients.length }
              onClick={ handleDoneRecipe }
              className="finishBtn"
            >
              Finish Recipe
            </button>
          </div>
        </div>
      )
  );
}
export default RecipeInProgress;
