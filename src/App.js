import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginProvider from './context/LoginProvider';
import SearchBarProvider from './context/SearchBarProvider';
import doneRecipes from './pages/DoneRecipes';
import favoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Recipes from './pages/Recipes';

function App() {
  return (
    <SearchBarProvider>
      <LoginProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path={ ['/meals', '/drinks'] } component={ Recipes } />
          <Route
            exact
            path={ ['/meals/:id/in-progress', '/drinks/:id/in-progress'] }
            component={ RecipeInProgress }
          />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ doneRecipes } />
          <Route path="/favorite-recipes" component={ favoriteRecipes } />
          <Route path={ ['/meals/:id', '/drinks/:id'] } component={ RecipeDetails } />
          <Route path="" component={ RecipeDetails } />
        </Switch>
      </LoginProvider>
    </SearchBarProvider>
  );
}

export default App;
