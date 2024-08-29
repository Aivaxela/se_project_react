import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getWeather, filterWeatherData } from "../utils/weather.js";
import { register, authorize } from "../utils/auth.js";
import { setToken, getToken, removeToken } from "../utils/token.js";
import { AppContext } from "../contexts/AppContexts.js";
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
  const [userData, setUserData] = useState({ username: "", email: "" });
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
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setAuthLoaded(true);
        setUserData({ username, email });
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

  const handleRegistration = (values) => {
    register(values)
      .then(() => {
        //TODO: sign user in
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = (values) => {
    if (!values) return;

    authorize(values).then((data) => {
      if (data.token) {
        setToken(data.token);
        setUserData(data.user);
        setIsLoggedIn(true);
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
      }
    });
  };

  const handleSignout = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
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

  const contexts = {
    currentTempUnit,
    handleTempUnitToggle,
    isLoggedIn,
    setIsLoggedIn,
    authLoaded,
    protectedDestination,
    setProtectedDestination,
  };

  return (
    <div className="page">
      <div className="page__content">
        <AppContext.Provider value={contexts}>
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
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
