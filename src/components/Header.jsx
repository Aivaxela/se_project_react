import "../blocks/Header.css";
import headerLogo from "../assets/logo.svg";
import avatarImg from "../assets/avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ date, handleAddClick, weatherData }) {
  return (
    <header className="header">
      <img src={headerLogo} alt="wtwr logo" className="header__logo" />
      <p>
        {date} {weatherData.city}
      </p>
      <ToggleSwitch className="header__temp-checkbox" />
      <button
        className="header__add-clothes-btn"
        type="button"
        onClick={handleAddClick}
      >
        + Add clothes
      </button>
      <Link to={"profile"} className="header__profile-link">
        <div className="header__name-and-avatar">
          <p className="header__username">Riley Marcum</p>
          <img src={avatarImg} alt="avatar" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
