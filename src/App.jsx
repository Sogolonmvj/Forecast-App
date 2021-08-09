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

  const treatData = (e) => {
    e.preventDefault();

    if(search.match(/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ -]+$/)) {
      handleGetWeather(e);
    } else if (search === undefined) {
      return null;
    } else {
      return null;
    }
          
  }

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem("Place"));
    if (cachedData && !weather) {
      setWeather(cachedData.data);
      setCity(cachedData.config.url);
    }
  }, []);

  const showData = JSON.parse(localStorage.getItem("Place"));

  const showCity = showData?.config.url;
  const transformCity = showCity?.split(" ");
    
  for (let i = 0; i < transformCity?.length; i++) transformCity[i] = transformCity[i].charAt(0).toUpperCase() + transformCity[i].slice(1);
  const formattedCity = transformCity?.join(" ");

  return (
    <div className="App">
      <h3 className="title gradient">Weather App</h3>

      <header>
        <form onSubmit={treatData}>
          <input type="text" id="place" placeholder="Enter a city here!" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={treatData}>Search</button>
        </form>
      </header>

      {weather && 
        <main>
          <h1>{formattedCity}</h1>

          <section className="current-weather up">
            <h2>Current weather</h2>

            <p>{weather.temperature.split('+')}</p>
            <p>{weather.description}</p>
          </section>

          <section className="forecast move">
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
      <div className="lastdiv">
        <p className='copyright go-up'><a href='mailto:sogolonmvj@yahoo.com' className='contact gradient'>sogolonmvj@yahoo.com.</a>&nbsp;Developed by Sogolon.</p>
      </div>
    </div>
  )

}

export default App
