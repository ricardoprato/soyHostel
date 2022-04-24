import { useState, useEffect } from 'react';
import React from 'react';
<<<<<<< HEAD
import Reserva from '../../components/Reserva/Reserva';
import Cart from '../../components/Cart/Cart';
import ListDeleteRoom from '../../components/ListDeleteRoom/ListDeleteRoom';

const Prueba = () => {
  return <><Reserva/></>;
=======
import Register from '../../components/Register/Register';
import styles from '../../components/Register/Register.module.css';
import Login from '../../components/Login/Login';
import Google from '../../components/Google/Google';
import Reserva from '../Reserva/Reserva';
import FilterBar from '../../components/FilterBar/FilterBar';
import Booking from '../../components/Booking/Booking';
import CreateRoom from '../../components/CreateRoom/CreateRoom';

import Calendar from '../../components/Calendar/Calendar';

import PopupChangePw from '../../components/PopupChangePw/PopupChangePw';

const Prueba = () => {
  return (
    <>
      <div style={{ marginTop: '150px', marginRight: '50px' }}>
        <Calendar />
      </div>
    </>
  );
>>>>>>> cb37293560b5781ee3a3a22965c5cbe84f4a7680
};

export default Prueba;
