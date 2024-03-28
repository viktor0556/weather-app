import React, { useEffect, useState } from "react";
import axios from "axios";
import temperatureImage from "./assets/temperature.jpg";
import humImg from "./assets/humidity.png";
import tempFeelsLike from "./assets/temperature-feels-like.svg";
import pressure from "./assets/gauge.png";
import wind from "./assets/wind-icon.svg";
import cloud from "./assets/cloud.png";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "3b2c27f53beb2714fe108e7d19dbf3ae";

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="container-all">
      <div className="container">
        <div className="weather-app-container">
          <h1 className="weather-app-paragh">Weather Forecast App</h1>
          <p className="weather-app-x">✕</p>
        </div>
        <div className="weather-container">
          <form onSubmit={handleSubmit}>
            <input
              className="user-input"
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={handleInputChange}
            />
          </form>

          {weatherData ? (
            <>
              <h2 className="weather-name">{weatherData.name}</h2>
              <div className="all-properties">
                <div className="all-properties1">
                  <div className="image-paragh-container">
                  <img
                      className="weather-image"
                      src={temperatureImage}
                      alt=""
                    />
                    <p className="properties">
                      Temperature: {weatherData.main.temp}°C
                    </p>
                    
                  </div>

                  <div className="image-paragh-container">
                  <img className="cloud-image" src={cloud} alt="" />
                    <p className="properties">
                      Description: {weatherData.weather[0].description}
                    </p>
                    
                  </div>
                  <div className="image-paragh-container">
                  <img className="feels-like-image" src={tempFeelsLike} alt="" />
                    <p className="properties">
                      Feels like: {weatherData.main.feels_like}°C
                    </p>
                    
                  </div>
                </div>
                <div className="all-properties2">
                  <div className="image-paragh-container">
                    <p className="properties">
                      Humidity: {weatherData.main.humidity}%
                    </p>
                    <img className="hum-image" src={humImg} alt="" />
                  </div>
                  <div className="image-paragh-container">
                    <p className="properties">
                      Pressure: {weatherData.main.pressure}
                    </p>
                    <img className="pressure-image" src={pressure} alt="" />
                  </div>
                  <div className="image-paragh-container">
                    <p className="properties">
                      Wind Speed: {weatherData.wind.speed}m/s
                    </p>
                    <img className="wind-image" src={wind} alt="" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
