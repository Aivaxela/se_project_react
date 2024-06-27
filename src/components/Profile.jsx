import "../blocks/Profile.css";
import SideBar from "./SideBar";
import Clothes from "./Clothes";

function Profile({ handleCardClick, clothingItems, handleAddClick }) {
  return (
    <section className="profile">
      <SideBar />
      <Clothes
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
      />
    </section>
  );
}

export default Profile;
