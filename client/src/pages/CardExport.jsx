import { useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import QrCode from "qrcode";

import {
  WhatsappIcon,
  WhatsappShareButton,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon
} from "react-share";

const CardExport = () => {
  const { id } = useParams();
  const imageRef = useRef();
  const [downloadLink, setDownloadLink] = useState(null);

  useEffect(() => {
    const canvas = imageRef.current;
    const context = canvas.getContext("2d");
    const bg = document.createElement("img");

    bg.src = "/assets/card.png";

    bg.onload = () => {
      canvas.width = bg.width;
      canvas.height = bg.height;

      context.globalAlpha = 1.0;

      const url = `${window.location.origin}/view/${id}`;

      QrCode.toDataURL(url, { width: "16px", height: "16px" })
        .then((data) => {
          const qc = document.createElement("img");
          qc.src = data;

          qc.onload = () => {
            context.drawImage(bg, 0, 0);
            context.drawImage(qc, bg.width - qc.width, bg.height - qc.height);

            const dataUrl = canvas.toDataURL("image/png", true);

            const cardImage = document.createElement("img");
            cardImage.src = dataUrl;

            const link = document.createElement("a");
            link.href = cardImage.src;
            link.download = "card.png";
            setDownloadLink(link);
          };
        })
        .catch((err) => {
          console.log(`Error generating qr code: ${err.message}`);
        });
    };
  }, []);

  const handleDownload = () => {
    downloadLink.click();
  };

  return (
    <div className="flex flex-col bg-slate-800 w-screen h-screen p-4">
      <p className="text-2xl text-sky-500 font-bold my-4 text-center">
        Card Export
      </p>

      <canvas ref={imageRef}></canvas>

      <button
        onClick={handleDownload}
        className="bg-sky-700 text-white font-bold my-8 mx-auto rounded-lg py-2 px-4"
      >
        Download Card
      </button>
    </div>
  );
};

export default CardExport;
