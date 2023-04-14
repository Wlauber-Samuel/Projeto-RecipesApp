import { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RecipeCard from '../components/RecipeCard';
import fetchApi from '../helpers/fetchApi';
import useFetchRecipes from '../helpers/useFetchRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SearchBarContext } from '../context/SearchBarProvider';
import beef from '../images/beef.png';
import chicken from '../images/chicken.png';
import dessert from '../images/dessert.png';
import goat from '../images/goat.png';
import breakfast from '../images/breakfast.png';
import All from '../images/All.png';
import drink from '../images/drink.png';
import cocktail from '../images/cocktail.png';
import shake from '../images/shake.png';
import other from '../images/other.png';
import cocoa from '../images/cocoa.png';
import All2 from '../images/All2.png';
import plate from '../images/plate.png';
import iconebebida from '../images/icone-bebida.png';

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
    if (pathname === '/meals') {
      fetchApi(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
        'meals',
      )
        .then((response) => response
          .slice(0, maxCategories)
          .map(({ strCategory }) => strCategory))
        .then(setCategories);
    }
    if (pathname === '/drinks') {
      fetchApi(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
        'drinks',
      )
        .then((response) => response
          .slice(0, maxCategories)
          .map(({ strCategory }) => strCategory))
        .then(setCategories);
    }
  }, [pathname]);

  const handleCategory = ({ target }) => {
    if (category === target.dataset.category || target.dataset.category === 'All') setCategory('');
    else setCategory(target.dataset.category);
    console.log(target.dataset.category);
  };

  const images = [
    {
      id: 1,
      src: beef,
      alt: 'beef',
    },
    {
      id: 2,
      src: breakfast,
      alt: 'breakfast',
    },
    {
      id: 3,
      src: chicken,
      alt: 'chicken',
    },
    {
      id: 4,
      src: dessert,
      alt: 'dessert',
    },
    {
      id: 5,
      src: goat,
      alt: 'goat',
    },
  ];

  const images2 = [
    {
      id: 1,
      src: drink,
      alt: 'drink',
    },
    {
      id: 2,
      src: cocktail,
      alt: 'cocktail',
    },
    {
      id: 3,
      src: shake,
      alt: 'shake',
    },
    {
      id: 4,
      src: other,
      alt: 'other',
    },
    {
      id: 5,
      src: cocoa,
      alt: 'cocoa',
    },
  ];

  return (
    <>
      <Header
        title={
          pathname === '/meals' ? 'MEALS' : 'DRINKS'
        }
        image={ pathname === '/meals' ? plate : iconebebida }
      />
      <div className="recipes">
        <div className="flex items-start py-3 justify-evenly px-3">
          {categories?.map((option, index) => (
            <button
              className=""
              key={ option }
              data-testid={ `${option}-category-filter` }
              onClick={ handleCategory }
            >
              { pathname === '/meals' ? (
                <img
                  data-category={ option }
                  src={ images[index].src }
                  alt={ images[index].alt }
                  className="w-[100%]"
                />
              ) : (<img
                data-category={ option }
                src={ images2[index].src }
                alt={ images2[index].alt }
                className="w-[100%]"
              />)}
            </button>
          ))}
          <button
            data-testid="All-category-filter"
            onClick={ handleCategory }
            className="p-0"
          >
            <img
              src={ pathname === '/meals' ? All : All2 }
              alt="All"
              className="w-[100%]
              "
            />
          </button>
        </div>
        <div className="flex flex-wrap px-2 mb-14">
          { data?.map((recipe, index) => (
            <RecipeCard
              key={ index }
              name={ recipe[pathname === '/meals' ? 'strMeal' : 'strDrink'] }
              index={ index }
              testID={ `${index}-card-img` }
              testID2={ `${index}-card-name` }
              thumb={
                recipe[pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb']
              }
              url={ `${pathname}/${recipe[pathname === '/meals' ? 'idMeal' : 'idDrink']}` }
              class1="w-[50%] no-underline"
              class2="flex flex-col justify-center items-center p-2 rounded-lg w-[100%]"
              class3="w-[100%] rounded-t-lg"
              class4="flex justify-center items-center text-center text-base text-black w-[100%] py-2 h-20 rounded-b-lg border border-gray-300 font-light"
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
