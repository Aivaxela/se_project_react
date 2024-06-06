import "../blocks/WeatherCard.css";

function WeatherCard({ weatherData, weatherImages }) {
  const weatherCardImage = weatherImages.find((item) => {
    return item.name === weatherData.weather && item.day === weatherData.isDay;
  });

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.floor(weatherData.temp.F)}&deg; F
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
