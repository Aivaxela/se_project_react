import "../blocks/SideBar.css";
import avatarImg from "../assets/avatar.svg";

function SideBar() {
  return (
    <section className="sidebar">
      <div className="sidebar__user-container">
        <img src={avatarImg} alt="avatar" className="sidebar__user-avatar" />
        <p className="sidebar__username">Riley Marcum</p>
      </div>
    </section>
  );
}

export default SideBar;
