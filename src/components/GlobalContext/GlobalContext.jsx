import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const ContextProvider = (props) => {
  const [filterDates, setFilterdates] = useState({
    checkIn: {},
    checkOut: {},
  });

  // bedsAvailable: 'All beds',
  // price: 'All Prices',
  // roomTypes: 'All rooms',
  //   Baths: 'All Baths',

  // const [availableBeds, setAvailablebeds] = useState([]);

  //este fetch yo lo voy a ejecutar con el filtrado de fechas filter.checkIn filter.checkout (que se modifica en filterbar)

  // const fetchBeds = () => {
  //   fetch(https://localhost:3001/larutaque me den con el filtrado de fechas)
  // .then(response => response.json())
  //     .then(data => setAvailablebeds(data))
  // }

  // mandamos al back, el estado filter con las fechas de checkIn y checkOut;
  // el back nos devuelve una lista de habitaciones disponibles, con sus datos.

  //codigo pidiendo al back disponibilidad desde fecha "x" a fecha "y" // filter.checkin y filter.checkout
  //nos trae un dataBeds es un array con objetos habitaciones

  let availableBeds = [
    {
      roomId: 1,
      bedPrice: 500,
      bedsAvailable: 10,
      roomName: 'Habitación 1',
      description:
        'la habitación es grande, linda, tiene aire acondicionado, tiene 10 camas totales, esta pintada de verde, etc',
      bathroom: true,
      private: true,
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

  return (
    <GlobalContext.Provider
      value={{
        filterDates,
        setFilterdates,
        availableBeds,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
