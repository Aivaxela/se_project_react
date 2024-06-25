import ItemCard from "./ItemCard";

function Cards({
  cardsClass,
  isTempFiltered,
  clothingItems,
  onCardClick,
  weatherData = {}, //default to empty object in case isTempFiltered is true and weatherData is not passed
}) {
  const filteredCards = isTempFiltered
    ? clothingItems.filter((item) => item.weather === weatherData.type)
    : clothingItems;

  return (
    <ul className={cardsClass}>
      {filteredCards.map((item) => {
        return (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        );
      })}
    </ul>
  );
}

export default Cards;
