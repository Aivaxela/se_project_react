import "../blocks/Clothes.css";
import Cards from "./Cards";

function Clothes({ handleCardClick, clothingItems }) {
  return (
    <section className="clothes">
      <p className="clothes__subheading">Your items</p>
      <Cards clothingItems={clothingItems} onCardClick={handleCardClick} />
    </section>
  );
}

export default Clothes;
