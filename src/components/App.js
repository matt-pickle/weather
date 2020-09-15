import React, {useState} from 'react';
import Background from "./Background";
import Input from "./Input";
import Current from "./Current";
import Hourly from "./Hourly";
import Daily from "./Daily";

function App() {
  const [weatherObj, setWeatherObj] = useState();

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
              res.json().then(data => setWeatherObj(data));
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

  return (
    <div className="app">
      <Background weatherObj={weatherObj} />
      <Input handleZipSubmit={handleZipSubmit} />
      {
      weatherObj ?
        <div className="output-container">
          <Current weatherObj={weatherObj} />
          <Hourly weatherObj={weatherObj} />
          <Daily weatherObj={weatherObj} />
        </div>
      : "Awaiting input..."
      }      
    </div>
  );
}

export default App;
