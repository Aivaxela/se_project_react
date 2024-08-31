import "../blocks/Profile.css";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

function Profile({
  setSelectedCard,
  clothingItems,
  handleSignout,
  onCardLike,
}) {
  return (
    <section className="profile">
      <SideBar handleSignout={handleSignout} />
      <ClothesSection
        setSelectedCard={setSelectedCard}
        clothingItems={clothingItems}
        handleCardLike={onCardLike}
      />
    </section>
  );
}

export default Profile;
