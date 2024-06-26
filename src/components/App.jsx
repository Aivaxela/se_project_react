import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getWeather, filterWeatherData } from "../utils/weather.js";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import Footer from "./Footer";
import AddItemModal from "./AddItemModal.jsx";
import ItemModal from "./ItemModal.jsx";
import DeleteConfirmModal from "./DeleteConfirmModal.jsx";
import "../blocks/App.css";
import { CurrentTempContext } from "../contexts/CurrentTemperatureContext.js";
import { getClothingItems } from "../utils/api.js";
import {
  currentDate,
  APIkey,
  coords,
  weatherCardImages,
} from "../utils/constants.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "cityname",
    temp: { F: 999, C: 999 },
    type: "clothingtype",
    weather: "weathertype",
  });
  const [clothingItems, setClothingItems] = useState([
    {
      imageUrl: "",
      name: "",
      weather: "",
    },
  ]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  useEffect(() => {
    getClothingItems().then((res) => setClothingItems(res));
    getWeather(coords, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

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

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteItem = () => {
    const updatedArr = clothingItems.filter(
      (item) => item._id !== selectedCard._id
    );
    setClothingItems(updatedArr);
    setActiveModal("");
  };

  const handleAddItem = (e, newItem) => {
    e.preventDefault();
    newItem._id = clothingItems.length;
    setClothingItems([newItem, ...clothingItems]);
    closeActiveModal();
  };

  const handleTempUnitToggle = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

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
                  clothingItems={clothingItems}
                  weatherImages={weatherCardImages}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onModalClose={closeActiveModal}
            onAddItem={handleAddItem}
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
            onDeleteClick={handleDeleteItem}
          />
        </CurrentTempContext.Provider>
      </div>
    </div>
  );
}

export default App;
