import "../blocks/WeatherCard.css";

function WeatherCard({ weatherData, weatherImages }) {
  const weatherCardImage = weatherImages.filter((item) => {
    return item.name === weatherData.weather && item.day === weatherData.isDay;
  });

  console.log(weatherCardImage[0]?.url);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.floor(weatherData.temp.F)}&deg; F
      </p>
      <img
        src={`${weatherCardImage[0]?.url}`}
        alt={weatherData.weather}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
