import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const searchToggleTestId = 'search-top-btn';
const searchInputTestId = 'search-input';
const searchButtonTestId = 'exec-search-btn';
const ingredientRadioTestId = 'ingredient-search-radio';
const nameRadioTestId = 'name-search-radio';
const firstLetterTestId = 'first-letter-search-radio';
describe('', () => {
  beforeEach(async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('', () => {
    const searchToggle = screen.getByTestId(searchToggleTestId);
    userEvent.click(searchToggle);
    const ingredientRadio = screen.getByTestId(ingredientRadioTestId);
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const firstLetterRadio = screen.getByTestId(firstLetterTestId);
    const searchInput = screen.getByTestId(searchInputTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('', async () => {
    jest.spyOn(global, 'fetch');
    const searchToggle = screen.getByTestId(searchToggleTestId);
    userEvent.click(searchToggle);
    const ingredientRadio = screen.getByTestId(ingredientRadioTestId);
    const searchInput = screen.getByTestId(searchInputTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'garlic');
    userEvent.click(searchButton);

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=garlic');
    });

    const recipe = await screen.findByText('Baingan Bharta');
    expect(recipe).toBeInTheDocument();
    const oldRecipe = screen.queryByText('Big Mac');
    expect(oldRecipe).not.toBeInTheDocument();
  });

  it('', async () => {
    jest.spyOn(global, 'fetch');
    const searchToggle = screen.getByTestId(searchToggleTestId);
    userEvent.click(searchToggle);
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const searchInput = screen.getByTestId(searchInputTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'Spaghetti');
    userEvent.click(searchButton);

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Spaghetti');
    });

    const recipe = await screen.findByText('Spaghetti Bolognese');
    expect(recipe).toBeInTheDocument();
    const oldRecipe = screen.queryByText('Big Mac');
    expect(oldRecipe).not.toBeInTheDocument();
  });

  it('', async () => {
    jest.spyOn(global, 'fetch');
    const searchToggle = screen.getByTestId(searchToggleTestId);
    userEvent.click(searchToggle);
    const firstLetterRadio = screen.getByTestId(firstLetterTestId);
    const searchInput = screen.getByTestId(searchInputTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 't');
    userEvent.click(searchButton);

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=t');
    });

    const recipe = await screen.findByText('Teriyaki Chicken Casserole');
    expect(recipe).toBeInTheDocument();
    const oldRecipe = screen.queryByText('Big Mac');
    expect(oldRecipe).not.toBeInTheDocument();
  });

  it('', async () => {
    jest.spyOn(global, 'fetch');
    const searchToggle = screen.getByTestId(searchToggleTestId);
    userEvent.click(searchToggle);
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const searchInput = screen.getByTestId(searchInputTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'bubble');
    userEvent.click(searchButton);

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=bubble');
      expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52885');
    });

    const ingredient = await screen.findByText('Potatoes400g');
    expect(ingredient).toBeInTheDocument();
    const oldRecipe = screen.queryByText('Big Mac');
    expect(oldRecipe).not.toBeInTheDocument();
  });

  it('', async () => {
    jest.spyOn(global, 'fetch');
    jest.spyOn(global, 'alert').mockImplementation((x) => x);
    const searchToggle = screen.getByTestId(searchToggleTestId);
    userEvent.click(searchToggle);
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const searchInput = screen.getByTestId(searchInputTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'xablau');
    userEvent.click(searchButton);

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=xablau');
      expect(global.alert).toHaveBeenCalled();
    });
  });
});

describe('', () => {
  beforeEach(async () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('', () => {
    const searchToggle = screen.getByTestId(searchToggleTestId);
    userEvent.click(searchToggle);
    const ingredientRadio = screen.getByTestId(ingredientRadioTestId);
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const firstLetterRadio = screen.getByTestId(firstLetterTestId);
    const searchInput = screen.getByTestId(searchInputTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('', async () => {
    jest.spyOn(global, 'fetch');
    const searchToggle = screen.getByTestId(searchToggleTestId);
    userEvent.click(searchToggle);
    const ingredientRadio = screen.getByTestId(ingredientRadioTestId);
    const searchInput = screen.getByTestId(searchInputTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'Gin');
    userEvent.click(searchButton);

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin');
    });

    const recipe = await screen.findByText('Angel Face');
    expect(recipe).toBeInTheDocument();
    const oldRecipe = screen.queryByText('B-52');
    expect(oldRecipe).not.toBeInTheDocument();
  });

  it('', async () => {
    jest.spyOn(global, 'fetch');
    const searchToggle = screen.getByTestId(searchToggleTestId);
    userEvent.click(searchToggle);
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const searchInput = screen.getByTestId(searchInputTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'Gin');
    userEvent.click(searchButton);

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Gin');
    });

    const recipe = await screen.findByText('Gin Fizz');
    expect(recipe).toBeInTheDocument();
    const oldRecipe = screen.queryByText('B-52');
    expect(oldRecipe).not.toBeInTheDocument();
  });

  it('', async () => {
    jest.spyOn(global, 'fetch');
    const searchToggle = screen.getByTestId(searchToggleTestId);
    userEvent.click(searchToggle);
    const firstLetterRadio = screen.getByTestId(firstLetterTestId);
    const searchInput = screen.getByTestId(searchInputTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput, 'G');
    userEvent.click(searchButton);

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=G');
    });

    const recipe = await screen.findByText('Gin Fizz');
    expect(recipe).toBeInTheDocument();
    const oldRecipe = screen.queryByText('B-52');
    expect(oldRecipe).not.toBeInTheDocument();
  });

  it('', async () => {
    jest.spyOn(global, 'fetch');
    const searchToggle = screen.getByTestId(searchToggleTestId);
    userEvent.click(searchToggle);
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const searchInput = screen.getByTestId(searchInputTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'B-52');
    userEvent.click(searchButton);

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=B-52');
      expect(global.fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15853');
    });

    const ingredient = await screen.findByText('Kahlua1/4');
    expect(ingredient).toBeInTheDocument();
    const oldRecipe = screen.queryByText('GG');
    expect(oldRecipe).not.toBeInTheDocument();
  });

  it('', async () => {
    jest.spyOn(global, 'fetch');
    jest.spyOn(global, 'alert').mockImplementation((x) => x);
    const searchToggle = screen.getByTestId(searchToggleTestId);
    userEvent.click(searchToggle);
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const searchInput = screen.getByTestId(searchInputTestId);
    const searchButton = screen.getByTestId(searchButtonTestId);

    userEvent.click(nameRadio);
    userEvent.type(searchInput, 'xablau');
    userEvent.click(searchButton);

    await waitFor(async () => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau');
      expect(global.alert).toHaveBeenCalled();
    });
  });
});
