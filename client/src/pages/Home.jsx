import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardCreate from "../components/cards/CardCreate";
import CardList from "../components/cards/CardList";
import { useUserContext } from "../context/UserContext";

const Home = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  return (
    <div className="bg-slate-800 text-white flex flex-col h-screen overflow-y-auto md:flex-row md:overflow-hidden">
      <CardCreate />
      <CardList />
    </div>
  );
};

export default Home;
