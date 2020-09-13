import React, {useState, useEffect} from 'react';

function HourDisplay(props) {  
  const [description, setDescription] = useState("");
  const now = new Date(props.dt * 1000);
  const day = now.getDay();
  const weekDay = day === 0 ? "Sunday"
                : day === 1 ? "Monday"
                : day === 2 ? "Tuesday"
                : day === 3 ? "Wednesday"
                : day === 4 ? "Thursday"
                : day === 5 ? "Friday"
                : "Saturday";
  const hour = now.getHours();
  const hourConverted = hour > 12 ? hour - 12
                      : hour === 0 ? 12
                      : hour;
  const ampm = now.getHours() < 12 ? "am" : "pm";
  
  useEffect(() => {
    //Creates weather description string
    props.weather.forEach((item, index) => {
      if (index === 0) {
        setDescription(item.description);
      } else {
        setDescription(description + ", " + item.description);
      }
    });
  }, []);

  return (
    <div className="hour-display-container">
      <h2>{weekDay}, {hourConverted}{ampm}</h2>
      <p>Temp: {Math.round(props.temp)}&deg;F</p>
      <p>Conditions: {description}</p>
      <p>Feels Like: {Math.round(props.feels_like)}&deg;F</p>
      <p>Rain Chance: {props.pop}%</p>
      <p>Humidity: {props.humidity}%</p>
      <p>Wind Speed: {Math.round(props.wind_speed)}mph</p>
    </div>
  );
}

export default HourDisplay;
