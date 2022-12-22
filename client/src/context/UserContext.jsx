import { useReducer, useContext, createContext, useEffect } from "react";

const UserContext = createContext();

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_USER":
      return { ...state, user: payload };

    case "LOGOUT_USER":
      localStorage.removeItem("user");
      return { ...state, user: null };

    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      dispatch({ type: "LOGIN_USER", payload: JSON.parse(storedUser) });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserContextProvider, useUserContext };
