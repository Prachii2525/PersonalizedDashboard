import React, { useEffect, useState } from 'react';
import Widget from './Widget';
import { fetchWeatherData } from '../api/weatherApi';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const weatherData = await fetchWeatherData('New York');
        setWeather(weatherData);
      } catch (err) {
        setError('Failed to load weather data');
        console.error(err);
      }
    };

    loadWeather();
  }, []);

  return (
    <Widget title="Weather">
      {error ? (
        <div className="text-red-500 font-bold">{error}</div>
      ) : weather ? (
        <div className="text-gray-800 space-y-2">
          <h3 className="text-xl font-bold">{weather.name}</h3>
          <p className="text-lg capitalize">{weather.weather[0].description}</p>
          <p className="text-2xl font-semibold">{Math.round(weather.main.temp - 273.15)}°C</p>
          <p className="text-sm text-gray-500">
            Feels like {Math.round(weather.main.feels_like - 273.15)}°C
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </Widget>
  );
};

export default WeatherWidget;
