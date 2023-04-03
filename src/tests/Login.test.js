import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes para a pagina de Login', () => {
  beforeEach(() => {
    render(<App />);
  });
  test('', () => {
    const button = screen.getByTestId('login-submit-btn');
    expect(screen.getByText(/App Receitas/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    userEvent.type(screen.getByTestId('email-input'), 'email@teste.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    expect(button).toBeEnabled();
  });
});
