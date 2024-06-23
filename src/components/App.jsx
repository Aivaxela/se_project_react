import { act, useEffect, useState } from "react";
import "../blocks/App.css";
import {
  currentDate,
  APIkey,
  coords,
  weatherCardImages,
} from "../utils/constants.js";
import { getWeather, filterWeatherData } from "../utils/weather.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm.jsx";
import ItemModal from "./ItemModal.jsx";
import { CurrentTempContext } from "../contexts/CurrentTemperatureContext.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "cityname",
    temp: { F: 999, C: 999 },
    type: "clothingtype",
    weather: "weathertype",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleTempUnitToggle = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  useEffect(() => {
    getWeather(coords, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <CurrentTempContext.Provider
          value={{ currentTempUnit, handleTempUnitToggle }}
        >
          <Header
            date={currentDate}
            weatherData={weatherData}
            handleAddClick={handleAddClick}
            isFahrenheit={currentTempUnit}
            setIsFahrenheit={setCurrentTempUnit}
          />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            weatherImages={weatherCardImages}
          />
          <Footer />
          <ModalWithForm
            title="New garment"
            buttonText="Add garment"
            isOpen={activeModal === "add-garment"}
            handleModalClose={closeActiveModal}
          >
            <label htmlFor="name" className="modal__label">
              Name{" "}
              <input
                type="text"
                className="modal__input"
                id="name"
                placeholder="Name"
              />
            </label>
            <label htmlFor="imageUrl" className="modal__label">
              Image{" "}
              <input
                type="url"
                className="modal__input"
                id="imageUrl"
                placeholder="Image URL"
              />
            </label>
            <fieldset className="modal__radio-buttons">
              <legend className="modal__legend">
                Select the weather type:
              </legend>
              <label htmlFor="hot" className="modal__radio-button">
                <input
                  type="radio"
                  className="modal__radio-input"
                  id="hot"
                  name="weather"
                />
                Hot
              </label>
              <label htmlFor="warm" className="modal__radio-button">
                <input
                  type="radio"
                  className="modal__radio-input"
                  id="warm"
                  name="weather"
                />
                Warm
              </label>
              <label htmlFor="cold" className="modal__radio-button">
                <input
                  type="radio"
                  className="modal__radio-input"
                  id="cold"
                  name="weather"
                />
                Cold
              </label>
            </fieldset>
          </ModalWithForm>
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            handleModalClose={closeActiveModal}
          />
        </CurrentTempContext.Provider>
      </div>
    </div>
  );
}

export default App;
