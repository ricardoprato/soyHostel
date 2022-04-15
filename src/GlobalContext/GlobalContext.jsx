import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const ContextProvider = (props) => {
  let mock = [
    {
      roomId: 1,
      bedPrice: 500,
      bedsAvailable: 10,
      roomName: 'Habitación 1',
      description:
        'la habitación es grande, linda, tiene aire acondicionado, tiene 10 camas totales, esta pintada de verde, etc',
      bathroom: true,
      private: false,
    },
    {
      roomId: 2,
      bedPrice: 400,
      bedsAvailable: 10,
      roomName: 'Habitación 1',
      description: 'bal balb la bla bla',
      bathroom: true,
      private: true,
    },
    {
      roomId: 3,
      bedPrice: 650,
      bedsAvailable: 10,
      roomName: 'Habitación 1',
      description: 'bal balb la bla bla',
      bathroom: true,
      private: true,
    },
    {
      roomId: 4,
      bedPrice: 750,
      bedsAvailable: 10,
      roomName: 'Habitación 1',
      description: 'bal balb la bla bla',
      bathroom: true,
      private: true,
    },
    {
      roomId: 5,
      bedPrice: 300,
      bedsAvailable: 10,
      roomName: 'Habitación 1',
      description: 'bal balb la bla bla',
      bathroom: true,
      private: true,
    },
  ];

  const [filterDates, setFilterdates] = useState({
    checkIn: '',
    checkOut: '',
  });

  const [cart, setCart] = useState([]);
  const [filteredAvailableBeds, setFilteredAvailableBeds] = useState(mock);
  const [availableBeds, setAvailablebeds] = useState(mock);
  const [openModal, setOpenModal] = useState(false);

  const getFilteredBeds = (checkIn, checkOut) => {
    fetch(
      'algun endpoint donde le ensarte la globalDate`${checkIn} ${checkOut}`'
    )
      .then((response) => response.json())
      .then((data) => {
        setAvailablebeds(data);
        setFilteredAvailableBeds(data);
      })
      .catch((err) => {
        if (err.response) {
          const { response } = err;
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        }
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        filterDates,
        setFilterdates,
        availableBeds,
        setAvailablebeds,
        cart,
        setCart,
        filteredAvailableBeds,
        setFilteredAvailableBeds,
        getFilteredBeds,
        openModal,
        setOpenModal,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
