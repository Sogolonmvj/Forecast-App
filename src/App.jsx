import React, { useEffect, useState } from 'react'
import { api } from "./services/api"

import './App.css'
import { FaTemperatureHigh, FaWind } from 'react-icons/fa'

const App = () => {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState("")
  const [search, setSearch] = useState("")

  const handleGetWeather = async (e) => {
    e.preventDefault();
    setCity(search);
    const response = await api.get(search)
    localStorage.setItem("Place", JSON.stringify(response));
    setWeather(response.data);
  }

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem("Place"));
    if (cachedData && !weather) {
      setWeather(cachedData.data);
      setCity(cachedData.config.url);
    }
  }, []);

  const showData = JSON.parse(localStorage.getItem("Place"));
  const showCity = showData.config.url;
  const transformCity = showCity.split(" ");
  
  for (let i = 0; i < transformCity.length; i++) transformCity[i] = transformCity[i].charAt(0).toUpperCase() + transformCity[i].slice(1);
  const formattedCity = transformCity.join(" ");

  return (
    <div className="App">
      <h3 className="title">Weather App</h3>

      <header>
        <form onSubmit={handleGetWeather}>
          <input type="text" id="place" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={handleGetWeather}>Search</button>
        </form>
      </header>

      {weather && 
        <main>
          <h1>{formattedCity}</h1>

          <section className="current-weather">
            <h2>Current weather</h2>

            <p>{weather.temperature.split('+')}</p>
            <p>{weather.description}</p>
          </section>

          <section className="forecast">
              <h2>Forecast</h2>
              <ol>
              {
                weather.forecast.map(day =>
                  <li key={day.day}> 
                    <div>
                      <FaTemperatureHigh />
                      <p>{isNaN(parseInt(day.temperature.split(' °C'))) ? 'unknown' : day.temperature.split('+')}</p>
                    </div>
                    <div>
                      <FaWind />
                      <p>{isNaN(parseInt(day.wind.split(' km/h'))) ? 'unknown' : day.wind}</p>
                    </div>
                  </li>
                )
              }
              </ol>
          </section>
        </main>
      }
    </div>
  )

}

export default App
