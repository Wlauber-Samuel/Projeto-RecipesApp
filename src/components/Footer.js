import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  return (
    <div data-testid="footer" className="footer">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drinkIcon } alt="drink" data-testid="drinks-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/meals') }
      >
        <img src={ mealIcon } alt="drink" data-testid="meals-bottom-btn" />
      </button>
    </div>
  );
}

export default Footer;
