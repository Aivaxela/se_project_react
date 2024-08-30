import { useContext } from "react";
import "../blocks/ItemCard.css";
import { AppContext } from "../contexts/AppContext";

function ItemCard({ item, setSelectedCard }) {
  const { setActiveModal } = useContext(AppContext);
  const handleCardClick = (item) => {
    setSelectedCard(item);
    setActiveModal("preview");
  };

  return (
    <div className="card">
      <div className="card__text-container">
        <h2 className="card__text">{item.name}</h2>
      </div>
      <img
        onClick={() => handleCardClick(item)}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;
