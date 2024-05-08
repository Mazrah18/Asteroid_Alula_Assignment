import React, { useState } from 'react';
import AsteroidForm from './components/AsteroidForm';
import AsteroidDetails from './components/AsteroidDetails';

function App() {
  const [asteroids, setAsteroids] = useState([]);
  const [error, setError] = useState('');

  return (
    <div className="App">
      <AsteroidForm setAsteroids={setAsteroids} setError={setError} />
      {error && <p>{error}</p>}
      <br />  
      <AsteroidDetails asteroids={asteroids} />
    </div>
  );
}

export default App;
