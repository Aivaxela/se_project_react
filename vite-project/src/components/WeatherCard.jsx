import "../blocks/WeatherCard.css";
import sunny from "../assets/sunny.png";

function WeatherCard({ weatherData, weatherImages }) {
  console.log(weatherImages);
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.floor(weatherData.temp.F)}&deg; F
      </p>
      <img
        src={sunny}
        alt="weather card image"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
