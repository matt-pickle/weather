import React, {useState, useEffect} from 'react';
import Current from "./Current";
import Hourly from "./Hourly";
import Daily from "./Daily";

function App() {
  const [weatherObj, setWeatherObj] = useState();

  useEffect(() => {
    //Get latitude and longitude coordinates from zip code
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=73008&appid=${process.env.REACT_APP_WEATHER_KEY}`)
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
  },[])
 

  return (
    <div className="app">
      <h1>Hello world</h1>
      {weatherObj ?
      <div>
        <Current weatherObj={weatherObj} />
        <Hourly weatherObj={weatherObj} />
        <Daily weatherObj={weatherObj} />
      </div> :
      "Loading..."}      
    </div>
  );
}

export default App;
