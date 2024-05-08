import React, { useState } from 'react';
import axios from 'axios';

function AsteroidForm({ setAsteroids, setError }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [distance, setDistance] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !distance) {
      setError('All fields are required');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError('End date cannot be before start date');
      return;
    }

    try {
      const response = await axios.post('https://asteroid-alula-assignment.vercel.app/asteroids', {
        dateStart: startDate,
        dateEnd: endDate,
        stringDist: {
          value: distance,
          units: "kilometers"
        }
      });
      setAsteroids(response.data.asteroids);
      setError('');
    } catch (error) {
      setError('Error fetching asteroid data');
    }
  };

  return (
    <div>
      <h1>Asteroid Tracker</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <br />
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <br />
        <label>
          Distance (in kilometers):
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
        </label>
        <br />
        <button type="submit">Fetch Asteroids</button>
      </form>
      
    </div>
  );
}

export default AsteroidForm;

