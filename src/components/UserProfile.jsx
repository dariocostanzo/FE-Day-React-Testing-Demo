import React, { useState } from "react";
import axios from "axios";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bgColor, setBgColor] = useState("#4338ca"); // default blue

    // Sync App background and button backgrounds
    React.useEffect(() => {
        const appEl = document.querySelector(".App");
        if (appEl) appEl.style.backgroundColor = bgColor;
    }, [bgColor]);

    const handleToggleBackground = () => {
        setBgColor((prev) => (prev === "#4338ca" ? "#000000" : "#4338ca"));
    };

    const fetchUser = async () => {
        setLoading(true);
        setError(null);
        setUser(null);

        try {
            const randomId = Math.floor(Math.random() * 1025) + 1;
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${randomId}`,
            );
            const data = response.data;
            console.log(data)
            setUser({
                name: data.name,
                weight: `${data.weight}g`,
                height: `${data.height}cm`,
                sprite: data.sprites?.front_default,
            });
        } catch (err) {
            setError("Failed to fetch user data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="user-profile-container"
            aria-labelledby="profile-title"
        >
            <h1 id="profile-title">Pokemon Profile</h1>
            <div className="fetch-pokemon-wrapper">
                <button
                    className="fetch-pokemon-button duplicate-class-button"
                    onClick={fetchUser}
                    disabled={loading}
                    aria-label={loading ? "Loading user data" : "Fetch pokemon data"}
                    data-testid="fetch-button"
                    style={{ backgroundColor: bgColor, color: "#fff" }}
                >
                    Fetch Pokemon
                </button>
                <button
                    className="change-background-button duplicate-class-button"
                    onClick={handleToggleBackground}
                    disabled={!user}
                    data-testid="toggle-bg-button"
                    aria-label={bgColor === "#4338ca" ? "Set background to black" : "Set background to blue"}
                    title={bgColor === "#4338ca" ? "Set background to black" : "Set background to blue"}
                    style={{ backgroundColor: bgColor, color: "#fff" }}
                >
                    {bgColor === "#4338ca" ? "Set Background Black" : "Set Background Blue"}
                </button>
            </div>

            <div aria-live="polite">
                {error && (
                    <div className="error-alert" role="alert">
                        {error}
                    </div>
                )}
            </div>
            <div className="user-info-wrapper" data-testid="user-info">
                {loading && (
                    <div
                        className="pokemon-spinner-container"
                        role="status"
                        aria-label="Loading pokemon"
                    >
                        <img
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"
                            alt="Loading..."
                            className="pokemon-spinner"
                        />
                    </div>
                )}
                {!user && !loading && !error && (
                    <div className="empty-state" role="status">
                        Click "Fetch Pokemon" to see profile details
                    </div>
                )}
                {user && (
                    <div
                        className="user-data-card"
                        data-testid="user-data"
                        role="region"
                        aria-label="Loaded user profile info"
                    >
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
                                <dt className="field-label">Height:</dt>
                                <dd className="field-value">{user.height}</dd>
                            </div>
                            <div className="user-field">
                                <dt className="field-label">Weight:</dt>
                                <dd className="field-value">{user.weight}</dd>
                            </div>
                        </dl>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UserProfile;
