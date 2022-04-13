import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Reserva from './pages/Reserva/Reserva';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/reserva" element={<Reserva />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
