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
    console.log(response)
    setWeather(response.data);
  }

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem("Place"));
    if (cachedData && !weather) {
      setWeather(cachedData.data);
      setCity(cachedData.config.url);
    }
  }, []);

  return (
    <div className="App">
      <h3>Weather App</h3>

      <header>
        <form onSubmit={handleGetWeather}>
          <input type="text" id="place" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={handleGetWeather}>Search</button>
        </form>
      </header>

      {weather && 
        <main>
          <h1>{city}</h1>

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
                      <p>{day.temperature.split('+')}</p>
                    </div>
                    <div>
                      <FaWind />
                      <p>{day.wind}</p>
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
