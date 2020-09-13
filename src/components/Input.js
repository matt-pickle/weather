import React, {useState} from 'react';
import Button from "./Button";

function Input(props) { 
  const [zip, setZip] = useState("");

  function handleChange(event) {
    setZip(event.target.value);
  }

  function handleSubmit() {
    props.handleZipSubmit(zip);
    setZip("");
  }

  return (
    <div className="input-container">
      <label htmlFor="zip-input" className="zip-label">Enter your Zip code (USA only)</label>
      <input id="zip-input"
             type="text"
             value={zip}
             onChange={handleChange}
      />
      <Button text="Submit"
              onClick={handleSubmit}
      />
    </div>
  );
}

export default Input;