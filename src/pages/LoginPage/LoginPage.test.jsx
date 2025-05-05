import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Add this line
import { toast } from 'react-toastify';


import LoginPage from "./LoginPage";


jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
      success: jest.fn(),
      error: jest.fn(),
    },
  }));
  

// Mock AuthContext as before
jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe("LoginPage", () => {
  const mockNavigate = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    // Mock return values
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    require('../../context/AuthContext').useAuth.mockReturnValue({
      login: mockLogin,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form', () => {
    render(<LoginPage />);
    expect(screen.getByText('Enter login credentials:')).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });
  it('navigates to dashboard on successful login', async () => {
    mockLogin.mockResolvedValue({ success: true });
    render(<LoginPage />);
    
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByTestId('login-form'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows error toast on failed login', async () => {
    mockLogin.mockResolvedValue({ success: false, error: 'Invalid credentials' });
    render(<LoginPage />);
    
    fireEvent.submit(screen.getByTestId('login-form'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Login failed. Invalid credentials');
    });
  });
});