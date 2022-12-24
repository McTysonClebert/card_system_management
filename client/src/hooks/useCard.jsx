import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCardContext } from "../context/CardContext";

const url = "https://card-system-management.onrender.com/api/v1/cards";
// const url = "http://localhost:8000/api/v1/cards";

const useCard = () => {
  const navigate = useNavigate();
  const { dispatch } = useCardContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchingCards = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        setIsLoading(false);
        dispatch({
          type: "SET_CARDS",
          payload: json
        });
        setError(null);
      }
    } catch (error) {
      console.log(`Error fetching cards: ${error.message}`);
    }
  };

  const fetchingCard = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/${id}`, {
        mode: "cors",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        setIsLoading(false);
        dispatch({
          type: "SET_CARD",
          payload: json
        });
        setError(null);
      }
    } catch (error) {
      console.log(`Error fetching card: ${error}`);
    }
  };

  const verifyCard = async (id, number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/${id}`, {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ number })
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        setIsLoading(false);
        dispatch({
          type: "SET_VERIFY",
          payload: json
        });

        localStorage.setItem("cardVerified", JSON.stringify(json.card));
        setError(null);
      }
    } catch (error) {
      console.log(`Error vrifying card: ${error.message}`);
    }
  };

  const createCard = async (card) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        setIsLoading(false);
        dispatch({ type: "CREATE_CARD", payload: json });
        setError(null);
      }
    } catch (error) {
      console.log(`Error creating card: ${error.message}`);
    }
  };

  const deleteCard = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/${id}`, {
        mode: "cors",
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        setIsLoading(false);
        dispatch({ type: "DELETE_CARD", payload: json });
        setError(null);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(`Error deleting card: ${error.message}`);
    }
  };

  return {
    fetchingCards,
    fetchingCard,
    verifyCard,
    createCard,
    deleteCard,
    isLoading,
    error
  };
};

export { useCard };
