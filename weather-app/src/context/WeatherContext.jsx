import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWeatherData, getWeatherDataByCoords } from '../services/weatherApi';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load last searched city from local storage or default to New York
    const savedCity = localStorage.getItem('lastCity') || 'New York';
    setCity(savedCity);
    fetchWeather(savedCity);
  }, []);

  const fetchWeather = async (searchCity) => {
    if (!searchCity) return;
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherData(searchCity);
      setData(weatherData);
      setCity(weatherData.current.name);
      localStorage.setItem('lastCity', weatherData.current.name);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherDataByCoords(lat, lon);
      setData(weatherData);
      setCity(weatherData.current.name);
      localStorage.setItem('lastCity', weatherData.current.name);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ data, city, loading, error, fetchWeather, fetchWeatherByCoords }}>
      {children}
    </WeatherContext.Provider>
  );
};
