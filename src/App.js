import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path={ ['/meals', '/drinks'] } component={ Recipes } />
          <Route path="/profile" component={ Profile } />
        </Switch>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
