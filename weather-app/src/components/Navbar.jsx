import React, { useState } from 'react';
import { Search, MapPin, Moon, Sun } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const Navbar = ({ theme, toggleTheme }) => {
  const [searchInput, setSearchInput] = useState('');
  const { fetchWeather, fetchWeatherByCoords } = useWeather();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim());
      setSearchInput('');
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      }, (error) => {
        console.error("Error getting location: ", error);
        alert("Could not get your location. Please check browser permissions.");
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <nav className="glass-panel p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-sky-400 dark:to-blue-300">
          WeatherNow
        </h1>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md w-full relative">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm backdrop-blur-md transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-500 dark:text-slate-400" />
      </form>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleLocation}
          className="p-2.5 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors shadow-sm"
          title="Current Location"
        >
          <MapPin className="h-5 w-5 text-primary" />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors shadow-sm"
          title="Toggle Theme"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-indigo-500" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-400" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
