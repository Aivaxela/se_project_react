import { useState } from "react";
import "../blocks/App.css";
import { currentDate } from "../utils/constants.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });

  return (
    <div className="page">
      <div className="page__content">
        <Header date={currentDate} />
        <Main weatherData={weatherData} />
        <Footer />
        {/* <ModalWithForm /> */}
        {/* <ItemModal /> */}
      </div>
    </div>
  );
}

export default App;
