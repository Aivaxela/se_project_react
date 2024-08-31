import "../blocks/ItemCard.css";
import likeImg from "../assets/like.svg";
import unlikeImg from "../assets/unlike.svg";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ItemCard({ item, setSelectedCard, handleCardLike }) {
  const { setActiveModal } = useContext(AppContext);
  const { userData, isLoggedIn } = useContext(CurrentUserContext);
  const handleCardClick = (item) => {
    setSelectedCard(item);
    setActiveModal("preview");
  };
  const isLiked = item.likes.some((id) => id === userData.id);

  const onCardLike = () => {
    handleCardLike({ id: item._id, isLiked: isLiked });
  };

  return (
    <div className="card">
      <div className="card__text-container">
        <h2 className="card__text">{item.name}</h2>
        <img
          src={isLiked ? likeImg : unlikeImg}
          alt="card like"
          className={`card__like ${isLoggedIn ? "" : "card__like_hidden"}`}
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
