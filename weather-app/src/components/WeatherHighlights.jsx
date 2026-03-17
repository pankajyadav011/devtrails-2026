import React from 'react';
import { Sun, Sunrise, Sunset, Eye, Thermometer, Wind } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { format } from 'date-fns';

const WeatherHighlights = () => {
  const { data, loading } = useWeather();

  if (loading || !data) {
    return (
      <div className="glass-panel p-6 h-full animate-pulse">
        <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const { current } = data;

  const highlightCards = [
    {
      title: 'UV Index',
      value: current.uvi.toFixed(1),
      icon: <Sun className="h-5 w-5 text-yellow-500" />,
      description: current.uvi > 5 ? 'High risk' : 'Low risk',
    },
    {
      title: 'Sunrise & Sunset',
      value: format(new Date(current.sunrise * 1000), 'p'),
      subValue: format(new Date(current.sunset * 1000), 'p'),
      icon: <Sunrise className="h-5 w-5 text-orange-500" />,
    },
    {
      title: 'Visibility',
      value: `${(current.visibility / 1000).toFixed(1)} km`,
      icon: <Eye className="h-5 w-5 text-blue-400" />,
      description: current.visibility > 5000 ? 'Good visibility' : 'Low visibility',
    },
    {
      title: 'Feels Like',
      value: `${Math.round(current.feels_like)}°`,
      icon: <Thermometer className="h-5 w-5 text-red-400" />,
      description: `Humidity is ${current.humidity}%`,
    },
  ];

  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-6 text-slate-800 dark:text-slate-200">Today's Highlights</h3>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {highlightCards.map((card, idx) => (
          <div key={idx} className="bg-white/40 dark:bg-slate-800/40 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.title}</span>
              {card.icon}
            </div>
            <div className="mt-1">
              <div className="text-xl font-bold">{card.value}</div>
              {card.subValue && <div className="text-sm text-slate-500 mt-1 flex items-center gap-1"><Sunset className="h-3 w-3" /> {card.subValue}</div>}
              {card.description && <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{card.description}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherHighlights;
