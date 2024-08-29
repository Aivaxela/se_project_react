import "../blocks/Header.css";
import headerLogo from "../assets/logo.svg";
import avatarImg from "../assets/avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({
  date,
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  weatherData,
}) {
  const { isLoggedIn, userData } = useContext(CurrentUserContext);

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
          className="header__button header__el_hovered"
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <button
          className={`header__button header__el_hovered ${
            isLoggedIn ? "header__el_hidden" : ""
          }`}
          type="button"
          onClick={handleRegisterClick}
        >
          Sign Up
        </button>
        <button
          className={`header__button header__el_hovered ${
            isLoggedIn ? "header__el_hidden" : ""
          }`}
          type="button"
          onClick={handleLoginClick}
        >
          Log in
        </button>
        <Link
          to={"/profile"}
          className={`header__profile-link header__el_hovered ${
            !isLoggedIn ? "header__el_hidden" : ""
          }`}
        >
          <div className={"header__name-and-avatar"}>
            <p className="header__username">{userData.name}</p>
            <img
              src={userData.avatarUrl}
              alt="avatar"
              className={"header__avatar header__el_hovered"}
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
