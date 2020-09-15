import React, {useState, useEffect} from "react";

function Background(props) {
  const [background, setBackground] = useState("");

  useEffect(() => {
    let conditionArr = [];

    //Creates array of current weather conditions
    if (props.weatherObj) {
      props.weatherObj.current.weather.map(item => {
        conditionArr.push(item.main, item.id);
      });
    }

    //Selects background image based on current weather conditions
    conditionArr.includes("Snow") ? setBackground("snow")
    : conditionArr.includes("Thunderstorm" || "Squall" || "Torndado") ? setBackground("thunderstorm")
    : conditionArr.includes("Drizzle" || "Rain") ? setBackground("rain")
    : conditionArr.includes(802 || 803) ? setBackground("partly-cloudy")
    : conditionArr.includes(804 || "Fog") ? setBackground("cloudy")
    : conditionArr.includes("Clear" || 801) ? setBackground("sunny")
    : setBackground("");
  }, [props.weatherObj]);
  
  return (
    <div className={"background " + background}></div>
  )
}

export default Background;