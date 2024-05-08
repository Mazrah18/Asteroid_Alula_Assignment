
function AsteroidDetails({ asteroids, error }) {
    return (
      <div>
        <h3>The total number of Asteroids are: {Array.isArray(asteroids) && asteroids[0] === "No asteroids found" ? 0 : asteroids.length}</h3>
  
        {Array.isArray(asteroids) && asteroids[0] === "No asteroids found" ? (
          <p>No asteroids found</p>
        ) : (
          <ul className="asteroid-list">
            {asteroids.map((asteroid, index) => (
              <li key={index}>{asteroid}</li>
            ))}
          </ul>
        )}
  
        {error && <p>{error}</p>}
      </div>
    );
  }
  
  export default AsteroidDetails;