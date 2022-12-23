import { useEffect } from "react";
import { useReducer, useContext, createContext } from "react";

const CardContext = createContext();

const cardReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CARDS":
      return { ...state, cards: payload };

    case "SET_CARD":
      return { ...state, card: payload };

    case "SET_VERIFY":
      return { ...state, card: payload.card, verified: payload.verified };

    case "CREATE_CARD":
      return { ...state, cards: [...state.cards, payload] };

    case "DELETE_CARD":
      const { _id } = payload;
      return {
        ...state,
        cards: state.cards.filter((card) => card._id !== _id)
      };

    default:
      return state;
  }
};

const CardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cardReducer, {
    cards: [],
    card: null,
    verified: false
  });

  useEffect(() => {
    const cardVerified = localStorage.getItem("cardVerified");

    if (cardVerified) {
      dispatch({ type: "SET_VERIFY", payload: JSON.parse(cardVerified) });
    }
  }, []);

  console.log("====================================");
  console.log(state);
  console.log("====================================");

  return (
    <CardContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CardContext.Provider>
  );
};

const useCardContext = () => useContext(CardContext);

export { CardContextProvider, useCardContext };
