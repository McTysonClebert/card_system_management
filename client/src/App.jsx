import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import CardExport from "./pages/CardExport";
import CardView from "./pages/CardView";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PasswordUpdate from "./pages/PasswordUpdate";
import Register from "./pages/Register";
import Verify from "./pages/Verify";

const App = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update_password" element={<PasswordUpdate />} />
        <Route path="/export/:id" element={<CardExport />} />
        <Route path="/view/:id" element={<CardView />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
      </Routes>
    </div>
  );
};

export default App;
