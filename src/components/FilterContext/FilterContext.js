import React, { useState, createContext } from 'react';

export const FilterContext = createContext();

export const FilterProvider = (props) => {
  const [filter, setFilter] = useState({
    checkIn: {},
    checkOut: {},
    bedsAvailable: 'All beds',
    price: 'All Prices',
    roomTypes: 'All rooms',
    Baths: 'All Baths',
  });
  // mandamos al back, el estado filter con las fechas de checkIn y checkOut;
  // el back nos devuelve una lista de habitaciones disponibles, con sus datos.

  //codigo pidiendo al back disponibilidad desde fecha "x" a fecha "y" // filter.checkin y filter.checkout
  //nos trae un dataBeds es un array con objetos habitaciones

  let dataBeds = [
    {
      idHabitación: 1,
      precio,
      camasDisponibles,
      nombreHabitación,
      imagen,
      descripción,
      baño,
    },
    {
      idHabitación: 2,
      precio,
      camasDisponibles,
      nombreHabitación,
      imagen,
      descripción,
      baño,
    },
    {
      idHabitación: 3,
      precio,
      camasDisponibles,
      nombreHabitación,
      imagen,
      descripción,
      baño,
    },
    {
      idHabitación: 4,
      precio,
      camasDisponibles,
      nombreHabitación,
      imagen,
      descripción,
      baño,
    },
    {
      idHabitación: 5,
      precio,
      camasDisponibles,
      nombreHabitación,
      imagen,
      descripción,
      baño,
    },
    {
      idHabitación: 6,
      precio,
      camasDisponibles,
      nombreHabitación,
      imagen,
      descripción,
      baño,
    },
  ];

  const [availableBeds, setAvailablebeds] = useState([]);

  return (
    <FilterContext.Provider value={[filter, setFilter]}>
      {props.children}
    </FilterContext.Provider>
  );
};
