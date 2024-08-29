import "../blocks/SideBar.css";
import avatarImg from "../assets/avatar.svg";

function SideBar({ handleSignout }) {
  const signout = () => {
    handleSignout();
  };

  return (
    <section className="sidebar">
      <div className="sidebar__user-container">
        <img src={avatarImg} alt="avatar" className="sidebar__user-avatar" />
        <p className="sidebar__username">Riley Marcum </p>
      </div>
      <button className="sidebar__button">Change profile data</button>
      <button
        onClick={() => signout()}
        type="button"
        className="sidebar__button"
      >
        Log out
      </button>
    </section>
  );
}

export default SideBar;
