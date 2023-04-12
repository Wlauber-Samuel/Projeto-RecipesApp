import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Favorite from '../components/Favorite';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

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
      <Header title="Done Recipes" />
      <div className="container-map">
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ handleClickMeals }
        >
          <img
            src={ mealIcon }
            alt="compartilhar"
            data-testid="favorite-btn"
          />
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ handleClickDrinks }
        >
          <img
            src={ drinkIcon }
            alt="compartilhar"
            data-testid="favorite-btn"
          />
          Drinks
        </button>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleClickAll }
        >
          All
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
