import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalContext } from "./components/GlobalContext/GlobalContext";

ReactDOM.render(
  <GlobalContext.Provider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </GlobalContext.Provider>,
  document.getElementById("root")
);
