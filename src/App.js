import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import LoginProvider from './context/LoginProvider';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Meals } />
          <Route path="/profile" component={ Profile } />
          <Route path="/drinks" component={ Drinks } />
        </Switch>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
