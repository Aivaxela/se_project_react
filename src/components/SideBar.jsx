import "../blocks/SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function SideBar({ handleSignout }) {
  const { userData } = useContext(CurrentUserContext);
  const signout = () => {
    handleSignout();
  };

  return (
    <section className="sidebar">
      <div className="sidebar__user-container">
        <img
          src={userData.avatarUrl}
          alt="avatar"
          className={`sidebar__avatar ${
            !userData.avatarUrl ? "sidebar__el_hidden" : ""
          }`}
        />
        <div
          alt="no avatar"
          className={`sidebar__avatar-null ${
            userData.avatarUrl ? "sidebar__el_hidden" : ""
          }`}
        >
          <p className="sidebar__avatar-null-text">{userData.name[0]}</p>
        </div>
        <p className="sidebar__username">{userData.name}</p>
      </div>
      <div className="sidebar__buttons-container">
        <button className="sidebar__button">Change profile data</button>
        <button
          onClick={() => signout()}
          type="button"
          className="sidebar__button"
        >
          Log out
        </button>
      </div>
    </section>
  );
}

export default SideBar;
