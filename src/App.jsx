import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NavBar />
      <Footer />
    </div>
  );
}

export default App;
