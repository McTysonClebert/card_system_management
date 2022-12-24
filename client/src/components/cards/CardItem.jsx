import { BsTrashFill } from "react-icons/bs";
import { TfiExport } from "react-icons/tfi";
import { Puff } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useCard } from "../../hooks/useCard";
import { useUserContext } from "../../context/UserContext";
import { format } from "date-fns";

const CardItem = ({ card }) => {
  const { user } = useUserContext();
  const { deleteCard, isLoading } = useCard();

  const handleDelete = async () => {
    if (!isLoading) {
      await deleteCard(card._id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Puff />
      </div>
    );
  }

  return (
    <li
      className={`${
        card?.type === "vip"
          ? "border-l-yellow-500"
          : card?.type === "family"
          ? "border-l-gray-500"
          : "border-l-orange-200"
      } border-l-8 flex flex-col bg-slate-900 p-4 rounded-lg shadow-lg gap-2 md:w-2/3 relative`}
    >
      <p className="text-gray-50 text-xl capitalize font-bold">
        Card Type:{" "}
        <span className="text-sky-400 font-normal">{card?.type}</span>
      </p>
      {card?.type !== "vip" && (
        <p className="text-gray-50 text-xl capitalize font-bold">
          Price: <span className="text-sky-400 font-normal">{card?.price}</span>{" "}
          HTG
        </p>
      )}
      <p className="text-gray-50 text-xl capitalize font-bold">
        Card Number:{" "}
        <span className="text-sky-400 font-normal">{card?.number}</span>
      </p>
      <p className="text-gray-50 text-xl capitalize font-bold">
        Client: <span className="text-sky-400 font-normal">{card?.name}</span>
      </p>
      <p className="text-gray-50 text-xl capitalize font-bold">
        Date:{" "}
        <span className="text-sky-400 font-normal">
          {format(new Date(card?.createdAt), "EEEE,MMMM do, yyyy hh:mm a")}
        </span>
      </p>
      {user?.role === "admin" && (
        <div className="p-2 flex gap-4 justify-end">
          <BsTrashFill
            size={20}
            className="cursor-pointer"
            onClick={handleDelete}
          />
          <Link to={`/export/${card?._id}`}>
            <TfiExport size={20} className="cursor-pointer" />
          </Link>
        </div>
      )}
    </li>
  );
};

export default CardItem;
