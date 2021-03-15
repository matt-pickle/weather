import React from 'react';

function HourDisplay(props) {  

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
  

  //Creates weather description string
  let description = "";
  props.weather.forEach((item, index) => {
    if (index === 0) {
      description = item.description;
    } else {
      description = description + ", " + item.description;
    }
  });

  //Creates array of weather conditions
  let conditionArr = [];
  props.weather.forEach(item => {
    conditionArr.push(item.main, item.id);
  });

  //Checks for night time
  const timeOfDay = props.dt;
  if (timeOfDay < props.sunrise ||
      timeOfDay > props.sunset && timeOfDay < props.tomorrowSunrise ||
      timeOfDay > props.tomorrowSunset && timeOfDay < props.dayAfterTomorrowSunrise) {
    conditionArr.push("Night");
  }

  //Selects icon based on weather conditions
  let icon = "";
  conditionArr.includes("Snow") ? icon = "snow.png"
  : conditionArr.some(el => el === "Thunderstorm" || el === "Squall" || el === "Tornado") ? icon = "thunderstorm.png"
  : conditionArr.some(el => el === "Drizzle" || el === "Rain") ? icon = "rain.png"
  : conditionArr.some(el => el === 804 ||
                      el === "Fog" ||
                      el === "Smoke" ||
                      el === "Mist" ||
                      el === "Haze" ||
                      el === "Dust" ||
                      el === "Sand" ||
                      el === "Ash") ?
                      icon = "cloudy.png"
  : conditionArr.includes("Night") ? icon = "night.png"
  : conditionArr.some(el => el === 802 || el === 803) ? icon = "partly-cloudy.png"
  : conditionArr.some(el => el === "Clear" || el === 801) ? icon = "sunny.png"
  : icon = "";

  return (
    <div className="hour-display-container">
      <h2 className="hourly-hour">{hourConverted}{ampm}</h2>
      <h2 className="hourly-day">{weekDay}</h2>
      <img src={icon} alt="weather icon" className="hourly-icon" />
      <p className="hourly-description">{description}</p>
      <p className="hourly-temp">{Math.round(props.temp)}<span className="degree">&deg;</span></p>
      <p className="hourly-feels-like">Feels Like {Math.round(props.feels_like)}<span className="degree">&deg;</span></p>
      <p className="hourly-rain-chance">Rain Chance: {Math.round(props.pop * 100)}%</p>
      <p className="hourly-humidity">Humidity: {props.humidity}%</p>
      <p className="hourly-wind-speed">Wind Spd: {Math.round(props.wind_speed)}mph</p>
    </div>
  );
}

export default HourDisplay;
