import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import doneRecipes from './pages/DoneRecipes';
import favoriteRecipes from './pages/FavoriteRecipes';
import './App.css';

function App() {
  return (
    <div className="main-container">
      <BrowserRouter>
        <LoginProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path={ ['/meals', '/drinks'] } component={ Recipes } />
            <Route path="/profile" component={ Profile } />
            <Route path="/done-recipes" component={ doneRecipes } />
            <Route path="/favorite-recipes" component={ favoriteRecipes } />
          </Switch>
        </LoginProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
