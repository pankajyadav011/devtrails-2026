export const mockWeatherData = {
  current: {
    temp: 24.5,
    feels_like: 26,
    humidity: 60,
    wind_speed: 4.5,
    visibility: 10000,
    uvi: 6.5,
    sunrise: 1689163200, // Unix timestamp
    sunset: 1689215400,
    weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
    name: 'San Francisco',
    dt: 1689190000,
  },
  hourly: Array.from({ length: 24 }).map((_, i) => ({
    dt: 1689190000 + i * 3600,
    temp: 20 + Math.sin(i / 4) * 5, // Simple curve
    weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
  })),
  daily: Array.from({ length: 7 }).map((_, i) => ({
    dt: 1689163200 + i * 86400,
    temp: {
      min: 15 + Math.random() * 5,
      max: 25 + Math.random() * 5,
    },
    weather: [{ id: Math.random() > 0.5 ? 800 : 500, main: 'Clear', description: 'clear sky', icon: '01d' }],
  })),
};
