import { useState } from "react";
import { Puff } from "react-loader-spinner";
import { useCard } from "../../hooks/useCard";

const types = ["vip", "standard", "family"];

const CardCreate = () => {
  const [name, setName] = useState("");
  const [selectedType, setSelectedType] = useState(types[0]);
  const { createCard, isLoading, error } = useCard();

  const handleCreateCard = async (e) => {
    e.preventDefault();

    const card = {
      type: selectedType,
      name
    };

    await createCard(card);

    if (!error) {
      setName("");
      setSelectedType(types[0]);
    }
  };

  return (
    <div className="bg-slate-800 w-screen p-4 py-8 md:w-1/3 md:h-screen">
      {error && <Error error={error} />}

      <h1 className="text-2xl font-bold my-3 text-center">Create New Card</h1>

      <form className="flex flex-col gap-4">
        {isLoading && (
          <div className="flex justify-center items-center">
            <Puff />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="name">
            Name
          </label>
          <input
            required
            value={name}
            className="bg-gray-900 py-2 px-4 outline-none border-none rounded-lg text-lg"
            type="text"
            placeholder="Enter the name of the client"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="type">
            Card Type
          </label>
          <select
            defaultValue={selectedType}
            className="bg-gray-900 py-2 px-4 outline-none border-none rounded-lg text-lg"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type.toLocaleUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-sky-300 text-slate-900 font-bold py-3 px-4 my-2 outline-none border-none rounded-lg text-xl"
          onClick={handleCreateCard}
          disabled={isLoading}
        >
          Create Card
        </button>
      </form>
    </div>
  );
};

export default CardCreate;
