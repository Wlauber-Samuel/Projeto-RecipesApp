import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import App from '../App';

describe('Testes para o componente Footer', () => {
  test('Teste se o footer contém os 3 ícones e 3 textos', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    userEvent.type(screen.getByTestId('email-input'), 'email@teste.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    const drinks = screen.getByTestId('drinks-bottom-btn');
    const meals = screen.getByTestId('meals-bottom-btn');
    const footer = screen.getByTestId('footer');
    userEvent.click(screen.getByTestId('meals-bottom-btn'));
    expect(drinks).toBeInTheDocument();
    expect(meals).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
  });
});
