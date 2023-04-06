import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import Favorite from '../components/Favorite';
import './FavoriteRecipes.css';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')),
  );

  const handleClickMeals = () => {
    const meals = favoriteRecipes.filter((recipe) => recipe.type === 'meal');
    setFavoriteRecipes(meals);
  };

  const handleClickDrinks = () => {
    const drinks = favoriteRecipes.filter((recipe) => recipe.type === 'drink');
    setFavoriteRecipes(drinks);
  };

  const handleClickAll = () => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
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
          favoriteRecipes?.map((recipe, index) => (
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
              </section>
              <Favorite
                testId1={ `${index}-horizontal-favorite-btn` }
                testId2={ `${index}-horizontal-share-btn` }
                recipeId={ recipe.id }
                recipeType={ recipe.type }
                recipeState={ setFavoriteRecipes }
              />
            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}
export default FavoriteRecipes;
