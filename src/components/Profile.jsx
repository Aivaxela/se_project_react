import SideBar from "./SideBar";
import Clothes from "./Clothes";

function Profile({ handleCardClick, clothingItems }) {
  return (
    <section className="profile">
      <SideBar />
      <Clothes onCardClick={handleCardClick} clothingItems={clothingItems} />
    </section>
  );
}

export default Profile;
