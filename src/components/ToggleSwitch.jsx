import React from "react";
import "../blocks/ToggleSwitch.css";
import { CurrentTempContext } from "../contexts/CurrentTemperatureContext";

function ToggleSwitch() {
  const currentTempContext = React.useContext(CurrentTempContext);
  const tempUnit = currentTempContext.currentTempUnit;
  return (
    <div
      className={"toggleswitch"}
      onClick={() => currentTempContext.handleTempUnitToggle()}
    >
      <div
        className={`toggleswitch__circle ${
          tempUnit === "C" ? "toggleswitch__circle_celcius" : ""
        }`}
      ></div>
      <div
        className={`toggleswitch__text ${
          tempUnit === "C" ? "toggleswitch__text_inactive" : ""
        }`}
      >
        F
      </div>
      <div
        className={`toggleswitch__text ${
          tempUnit === "F" ? "toggleswitch__text_inactive" : ""
        }`}
      >
        C
      </div>
    </div>
  );
}

export default ToggleSwitch;
