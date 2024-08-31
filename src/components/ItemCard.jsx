import "../blocks/ItemCard.css";
import like from "../assets/like.svg";
import unlike from "../assets/unlike.svg";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ItemCard({ item, setSelectedCard, handleCardLike }) {
  const { setActiveModal } = useContext(AppContext);
  const { userData } = useContext(CurrentUserContext);
  const handleCardClick = (item) => {
    setSelectedCard(item);
    setActiveModal("preview");
  };
  let isLiked = item.likes.some((id) => id === userData._id);

  const onCardLike = () => {
    isLiked = item.likes.some((id) => id === userData._id);
    handleCardLike({ id: item._id, isLiked: isLiked });
  };

  return (
    <div className="card">
      <div className="card__text-container">
        <h2 className="card__text">{item.name}</h2>
        <img
          src={isLiked ? like : unlike}
          alt="card like"
          className="card__like"
          onClick={() => onCardLike()}
        />
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
