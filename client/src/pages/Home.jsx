import CardCreate from "../components/cards/CardCreate";
import CardList from "../components/cards/CardList";

const Home = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col h-screen overflow-y-auto md:flex-row md:overflow-hidden">
      <CardCreate />
      <CardList />
    </div>
  );
};

export default Home;
