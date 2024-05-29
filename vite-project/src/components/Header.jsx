import "../blocks/Header.css";
import headerLogo from "../assets/logo.svg";
import avatarImg from "../assets/avatar.svg";

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="wtwr logo" className="header__logo" />
      <p className="header__date-location">DATE, LOCATION</p>
      <button className="header__add-clothes-btn">+</button>
      <div className="header__add-and-avatar">
        <p className="header__username">USERNAME</p>
        <img src={avatarImg} alt="avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
