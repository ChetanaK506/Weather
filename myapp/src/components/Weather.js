import React, { useEffect, useState } from 'react';
import './Weather.css';

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('City');
  const [inputCity, setInputCity] = useState('');
  const [error, setError] = useState(null);

  const getWeatherIcon = (description) => {
    const lower = description.toLowerCase();

    if (lower.includes('clear')) return clear_icon;
    if (lower.includes('cloud')) return cloud_icon;
    if (lower.includes('drizzle')) return drizzle_icon;
    if (lower.includes('rain')) return rain_icon;
    if (lower.includes('snow')) return snow_icon;

    return clear_icon;
  };

  const search = async (cityName) => {
    try {
      const response = await fetch(`https://goweather.xyz/weather/${cityName}`);
      const data = await response.json();
      console.log('API Data:', data);

      if (!data.temperature || data.temperature === '') {
        setError(`No weather data found for "${cityName}".`);
        setWeatherData(null);
      } else {
        setWeatherData({
          temperature: data.temperature,
          wind: data.wind,
          description: data.description,
          city: cityName,
          icon: getWeatherIcon(data.description),
        });
        setError(null);
      }
    } catch (error) {
      setError('Error fetching data.');
      setWeatherData(null);
    }
  };

  useEffect(() => {
    search(city);
  }, [city]);

  const handleSearchClick = () => {
    if (inputCity.trim() !== '') {
      setCity(inputCity.trim());
    }
  };

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search city'
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
        />
        <img src={search_icon} alt='Search' onClick={handleSearchClick} />
      </div>

      {error ? (
        <p className='error'>{error}</p>
      ) : weatherData ? (
        <>
          <img
            src={weatherData.icon}
            alt='Weather Icon'
            className='weather-icon'
          />

          <p className='temperature'>{weatherData.temperature}</p>
          <p className='location'>{weatherData.city}</p>
          <p className='description'>{weatherData.description}</p>

          <div className='weather-data'>
            <div className='col'>
              <img src={wind_icon} alt='Wind' />
              <div>
                <p>{weatherData.wind}</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;
