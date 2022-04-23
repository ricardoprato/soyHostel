import { useState, useEffect } from 'react';
import React from 'react';
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
import ContactUs from '../../components/ContactUs/ContactUs';
import AboutUs from '../../components/AboutUs/AboutUS';
import Explore from '../../components/Explore/Explore';
import Avatar from '../../components/Avatar/Avatar';


const Prueba = () => {
  return (
    <>
      {/* <Google />
      <Avatar /> */}
      {/* <AboutUs /> */}
      {/* <ContactUs /> */}
      {/* <Explore /> */}
      <Reserva/>
    </>
  );
};

export default Prueba;
