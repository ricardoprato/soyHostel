import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
<<<<<<< HEAD

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
=======
import { ContextProvider } from "./components/GlobalContext/GlobalContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ContextProvider>,
>>>>>>> cc1c9ee53e65f7eb6e638a2975a73547cc36128e
  document.getElementById("root")
);
