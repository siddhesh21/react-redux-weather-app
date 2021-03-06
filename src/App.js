import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import axios from "axios";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchWeatherInfo();
  }, []);

  const fetchWeatherInfo = (e) => {
    e?.preventDefault();
    const options = {
      method: "GET",
      url: "https://community-open-weather-map.p.rapidapi.com/weather",
      params: {
        q: inputRef.current.value || "Dublin, ie", // "Dublin, ie"
        units: "metric",
      },
      headers: {
        "x-rapidapi-key": "bd6e8a7805msheb7cdb4536d4e75p192ce6jsnc2c5170327f8",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setWeatherInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log(weatherInfo);

  return (
    <div className="app">
      <h1>Weather App</h1>

      <form>
        <input ref={inputRef} type="text" placeholder="Type the City Name" />
        <button type="submit" onClick={fetchWeatherInfo}>
          Show me the Weather
        </button>
        <h2>{weatherInfo?.name}</h2>
        <h4>{weatherInfo?.main.temp}</h4>
      </form>
    </div>
  );
}

export default App;
