import { useEffect } from "react";
import { redirect } from "react-router-dom";
import CardCreate from "../components/cards/CardCreate";
import CardList from "../components/cards/CardList";
import { useUserContext } from "../context/UserContext";

const Home = () => {
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      redirect("/login");
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
