import React from 'react';
import { useHistory } from 'react-router-dom';
import iconeprato from '../images/icone-prato.png';
import iconebebida from '../images/icone-bebida.png';
import './Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <div data-testid="footer" className="bg-[#41197F] fixed bottom-0 w-screen flex justify-between h-[60px] px-3">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img
          src={ iconebebida }
          alt="drink"
          data-testid="drinks-bottom-btn"
          className="fill-[#FCDC36]"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/meals') }
      >
        <img src={ iconeprato } alt="drink" data-testid="meals-bottom-btn" />
      </button>
    </div>
  );
}

export default Footer;
