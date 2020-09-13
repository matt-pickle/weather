import React from 'react';
import DayDisplay from "./DayDisplay";

function Daily(props) { 
  const daily = props.weatherObj.daily;

  const dayDisplays = daily.map(day => {
    return <DayDisplay dt={day.dt}
                       max={day.temp.max}
                       min={day.temp.min}
                       weather={day.weather}
                       feels_like={day.feels_like}
                       pop={day.pop}
                       humidity={day.humidity}
                       wind_speed={day.wind_speed}
           />
  });
  
  return (
    <div className="daily-container">
      <h1>7 Day Forecast</h1>
      {dayDisplays}
    </div>
  );
}

export default Daily;