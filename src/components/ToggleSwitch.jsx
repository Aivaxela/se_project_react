import React from "react";
import "../blocks/ToggleSwitch.css";
import { AppContext } from "../contexts/AppContexts";

function ToggleSwitch() {
  const { currentTempUnit, handleTempUnitToggle } =
    React.useContext(AppContext);
  return (
    <div className={"toggleswitch"} onClick={() => handleTempUnitToggle()}>
      <div
        className={`toggleswitch__circle ${
          currentTempUnit === "C" ? "toggleswitch__circle_celcius" : ""
        }`}
      ></div>
      <div
        className={`toggleswitch__text ${
          currentTempUnit === "C" ? "toggleswitch__text_inactive" : ""
        }`}
      >
        F
      </div>
      <div
        className={`toggleswitch__text ${
          currentTempUnit === "F" ? "toggleswitch__text_inactive" : ""
        }`}
      >
        C
      </div>
    </div>
  );
}

export default ToggleSwitch;
