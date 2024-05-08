
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.json());

const fetchAsteroidData = async (startDate, endDate, distance) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=77Mtolbqc480VMAj8Mpj5Zg4HGpeolF3TJpriHwd`
    );

    const asteroids = [];

    const Objects = response.data.near_earth_objects;
    Object.keys(Objects).forEach(date => {
      Objects[date].forEach(asteroid => {
        if (asteroid.close_approach_data[0].miss_distance.kilometers <= distance) {
          asteroids.push(asteroid.name);
        }
      });
    });

  if (asteroids.length === 0) {
    return ['No asteroids found'];
  }
    return asteroids;
  } catch (error) {
    console.error('Error: True', error);
    throw error;
  }
};

app.post('/asteroids', async (req, res) => {
  try {
    const { dateStart, dateEnd, stringDist } = req.body;
    const distance = parseFloat(stringDist.value);

    const asteroidData = await fetchAsteroidData(dateStart, dateEnd, distance);

    if (asteroidData.length === 0) {
      res.json({ asteroids: [] });
    } else {
      res.json({ asteroids: asteroidData });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
