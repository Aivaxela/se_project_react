import ItemCard from "./ItemCard";
import "../blocks/Cards.css";

function Clothes({ onCardClick, clothingItems }) {
  return (
    <section className="cards">
      <ul className="cards__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </section>
  );
}

export default Clothes;
