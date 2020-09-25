import React, {useState, useEffect} from 'react';

function HourDisplay(props) {  
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

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
    //Creates array of weather conditions
    let conditionArr = [];
    props.weather.map(item => {
      conditionArr.push(item.main, item.id);
    });
    console.log(conditionArr);
    //Selects icon based on weather conditions
    conditionArr.includes("Snow") ? setIcon("snow.png")
    : conditionArr.some(el => el === "Thunderstorm" || el === "Squall" || el === "Tornado") ? setIcon("thunderstorm.png")
    : conditionArr.some(el => el === "Drizzle" || el === "Rain") ? setIcon("rain.png")
    : conditionArr.some(el => el === 802 || el === 803) ? setIcon("partly-cloudy.png")
    : conditionArr.some(el => el === 804 ||
                              el === "Fog" ||
                              el === "Smoke" ||
                              el === "Mist" ||
                              el === "Haze" ||
                              el === "Dust" ||
                              el === "Sand" ||
                              el === "Ash") ?
                              setIcon("cloudy.png")
    : conditionArr.some(el => el === "Clear" || el === 801) ? setIcon("sunny.png")
    : setIcon("");
  }, []);

  return (
    <div className="hour-display-container">
      <h2 className="hourly-hour">{hourConverted}{ampm}</h2>
      <h2 className="hourly-day">{weekDay}</h2>
      <img src={icon} alt="weather icon" className="hourly-icon" />
      <p className="hourly-description">{description}</p>
      <p className="hourly-temp">{Math.round(props.temp)}<span className="degree">&deg;</span></p>
      <p className="hourly-feels-like">Feels Like {Math.round(props.feels_like)}<span className="degree">&deg;</span></p>
      <p className="hourly-rain-chance">Rain Chance: {Math.round(props.pop)}%</p>
      <p className="hourly-humidity">Humidity: {props.humidity}%</p>
      <p className="hourly-wind-speed">Wind Spd: {Math.round(props.wind_speed)}mph</p>
    </div>
  );
}

export default HourDisplay;
