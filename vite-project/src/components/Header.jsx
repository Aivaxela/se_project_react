import "../blocks/Header.css";
import headerLogo from "../assets/logo.svg";
import avatarImg from "../assets/avatar.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={headerLogo} alt="wtwr logo" className="header__logo" />
      <p className="header__date-location">{props.date}</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__add-and-avatar">
        <p className="header__username">Username</p>
        <img src={avatarImg} alt="avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
