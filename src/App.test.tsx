import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders navigation links', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
    const homeLink = screen.getByText(/Home/i);
    const newOrderLink = screen.getByText(/New Order/i);
    expect(homeLink).toBeInTheDocument();
    expect(newOrderLink).toBeInTheDocument();
});

test('navigates to New Order page', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
    const newOrderLink = screen.getByText(/New Order/i);
    fireEvent.click(newOrderLink);
    const newOrderHeading = screen.getByText(/New Order/i);
    expect(newOrderHeading).toBeInTheDocument();
});
