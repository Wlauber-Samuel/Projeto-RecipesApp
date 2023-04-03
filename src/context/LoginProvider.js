import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const foo = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    handleChange,
  }), [email, password]);

  return (
    <LoginContext.Provider value={ foo }>
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
