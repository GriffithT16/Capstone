import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const WeatherPage = (props) => {
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [winddirection_10m, setWinddirection_10m] = useState([]);

  useEffect(() => {   
    fetchWeather();
  }, []);


  async function fetchWeather() {
    console.log("coords:", props.lat, props.lng);
    let response = await axios.get(
      //   `https://api.weather.gov/points/${props.lat},${props.lng}`
      `https://api.open-meteo.com/v1/forecast?latitude=${props.lat}&longitude=${props.lng}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`
    );
    console.log("Weather Data", response.data);
    setWeather(response.data.current_weather);
    setWinddirection_10m(response.data.hourly.winddirection_10m);
  }

  return (
    <div>
      <h1 className="font-link title">Current Weather</h1>
      <div className="searched-chart">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="font-link">Current Temp.</th>
              <th className="font-link">Current Time</th>
              <th className="font-link">Wind Direction</th>
              <th className="font-link">Wind Speed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{weather.temperature}</td>
              <td>{weather.time}</td>
              <td>{weather.winddirection}</td>
              <td>{weather.windspeed}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1 className="font-link title">Seven Day Look-Ahead</h1>
      <div className="searched-chart">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="font-link">Current Temp.</th>
              <th className="font-link">Current Time</th>
              <th className="font-link">Wind Direction</th>
              <th className="font-link">Wind Speed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{weather.temperature}</td>
              <td>{weather.time}</td>
              <td>{weather.winddirection}</td>
              <td>{weather.windspeed}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherPage;
