import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Reserva from './pages/Reserva/Reserva';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Reserva />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
