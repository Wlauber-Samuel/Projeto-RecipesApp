import { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RecipeCard from '../components/RecipeCard';
import fetchApi from '../helpers/fetchApi';
import useFetchRecipes from '../helpers/useFetchRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SearchBarContext } from '../context/SearchBarProvider';

export default function Recipes() {
  const { data, setData } = useContext(SearchBarContext);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(null);
  const history = useHistory();
  const { pathname } = history.location;

  useFetchRecipes(category, setData);
  useEffect(() => {
    if (category) setCategory('');
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
    <>
      <Header
        title={
          pathname === '/meals' ? 'Meals' : 'Drinks'
        }
      />
      <div className="recipes">
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
        { data?.map((recipe, index) => (
          <RecipeCard
            key={ index }
            name={ recipe[pathname === '/meals' ? 'strMeal' : 'strDrink'] || '' }
            index={ index }
            testID={ `${index}-card-img` }
            testID2={ `${index}-card-name` }
            thumb={
              recipe[pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb'] || ''
            }
            url={ `${pathname}/${recipe[pathname === '/meals' ? 'idMeal' : 'idDrink']}` }
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
