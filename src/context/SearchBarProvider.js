import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const SearchBarContext = createContext();

function SearchBarProvider({ children }) {
  const [data, setData] = useState([]);
  const [radio, setRadio] = useState('');

  const handleChangeRadio = ({ target: { value } }) => {
    setRadio(value);
  };

  const foo = useMemo(
    () => ({ data, setData, radio, setRadio, handleChangeRadio,
    }),
    [data, radio],
  );

  return (
    <SearchBarContext.Provider value={ foo }>
      {children}
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchBarProvider;
