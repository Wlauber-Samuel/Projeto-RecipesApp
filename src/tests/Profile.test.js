import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Testes para o componente Footer', () => {
  test('Teste se o footer contém os 3 ícones e 3 textos', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const profileBtn = 'profile-top-btn';
    userEvent.type(screen.getByTestId('email-input'), 'email@teste.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    userEvent.click(screen.getByTestId(profileBtn));
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('email@teste.com')).toBeInTheDocument();
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('profile-done-btn'));
    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
    userEvent.click(screen.getByTestId(profileBtn));
    userEvent.click(screen.getByText('Favorite Recipes'));
    expect(screen.getByText('Favorite Recipes')).toBeInTheDocument();
    userEvent.click(screen.getByTestId(profileBtn));
    userEvent.click(screen.getByTestId('profile-logout-btn'));
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });
});
