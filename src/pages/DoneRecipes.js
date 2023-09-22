import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Favorite from '../components/Favorite';
import Grupo10 from '../images/balalala.png';
import foods from '../images/foods.png';
import drinkss from '../images/drinks.png';
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
    <div className="mb-16">
      <Header title="DONE RECIPES" image={ Grupo10 } />
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center gap-3">
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
              src={ drinkss }
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
        </div>
        <div className="flex flex-wrap w-[98%] my-3 gap-2">
          {
            doneRecipes?.map((recipe, index) => (
              <div key={ index } className="border-2 border-gray-300 rounded-lg">
                <div className="flex gap-2">
                  <RecipeCard
                    testID={ `${index}-horizontal-image` }
                    testID2={ `${index}-horizontal-name` }
                    key={ index }
                    name={ recipe.name }
                    index={ index }
                    thumb={ recipe.image }
                    url={ `/${recipe.type}s/${recipe.id}` }
                    class1="w-[42%] no-underline flex flex-col"
                    class2="flex flex-col justify-center items-center rounded-lg w-[100%]"
                    class3="w-[100%] rounded-tl-md"
                    class4="flex justify-center items-center text-center text-lg font-bold text-white w-[100%] py-2 h-20 bg-[#41197F] rounded-bl-md m-0"

                  />
                  <div className="flex flex-col justify-between p-2 items-end w-[55%]">
                    <section
                      data-testid={ `${index}-horizontal-top-text` }
                      className="w-full"
                    >
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        {recipe.nationality}
                        {' - '}
                        { recipe.category }
                      </p>
                      <p>{recipe.alcoholicOrNot}</p>
                      <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
                      {recipe.tags.map((tag, index2) => (
                        <p
                          key={ index2 }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                          className="bg-purple-300 w-fit rounded-full px-3"
                        >
                          {tag}
                        </p>
                      ))}
                    </section>
                    <Favorite
                      testId1={ `${index}-horizontal-favorite-btn` }
                      testId2={ `${index}-horizontal-share-btn` }
                      recipeId={ recipe.id }
                      recipeType={ recipe.type }
                      recipeState={ setDoneRecipes }
                    />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
