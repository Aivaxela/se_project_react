import React from "react";
import "../blocks/Main.css";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { CurrentTempContext } from "../contexts/CurrentTemperatureContext";

function Main({
  weatherData,
  handleCardClick,
  weatherImages,
  defaultClothingItems,
}) {
  const currentTempUnit = React.useContext(CurrentTempContext).currentTempUnit;

  return (
    <main>
      <WeatherCard weatherData={weatherData} weatherImages={weatherImages} />
      <section className="cards">
        <p className="cards__text">
          Today is {Math.floor(weatherData.temp[currentTempUnit])}&deg;{" "}
          {currentTempUnit} / You may want to wear:
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
