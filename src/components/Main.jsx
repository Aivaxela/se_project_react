import "../blocks/Cards.css";
import { useContext } from "react";
import WeatherCard from "./WeatherCard";
import Cards from "./Cards";
import { CurrentTempContext } from "../contexts/CurrentTemperatureContext";

function Main({
  weatherData,
  setSelectedCard,
  weatherImages,
  clothingItems,
  onCardLike,
}) {
  const { currentTempUnit } = useContext(CurrentTempContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} weatherImages={weatherImages} />
      <p className="cards__text">
        Today is {weatherData.type} at{" "}
        {Math.floor(weatherData.temp[currentTempUnit])}&deg; {currentTempUnit} /
        You may want to wear:
      </p>
      <Cards
        clothingItems={clothingItems}
        setSelectedCard={setSelectedCard}
        isTempFiltered={true}
        weatherData={weatherData}
        handleCardLike={onCardLike}
      />
    </main>
  );
}

export default Main;
