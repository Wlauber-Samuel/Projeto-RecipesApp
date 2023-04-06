import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
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
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('search-top-btn'));
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('profile-top-btn'));
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
