import "../blocks/WeatherCard.css";
// import sunny from "../assets/sunny.png";

function WeatherCard({ weatherData, weatherImages }) {
  let weatherCardImage = weatherImages.find(
    (item) => item.name === weatherData.weather
  ) || { link: "./src/assets/day/sunny.png" };

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.floor(weatherData.temp.F)}&deg; F
      </p>
      <img
        src={`${weatherCardImage.link}`}
        alt={weatherData.weather}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
