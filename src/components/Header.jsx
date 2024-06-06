import "../blocks/Header.css";
import headerLogo from "../assets/logo.svg";
import avatarImg from "../assets/avatar.svg";

function Header({ date, handleAddClick, weatherData }) {
  return (
    <header className="header">
      <img src={headerLogo} alt="wtwr logo" className="header__logo" />
      <p>
        {date} {weatherData.city}
      </p>
      <button
        className="header__add-clothes-btn"
        type="button"
        onClick={handleAddClick}
      >
        + Add clothes
      </button>
      <div className="header__add-and-avatar">
        <p className="header__username">Riley Marcum</p>
        <img src={avatarImg} alt="avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
