import "../blocks/Header.css";
import headerLogo from "../assets/logo.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";

function Header({ date, weatherData }) {
  const { isLoggedIn, userData } = useContext(CurrentUserContext);
  const { setActiveModal } = useContext(AppContext);

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
          className={`header__button header__el_hovered ${
            !isLoggedIn ? "header__el_hidden" : ""
          }`}
          type="button"
          onClick={() => setActiveModal("add-garment")}
        >
          + Add clothes
        </button>
        <button
          className={`header__button header__el_hovered ${
            isLoggedIn ? "header__el_hidden" : ""
          }`}
          type="button"
          onClick={() => setActiveModal("register")}
        >
          Sign Up
        </button>
        <button
          className={`header__button header__el_hovered ${
            isLoggedIn ? "header__el_hidden" : ""
          }`}
          type="button"
          onClick={() => setActiveModal("login")}
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
              className={`header__avatar header__el_hovered ${
                !userData.avatarUrl ? "header__el_hidden" : ""
              }`}
            />
            <div
              alt="no avatar"
              className={`header__avatar-null header__el_hovered ${
                userData.avatarUrl ? "header__el_hidden" : ""
              }`}
            >
              <p className="header__avatar-null-text">{userData.name[0]}</p>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
