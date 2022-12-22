import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardItem from "../components/cards/CardItem";
import { useCardContext } from "../context/CardContext";

const CardView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { card } = useCardContext();

  useEffect(() => {
    if (!card) {
      navigate(`/login/${id}`);
    }
  }, []);

  return <CardItem card={card} />;
};

export default CardView;
