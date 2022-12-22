import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { useCardContext } from "../context/CardContext";
import { useCard } from "../hooks/useCard";

const Verify = () => {
  const { id } = useParams();
  const [number, setNumber] = useState(0);
  const { verified } = useCardContext();
  const { verifyCard, isLoading, error } = useCard();

  const navigate = useNavigate();

  const handleConnect = async (e) => {
    e.preventDefault();
    await verifyCard(id, number);
  };

  useEffect(() => {
    if (verified) {
      navigate(`/view/${id}`, { replace: true });
    }
  }, [verified]);

  return (
    <div className="bg-slate-800 text-white w-screen h-screen p-4 flex flex-col justify-center items-center">
      {error && <Error error={error} />}

      <form
        className="flex flex-col gap-4 w-screen md:w-1/3"
        onSubmit={handleConnect}
      >
        {isLoading && (
          <div className="flex justify-center items-center">
            <Puff />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label
            className="font-bold text-xl text-center md:text-left"
            htmlFor="code"
          >
            Enter The Card Number
          </label>
          <input
            value={number}
            className="bg-gray-900 py-2 px-4 outline-none border-none rounded-lg text-lg"
            type="number"
            placeholder="Enter the number of the card"
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-sky-300 text-slate-900 font-bold py-3 px-4 my-2 outline-none border-none rounded-lg text-xl"
        >
          Verify Card
        </button>
      </form>
    </div>
  );
};

export default Verify;
