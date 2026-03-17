import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { format } from 'date-fns';

const SevenDayForecast = () => {
  const { data, loading } = useWeather();

  if (loading || !data) {
    return (
      <div className="glass-panel p-6 h-full animate-pulse flex flex-col">
        <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-700 rounded mb-8"></div>
        <div className="flex flex-col gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded text-center"></div>
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              <div className="w-20 h-4 bg-slate-200 dark:bg-slate-700 rounded text-center"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-6 flex items-center justify-between text-slate-800 dark:text-slate-200">
        <span>5-Day Forecast</span>
      </h3>
      
      <div className="flex flex-col gap-4 flex-1">
        {data.daily.map((day, idx) => {
          const date = new Date(day.dt * 1000);
          const dayName = idx === 0 ? 'Today' : format(date, 'EEEE');
          
          return (
            <div 
              key={idx} 
              className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/40 dark:hover:bg-slate-700/40 transition-colors"
            >
              <div className="w-1/3 text-left font-medium text-slate-600 dark:text-slate-300">
                {dayName}
              </div>
              
              <div className="w-1/3 flex justify-center items-center">
                <img 
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                  alt={day.weather[0].description}
                  className="w-10 h-10 object-contain drop-shadow-sm"
                  title={day.weather[0].description}
                />
              </div>
              
              <div className="w-1/3 flex justify-end items-center gap-3 font-semibold">
                <span className="text-slate-700 dark:text-slate-200">
                  {Math.round(day.temp.max)}°
                </span>
                <span className="text-slate-400 dark:text-slate-500 text-sm">
                  {Math.round(day.temp.min)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SevenDayForecast;
