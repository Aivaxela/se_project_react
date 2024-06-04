import "../blocks/WeatherCard.css";
import sunny from "../assets/sunny.png";

function WeatherCard({ weatherData, weatherImages }) {
  const sunnyImage = weatherImages.find((item) => {
    return item.name === "sunny";
  });
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.floor(weatherData.temp.F)}&deg; F
      </p>
      <img
        src={`${sunnyImage.link}`}
        alt="weather card image"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
