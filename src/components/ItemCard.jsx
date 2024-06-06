import "../blocks/ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <div className="card">
      <div className="card__text-container">
        <h2 className="card__text">{item.name}</h2>
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;
