import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getWeather, filterWeatherData } from "../utils/weather.js";
import { register, authorize } from "../utils/auth.js";
import { setToken, getToken, removeToken } from "../utils/token.js";
import { CurrentTempContext } from "../contexts/CurrentTemperatureContext.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { AppContext } from "../contexts/AppContext.js";
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
import UpdateUserModal from "./UpdateUserModal.jsx";
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
  const [userData, setUserData] = useState({ id: "", name: "", avatarUrl: "" });
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
    getClothingItems();

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
          id: userData.data._id,
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
    const handleEscClose = (e) => e.key === "Escape" && setActiveModal("");
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  const getClothingItems = () => {
    api
      .getClothingItems()
      .then((res) => setClothingItems(res.data))
      .catch((err) => alert(err));
  };

  const handleAddItem = (newItem, resetCurrentForm) => {
    setIsLoading(true);
    newItem._id = assignId();
    const jwt = getToken();

    api
      .addClothingItem(newItem, jwt)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        resetCurrentForm();
        setActiveModal("");
        getClothingItems();
      })
      .catch((err) => alert(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteItem = () => {
    const jwt = getToken();
    api
      .deleteClothingItem(selectedCard._id, jwt)
      .then(() => {
        const updatedArr = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );
        setClothingItems(updatedArr);
        setActiveModal("");
      })
      .catch((err) => alert(err));
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
        setActiveModal("");
      })
      .catch(console.error);
  };

  const handleLogin = (values, resetLoginForm) => {
    if (!values) return;

    authorize(values)
      .then((userData) => {
        if (userData.token) {
          setToken(userData.token);
          setUserData({
            id: userData.user._id,
            name: userData.user.name,
            avatarUrl: userData.user.avatarUrl,
          });
          setIsLoggedIn(true);
          navigate(protectedDestination || "/");
          setProtectedDestination("");
          resetLoginForm();
          setActiveModal("");
        }
      })
      .catch(console.error);
  };

  const handleUpdateUser = () => {
    const jwt = getToken();

    api.updateCurrentUser(userData, jwt);
  };

  const handleSignout = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
    clearUserData();
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

  const clearUserData = () => {
    setUserData({ id: "", name: "", avatarUrl: "" });
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

  const currentAppContext = {
    setActiveModal,
  };

  return (
    <div className="page">
      <div className="page__content">
        <CurrentTempContext.Provider value={currentTempContext}>
          <CurrentUserContext.Provider value={currentUserContext}>
            <AppContext.Provider value={currentAppContext}>
              <Header
                date={currentDate}
                weatherData={weatherData}
                isFahrenheit={currentTempUnit}
                setIsFahrenheit={setCurrentTempUnit}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      setSelectedCard={setSelectedCard}
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
                        setSelectedCard={setSelectedCard}
                        clothingItems={clothingItems}
                        handleSignout={handleSignout}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
              <AddItemModal
                isOpen={activeModal === "add-garment"}
                onAddItem={handleAddItem}
                isLoading={isLoading}
              />
              <RegisterModal
                isOpen={activeModal === "register"}
                isLoading={isLoading}
                handleRegistration={handleRegistration}
              />
              <LoginModal
                isOpen={activeModal === "login"}
                handleLogin={handleLogin}
                isLoading={isLoading}
              />
              <ItemModal
                isOpen={activeModal === "preview"}
                card={selectedCard}
              />
              <UpdateUserModal
                isOpen={activeModal === "update-user"}
                handleUpdateUser={handleUpdateUser}
                isLoading={isLoading}
              />
              <DeleteConfirmModal
                isOpen={activeModal === "delete"}
                onDeleteClick={handleDeleteItem}
              />
            </AppContext.Provider>
          </CurrentUserContext.Provider>
        </CurrentTempContext.Provider>
      </div>
    </div>
  );
}

export default App;
