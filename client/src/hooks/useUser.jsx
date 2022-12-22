import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const url = "https://card-system-management.onrender.com/api/v1/users";
// const url = "http://localhost:8000/api/v1/users";

const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { dispatch } = useUserContext();
  const navigate = useNavigate();

  const registerUser = async (user) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/register`, {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "Appllication/Json",
          "Content-Type": "Application/Json"
        },
        body: JSON.stringify(user)
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(payload));
        dispatch({ type: "LOGIN_USER", payload: json });
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const loginUser = async (user) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/login`, {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "Appllication/Json",
          "Content-Type": "Application/Json"
        },
        body: JSON.stringify(user)
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN_USER", payload: json });
        navigate("/");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const logoutUser = () => {
    dispatch({ type: "LOGOUT_USER" });
  };

  return { registerUser, loginUser, logoutUser, isLoading, error };
};

export { useUser };
