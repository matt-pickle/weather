import React, {useState, useEffect} from 'react';

function Current(props) { 
  const current = props.weatherObj.current;
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  
  useEffect(() => {
    //Creates weather description string
    current.weather.forEach((item, index) => {
      if (index === 0) {
        setDescription(item.description);
      } else {
        setDescription(description + ", " + item.description);
      }
    });
    //Creates array of current weather conditions
    let conditionArr = [];
    current.weather.map(item => {
      conditionArr.push(item.main, item.id);
    });
    //Checks for night time
    const now = new Date() / 1000;
    if (now < current.sunrise || now > current.sunset) {
      conditionArr.push("Night");
    }
    //Selects icon based on current weather conditions
    conditionArr.includes("Snow") ? setIcon("snow.png")
    : conditionArr.includes("Thunderstorm" || "Squall" || "Tornado") ? setIcon("thunderstorm.png")
    : conditionArr.includes("Drizzle" || "Rain") ? setIcon("rain.png")
    : conditionArr.includes("Night") ? setIcon("night.png")
    : conditionArr.includes(802 || 803) ? setIcon("partly-cloudy.png")
    : conditionArr.includes(804 || "Fog") ? setIcon("cloudy.png")
    : conditionArr.includes("Clear" || 801) ? setIcon("sunny.png")
    : setIcon("");
  }, []);
  
  return (
    <div className="current-container">
      <h1>Current Weather</h1>
      <img src={icon} alt="weather icon" className="current-icon" />
      <p>Current Temp: {Math.round(current.temp)}&deg;F</p>
      <p>Conditions: {description}</p>
      <p>Feels Like: {Math.round(current.feels_like)}&deg;F</p>
      <p>Humidity: {current.humidity}%</p>
      <p>Wind Speed: {Math.round(current.wind_speed)}mph</p>
    </div>
  );
}

export default Current;
