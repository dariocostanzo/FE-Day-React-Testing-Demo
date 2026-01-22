import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserProfile from '../UserProfile';
import axios from 'axios';

jest.mock('axios');

describe('UserProfile - Test 1 (BROKEN)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should show user data on click', async () => {
        axios.get.mockResolvedValue({
            data: { name: 'John Doe', email: 'john@example.com', age: 30 }
        }); // Mock out the request

        render(<UserProfile />); // Render the component

        const fetchButton = screen.getByRole('button', { name: /fetch user/i });
        fireEvent.click(fetchButton); // Click the button

        await waitFor(() => { // Wait for expect to be true with a delay
            expect(screen.getByTestId('user-info')).toBeInTheDocument();
            // expect(screen.getByTestId('user-data')).toBeInTheDocument();
        });
    });
});
