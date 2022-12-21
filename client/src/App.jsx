import { Routes, Route } from "react-router-dom";
import CardView from "./pages/CardView";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/view/:id" element={<CardView />} />
    </Routes>
  );
};

export default App;
