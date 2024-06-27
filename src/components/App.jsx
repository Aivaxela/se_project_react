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
import Api from "../utils/api.js";
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

  const api = new Api({
    baseUrl: "http://localhost:3001",
  });

  useEffect(() => {
    api.getClothingItems().then((res) => setClothingItems(res));
    getWeather(coords, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch((err) => alert(err));
  }, []);

  const handleAddItem = (e, newItem, clearInputs) => {
    e.preventDefault();
    newItem._id = assignId();
    api
      .addClothingItem(newItem)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeActiveModal();
        clearInputs();
      })
      .catch((err) => alert(err));
  };

  const handleDeleteItem = () => {
    api
      .deleteClothingItem(selectedCard._id)
      .then(() => {
        const updatedArr = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );
        setClothingItems(updatedArr);
        setActiveModal("");
      })
      .catch((err) => alert(err));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
    console.log(clothingItems);
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

  const handleTempUnitToggle = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  const assignId = () => {
    const itemsSorted = clothingItems.sort((a, b) => a._id - b._id);
    let toCheck = 1;
    for (let i = 0; i < itemsSorted.length; i++) {
      if (toCheck === itemsSorted[i]._id) {
        toCheck++;
        continue;
      } else {
        return toCheck;
      }
    }
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
                  handleAddClick={handleAddClick}
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
