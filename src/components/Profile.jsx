import "../blocks/Profile.css";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleSignout,
}) {
  return (
    <section className="profile">
      <SideBar handleSignout={handleSignout} />
      <ClothesSection
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
      />
    </section>
  );
}

export default Profile;
