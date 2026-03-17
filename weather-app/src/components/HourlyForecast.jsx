import React from 'react';
import { useWeather } from '../context/WeatherContext';

const HourlyForecast = () => {
  const { data, loading } = useWeather();

  if (loading || !data) {
    return (
      <div className="glass-panel p-6 h-full flex flex-col justify-center gap-4 animate-pulse overflow-hidden">
        <div className="h-6 w-1/4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
        <div className="flex gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-10 h-4 bg-slate-200 dark:bg-slate-700 rounded text-center"></div>
              <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              <div className="w-8 h-6 bg-slate-200 dark:bg-slate-700 rounded text-center"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Today at</h3>
      
      {/* Scrollable Container */}
      <div className="flex overflow-x-auto pb-2 gap-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
        {data.hourly.map((hour, idx) => {
          const date = new Date(hour.dt * 1000);
          const timeString = date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
          
          return (
            <div 
              key={idx} 
              className="flex-shrink-0 flex flex-col items-center justify-between min-w-[60px] p-3 rounded-2xl hover:bg-white/40 dark:hover:bg-slate-700/40 transition-colors shadow-sm cursor-pointer"
            >
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {idx === 0 ? 'Now' : timeString}
              </div>
              
              <img 
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} 
                alt={hour.weather[0].description}
                className="w-14 h-14 object-contain drop-shadow-sm my-1"
                title={hour.weather[0].description}
              />
              
              <div className="text-lg font-bold">
                {Math.round(hour.temp)}°
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
