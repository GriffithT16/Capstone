// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MapPage from "./pages/MapPage/MapPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import JumpForm from "./components/JumpForm/JumpForm";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import WeatherPage from "./pages/WeatherPage/WeatherPage";
import ViewJumps from "./pages/ViewJumps/ViewJumps";

function App() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(fetchWeather);
    }
  }

  async function fetchWeather(latlng) {
    let response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latlng.coords.latitude}&longitude=${latlng.coords.longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`
    );
    setWeather(response.data.current_weather);
    setLat(latlng.coords.latitude);
    setLng(latlng.coords.longitude)
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jumps" element={<JumpForm weather={weather} />} />
        <Route path="/weather" element={<WeatherPage lat={lat} lng={lng} getLocation={getLocation}/>} />
        <Route path="/map" element={<MapPage lat={lat} lng={lng} getLocation={getLocation}/>} />
        <Route path="/log" element={<ViewJumps lat={lat} lng={lng} getLocation={getLocation}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

// const [lat, setLat] = useState(null);
// const [lng, setLng] = useState(null);
// const [status, setStatus] = useState(null);

// const getLocation = () => {
//   if (!navigator.geolocation) {
//     setStatus("Geolocation is not supported by your browser");
//   } else {
//     setStatus("Locating...");
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setStatus(null);
//         setLat(position.coords.latitude);
//         setLng(position.coords.longitude);
//       },
//       () => {
//         setStatus("Unable to retrieve your location");
//       }
//     );
//   }
//   return (
//     <div>
//       <button onClick={getLocation}>Get Location</button>
//       <h1>Coordinates</h1>
//       <p>{status}</p>
//       {lat && <p>Latitude: {lat}</p>}
//       {lng && <p>Longitude: {lng}</p>}
//     </div>
//   )
// };
