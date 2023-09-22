import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../context/LoginProvider';
import login from '../images/login.jpeg';

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
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={ login } alt="login" className="fixed top-0 h-[70%] w-screen" />
      <div className="flex flex-col pb-1 justify-center text-center gap-1 items-center fixed bottom-10">
        <h2 className="text-[#41197F] text-xl italic">Login</h2>
        <input
          type="email"
          name="email"
          value={ email }
          placeholder="Email"
          onChange={ handleChange }
          data-testid="email-input"
          className="p-1 rounded-lg border-[1px] text-[#41197F] border-[#41197F] text-sm w-[260px]"
        />
        <input
          type="password"
          name="password"
          value={ password }
          placeholder="Password"
          onChange={ handleChange }
          data-testid="password-input"
          className="p-1 rounded-lg border-[1px] text-[#41197F] border-[#41197F] text-sm w-[260px]"
        />
        <button
          type="button"
          name="button"
          data-testid="login-submit-btn"
          disabled={
            password.length < MIN_PASSWORD || !REGEX_EMAIL.test(email)
          }
          onClick={ handleSubmit }
          className="bg-[#FCC436] text-white p-1 rounded-lg font-semibold w-[260px]"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
