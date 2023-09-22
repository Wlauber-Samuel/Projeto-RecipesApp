import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import iconepesquisar from '../images/iconepesquiar.png';
import iconeperfil from '../images/iconeperfil.png';
import SearchBar from './SearchBar';
import './Header.css';
import header from '../images/header.png';

function Header({ title, image }) {
  const [search, setSearch] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="bg-[#FCDC36] flex h-14 px-4 py-8 justify-between items-center w-[100%]">
        <div className="flex items-center gap-3 justify-center">
          <img src={ header } alt="logo" className="logo" />
          <div>
            <span className="italic text-2xl text-[#41197F]">RECIPES</span>
            <span className="text-xl font-bold text-[#41197F]">app</span>
          </div>
        </div>
        <div className="flex gap-4">
          { (title === 'MEALS' || title === 'DRINKS')
      && (
        <button
          type="button"
          onClick={ () => setSearch(!search) }
          className="search-button"
        >
          <img src={ iconepesquisar } alt="drink" data-testid="search-top-btn" />
        </button>
      )}
          <button
            type="button"
            onClick={ () => history.push('/profile') }
            className="profile-button z-50"
            name="profile"
          >
            <img src={ iconeperfil } alt="drink" data-testid="profile-top-btn" />
          </button>
        </div>
      </div>
      <img
        src={ image }
        alt="imagem"
        className="w-9 pt-3"
      />
      <h1
        data-testid="page-title"
        className="text-2xl pb-1 text-[#41197F]"
      >
        {title}
      </h1>
      { search && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
