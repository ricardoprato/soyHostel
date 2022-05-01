import './App.css';
import { useState, useContext } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Prueba from './pages/Prueba/Prueba';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NewPassword from './components/NewPassword/NewPassword';
import Admin from './pages/Admin/Admin';
import CreateRoom from './components/RoomsAdmin/CreateRoom';
import ListRooms from './components/RoomsAdmin/ListRooms';
import BookingFromReception from './components/BookingFromReception/BookingFromReception';
import { GlobalContext } from './GlobalContext/GlobalContext';
import PopupEditRoom from './components/PopupEditRoom/PopupEditRoom';
import RegisterForAdmin from './components/RegisterForAdmin/RegisterForAdmin';


function App() {
  const { rol, setRol } = useContext(GlobalContext);
  console.log('ROL', rol);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<NewPassword />} />
          <Route path="/createroom" element={<CreateRoom />} />
          <Route path="/listrooms" element={<ListRooms />} />
          <Route path="/bookfromreception" element={<BookingFromReception />} />
          <Route path="/editroom/:id" element={<PopupEditRoom />} />
          <Route path="/createadmin" element={<RegisterForAdmin />} />
        </Route>
        <Route path="/reserva" element={<Prueba />} />

        <Route
          path="/admin"
          element={
            <>{rol === 'cliente' ? <Navigate replace to="/" /> : <Admin />}</>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
