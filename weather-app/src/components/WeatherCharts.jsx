import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useWeather } from '../context/WeatherContext';

const WeatherCharts = () => {
  const { data, loading } = useWeather();
  const [activeTab, setActiveTab] = useState('hourly');

  if (loading || !data) {
    return (
      <div className="glass-panel p-6 h-64 animate-pulse">
        <div className="h-6 w-1/4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
        <div className="h-full bg-slate-100 dark:bg-slate-800/50 rounded-xl"></div>
      </div>
    );
  }

  const hourlyData = data.hourly.map(hour => ({
    time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: 'numeric', hour12: true }),
    temp: Math.round(hour.temp),
  }));

  const dailyData = data.daily.map(day => ({
    time: new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' }),
    temp: Math.round(day.temp.max),
  }));

  const chartData = activeTab === 'hourly' ? hourlyData : dailyData;

  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Temperature Trends</h3>
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('hourly')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              activeTab === 'hourly' 
                ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' 
                : 'text-slate-500'
            }`}
          >
            Hourly
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              activeTab === 'daily' 
                ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' 
                : 'text-slate-500'
            }`}
          >
            Daily
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94A3B8' }}
              dy={10}
            />
            <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(8px)'
              }}
              labelStyle={{ color: '#64748B', fontWeight: 'bold' }}
            />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTemp)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherCharts;
