// WeatherApp.js

import React, { useState, useEffect } from 'react';
import weatherService from './weatherService';
import searchIcon from './images/search-icon.png'; // Import the search icon image
import temperatureIcon from './images/temperature.png'; // Import temperature icon image
import humidityIcon from './images/humidity.png'; // Import humidity icon image
import windSpeedIcon from './images/windspeed.png'; // Import wind speed icon image
import cloudmateLogo from './images/cloudmate-logo.png'; // Import Cloudmate logo
import celsiusIcon from './images/unit-toggle-icon.png'; // Import celsius icon
import kelvinIcon from './images/unit-toggle-icon.png'; // Import kelvin icon
import liveIcon from './images/live-icon.png'; // Import live icon

// Import weather condition icons
import clearIcon from './images/clear.png';
import cloudsIcon from './images/clouds.png';
import rainIcon from './images/rain.png';
import snowIcon from './images/snow.png';
import drizzleIcon from './images/drizzle.png'; // New weather condition icon
import thunderstormsIcon from './images/thunderstorms.png'; // New weather condition icon
import hazeIcon from './images/haze.png';
import mistIcon from './images/mist.png';
import smokeIcon from './images/smoke.png';

const WeatherApp = () => {
  const [location, setLocation] = useState('Colombo,LK'); // Default location set to Colombo
  const [unit, setUnit] = useState('metric'); // State for temperature unit, default is metric (Celsius)

  const {
    getLatLon,
    currentWeather,
    weatherForecast,
    loadingCurrentWeather,
    loadingWeatherForecast,
    loadingLocation,
    code,
    getCurrentWeather,
    getForecastWeather,
  } = weatherService();

  // Weather condition icons mapping
  const weatherIcons = {
    Clear: clearIcon,
    Clouds: cloudsIcon,
    Rain: rainIcon,
    Snow: snowIcon,
    Drizzle: drizzleIcon, // Include drizzle icon
    Thunderstorm: thunderstormsIcon, // Include thunderstorms icon
    Haze: hazeIcon,
    Mist: mistIcon,
    Smoke: smokeIcon,
  };

  // useEffect to fetch weather data when the location changes or unit changes
  useEffect(() => {
    getLatLon(location);
    if (code) {
      getCurrentWeather(code, unit);
      getForecastWeather(code, unit);
    }
  }, [location, unit]);

  // Function to handle unit toggle
  const handleUnitChange = (selectedUnit) => {
    setUnit(selectedUnit);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-300 to-blue-800'>
      {/* Header */}
      <header
        className='bg-cover bg-center bg-gray-800 p-4 shadow-md flex justify-between items-center relative'
        style={{ backgroundImage: 'url(src/images/cloud_bg.png)' }}
      >
        {/* Cloudmate Logo */}
        <div className="flex items-center">
          <img
            src={cloudmateLogo}
            alt="Cloudmate Logo"
            className="h-12 mr-2"
          />
          <h1 className='text-4xl font-semibold text-white'>CLOUDMATE</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto p-4'>
        {/* Temperature Unit Toggle */}
        <div className="flex justify-end mb-4 items-center">
          <span className="text-white mr-2">Toggle Units</span>
          <button
            className={`text-white ${
              unit === 'metric' ? 'bg-blue-800' : 'bg-gray-500'
            } px-4 py-2 rounded-md mr-2 flex items-center`}
            onClick={() => handleUnitChange('metric')}
          >
            <img
              src={celsiusIcon}
              alt='Celsius Icon'
              className='w-5 h-5 mr-2'
            />
            Celsius
          </button>
          <button
            className={`text-white ${
              unit === 'imperial' ? 'bg-blue-800' : 'bg-gray-500'
            } px-4 py-2 rounded-md flex items-center`}
            onClick={() => handleUnitChange('imperial')}
          >
            <img
              src={kelvinIcon}
              alt='Kelvin Icon'
              className='w-5 h-5 mr-2'
            />
            Kelvin
          </button>
        </div>

        {/* Search Bar */}
        <div className='relative mb-8'>
          <input
            type='text'
            placeholder='Enter location...'
            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 w-full pr-10'
            onChange={(e) => setLocation(e.target.value)}
          />
          {/* Search icon */}
          <img
            src={searchIcon}
            alt='Search Icon'
            className='absolute right-3 top-3 h-5 w-5 text-gray-400 cursor-pointer'
          />
        </div>

        {/* Current Weather */}
        <div className='bg-black bg-opacity-50 p-8 rounded-lg shadow-lg mb-8 flex items-center justify-between relative'>
          {loadingCurrentWeather || loadingLocation ? (
            <p className='text-white'>Loading...</p>
          ) : (
            <>
              <div>
                <h2 className='text-6xl font-semibold mb-2 text-white'>
                  {currentWeather.name}
                </h2>
                <p className='text-lg text-gray-200'>
                  {currentWeather.sys.country}
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src={weatherIcons[currentWeather.weather[0].main]}
                  alt='Weather Icon'
                  className='w-12 h-12 mr-4'
                />
                <p className='text-xl text-white'>{currentWeather.weather[0].main}</p>
              </div>
              <div>
                <h2 className='text-6xl font-semibold mb-2 text-white'>
                  {(unit === 'metric' ? (currentWeather.main.temp - 273.15) : currentWeather.main.temp).toFixed(2)}{unit === 'metric' ? '°C' : '°K'}
                </h2>
                <div className='flex items-center'>
                  <img
                    src={humidityIcon}
                    alt='Humidity Icon'
                    className='w-6 h-6 mr-2'
                  />
                  <p className='text-lg text-white'>
                    Humidity: {currentWeather.main.humidity}%
                  </p>
                </div>
                <div className='flex items-center'>
                  <img
                    src={windSpeedIcon}
                    alt='Wind Speed Icon'
                    className='w-6 h-6 mr-2'
                  />
                  <p className='text-lg text-white'>
                    Wind Speed: {(currentWeather.wind.speed * (unit === 'metric' ? 3.6 : 1)).toFixed(2)} km/h
                  </p>
                </div>
              </div>
              <img
                src={liveIcon}
                alt="Live Icon"
                className="absolute left-3 bottom-3 h-5 w-5 text-white"
              />
              <p className="absolute left-8 bottom-3 text-sm text-white font-bold">LIVE</p>


            </>
          )}
        </div>

        {/* Weather Forecast */}
        <div className='bg-black bg-opacity-50 p-8 rounded-lg shadow-lg mb-8'>
          <h2 className='text-2xl font-semibold mb-4 text-white'>
            Weather Forecast
          </h2>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-5'>
            {loadingWeatherForecast || loadingLocation ? (
              <p className='text-white'>Loading forecast...</p>
            ) : (
              weatherForecast.slice(0, 5).map((forecast, index) => (
                <div
                  key={index}
                  className='bg-gradient-to-r from-blue-500 to-blue-900 bg-opacity-80 p-8 rounded-md shadow-md text-white'
                >
                  {/* Display actual dates */}
                  <p className='text-lg font-semibold mb-4'>{new Date(forecast.dt * 1000).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' })}</p>
                  <hr className='border-gray-400 mb-4 mt-2' /> {/* Horizontal line */}
                  <div className='flex items-center mb-2'>
                    <img
                      src={temperatureIcon}
                      alt='Temperature Icon'
                      className='w-6 h-6 mr-2'
                    />
                    <p>
                      Temperature: {(unit === 'metric' ? (forecast.main.temp - 273.15) : forecast.main.temp).toFixed(2)}{unit === 'metric' ? '°C' : '°K'}
                    </p>
                  </div>
                  <div className='flex items-center'>
                    <img
                      src={humidityIcon}
                      alt='Humidity Icon'
                      className='w-6 h-6 mr-2'
                    />
                    <p>Humidity: {forecast.main.humidity}%</p>
                  </div>
                  <div className='flex items-center mt-2'>
                    <img
                      src={windSpeedIcon}
                      alt='Wind Speed Icon'
                      className='w-6 h-6 mr-2'
                    />
                    <p>
                      Wind Speed: {(forecast.wind.speed * (unit === 'metric' ? 3.6 : 1)).toFixed(2)} km/h
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        Designed and developed by Rushell Dodangoda for DXDY Digital Sri Lanka
      </footer>
    </div>
  );
};

export default WeatherApp;
