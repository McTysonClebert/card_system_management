import { useState } from "react";
import { useCard } from "../../hooks/useCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const types = ["vip", "standard", "family"];

const CardCreate = () => {
  const [members, setMembers] = useState({ first: "" });
  const [selectedType, setSelectedType] = useState(types[0]);
  const [price, setPrice] = useState(0);
  const { createCard, isLoading, error } = useCard();

  const handleAddMember = () => {
    if (Object.entries(members).length === 1) {
      setMembers({ ...members, second: "" });
    } else if (Object.entries(members).length === 2) {
      setMembers({ ...members, third: "" });
    } else if (Object.entries(members).length === 3) {
      setMembers({ ...members, fourth: "" });
    }
  };

  const handleCardTypeChange = (e) => {
    setSelectedType(e.target.value);

    switch (e.target.value) {
      case "family":
        setPrice(2500);
        break;

      case "standard":
        setPrice(1500);
        setMembers({ first: members.first });
        break;

      default:
        setPrice(0);
        setMembers({ first: members.first });
        break;
    }
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();

    const card = {
      type: selectedType,
      price,
      members: Object.entries(members).map(([key, value]) => value)
    };

    await createCard(card);
  };

  return (
    <div className="px-4 py-8 md:p-10 md:w-2/6">
      {error && (
        <div>
          {toast.error(error)}
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            limit={1}
          />
        </div>
      )}

      <h1 className="text-2xl font-bold my-3 text-center">Create New Card</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-bold" htmlFor="name">
            Name
          </label>
          <input
            required
            value={members.first}
            className="bg-gray-200 py-2 px-4 outline-none border-none rounded-lg"
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
            className="bg-gray-200 py-2 px-4 outline-none border-none rounded-lg"
            onChange={handleCardTypeChange}
          >
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type.toLocaleUpperCase()}
              </option>
            ))}
          </select>
        </div>
        {selectedType !== "vip" && (
          <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="price">
              Price
            </label>
            <input
              required
              value={price}
              className="bg-gray-200 py-2 px-4 outline-none border-none rounded-lg"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        )}

        {selectedType === "family" && Object.entries(members).length < 4 && (
          <button
            type="button"
            className="bg-slate-700 text-gray-50 py-2 px-4 my-2 outline-none border-none rounded-lg"
            onClick={handleAddMember}
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
                  className="bg-gray-200 py-2 px-4 outline-none border-none rounded-lg"
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
          className="bg-gray-900 text-gray-50 py-3 px-4 my-2 outline-none border-none rounded-lg"
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
