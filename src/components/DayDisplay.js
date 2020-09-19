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
    props.weather.map(item => {
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
      <h2>{weekDay}, {month}-{date}</h2>
      <img src={icon} alt="weather icon" className="day-icon" />
      <p>High: {Math.round(props.max)}&deg;F</p>
      <p>Low: {Math.round(props.min)}&deg;F</p>
      <p>Conditions: {description}</p>
      <p>Rain Chance: {Math.round(props.pop)}%</p>
      <p>Humidity: {props.humidity}%</p>
      <p>Wind Speed: {Math.round(props.wind_speed)}mph</p>
    </div>
  );
}

export default DayDisplay;
