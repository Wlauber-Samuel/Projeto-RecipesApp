// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
// describe('', () => {
//   it('', async () => {
//     render(<App />);
//     const emailInput = screen.getByTestId('email-input');
//     const passwordInput = screen.getByTestId('password-input');
//     const submitButton = screen.getByTestId('login-submit-btn');
//     userEvent.type(emailInput, 'trybe@trybe.com');
//     userEvent.type(passwordInput, '1234567');
//     userEvent.click(submitButton);

//     const recipes = await screen.findAllByTestId(/-card$/);
//     expect(recipes).toHaveLength(12);

//     const categories = await screen.findAllByTestId(/-category-filter$/);
//     expect(categories).toHaveLength(6);
//   });
// });

describe('', () => {
  beforeEach(async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
  });

  it('', async () => {
    await waitFor(async () => {
      const categories = await screen.findAllByTestId(/-category-filter$/);
      expect(categories).toHaveLength(6);
      expect(categories[0]).toHaveTextContent('Beef');
      expect(categories[5]).toHaveTextContent('All');
    });
  });

  it('', async () => {
    const recipes = await screen.findAllByTestId(/-recipe-card$/);
    expect(recipes).toHaveLength(12);
    expect(recipes[0]).toHaveTextContent('Corba');
    expect(recipes[11]).toHaveTextContent('Big Mac');
  });

  it('', async () => {
    const beefCategory = await screen.findByTestId(/Beef-category-filter/);
    userEvent.click(beefCategory);
    await waitFor(async () => {
      const newRecipes = await screen.findAllByTestId(/-recipe-card/);
      expect(newRecipes[0]).toHaveTextContent('Beef and Mustard Pie');
    });
    let oldRecipe = screen.queryByText('Corba');
    expect(oldRecipe).not.toBeInTheDocument();

    const allCategory = screen.getByTestId('All-category-filter');
    userEvent.click(allCategory);
    await waitFor(async () => {
      const newRecipes = await screen.findAllByTestId(/-recipe-card/);
      expect(newRecipes[0]).toHaveTextContent('Corba');
    });
    oldRecipe = screen.queryByText('Beef and Mustard Pie');
    expect(oldRecipe).not.toBeInTheDocument();
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

  it('', async () => {
    await waitFor(async () => {
      const categories = await screen.findAllByTestId(/-category-filter$/);
      expect(categories).toHaveLength(6);
      expect(categories[0]).toHaveTextContent('Ordinary Drink');
      expect(categories[5]).toHaveTextContent('All');
    });
  });

  it('', async () => {
    const recipes = await screen.findAllByTestId(/-recipe-card$/);
    expect(recipes).toHaveLength(12);
    expect(recipes[0]).toHaveTextContent('GG');
    expect(recipes[11]).toHaveTextContent('B-52');
  });

  it('', async () => {
    const ordinaryCategory = await screen.findByTestId(/Ordinary Drink-category-filter/);
    userEvent.click(ordinaryCategory);
    await waitFor(async () => {
      const newRecipes = await screen.findAllByTestId(/-recipe-card/);
      expect(newRecipes[0]).toHaveTextContent('3-Mile Long Island Iced Tea');
    });
    let oldRecipe = screen.queryByText('GG');
    expect(oldRecipe).not.toBeInTheDocument();

    const allCategory = screen.getByTestId('All-category-filter');
    userEvent.click(allCategory);
    await waitFor(async () => {
      const newRecipes = await screen.findAllByTestId(/-recipe-card/);
      expect(newRecipes[0]).toHaveTextContent('GG');
    });
    oldRecipe = screen.queryByText('3-Mile Long Island Iced Tea');
    expect(oldRecipe).not.toBeInTheDocument();
  });
});
