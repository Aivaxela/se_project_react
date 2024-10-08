import { useContext } from "react";
import "../blocks/WeatherCard.css";
import { CurrentTempContext } from "../contexts/CurrentTemperatureContext";

function WeatherCard({ weatherData, weatherImages }) {
  const weatherCardImage = weatherImages.find((item) => {
    return (
      (item.name === weatherData.weather && item.day === weatherData.isDay) ??
      item.name === "clear"
    );
  });
  const { currentTempUnit } = useContext(CurrentTempContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.floor(weatherData.temp[currentTempUnit])}&deg;
        {currentTempUnit}
      </p>
      <img
        src={`${weatherCardImage?.url}`}
        alt={weatherData.weather}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
