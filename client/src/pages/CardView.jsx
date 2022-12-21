import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useCardContext } from "../context/CardContext";
import { useCard } from "../hooks/useCard";
import QRCode from "qrcode";

const CardView = () => {
  const { id } = useParams();
  const { fetchingCard } = useCard();
  const { card } = useCardContext();
  const [image, setImage] = useState();

  const generateQR = async () => {
    try {
      const url = window.location.href;
      setImage(await QRCode.toDataURL(url));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getCard = async (cardId) => {
      await generateQR();
      await fetchingCard(cardId);
    };

    getCard(id);
  }, []);

  return (
    <div className="bg-gray-500 w-96 h-52 flex p-4 mx-auto my-4">
      <img src={image} alt="" className="bg-black" />
    </div>
  );
};

export default CardView;
