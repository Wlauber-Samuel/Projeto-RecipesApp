import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../context/LoginProvider';

function Login() {
  const { email, password, handleChange } = useContext(LoginContext);
  const REGEX_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const MIN_PASSWORD = 7;
  const history = useHistory();

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div>
      <h1>App Receitas</h1>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        value={ email }
        placeholder="Digite um e-mail valido"
        onChange={ handleChange }
        data-testid="email-input"
      />
      <input
        type="password"
        name="password"
        value={ password }
        placeholder="******"
        onChange={ handleChange }
        data-testid="password-input"
      />
      <button
        type="button"
        name="button"
        data-testid="login-submit-btn"
        disabled={
          password.length < MIN_PASSWORD || !REGEX_EMAIL.test(email)
        }
        onClick={ handleSubmit }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
