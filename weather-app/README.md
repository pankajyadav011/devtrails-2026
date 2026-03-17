# WeatherNow - Premium Weather Dashboard

![Weather Dashboard Final](C:\Users\ASUS\.gemini\antigravity\brain\c4dc1681-0993-42f3-894f-003ee8756635\weather_dashboard_final_1773772485504.png)

WeatherNow is a modern, full-stack weather forecasting application built with **React** and **Node.js**. It features a stunning glassmorphism design, real-time data integration, and responsive data visualizations.

## 🚀 Features

- **Real-Time Weather**: Up-to-the-minute weather data via OpenWeatherMap.
- **Glassmorphism UI**: High-end aesthetic with frosted-glass effects and dynamic backgrounds.
- **Interactive Charts**: Temperature trends visualized using Recharts (Hourly & Daily).
- **Secure Backend Proxy**: Node.js/Express backend to securely handle API keys and prevent exposure in the frontend.
- **Geolocation**: One-click weather fetching for your current location.
- **Search History**: Automatically remembers your last searched city.
- **Dark Mode**: Full support for dark and light themes with persistent state.

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS, Recharts, Lucide Icons.
- **Backend**: Node.js, Express, Axios, Dotenv.
- **Build Tool**: Vite.
- **API**: OpenWeatherMap.

## 📦 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v20.19+ or v22.12+ recommended)
- An API Key from [OpenWeatherMap](https://openweathermap.org/api)

### 1. Clone the Repository
```bash
git clone https://github.com/pankajyadav011/devtrails-2026.git
cd devtrails-2026/weather-app
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
OPENWEATHER_API_KEY=your_actual_api_key_here
PORT=5000
```
Start the server:
```bash
node index.js
```

### 3. Frontend Setup
Open a new terminal in the `weather-app` root:
```bash
npm install
npm run dev
```

### 4. Open in Browser
Visit **[http://localhost:5173](http://localhost:5173)** to see the app in action.

## 🔒 Security
The `server/.env` file is included in `.gitignore` to prevent leaking your API keys to GitHub.

## 📝 License
This project is for demonstration purposes. Developed during devtrails-2026.
