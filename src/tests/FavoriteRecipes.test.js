import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa a página de receitas favoritas', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '15997', type: 'drink', nationality: '', category: 'Ordinary Drink', alcoholicOrNot: 'Optional alcohol', name: 'GG', image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg' }, { id: '52977', type: 'meal', nationality: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' }]));

    render(
      <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
        <App />
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('', () => {
    const ButtonAll = screen.getByTestId('filter-by-all-btn');
    const foodButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    expect(ButtonAll).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });

  it('', async () => {
    const favotiteButtons = await screen.findAllByTestId(/horizontal-favorite-btn$/);
    expect(favotiteButtons).toHaveLength(2);
  });

  it('', async () => {
    const favotiteButtons = await screen.findAllByTestId(/horizontal-favorite-btn$/);
    expect(favotiteButtons).toHaveLength(2);
    const firstRecipe = (await screen.findByTestId(/0-horizontal-name$/)).textContent;

    userEvent.click(favotiteButtons[0]);
    await waitFor(() => {
      const removedRecipe = screen.queryByText(firstRecipe);
      expect(removedRecipe).not.toBeInTheDocument();
      const newFavoriteButtons = screen.queryAllByTestId(/horizontal-favorite-btn$/);
      expect(newFavoriteButtons).toHaveLength(1);
    });
  });

  it('Testa Botões food, drinks e All', async () => {
    const foodButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    const allButton = screen.getByTestId('filter-by-all-btn');
    const initialFavorites = screen.getAllByTestId(/horizontal-name$/);
    expect(initialFavorites).toHaveLength(2);

    expect(screen.queryByText('GG')).toBeInTheDocument();
    expect(screen.queryByText('Corba')).toBeInTheDocument();

    userEvent.click(foodButton);

    const foodRecipes = screen.getAllByTestId(/horizontal-name$/);
    expect(foodRecipes).toHaveLength(1);
    expect(screen.queryByText('GG')).not.toBeInTheDocument();
    expect(screen.queryByText('Corba')).toBeInTheDocument();

    userEvent.click(drinkButton);

    const drinkRecipes = screen.getAllByTestId(/horizontal-name$/);
    expect(drinkRecipes).toHaveLength(1);
    expect(screen.queryByText('GG')).toBeInTheDocument();
    expect(screen.queryByText('Corba')).not.toBeInTheDocument();

    userEvent.click(allButton);

    const Recipes = screen.getAllByTestId(/horizontal-name$/);
    expect(Recipes).toHaveLength(2);
    expect(screen.queryByText('GG')).toBeInTheDocument();
    expect(screen.queryByText('Corba')).toBeInTheDocument();
  });
});
