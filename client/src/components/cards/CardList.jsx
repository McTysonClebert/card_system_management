import { useEffect } from "react";
import { useCardContext } from "../../context/CardContext";
import CardItem from "./CardItem";
import { useCard } from "../../hooks/useCard";
import { useState } from "react";
import { Puff } from "react-loader-spinner";

const CardList = () => {
  const { cards } = useCardContext();
  const { fetchingCards, isLoading } = useCard();
  const [selectedType, setSelectedType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getCards = async () => {
      await fetchingCards();
    };

    getCards();
  }, []);

  return (
    <div className="flex flex-col bg-slate-700 w-screen p-4 md:flex-1 relative">
      {isLoading && (
        <div className="flex justify-center items-center">
          <Puff />
        </div>
      )}

      {cards.length <= 0 ? (
        <h1 className="text-2xl font-bold my-2 text-center">
          Card List Is Empty
        </h1>
      ) : (
        <h1 className="text-2xl font-bold my-2 text-center">Card List</h1>
      )}

      <form className="flex flex-col gap-1 justify-center items-center mx-auto py-8 md:flex-row md:w-2/3">
        <div className="bg-gray-900 outline-none border-none rounded-lg w-full md:w-3/4">
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none bg-transparent border-none p-3 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={cards.length <= 0}
          />
        </div>
        <select
          name="type"
          className="bg-gray-900 p-3 outline-none border-none rounded-lg w-full md:w-1/4 text-lg"
          onChange={(e) =>
            setSelectedType(e.target.value !== "all" ? e.target.value : null)
          }
          disabled={cards.length <= 0}
        >
          <option value="all">All</option>
          <option value="vip">Vip</option>
          <option value="family">Family</option>
          <option value="standard">Standard</option>
        </select>
      </form>

      <ul className="flex-1 flex flex-col gap-2 md:items-center h-3/5 overflow-y-auto">
        {cards
          .filter((item) => {
            if (!selectedType) return item.type !== selectedType;
            else return item.type === selectedType;
          })
          .filter((item) => {
            return item.price
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((card) => (
            <CardItem key={card._id} card={card} />
          ))}
      </ul>
    </div>
  );
};

export default CardList;
