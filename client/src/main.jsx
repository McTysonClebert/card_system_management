import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { CardContextProvider } from "./context/CardContext";
import { UserContextProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <UserContextProvider>
      <CardContextProvider>
        <App />
      </CardContextProvider>
    </UserContextProvider>
  </Router>
);
