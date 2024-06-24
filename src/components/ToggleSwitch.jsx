import React from "react";
import "../blocks/ToggleSwitch.css";
import { CurrentTempContext } from "../contexts/CurrentTemperatureContext";

function ToggleSwitch(className) {
  const currentTempContext = React.useContext(CurrentTempContext);

  return (
    <input
      className={className}
      type="checkbox"
      id="temp"
      onChange={() => currentTempContext.handleTempUnitToggle()}
    />
  );
}

export default ToggleSwitch;
