import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useCard } from "../../hooks/useCard";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const types = ["vip", "standard", "family"];

const CardCreate = () => {
  const [members, setMembers] = useState({ first: "" });
  const [selectedType, setSelectedType] = useState(types[0]);
  const { createCard, isLoading, error } = useCard();
  const addForm = useRef();

  // useEffect(() => {
  //   const getCard = async (cardId) => {
  //     await fetchingCard(cardId);
  //   };

  //   if (id) {
  //     getCard(id);
  //   }
  // }, [id]);

  const handleAddMember = () => {
    if (Object.entries(members).length === 1) {
      setMembers({ ...members, second: "" });
    } else if (Object.entries(members).length === 2) {
      setMembers({ ...members, third: "" });
    } else if (Object.entries(members).length === 3) {
      setMembers({ ...members, fourth: "" });
    }
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();

    const card = {
      type: selectedType,
      members: Object.entries(members).map(([key, value]) => value)
    };

    await createCard(card);

    setMembers({ first: "" });
    setSelectedType(types[0]);
  };

  return (
    <div className="bg-slate-800 w-screen p-4 md:w-1/3 md:h-screen">
      {error && (
        <p className="bg-red-100 text-red-900 p-4 text-center text-sm italic rounded-lg">
          {error}
        </p>
      )}

      <h1 className="text-2xl font-bold my-3 text-center">Create New Card</h1>
      <form className="flex flex-col gap-4" ref={addForm}>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="name">
            Name
          </label>
          <input
            required
            value={members.first}
            className="bg-gray-900 py-2 px-4 outline-none border-none rounded-lg"
            type="text"
            placeholder="Enter the name of the client"
            onChange={(e) => setMembers({ ...members, first: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="type">
            Card Type
          </label>
          <select
            defaultValue={selectedType}
            className="bg-gray-900 py-2 px-4 outline-none border-none rounded-lg"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type.toLocaleUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {selectedType === "family" && Object.entries(members).length < 4 && (
          <button
            type="button"
            className="bg-sky-400 text-slate-700 py-2 px-4 my-2 outline-none border-none rounded-lg"
            onClick={handleAddMember}
            disabled={isLoading || members.first === ""}
          >
            Add Member
          </button>
        )}

        {selectedType === "family" && Object.entries(members).length > 0 && (
          <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="name">
              Members
            </label>
            {Object.entries(members).map(([position, value], index) => {
              return (
                <input
                  key={index}
                  value={value}
                  className="bg-slate-900 py-2 px-4 outline-none border-none rounded-lg"
                  type="text"
                  onChange={(e) =>
                    setMembers({ ...members, [position]: e.target.value })
                  }
                />
              );
            })}
          </div>
        )}
        <button
          type="submit"
          className="bg-sky-300 text-slate-900 py-3 px-4 my-2 outline-none border-none rounded-lg"
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
