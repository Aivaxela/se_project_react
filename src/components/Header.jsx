import "../blocks/Header.css";
import headerLogo from "../assets/logo.svg";
import avatarImg from "../assets/avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ date, handleAddClick, weatherData }) {
  return (
    <header className="header">
      <div className="header__group">
        <Link to="/">
          <img src={headerLogo} alt="wtwr logo" className="header__logo" />
        </Link>
        <p>
          {date} {weatherData.city}
        </p>
      </div>
      <div className="header__group">
        <ToggleSwitch />
        <button
          className="header__add-clothes-btn header__el_hovered"
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <Link
          to={"profile"}
          className="header__profile-link header__el_hovered"
        >
          <div className="header__name-and-avatar">
            <p className="header__username">Riley Marcum</p>
            <img src={avatarImg} alt="avatar" className="header__avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
