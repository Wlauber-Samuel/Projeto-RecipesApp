import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Favorite from '../components/Favorite';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import Grupo10 from '../images/balalala.png';
import foods from '../images/foods.png';
import drinks from '../images/drinks.png';
import All3 from '../images/All3.png';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes') || '[]'),
  );

  const handleClickMeals = () => {
    const meals = doneRecipes.filter((recipe) => recipe.type === 'meal');
    setDoneRecipes(meals);
  };

  const handleClickDrinks = () => {
    const drinks = doneRecipes.filter((recipe) => recipe.type === 'drink');
    setDoneRecipes(drinks);
  };

  const handleClickAll = () => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  };

  return (
    <div>
      <Header title="DONE RECIPES" image={ Grupo10 } />
      <div className="container-map">
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ handleClickMeals }
        >
          <img
            src={ foods }
            alt="compartilhar"
            data-testid="favorite-btn"
          />
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ handleClickDrinks }
        >
          <img
            src={ drinks }
            alt="compartilhar"
            data-testid="favorite-btn"
          />
        </button>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleClickAll }
        >
          <img
            src={ All3 }
            alt="compartilhar"
            data-testid="favorite-btn"
          />
        </button>
        {
          doneRecipes?.map((recipe, index) => (
            <div key={ index }>
              <RecipeCard
                testID={ `${index}-horizontal-image` }
                testID2={ `${index}-horizontal-name` }
                key={ index }
                name={ recipe.name }
                index={ index }
                thumb={ recipe.image }
                url={ `/${recipe.type}s/${recipe.id}` }
                class1="w-[50%] no-underline"
                class2="flex flex-col justify-center items-center p-2 rounded-lg w-[100%]"
                class3="w-[42%] rounded-t-lg"
                class4="flex justify-center items-center text-center text-base text-black w-[42%] py-2 h-20 rounded-b-lg border border-gray-300 font-light"
              />
              <section data-testid={ `${index}-horizontal-top-text` }>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.nationality}
                  {' - '}
                  { recipe.category }
                </p>
                <p>{recipe.alcoholicOrNot}</p>
                <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
              </section>
              <Favorite
                testId1={ `${index}-horizontal-favorite-btn` }
                testId2={ `${index}-horizontal-share-btn` }
                recipeId={ recipe.id }
                recipeType={ recipe.type }
                recipeState={ setDoneRecipes }
                className="absolute"
              />
              {recipe.tags.map((tag, index2) => (
                <p
                  key={ index2 }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              ))}
            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
