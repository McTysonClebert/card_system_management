import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCard } from "../hooks/useCard";
import CardItem from "../components/cards/CardItem";
import Error from "../components/Error";
import { useCardContext } from "../context/CardContext";
// import { useUserContext } from "../context/UserContext";

const CardExport = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchingCard, error, isLoading } = useCard();

  const { card } = useCardContext();
  // const { user } = useUserContext();

  useEffect(() => {
    (async () => {
      await fetchingCard(id);
    })();
  }, [id]);

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login", { replace: true });
  //   }
  // }, [user]);

  return (
    <div className="flex flex-col justify-center items-center bg-slate-800 text-white w-screen h-screen p-4">
      {isLoading && (
        <div className="flex justify-center items-center">
          <Puff />
        </div>
      )}

      {error && <Error error={error} />}

      {!error && <CardItem card={card} />}
    </div>
  );
};

export default CardExport;
