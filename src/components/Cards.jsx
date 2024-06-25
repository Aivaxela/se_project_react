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
    <section className="cards">
      <ul className="cards__list">
        {filteredCards.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </section>
  );
}

export default Cards;
