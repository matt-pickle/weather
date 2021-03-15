import React from 'react';

function Current(props) { 
  const current = props.weatherObj.current;
  
  //Creates weather description string
  let description = "";
  current.weather.forEach((item, index) => {
    if (index === 0) {
      description = item.description;
    } else {
      description = description + ", " + item.description;
    }
  });
  
  
  return (
    <div className="current-container">
      <img src={props.currentWeather + ".png"} alt="weather icon" className="current-icon" />
      <p className="current-temp">{Math.round(current.temp)}<span className="degree">&deg;</span></p>
      <p className="current-feels-like">Feels Like {Math.round(current.feels_like)}&deg;</p>
      <p className="current-description">{description}</p>
      <p className="current-humidity">Humidity: {current.humidity}%</p>
      <p className="current-wind-speed">Wind Speed: {Math.round(current.wind_speed)}mph</p>
    </div>
  );
}

export default Current;
