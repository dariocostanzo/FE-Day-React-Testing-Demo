import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserProfile from '../UserProfile';
import axios from 'axios';

jest.mock('axios');

describe('UserProfile - Test 1', () => {
    it('should show user data on click', async () => {
        axios.get.mockResolvedValue({
            data: { name: 'PokeJohnDoe', height: 123, weight: 30 }
        }); // Mock out the request

        render(<UserProfile />); // Render the component

        const fetchButton = screen.getByRole("button", {
            name: /fetch pokemon/i,
        });
        fireEvent.click(fetchButton);

        await waitFor(() => { // Wait for expect to be true with a delay
            expect(screen.getByTestId('user-info')).toBeInTheDocument();
        });
    });
});
