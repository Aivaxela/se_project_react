import "../blocks/App.css";
import { currentDate } from "../utils/constants.js";
import Header from "./Header";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header date={currentDate} />
      </div>
    </div>
  );
}

export default App;
