import "../blocks/App.css";
import { currentDate } from "../utils/constants.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header date={currentDate} />
        <Main />
        <Footer />
        {/* <ModalWithForm /> */}
        {/* <ItemModal /> */}
      </div>
    </div>
  );
}

export default App;
