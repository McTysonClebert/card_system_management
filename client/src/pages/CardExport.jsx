import { useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import QrCode from "qrcode";
import html2canvas from "html2canvas";
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
  const [qrCode, setQrCode] = useState();
  const imageRef = useRef();
  const [image, setImage] = useState();

  useEffect(() => {
    const url = `${window.location.origin}/view/${id}`;
    QrCode.toDataURL(url)
      .then((data) => {
        setQrCode(data);
      })
      .catch((err) => {
        console.log(`Error generating qr code: ${err.message}`);
      });
  }, []);

  useEffect(() => {
    html2canvas(imageRef.current, {
      scale: 2
    })
      .then((canvas) => canvas.toDataURL("image/jpeg", 1.0))
      .catch((err) => {
        console.log(`Error creating image ${err.message}`);
      });
  }, []);

  return (
    <div className="flex flex-col bg-slate-800 w-screen h-screen p-4">
      <p className="text-2xl text-sky-500 font-bold my-4 text-center">
        Card Export
      </p>

      {/* <div
        className="flex w-full h-2/5 md:w-2/4 md:h-3/6 mx-auto text-white overflow-hidden shadow-sm shadow-white relative z-20 p-2 md:p-4 bg-[url('/assets/bg-1.jpeg')] bg-cover rounded-lg"
        ref={imageRef}
      >
        <div className="h-full flex flex-col items-center justify-around">
          <p className="font-bold text-2xl md:text-4xl">Gala De Noel</p>
          <img
            src="/assets/logo.jpeg"
            alt="logo"
            className="w-16 h-16 rounded-full md:w-20 md:h-20"
          />
          <p className="text-gray-50 text-xl md:text-2xl drop-shadow-lg">
            Life Changing
          </p>
        </div>
        <div className="w-16 h-16 md:w-20 md:h-20 bg-black absolute bottom-3 right-3 md:bottom-5 md:right-5">
          <img src={qrCode} alt="QrCode" />
        </div>
      </div> */}

      <div
        className="flex justify-center items-center mx-auto relative"
        ref={imageRef}
      >
        <img
          className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 z-50"
          src={qrCode}
          alt="QrCode"
        />
        <img src="/assets/card.png" alt="card" />
      </div>

      <div className="my-10 text-white md:w-2/4 mx-auto">
        <p className="my-2 text-lg">Share With:</p>
        <div className="flex gap-4 justify-between md:justify-start">
          <WhatsappShareButton url={image}>
            <WhatsappIcon round></WhatsappIcon>
          </WhatsappShareButton>
          <FacebookShareButton url={image}>
            <FacebookIcon round></FacebookIcon>
          </FacebookShareButton>
          <TelegramShareButton url={image}>
            <TelegramIcon round></TelegramIcon>
          </TelegramShareButton>
          <FacebookMessengerShareButton url={image}>
            <FacebookMessengerIcon round></FacebookMessengerIcon>
          </FacebookMessengerShareButton>
        </div>
      </div>
    </div>
  );
};

export default CardExport;
