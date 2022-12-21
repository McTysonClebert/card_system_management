import { useState } from "react";
import { useCardContext } from "../context/CardContext";

const url = "https://busy-gray-ray-shoe.cyclic.app/api/v1/cards";
// const url = "http://localhost:8000/api/v1/cards";

const useCard = () => {
  const { dispatch } = useCardContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchingCards = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
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
      }
    } catch (error) {
      console.log(`Error fetching card: ${error}`);
    }
  };

  const fetchingCard = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/api/v1/cards/${id}`);
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
      }
    } catch (error) {
      console.log(`Error fetching card: ${error}`);
    }
  };

  const createCard = async (card) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/v1/cards", {
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
      }
    } catch (error) {
      console.log(`Error fetching card: ${error}`);
    }
  };

  const deleteCard = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/api/v1/cards/${id}`, {
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
      }
    } catch (error) {
      console.log(`Error fetching card: ${error}`);
    }
  };

  return {
    fetchingCards,
    fetchingCard,
    createCard,
    deleteCard,
    isLoading,
    error
  };
};

export { useCard };
