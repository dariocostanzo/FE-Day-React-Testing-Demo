import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserProfile from '../UserProfile';
import axios from 'axios';

jest.mock('axios');

describe('UserProfile - Test 3 (BROKEN)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('pikachu email should be displayed after fetch', async () => {
        // Mock a successful API response
        axios.get.mockResolvedValue({
            data: {
                name: 'pikachu',
                email: 'pikachu@pokemon.com',
                age: 25,
            },
        });

        render(<UserProfile />);

        const fetchButton = screen.getByRole('button', { name: /fetch pokemon/i });
        fireEvent.click(fetchButton);

        // Test completes before waitFor runs the assertion
        waitFor(() => {
            // This assertion should fail (wrong email), but test passes anyway
            expect(screen.getByText(/email: wrongemail@test.com/i)).toBeInTheDocument();
        });
    });
});

