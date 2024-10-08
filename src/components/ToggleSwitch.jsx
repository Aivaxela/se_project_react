import { useContext } from "react";
import "../blocks/ToggleSwitch.css";
import { CurrentTempContext } from "../contexts/CurrentTemperatureContext";

function ToggleSwitch() {
  const { currentTempUnit, handleTempUnitToggle } =
    useContext(CurrentTempContext);
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
