import React, { useState, useEffect } from 'react';
import { WeatherProvider } from './context/WeatherContext';
import Navbar from './components/Navbar';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import HourlyForecast from './components/HourlyForecast';
import SevenDayForecast from './components/SevenDayForecast';
import WeatherHighlights from './components/WeatherHighlights';
import WeatherCharts from './components/WeatherCharts';
import BackgroundEffect from './components/BackgroundEffect';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check local storage for theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <WeatherProvider>
      <div className="relative min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <BackgroundEffect />
        
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Current & Hourly */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-[400px]">
                <CurrentWeatherCard />
                <WeatherHighlights />
              </div>
              
              <div className="h-56">
                <HourlyForecast />
              </div>

              <div className="h-80">
                <WeatherCharts />
              </div>
            </div>

            {/* Right Column: 5-Day & Other features */}
            <div className="space-y-6">
              <div className="h-full min-h-[500px]">
                <SevenDayForecast />
              </div>
              
              {/* Optional: Add a simple card for location info or something else */}
              <div className="glass-panel p-6">
                <h4 className="font-semibold mb-2">About WeatherNow</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Real-time weather data powered by OpenWeatherMap. Search any city to get started.
                </p>
              </div>
            </div>
          </main>
          
          <footer className="text-center py-4 text-slate-400 text-sm">
            © 2026 WeatherNow. Designed with React & Tailwind CSS.
          </footer>
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;
