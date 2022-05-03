import { useState, useEffect } from 'react';
import React from 'react';
import BookingHistory from '../../components/BookingHistory/BookingHistory';

import Stripe from '../../components/Stripe/Stripe';

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
      <BookingHistory />

      {/* <CreateRoom /> */}
    </>
  );
};

export default Prueba;
