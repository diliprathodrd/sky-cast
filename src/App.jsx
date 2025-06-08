import React, { useState } from 'react';
import Card from './Components/Card';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const weatherApi = {
    key: 'dfa4221ee71cd81bb5508c411aba97e2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
  };

  const getWeather = async (cityName) => {
    try {
      const res = await fetch(
        `${weatherApi.baseUrl}?q=${cityName}&appid=${weatherApi.key}&units=metric`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString();
  };

  return (
    <div className='container'>
      <header>
        <h2>🌤️</h2>
        <h2>Sky Cast</h2>
        <h3>Look Up, We've Got You Covered!</h3>
      </header>
      <div className='input-group'>
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter city'
          className='input'
        />
        <button onClick={() => getWeather(city)} className='button'>
          Get Weather
        </button>
      </div>

      {(error || weatherData) && <hr />}

      {error && <p className='error'>{error}</p>}

      {weatherData && (
        <>
          <div className='section-header'>
            <h3>
              {weatherData.name}, {weatherData.sys.country}
            </h3>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            {weatherData.weather[0].main} — {weatherData.weather[0].description}
          </div>
          <div className='card-container'>
            <Card
              title={'🌡️ Temperature'}
              value={`${weatherData.main.temp}°C`}
            />
            <Card
              title={'💧 Humidity'}
              value={`${weatherData.main.humidity}%`}
            />
            <Card
              title={'🔽 Pressure'}
              value={`${weatherData.main.pressure} hPa`}
            />
            <Card title={'💨 Wind'} value={`${weatherData.wind.speed} m/s`} />
            <Card
              title={'🌅 Sunrise'}
              value={formatTime(`${weatherData.sys.sunrise}`)}
            />
            <Card
              title={'🌇 Sunset'}
              value={formatTime(`${weatherData.sys.sunset}`)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
