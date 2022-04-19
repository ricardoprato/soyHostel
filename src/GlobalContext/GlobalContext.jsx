import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const ContextProvider = (props) => {
  let mock = [
    {
      id: 6,
      nombre: 'Godzilla',
      comodidades: 'AirConditioner, smart Tv, Fridge',
      cantCamas: 10,
      privada: false,
      banoPrivado: true,
      preciosCamas: 400,
      imagenes: [
        "https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/03/freehand.jpg", "https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/06/Hostel-room-types-Freehand-Los-Angeles.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHi2C3bJz-klMrPpGJRR4ljrw4YU2tHbONINASvoo_t5cfVQf35r194GhRqwA9pOa5ras&usqp=CAU"
      ],
      descripcion:
        'This is the hostels biggest room. It has 10 beds, each with its own locker and small light. It has a big window this an ocean view.',
    },
    {
      id: 7,
      nombre: 'Suite',
      comodidades: 'AirConditioner, smart Tv, Fridge, balcone, kitchen',
      cantCamas: 2,
      privada: true,
      banoPrivado: false,
      preciosCamas: 650,
      imagenes: [
        'https://media-cdn.tripadvisor.com/media/photo-s/06/3e/92/2c/hotel-california-bandung.jpg',
        'https://dbijapkm3o6fj.cloudfront.net/resources/1805,1004,1,6,4,0,600,450/-4608-/20210504010539/suite-room.jpeg',
        'https://qph.cf2.quoracdn.net/main-qimg-a3014df16936cc476f36b00cef674abe.webp',
      ],
      descripcion:
        'Our One Bedroom Suite (72m2) was designed in a resort style, providing the comfort and feel of a resort with teak wood furniture and chic white marble bathroom.',
    },
    {
      id: 8,
      nombre: 'Ratatouille',
      comodidades: 'AirConditioner, smart Tv, Fridge',
      cantCamas: 3,
      privada: false,
      banoPrivado: true,
      preciosCamas: 750,
      imagenes: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhu6nVyjLiJZqi3MbtLvvdEZlbYRMYvDcCww&usqp=CAU',
      ],
      descripcion:
        'This is the smallest dorm on the hostel. Only for 3 people, ideal for small friends group or even a couple with a kid.',
    },
    {
      id: 9,
      nombre: 'Average',
      comodidades: 'Fan',
      cantCamas: 6,
      privada: false,
      banoPrivado: false,
      preciosCamas: 500,
      imagenes: [
        'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.afersurf.com/wp-content/uploads/2019/03/6bed1.jpg',
      ],
      descripcion:
        'Normal dorm with 6 beds, personal lockers, sealing fan, mosquito net and a private bathroom. Close to the bar.',
    },
    {
      id: 10,
      nombre: 'Family',
      comodidades: 'Fan',
      cantCamas: 4,
      privada: true,
      banoPrivado: true,
      preciosCamas: 700,
      imagenes: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvLgATHRBwenxFd8W8bmm_AM8_Z1IRdgXFaC24Ge4qvo_GmJUGRz4R7-T6lSLz9kSby3g&usqp=CAU',
      ],
      descripcion:
        'Perfect private room for a couple with 1 or 2 kids. It has a queen size bed and 2 small ones in anothes room. Big onswit bathroom.',
    },
  ];

  const [filterDates, setFilterdates] = useState({
    checkIn: '',
    checkOut: '',
  });

  const [cart, setCart] = useState([]);
  const [filteredAvailableBeds, setFilteredAvailableBeds] = useState(mock);
  const [availableBeds, setAvailablebeds] = useState(mock);

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
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
