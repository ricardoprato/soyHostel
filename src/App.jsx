import {useState} from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Footer />
    </div>
  );
}

export default App;
