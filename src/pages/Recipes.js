import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RecipeCard from '../components/RecipeCard';
import fetchApi from '../helpers/fetchApi';
import useFetchRecipes from '../helpers/useFetchRecipes';

export default function Recipes() {
  const [category, setCategory] = useState('');
  const [catalog, setCatalog] = useState(null);
  const [categories, setCategories] = useState(null);
  const history = useHistory();
  const { pathname } = history.location;

  useFetchRecipes(category, setCatalog);
  useEffect(() => {
    const maxCategories = 5;
    switch (pathname) {
    case '/meals': {
      fetchApi(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
        'meals',
      )
        .then((response) => response
          .slice(0, maxCategories)
          .map(({ strCategory }) => strCategory))
        .then(setCategories);
      break;
    }
    case '/drinks': {
      fetchApi(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
        'drinks',
      )
        .then((response) => response
          .slice(0, maxCategories)
          .map(({ strCategory }) => strCategory))
        .then(setCategories);
      break;
    }
    default:
      break;
    }
  }, [pathname]);

  const handleCategory = ({ target }) => {
    if (category === target.textContent || target.textContent === 'All') setCategory('');
    else setCategory(target.textContent);
  };

  return (
    <div>
      {categories?.map((option) => (
        <Button
          variant="light"
          key={ option }
          data-testid={ `${option}-category-filter` }
          onClick={ handleCategory }
        >
          {option}
        </Button>
      ))}
      <Button
        variant="light"
        data-testid="All-category-filter"
        onClick={ handleCategory }
      >
        All
      </Button>
      {catalog?.map((recipe, index) => (
        <RecipeCard
          key={ recipe[pathname === '/meals' ? 'strMeal' : 'strDrink'] }
          name={ recipe[pathname === '/meals' ? 'strMeal' : 'strDrink'] }
          index={ index }
          thumb={
            recipe[pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb']
          }
          url={ `${pathname}/${recipe[pathname === '/meals' ? 'idMeal' : 'idDrink']}` }
        />
      ))}
    </div>
  );
}
