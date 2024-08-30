import "../blocks/Profile.css";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

function Profile({ setSelectedCard, clothingItems, handleSignout }) {
  return (
    <section className="profile">
      <SideBar handleSignout={handleSignout} />
      <ClothesSection
        setSelectedCard={setSelectedCard}
        clothingItems={clothingItems}
      />
    </section>
  );
}

export default Profile;
