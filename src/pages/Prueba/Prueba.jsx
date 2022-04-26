import { useState, useEffect } from 'react';
import React from 'react';
import Cart from '../../components/Cart/Cart';
import Register from '../../components/Register/Register';
import styles from '../../components/Register/Register.module.css';
import Login from '../../components/Login/Login';
import Google from '../../components/Google/Google';
import FilterBar from '../../components/FilterBar/FilterBar';
import Booking from '../../components/Booking/Booking';
import CreateRoom from '../../components/CreateRoom/CreateRoom';
import Avatar from '../../components/Avatar/Avatar';
<<<<<<< HEAD
import RecepTionNavBar from '../../components/ReceptionNavBar/ReceptionNavBar'
import ReceptionFilters from '../../components/ReceptionFilters/ReceptionFilters'
=======
>>>>>>> fe2a872cc83ce25edc39793bb7624b7871ee6fb7
import Calendar from '../../components/Calendar/Calendar';

import ReceptionNavBar from '../../components/ReceptionNavBar/ReceptionNavBar';


const Prueba = () => {
  return (
    <>

      <div style={{ marginTop: '150px', marginRight: '50px' }}>
        {/* <RecepTionNavBar/>
        <ReceptionFilters/>
        <Calendar/> */}
        <Reservations/>
      </div>

      {/* <div style={{ marginTop: '150px', marginRight: '50px' }}>
        <Cart />
      </div> */}

 

      <div style={{ marginTop: '150px', marginRight: '50px' }}>

        <Calendar />
      </div> */}
    </>
  );
}; 

export default Prueba;
