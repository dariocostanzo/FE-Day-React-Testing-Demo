import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('axios');

describe('TypeScript casting false positive', () => {
    it('❌ False Positive - casting bypasses type safety', () => {
        // @ts-expect-error: purposely casting incomplete object
        const mockUser = { name: 'MissingFields' } as any; // Missing required fields
        // Simulate rendering the card with incomplete data
        render(
            <div className="user-data-card" data-testid="user-data" role="region" aria-label="Loaded user profile info">
                <dl>
                    <div className="user-field">
                        <dt className="field-label">Name:</dt>
                        <dd className="field-value">{mockUser.name}</dd>
                    </div>
                </dl>
            </div>
        );
        // Test passes but component might crash in production
        expect(screen.getByText('MissingFields')).toBeInTheDocument();
    });

    it('✅ Correct - all required fields present', () => {
        const mockUser = {
            name: 'Pikachu',
            email: 'pikachu@pokeapi.co',
            age: 25,
            sprite: 'file.png',
        };
        render(
            <div className="user-data-card" data-testid="user-data" role="region" aria-label="Loaded user profile info">
                <img src={mockUser.sprite} alt={`${mockUser.name} sprite`} className="pokemon-sprite" />
                <dl>
                    <div className="user-field">
                        <dt className="field-label">Name:</dt>
                        <dd className="field-value">{mockUser.name}</dd>
                    </div>
                    <div className="user-field">
                        <dt className="field-label">Email:</dt>
                        <dd className="field-value">
                            <a href={`mailto:${mockUser.email}`} className="email-link">{mockUser.email}</a>
                        </dd>
                    </div>
                    <div className="user-field">
                        <dt className="field-label">Age:</dt>
                        <dd className="field-value">{mockUser.age}</dd>
                    </div>
                </dl>
            </div>
        );
        expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });
});
