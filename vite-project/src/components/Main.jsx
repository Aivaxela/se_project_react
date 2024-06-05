import "../blocks/Main.css";
import WeatherCard from "./WeatherCard";
import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";

function Main({ weatherData, handleCardClick, weatherImages }) {
  // console.log(weatherData);
  return (
    <main>
      <WeatherCard weatherData={weatherData} weatherImages={weatherImages} />
      <section className="cards">
        <p className="cards__text">
          Today is {Math.floor(weatherData.temp.F)}&deg; F / You may want to
          wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
