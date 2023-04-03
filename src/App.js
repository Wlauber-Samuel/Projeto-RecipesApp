import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import LoginProvider from './context/LoginProvider';
import Meals from './pages/Meals';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Meals } />
        </Switch>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
