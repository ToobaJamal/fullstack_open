import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function Weather({ capital }) {
    let API_KEY = "ca6d6224648556051c139ac1bbcc2f0e"
    let city = capital[0]
    const [weather, setWeather] = useState([])
    useEffect(() => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
          )
          .then((response) => {
            setWeather(response.data);
          })
      }, [])
      console.log('weather', weather)
    return (
        <>
            {weather.main ? 
            (<div>
            <p>Temperature {weather.main.temp}</p>
            <img
            alt="weather icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
            <p>Wind {weather.wind.speed} m/s</p>
            </div>) : null }
        </>
    )
}

export default Weather





  