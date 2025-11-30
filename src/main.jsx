import { useState, useEffect } from 'react';
import './App.css';
import logo from '/src/img/logosimp-removebg-preview.png';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const characterIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    Promise.all(
      characterIds.map(id =>
        fetch(`https://thesimpsonsapi.com/api/characters/${id}`).then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
      )
    )
      .then(dataArray => {
        setCharacters(dataArray);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
    <div>
      <img src={logo} alt="The Simpsons App Logo" className="app-logo" />
      <div className="simpsons-data">
        {loading && <p>Loading Springfield citizens...</p>}
        {error && <p>Error: {error}</p>}
        {characters.length > 0 && (
          <div className="cards-grid">
            {characters.map(character => (
              <div key={character.id} className="card">
                <img
                  className="character-image"
                  src={`https://cdn.thesimpsonsapi.com/500${character.portrait_path}`}
                  alt={character.name}
                  width="150"
                  height="150"
                />
                <h3 className="character-name">{character.name}</h3>
                <p className="character-occupation">{character.occupation}</p>
                <div className="info-row">
                  <span className="age-badge">Age: {character.age}</span>
                  <span className="status-badge">{character.status}</span>
                </div>
                <p className="character-quote">{character.description ? `"${character.description}"` : ""}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default App;
