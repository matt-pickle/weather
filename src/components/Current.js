import React, {useState, useEffect} from 'react';

function Current(props) { 
  const current = props.weatherObj.current;
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    //Creates weather description string
    current.weather.forEach((item, index) => {
      if (index === 0) {
        setDescription(item.description);
      } else {
        setDescription(description + ", " + item.description);
      }
    });
  }, []);
  
  return (
    <div className="current-container">
      <h1>Current Weather</h1>
      <img src={props.currentWeather + ".png"} alt="weather icon" className="current-icon" />
      <p>Current Temp: {Math.round(current.temp)}&deg;F</p>
      <p>Conditions: {description}</p>
      <p>Feels Like: {Math.round(current.feels_like)}&deg;F</p>
      <p>Humidity: {current.humidity}%</p>
      <p>Wind Speed: {Math.round(current.wind_speed)}mph</p>
    </div>
  );
}

export default Current;
