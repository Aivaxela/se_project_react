import "../blocks/Cards.css";
import { useContext } from "react";
import WeatherCard from "./WeatherCard";
import Cards from "./Cards";
import { AppContext } from "../contexts/AppContexts";

function Main({ weatherData, handleCardClick, weatherImages, clothingItems }) {
  const { currentTempUnit } = useContext(AppContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} weatherImages={weatherImages} />
      <p className="cards__text">
        Today is {Math.floor(weatherData.temp[currentTempUnit])}&deg;{" "}
        {currentTempUnit} / You may want to wear:
      </p>
      <Cards
        clothingItems={clothingItems}
        onCardClick={handleCardClick}
        isTempFiltered={true}
        weatherData={weatherData}
      />
    </main>
  );
}

export default Main;
