import { useEffect } from "react";
import { useCardContext } from "../../context/CardContext";
import CardItem from "./CardItem";
import { useCard } from "../../hooks/useCard";

const CardList = () => {
  const { cards } = useCardContext();
  const { fetchingCard, isLoading } = useCard();

  useEffect(() => {
    const getCards = async () => {
      await fetchingCard();
    };

    getCards();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-slate-300 flex-1 md:overflow-y-auto px-4 py-8 md:p-10 md:w-1/2">
      {cards.length <= 0 && (
        <h1 className="text-2xl font-bold my-3 text-center">
          Card List Is Empty
        </h1>
      )}

      {cards.length > 0 && (
        <h1 className="text-2xl font-bold my-3 text-center">Card List</h1>
      )}

      <ul className="flex flex-col gap-4 md:items-center">
        {cards.map((card) => (
          <CardItem key={card._id} card={card} />
        ))}
      </ul>
    </div>
  );
};

export default CardList;
