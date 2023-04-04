import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const SearchBarContext = createContext();

function SearchBarProvider({ children }) {
  const [data, setData] = useState([]);

  const foo = useMemo(
    () => ({ data, setData,
    }),
    [data],
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
