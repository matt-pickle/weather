import React, {useState, useEffect} from "react";

function Background(props) {
  const [background, setBackground] = useState("");

  useEffect(() => {
    if (props.weatherObj) {
      const current = props.weatherObj.current;
      //Checks for night time
      const now = new Date() / 1000;
      if (now < current.sunrise || now > current.sunset) {
        setBackground("night");
      } else {
        //Creates array of current weather conditions
        let conditionArr = [];
        current.weather.map(item => {
          conditionArr.push(item.main, item.id);
        });
        //Selects background image based on current weather conditions
        conditionArr.includes("Snow") ? setBackground("snow")
        : conditionArr.includes("Thunderstorm" || "Squall" || "Torndado") ? setBackground("thunderstorm")
        : conditionArr.includes("Drizzle" || "Rain") ? setBackground("rain")
        : conditionArr.includes(802 || 803) ? setBackground("partly-cloudy")
        : conditionArr.includes(804 || "Fog") ? setBackground("cloudy")
        : conditionArr.includes("Clear" || 801) ? setBackground("sunny")
        : setBackground("");
      }
    } 
  }, [props.weatherObj]);
  
  return (
    <div className={"background " + background}></div>
  )
}

export default Background;