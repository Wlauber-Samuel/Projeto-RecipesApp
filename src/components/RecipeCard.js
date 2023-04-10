import { number, string } from 'prop-types';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default function RecipeCard({
  name = '',
  thumb = '',
  index,
  url,
  testID,
  testID2,
}) {
  return (
    <Link to={ url }>
      <section data-testid={ `${index}-recipe-card` } className="recipe-card">
        <img
          data-testid={ testID }
          src={ thumb }
          alt={ name }
          className="image-card"
        />
        <h2 data-testid={ testID2 }>{name}</h2>
      </section>
    </Link>
  );
}

RecipeCard.propTypes = {
  name: string,
  thumb: string,
  index: number.isRequired,
  url: string.isRequired,
  testID: string.isRequired,
  testID2: string.isRequired,
};
