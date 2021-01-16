import React, {useState, useEffect} from 'react';

function DayDisplay(props) {  
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
  const month = now.getMonth() + 1;
  const date = now.getDate();
  
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
    props.weather.forEach(item => {
      conditionArr.push(item.main, item.id);
    });
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
    <div className="day-display-container">
      <h2 className="daily-day">{weekDay}</h2>
      <h2 className="daily-date">{month}-{date}</h2>
      <img src={icon} alt="weather icon" className="daily-icon" />
      <p className="daily-description">{description}</p>
      <p className="daily-temp">{Math.round(props.max)}<span className="degree">&deg;</span>
        /{Math.round(props.min)}<span className="degree">&deg;</span></p>
      <p className="daily-rain-chance">Rain Chance: {Math.round(props.pop * 100)}%</p>
      <p className="daily-humidity">Humidity: {props.humidity}%</p>
      <p className="daily-wind-speed">Wind Spd: {Math.round(props.wind_speed)}mph</p>
    </div>
  );
}

export default DayDisplay;
