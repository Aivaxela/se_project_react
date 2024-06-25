import "../blocks/ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <div className="card">
      <div className="card__text-container">
        <h2 className="card__text">{item.name}</h2>
      </div>
      <img
        onClick={() => onCardClick(item)}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;
