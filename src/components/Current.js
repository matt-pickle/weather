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
