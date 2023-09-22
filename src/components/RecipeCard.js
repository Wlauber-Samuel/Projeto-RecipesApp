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
  class1,
  class2,
  class3,
  class4,
}) {
  return (
    <Link to={ url } className={ class1 }>
      <section data-testid={ `${index}-recipe-card` } className={ class2 }>
        <img
          data-testid={ testID }
          src={ thumb }
          alt={ name }
          className={ class3 }
        />
        <h2 data-testid={ testID2 } className={ class4 }>{name}</h2>
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
