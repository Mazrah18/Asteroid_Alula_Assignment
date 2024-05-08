const axios = require('axios');
const readline = require('readline');

const fetchAsteroidData = async (startDate, endDate, distance) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=77Mtolbqc480VMAj8Mpj5Zg4HGpeolF3TJpriHwd`
    );

    const asteroids = [];

    const neoObjects = response.data.near_earth_objects;
    Object.keys(neoObjects).forEach(date => {
      neoObjects[date].forEach(asteroid => {
        if (asteroid.close_approach_data[0].miss_distance.kilometers <= distance) {
          asteroids.push(asteroid.name);
        }
      });
    });

    if (asteroids.length === 0) {
      return [];
    }
    
    return asteroids;
  } catch (error) {
    console.error('Error fetching asteroid data:', error);
    throw error;
  }
};

const main = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter start date (YYYY-MM-DD): ', async (startDate) => {
    rl.question('Enter end date (YYYY-MM-DD): ', async (endDate) => {
      rl.question('Enter distance (in kilometers): ', async (distance) => {
        rl.close();

        try {
          const asteroidData = await fetchAsteroidData(startDate, endDate, parseFloat(distance));

          console.log({ asteroids: asteroidData });
        } catch (error) {
          console.error('An error occurred:', error);
        }
      });
    });
  });
};

main();
