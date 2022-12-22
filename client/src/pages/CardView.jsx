import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCardContext } from "../context/CardContext";
import { useCard } from "../hooks/useCard";
import CardItem from "../components/cards/CardItem";
import Error from "../components/Error";

const CardExport = () => {
  const { id } = useParams();
  const { card } = useCardContext();
  const { fetchingCard, error } = useCard();

  useEffect(() => {
    (async () => {
      await fetchingCard(id);
    })();
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center bg-slate-800 text-white w-screen h-screen p-4">
      {error && <Error error={error} />}
      {!error && <CardItem card={card} />}
    </div>
  );
};

export default CardExport;
