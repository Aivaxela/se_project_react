import "../blocks/Clothes.css";
import Cards from "./Cards";

function Clothes({ handleCardClick, clothingItems }) {
  return (
    <section className="clothes">
      <div className="clothes__heading-container">
        <p className="clothes__subheading">Your items</p>
        <p className="clothes__add-btn">+ Add new</p>
      </div>
      <Cards clothingItems={clothingItems} onCardClick={handleCardClick} />
    </section>
  );
}

export default Clothes;
