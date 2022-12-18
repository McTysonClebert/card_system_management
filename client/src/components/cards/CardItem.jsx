import { BsTrashFill } from "react-icons/bs";
import { useCard } from "../../hooks/useCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardItem = ({ card }) => {
  const { deleteCard, isLoading, error } = useCard();

  const handleDelete = async () => {
    if (!isLoading) {
      await deleteCard(card._id);
    }
  };

  return (
    <li className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-lg gap-2 md:w-2/3 relative">
      <BsTrashFill
        size={35}
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-gray-500 shadow-sm"
        onClick={handleDelete}
      />
      <p className="text-black text-xl capitalize font-bold">
        Card Type:{" "}
        <span className="text-slate-500 font-normal">{card.type}</span>
      </p>
      {card.type !== "vip" && (
        <p className="text-black text-xl capitalize font-bold">
          Price:{" "}
          <span className="text-slate-500 font-normal">{card.price}</span> HTG
        </p>
      )}
      <div className="flex flex-col">
        <p className="text-black text-xl capitalize font-bold">Members:</p>
        <ul className="text-slate-500 px-2 italic list-inside font-normal">
          {card.members.map((member) => (
            <li key={member}>{member}</li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default CardItem;
