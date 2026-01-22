import UserProfile from './components/UserProfile';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>FE Day React Testing Demo</h1>
            </header>

            <main className="App-main">
                <UserProfile />
            </main>

            <footer className="App-footer">
            </footer>
        </div>
    );
}

export default App;
