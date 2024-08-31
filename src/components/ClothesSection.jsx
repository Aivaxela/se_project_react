import { useContext } from "react";
import "../blocks/Clothes.css";
import Cards from "./Cards";
import { AppContext } from "../contexts/AppContext";

function ClothesSection({ setSelectedCard, clothingItems, handleCardLike }) {
  const { setActiveModal } = useContext(AppContext);

  return (
    <section className="clothes">
      <div className="clothes__heading-container">
        <p className="clothes__subheading">Your items</p>
        <p
          className="clothes__add-btn"
          onClick={() => setActiveModal("add-garment")}
        >
          + Add new
        </p>
      </div>
      <Cards
        clothingItems={clothingItems}
        setSelectedCard={setSelectedCard}
        handleCardLike={handleCardLike}
      />
    </section>
  );
}

export default ClothesSection;
