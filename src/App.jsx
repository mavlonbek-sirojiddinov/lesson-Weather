import { useState } from "react"
import "./App.css"



const api = {
  key: 'b4155f84fae78fbb72ac39231ce4b51a',
  baseUrl: `https://api.openweathermap.org/data/2.5/`
}

function App() {

  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})

  const search = (e)=> {
    if (e.key === "Enter") {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(data => {
          setWeather(data)
          setQuery("");
          console.log(data);
        })
    }
  } 

  const dateBuilder = (item)=> {
    let months = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyun", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
    ]

    let days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"]

    let day = days[item.getDay()];
    let date = item.getDate();
    let month = months[item.getMonth()];
    let year = item.getFullYear();

    return `${day}, ${date}-${month}, ${year}-yil`
  }

  return (
    <div className='app'>
      <div className="weather-wrap">
        <div className="input-weather">
          <input
          className='search-input'
          type="search" 
          id="search"
          required
          onKeyPress={search}
          onChange={e => setQuery(e.target.value)}
          />
          <span>SEARCH</span>
        </div>
        {
          typeof weather.main !== 'undefined' ? (
            <div className="location-box">
              <div className="content">
                <h2 className="location">{weather.name} {weather.sys.country}</h2>
                <h2 className="date"><span className="digi num-two">4</span><span className="noy">-Noyabr,</span> <span className="digi">2022</span><span className="yil">-yil</span></h2>
                <span className="year-line"></span>
                <div className="input-weather">
                  <h1 className="weather-temp">{Math.round(weather.main.temp)}°C</h1>
                  <h2 className="cloud">{weather.weather[0].main}</h2>
                </div>
              </div>  
            </div>
          ) : ("")
        }

      </div>
    </div>
  );
}

export default App;
