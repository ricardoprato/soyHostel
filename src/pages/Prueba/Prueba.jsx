import { useState, useEffect } from 'react';
import React from 'react';
import InfoUser from '../../components/InfoUser/InfoUser';
import Stripe from '../../components/Stripe/Stripe';

const Prueba = () => {
  return (
    <>
      {/* <EditRoom />
      <PopupEditRoom />
      <FormEditRoom />
      <ListRooms /> */}
      <InfoUser />
      <Stripe />
      {/* <CreateRoom /> */}
    </>
  );
};

export default Prueba;
