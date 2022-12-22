import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import CardExport from "./pages/CardExport";
import CardView from "./pages/CardView";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Verify from "./pages/Verify";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/view/:id" element={<CardView />} />
        <Route path="/export/:id" element={<CardExport />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
