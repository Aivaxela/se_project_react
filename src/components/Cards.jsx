import { useContext } from "react";
import ItemCard from "./ItemCard";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";

function Cards({
  clothingItems,
  onCardClick,
  isTempFiltered = false, //optional
  weatherData = {}, //optional
}) {
  const { userData } = useContext(CurrentUserContext);
  const location = useLocation();

  const cards = Array.from(clothingItems).reverse();

  const filteredCards = isTempFiltered
    ? cards.filter((item) => item.weather === weatherData.type)
    : cards;

  const usersCards = cards.filter((item) => item.owner?._id == userData.id);

  if (location.pathname === "/profile") {
    return (
      <ul className="cards__list">
        {usersCards.map((item) => {
          if (!item._id) return;
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    );
  } else {
    return (
      <ul className="cards__list">
        {filteredCards.map((item) => {
          if (!item._id) return;
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    );
  }
}

export default Cards;
