import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import HomePage from './HomePage';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HomePage', () => {
    test('renders Order List heading', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        render(<HomePage />);

        expect(screen.getByText('Order List')).toBeInTheDocument();
    });

    test('renders orders and handles delete', async () => {
        const orders = [
            { id: 1, firstName: 'John', lastName: 'Doe', description: 'Item 1', quantity: 1 },
            { id: 2, firstName: 'Jane', lastName: 'Doe', description: 'Item 2', quantity: 2 }
        ];
        mockedAxios.get.mockResolvedValueOnce({ data: orders });
        mockedAxios.delete.mockResolvedValueOnce({});

        render(<HomePage />);

        expect(await screen.findByText('John Doe - Item 1 (1)')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe - Item 2 (2)')).toBeInTheDocument();

        fireEvent.click(screen.getAllByText('Delete')[0]);

        expect(await screen.queryByText('John Doe - Item 1 (1)')).not.toBeInTheDocument();
    });
});
