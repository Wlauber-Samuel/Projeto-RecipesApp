import React, { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';

function RecipeDetails() {
  const { id } = useParams();

  const [fetchId, setFetchId] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    const fetchIdAPI = async () => {
      switch (pathname) {
      case `/meals/${id}`: {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        console.log(data);

        setFetchId(data.meals);
        break;
      }
      case `/drinks/${id}`: {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        console.log(data);

        setFetchId(data.drinks);
        break;
      }
      default:
        break;
      }
    };
    fetchIdAPI();
  }, [id, pathname]);

  return (
    <div>
      <Header title="Recipe Details" />
      <div>
        {
          fetchId?.map((food, index) => (
            <div key={ index }>
              <img
                data-testid="recipe-photo"
                src={ food.strMealThumb }
                alt="food"
              />
              <h1
                data-testid="recipe-title"
              >
                { food.strMeal }
              </h1>
              <p
                data-testid="recipe-category"
              >
                { food.strCategory }
              </p>
              {/* <p data-testid={ `${index}-ingredient-name-and-measure` }>
                { food.strIngredient1 }
              </p> */}
              <p
                data-testid="instructions"
              >
                { food.strInstructions }
              </p>

            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default RecipeDetails;
