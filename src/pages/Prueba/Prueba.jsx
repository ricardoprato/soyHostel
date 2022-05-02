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

const Prueba = () => {
  return (
    <>
      {/* <EditRoom />
      <PopupEditRoom /> */}
      {/* <FormEditRoom /> */}
      {/* <ListRooms /> */}
      {/* <InfoUser /> */}
      {/* <Google /> */}

      <Stripe />

      <CreateRoom />
    </>
  );
};

export default Prueba;
