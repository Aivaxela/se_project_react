import ItemCard from "./ItemCard";

function Cards({
  clothingItems,
  onCardClick,
  isTempFiltered = false, //optional
  weatherData = {}, //optional
}) {
  const filteredCards = isTempFiltered
    ? clothingItems.filter((item) => item.weather === weatherData.type)
    : clothingItems;

  return (
    <ul className="cards__list">
      {filteredCards.map((item) => {
        if (!item._id) return;
        return (
          <ItemCard key={item?._id} item={item} onCardClick={onCardClick} />
        );
      })}
    </ul>
  );
}

export default Cards;
