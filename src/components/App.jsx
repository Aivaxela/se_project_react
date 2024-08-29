import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getWeather, filterWeatherData } from "../utils/weather.js";
import { register, authorize } from "../utils/auth.js";
import { setToken, getToken, removeToken } from "../utils/token.js";
import { CurrentTempContext } from "../contexts/CurrentTemperatureContext.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import "../blocks/App.css";
import Api from "../utils/api.js";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import Footer from "./Footer";
import AddItemModal from "./AddItemModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import LoginModal from "./LoginModal.jsx";
import ItemModal from "./ItemModal.jsx";
import DeleteConfirmModal from "./DeleteConfirmModal.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import {
  currentDate,
  APIkey,
  coords,
  weatherCardImages,
} from "../utils/constants.js";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: "", avatarUrl: "" });
  const [protectedDestination, setProtectedDestination] = useState("");
  const [authLoaded, setAuthLoaded] = useState(false);

  const navigate = useNavigate();

  const api = new Api({
    baseUrl: "http://localhost:3001",
  });

  const [weatherData, setWeatherData] = useState({
    city: "cityname",
    temp: { F: 999, C: 999 },
    type: "clothingtype",
    weather: "weathertype",
  });
  const [clothingItems, setClothingItems] = useState([
    {
      _id: "",
      imageUrl: "",
      name: "",
      weather: "",
    },
  ]);

  useEffect(() => {
    api
      .getClothingItems()
      .then((res) => setClothingItems(res.data))
      .catch((err) => alert(err));
    getWeather(coords, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch((err) => alert(err));

    const jwt = getToken();
    if (!jwt) {
      setAuthLoaded(true);
      return;
    }
    api
      .getCurrentUser(jwt)
      .then((userData) => {
        setIsLoggedIn(true);
        setAuthLoaded(true);
        setUserData({
          name: userData.data.name,
          avatarUrl: userData.data.avatarUrl,
        });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (protectedDestination != "") setActiveModal("login");
  }, [protectedDestination]);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  const handleAddItem = (newItem, resetCurrentForm) => {
    setIsLoading(true);
    newItem._id = assignId();
    api
      .addClothingItem(newItem)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        resetCurrentForm();
        closeActiveModal();
      })
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  };

  const handleDeleteItem = () => {
    api
      .deleteClothingItem(selectedCard._id)
      .then(() => {
        const updatedArr = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );
        setClothingItems(updatedArr);
        closeActiveModal();
      })
      .catch((err) => alert(err));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
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

  const handleRegistration = (values, resetRegistrationForm) => {
    if (!values) return;

    register(values)
      .then(() => {
        setIsLoggedIn(true);
        resetRegistrationForm();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = (values, resetLoginForm) => {
    if (!values) return;

    authorize(values)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setUserData({ name: data.name, avatarUrl: data.avatarUrl });
          setIsLoggedIn(true);
          navigate(protectedDestination || "/");
          setProtectedDestination("");
          resetLoginForm();
          closeActiveModal();
        }
      })
      .catch(console.error);
  };

  const handleSignout = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
    setUserData({ name: "", avatarUrl: "" });
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

  const currentTempContext = {
    currentTempUnit,
    handleTempUnitToggle,
  };

  const currentUserContext = {
    isLoggedIn,
    authLoaded,
    userData,
    protectedDestination,
    setProtectedDestination,
  };

  return (
    <div className="page">
      <div className="page__content">
        <CurrentTempContext.Provider value={currentTempContext}>
          <CurrentUserContext.Provider value={currentUserContext}>
            <Header
              date={currentDate}
              weatherData={weatherData}
              handleAddClick={handleAddClick}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
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
                  <ProtectedRoute>
                    <Profile
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleSignout={handleSignout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onModalClose={closeActiveModal}
              onAddItem={handleAddItem}
              isLoading={isLoading}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              handleLoginClick={handleLoginClick}
              onModalClose={closeActiveModal}
              isLoading={isLoading}
              handleRegistration={handleRegistration}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              handleRegisterClick={handleRegisterClick}
              handleLogin={handleLogin}
              onModalClose={closeActiveModal}
              isLoading={isLoading}
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
          </CurrentUserContext.Provider>
        </CurrentTempContext.Provider>
      </div>
    </div>
  );
}

export default App;
