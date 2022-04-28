import { useState, useEffect } from 'react';
import React from 'react';
import Cart from '../../components/Cart/Cart';
import Register from '../../components/Register/Register';
import styles from '../../components/Register/Register.module.css';
import Login from '../../components/Login/Login';
import Google from '../../components/Google/Google';
import FilterBar from '../../components/FilterBar/FilterBar';
import BookingFromReception from '../../components/BookingFromReception/BookingFromReception';
import CreateRoom from '../../components/RoomsAdmin/CreateRoom';
import Avatar from '../../components/Avatar/Avatar';
import RecepTionNavBar from '../../components/ReceptionNavBar/ReceptionNavBar';
import ReceptionFilters from '../../components/ReceptionFilters/ReceptionFilters';
import Calendar from '../../components/Calendar/Calendar';
import NavBar from '../../components/NavBar/NavBar';
import Bookings from '../../components/Bookings/Bookings'
import ListRooms from '../../components/RoomsAdmin/ListRooms'
import ReceptionNavBar from '../../components/ReceptionNavBar/ReceptionNavBar';

const Prueba = () => {
  return (
    <>
      <div style={{ marginTop: '150px', marginRight: '50px' }}>
        <RecepTionNavBar/>
        <Calendar />
      </div>
      {/* <div style={{ marginTop: '150px', marginRight: '50px' }}>
        <Calendar />
      </div> */}
    </>
  );
};

export default Prueba;
