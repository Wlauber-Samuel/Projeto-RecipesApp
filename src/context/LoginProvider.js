import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
    console.log('localStorage', localStorage.getItem('user'));
  };

  const foo = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    handleChange,
    handleSubmit,
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
