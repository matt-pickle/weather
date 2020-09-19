import React, {useState} from 'react';
import Input from "./Input";
import Current from "./Current";
import Hourly from "./Hourly";
import Daily from "./Daily";

function App() {
  const [weatherObj, setWeatherObj] = useState();
  const [currentWeather, setCurrentWeather] = useState("");

  function handleZipSubmit(zip) {
    //Get latitude and longitude coordinates from zip code
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${process.env.REACT_APP_WEATHER_KEY}`)
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          //Get weather data from coordinates
          fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${process.env.REACT_APP_WEATHER_KEY}`)
          .then(res => {
            if (res.ok) {
              res.json().then(data => {
                setWeatherObj(data);
                getCurrentWeather(data);
              })
            } else {
              console.error("API Request Failed!");
            }
          })
        })  
      } else {
        console.error("API Request Failed!");
      }
    })
  }

  function getCurrentWeather(data) {
    //Creates array of current weather conditions
    const current = data.current;
    let conditionArr = [];
    current.weather.map(item => {
      conditionArr.push(item.main, item.id);
    });
    //Checks for night time
    const now = new Date() / 1000;
    if (now < current.sunrise || now > current.sunset) {
      conditionArr.push("Night");
    }
    //Selects icon/background based on current weather conditions
    conditionArr.includes("Snow") ? setCurrentWeather("snow")
    : conditionArr.some(el => el === "Thunderstorm" ||
                              el === "Squall" ||
                              el === "Tornado") ?
                              setCurrentWeather("thunderstorm")
    : conditionArr.some(el => el === "Drizzle" || el === "Rain") ? setCurrentWeather("rain")
    : conditionArr.includes("Night") ? setCurrentWeather("night")
    : conditionArr.some(el => el === 802 || el === 803) ? setCurrentWeather("partly-cloudy")
    : conditionArr.some(el => el === 804 ||
                              el === "Fog" ||
                              el === "Smoke" ||
                              el === "Mist" ||
                              el === "Haze" ||
                              el === "Dust" ||
                              el === "Sand" ||
                              el === "Ash") ?
                              setCurrentWeather("cloudy")
    : conditionArr.some(el => el === "Clear" || el === 801) ? setCurrentWeather("sunny")
    : setCurrentWeather("");
  }

  return (
    <div className="app">
      <div className={"background " + currentWeather}></div>
      <Input handleZipSubmit={handleZipSubmit} />
      {
      weatherObj ?
        <div className="output-container">
          <Current weatherObj={weatherObj}
                   currentWeather={currentWeather}
          />
          <Hourly weatherObj={weatherObj} />
          <Daily weatherObj={weatherObj} />
        </div>
      : "Awaiting input..."
      }      
    </div>
  );
}

export default App;
