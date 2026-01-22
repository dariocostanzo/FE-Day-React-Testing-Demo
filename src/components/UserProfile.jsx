
import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        setLoading(true);
        setError(null);
        setUser(null);

        try {
            const randomId = Math.floor(Math.random() * 1025) + 1;
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const data = response.data;
            setUser({
                name: data.name,
                email: `${data.name}@pokeapi.co`,
                age: data.base_experience,
                sprite: data.sprites?.front_default,
            });
        } catch (err) {
            setError('Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="user-profile-container" aria-labelledby="profile-title">
            <h1 id="profile-title">Pokemon Profile</h1>
            <div className="fetch-pokemon-wrapper">
                {loading ? (
                    <div className="pokemon-spinner-container" role="status" aria-label="Loading pokemon">
                        <img
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"
                            alt="Loading..."
                            className="pokemon-spinner"
                        />
                    </div>
                ) : (
                    <button
                        className="fetch-pokemon-button"
                        onClick={fetchUser}
                        aria-label="Fetch pokemon data"
                    >
                        Fetch Pokemon
                    </button>
                )}
            </div>
            <div aria-live="polite">
                {error && <div className="error-alert" role="alert">{error}</div>}
            </div>
            <div className="user-info-wrapper" data-testid="user-info">
                {!user && !loading && !error && (
                    <div className="empty-state" role="status">
                        Click "Fetch Pokemon" to see profile details
                    </div>
                )}
                {user && (
                    <div className="user-data-card" data-testid="user-data" role="region" aria-label="Loaded user profile info">
                        {user.sprite && (
                            <img
                                src={user.sprite}
                                alt={`${user.name} sprite`}
                                className="pokemon-sprite"
                            />
                        )}
                        <dl>
                            <div className="user-field">
                                <dt className="field-label">Name:</dt>
                                <dd className="field-value">{user.name}</dd>
                            </div>
                            <div className="user-field">
                                <dt className="field-label">Email:</dt>
                                <dd className="field-value">
                                    <a href={`mailto:${user.email}`} className="email-link">{user.email}</a>
                                </dd>
                            </div>
                            <div className="user-field">
                                <dt className="field-label">Age:</dt>
                                <dd className="field-value">{user.age}</dd>
                            </div>
                        </dl>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UserProfile;
