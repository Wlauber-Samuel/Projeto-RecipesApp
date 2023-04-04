import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

function Header({ title }) {
  const [search, setSearch] = useState(false);
  const history = useHistory();

  return (
    <div className="header">
      <div className="header-buttons">
        { (title === 'Meals' || title === 'Drinks')
      && (
        <button
          type="button"
          onClick={ () => setSearch(!search) }
          className="search-button"
        >
          <img src={ searchIcon } alt="drink" data-testid="search-top-btn" />
        </button>
      )}
        <button
          type="button"
          onClick={ () => history.push('/profile') }
          className="profile-button"
          name="profile"
        >
          <img src={ profileIcon } alt="drink" data-testid="profile-top-btn" />
        </button>
      </div>
      <h1 data-testid="page-title">{title}</h1>
      { search && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
