import React from 'react';
import HourDisplay from "./HourDisplay";

function Hourly(props) { 
  const hourly = props.weatherObj.hourly;

  const hourDisplays = hourly.map(hour => {
    return <HourDisplay dt={hour.dt}
                        temp={hour.temp}
                        weather={hour.weather}
                        feels_like={hour.feels_like}
                        pop={hour.pop}
                        humidity={hour.humidity}
                        wind_speed={hour.wind_speed}
                        key={hour.dt}
           />
  });
  
  return (
    <div className="hourly-container">
      <h1 className="section-title">Hourly Forecast</h1>
      {hourDisplays}
    </div>
  );
}

export default Hourly;
