import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { CardContextProvider } from "./context/CardContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <CardContextProvider>
      <App />
    </CardContextProvider>
  </Router>
);
