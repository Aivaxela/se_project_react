import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../blocks/App.css";
import {
  currentDate,
  APIkey,
  coords,
  weatherCardImages,
  defaultClothingItems,
} from "../utils/constants.js";
import { getWeather, filterWeatherData } from "../utils/weather.js";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import Footer from "./Footer";
import AddItemModal from "./AddItemModal.jsx";
import ItemModal from "./ItemModal.jsx";
import { CurrentTempContext } from "../contexts/CurrentTemperatureContext.js";
import DeleteConfirmModal from "./DeleteConfirmModal.jsx";

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
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const openConfirmDelete = () => {
    setActiveModal("delete");
  };

  const handleDeleteClick = () => {
    const updatedArr = clothingItems.filter(
      (item) => item._id !== selectedCard._id
    );
    setClothingItems(updatedArr);
    setActiveModal("");
  };

  const onAddItem = (e, newItem) => {
    e.preventDefault();
    newItem._id = clothingItems.length;
    setClothingItems([newItem, ...clothingItems]);
    closeActiveModal();
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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  weatherImages={weatherCardImages}
                  defaultClothingItems={clothingItems}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onModalClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onModalClose={closeActiveModal}
            onDeleteClick={openConfirmDelete}
          />
          <DeleteConfirmModal
            isOpen={activeModal === "delete"}
            onModalClose={closeActiveModal}
            onDeleteClick={handleDeleteClick}
          />
        </CurrentTempContext.Provider>
      </div>
    </div>
  );
}

export default App;
