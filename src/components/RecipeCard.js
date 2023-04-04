import { number, string } from 'prop-types';
import { Link } from 'react-router-dom';

export default function RecipeCard({ name, thumb, index, url }) {
  return (
    <Link to={ url }>
      <section data-testid={ `${index}-recipe-card` }>
        <img data-testid={ `${index}-card-img` } src={ thumb } alt={ name } />
        <h2 data-testid={ `${index}-card-name` }>{name}</h2>
      </section>
    </Link>
  );
}

RecipeCard.propTypes = {
  name: string.isRequired,
  thumb: string.isRequired,
  index: number.isRequired,
  url: string.isRequired,
};
