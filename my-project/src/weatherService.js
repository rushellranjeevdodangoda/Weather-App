import { useState } from 'react';
import axios from 'axios';

const weatherService = () => {
  const [code, setCode] = useState();
  const [currentWeather, setCurrentWeather] = useState();
  const [weatherForecast, setWeatherForecast] = useState();
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingWeatherForecast, setLoadingWeatherForecast] = useState(true);
  const [loadingCurrentWeather, setLoadingCurrentWeather] = useState(true);

  const getForecastWeather = async (location) => {
    setLoadingWeatherForecast(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=9aac3ccb2daa138dd0195675d2546d66`
      );
      const data = response.data.list;
      console.log(data);
      setWeatherForecast(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingWeatherForecast(false);
    }
  };

  const getCurrentWeather = async (location) => {
    setLoadingCurrentWeather(true);
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=9aac3ccb2daa138dd0195675d2546d66`
      );
      const data = response.data;
      console.log(data);
      setCurrentWeather(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingCurrentWeather(false);
    }
  };

  const getLatLon = async (location) => {
    setLoadingLocation(true);
    console.log(location);
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=9aac3ccb2daa138dd0195675d2546d66`
      );
      const data = response.data[0];
      console.log(data);
      setCode(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingLocation(false);
    }
  };

  return {
    code,
    getLatLon,
    getCurrentWeather,
    getForecastWeather,
    currentWeather,
    weatherForecast,
    loadingLocation,
    loadingWeatherForecast,
    loadingCurrentWeather,
  };
};

export default weatherService;
