import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetchApi from './fetchApi';

export default function useFetchRecipes(category, setCatalog) {
  const maxRecipes = 12;
  const {
    location: { pathname },
  } = useHistory();
  const sliceRecipes = useCallback(
    (recipes) => recipes?.slice(0, maxRecipes),
    [],
  );
  useEffect(() => {
    switch (pathname) {
    case '/meals': {
      const url = category
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      fetchApi(url, 'meals').then(sliceRecipes).then(setCatalog);
      break;
    }
    case '/drinks': {
      const url = category
        ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      fetchApi(url, 'drinks').then(sliceRecipes).then(setCatalog);
      break;
    }
    default:
      break;
    }
  }, [category, pathname]);
}
