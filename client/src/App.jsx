import CardCreate from "./components/cards/CardCreate";
import CardList from "./components/cards/CardList";

const App = () => {
  return (
    <div className="flex flex-col w-screen md:h-screen justify-center md:flex-row md:overflow-hidden">
      <CardCreate />
      <CardList />
    </div>
  );
};

export default App;
