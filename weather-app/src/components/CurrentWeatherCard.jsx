import React from 'react';
import { Cloud, Droplets, Wind, Gauge } from 'lucide-react';
import { format } from 'date-fns';
import { useWeather } from '../context/WeatherContext';

const CurrentWeatherCard = () => {
  const { data, loading, error } = useWeather();

  if (loading) return (
    <div className="glass-panel p-8 flex flex-col items-center justify-center animate-pulse h-full">
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
      <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-6"></div>
      <div className="flex space-x-4 w-full">
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded flex-1"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded flex-1"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded flex-1"></div>
      </div>
    </div>
  );

  if (error || !data) return (
    <div className="glass-panel p-8 flex items-center justify-center h-full text-red-500">
      <p>{error || 'No weather data available'}</p>
    </div>
  );

  const { current } = data;
  const today = new Date();

  return (
    <div className="glass-panel p-8 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Background decoration (optional soft glow) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-1">{current.name}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {format(today, 'EEEE, d MMMM, yyyy')}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between mt-6 mb-8">
        <div className="flex items-center gap-4">
          <img 
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`} 
            alt={current.weather[0].description}
            className="w-28 h-28 drop-shadow-md"
          />
          <div>
            <div className="text-6xl font-bold tracking-tighter">
              {Math.round(current.temp)}°
            </div>
            <div className="text-xl capitalize font-medium opacity-80 mt-1">
              {current.weather[0].description}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-700 pt-6">
        <div className="flex flex-col items-center justify-center bg-white/40 dark:bg-slate-800/40 rounded-xl py-3 shadow-sm">
          <Droplets className="h-5 w-5 text-blue-500 mb-1" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Humidity</span>
          <span className="font-semibold">{current.humidity}%</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/40 dark:bg-slate-800/40 rounded-xl py-3 shadow-sm">
          <Wind className="h-5 w-5 text-teal-500 mb-1" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Wind</span>
          <span className="font-semibold">{current.wind_speed} km/h</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/40 dark:bg-slate-800/40 rounded-xl py-3 shadow-sm">
          <Gauge className="h-5 w-5 text-indigo-500 mb-1" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Pressure</span>
          <span className="font-semibold">{current.pressure || 1012} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
