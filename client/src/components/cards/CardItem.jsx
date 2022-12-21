import { BsTrashFill } from "react-icons/bs";
import { TfiExport } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useCard } from "../../hooks/useCard";

const CardItem = ({ card }) => {
  const { deleteCard, isLoading } = useCard();

  const handleDelete = async () => {
    if (!isLoading) {
      await deleteCard(card._id);
    }
  };

  return (
    <li
      className={`${
        card.type === "vip"
          ? "border-l-yellow-500"
          : card.type === "family"
          ? "border-l-gray-500"
          : "border-l-orange-200"
      } border-l-8 flex flex-col bg-slate-900 p-4 rounded-lg shadow-lg gap-2 md:w-2/3 relative`}
    >
      <p className="text-gray-50 text-xl capitalize font-bold">
        Card Type:{" "}
        <span className="text-slate-500 font-normal">{card.type}</span>
      </p>
      {card.type !== "vip" && (
        <p className="text-gray-50 text-xl capitalize font-bold">
          Price:{" "}
          <span className="text-slate-500 font-normal">{card.price}</span> HTG
        </p>
      )}
      <p className="text-gray-50 text-xl capitalize font-bold">
        Card Number:{" "}
        <span className="text-slate-500 font-normal">{card.number}</span>
      </p>
      <div className="flex flex-col">
        <p className="text-gray-50 text-xl capitalize font-bold">Members:</p>
        <ul className="text-slate-500 px-2 italic list-inside list-disc font-normal">
          {card.members.map((member) => (
            <li key={member}>{member}</li>
          ))}
        </ul>
      </div>
      <div className="p-2 flex gap-4 justify-end">
        <BsTrashFill
          size={20}
          className="cursor-pointer"
          onClick={handleDelete}
        />
        <Link to={`/view/${card._id}`}>
          <TfiExport size={20} className="cursor-pointer" />
        </Link>
      </div>
    </li>
  );
};

export default CardItem;
