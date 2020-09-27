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
                       key={day.dt}
           />
  });
  
  return (
    <div className="daily-container">
      <h1 className="section-title">7 Day Forecast</h1>
      <div className="day-displays-container">
        {dayDisplays}
        <div className="right-margin-spacer"></div>
      </div>
    </div>
  );
}

export default Daily;