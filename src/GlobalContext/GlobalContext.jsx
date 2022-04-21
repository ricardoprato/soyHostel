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
        'https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/03/freehand.jpg',
        'https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/06/Hostel-room-types-Freehand-Los-Angeles.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHi2C3bJz-klMrPpGJRR4ljrw4YU2tHbONINASvoo_t5cfVQf35r194GhRqwA9pOa5ras&usqp=CAU',
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
  let mockReservations = [
    [
      {
        id: '6a5b5fd1-e9dc-4849-af35-79378b938ea4',
        fecha_ingreso: '2022-11-01',
        fecha_egreso: '2022-11-11',
        saldo: 600,
        UsuarioDni: '34592295',
        Usuario: {
          dni: '34592295',
          nombre: 'toni',
          apellido: 'tralice',
        },
        Habitacions: [
          {
            id: 1,
            nombre: 'presidencial',
            comodidades: 'cocina',
            descripcion: 'habitacion gigante',
            cantCamas: 3,
            privada: true,
            precio: null,
            banoPrivado: true,
            createdAt: '2022-04-19T20:20:32.935Z',
            Reserva_Habitacion: {
              createdAt: '2022-04-19T21:08:44.227Z',
              updatedAt: '2022-04-19T21:08:44.227Z',
              ReservaId: '6a5b5fd1-e9dc-4849-af35-79378b938ea4',
              HabitacionId: 1,
            },
          },
        ],
        Camas: [
          {
            id: '921b0051-79ce-4ae4-ba24-eea39e614323',
            precio: 500,
            estado: 'libre',
            HabitacionId: 2,
            HuespedId: null,
            Reserva_Cama: {
              createdAt: '2022-04-19T21:08:44.225Z',
              updatedAt: '2022-04-19T21:08:44.225Z',
              ReservaId: '6a5b5fd1-e9dc-4849-af35-79378b938ea4',
              CamaId: '921b0051-79ce-4ae4-ba24-eea39e614323',
            },
          },
        ],
      },

      {
        id: '36c13d90-8ccf-4d43-8420-251d8c549bef',
        fecha_ingreso: '2022-10-01',
        fecha_egreso: '2022-11-11',
        saldo: 2600,
        UsuarioDni: '34557830',
        Usuario: {
          dni: '34557830',
          nombre: 'Ariel',
          apellido: 'Arzamendia',
        },
        Habitacions: [
          {
            id: 1,
            nombre: 'presidencial',
            comodidades: 'cocina',
            descripcion: 'habitacion gigante',
            cantCamas: 3,
            privada: true,
            precio: null,
            banoPrivado: true,
            createdAt: '2022-04-19T20:20:32.935Z',
            Reserva_Habitacion: {
              createdAt: '2022-04-20T16:06:28.195Z',
              updatedAt: '2022-04-20T16:06:28.195Z',
              ReservaId: '36c13d90-8ccf-4d43-8420-251d8c549bef',
              HabitacionId: 1,
            },
          },
          {
            id: 5,
            nombre: 'messi',
            comodidades: 'cocina',
            descripcion:
              'habitacion giganteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            cantCamas: 5,
            privada: true,
            precio: null,
            banoPrivado: true,
            createdAt: '2022-04-20T15:59:33.230Z',
            Reserva_Habitacion: {
              createdAt: '2022-04-20T16:06:28.197Z',
              updatedAt: '2022-04-20T16:06:28.197Z',
              ReservaId: '36c13d90-8ccf-4d43-8420-251d8c549bef',
              HabitacionId: 5,
            },
          },
        ],
        Camas: [
          {
            id: 'e0b0ecef-40f6-48b9-92f9-9d19faa23ce5',
            precio: 200,
            estado: 'libre',
            HabitacionId: 6,
            HuespedId: null,
            Reserva_Cama: {
              createdAt: '2022-04-20T16:06:28.194Z',
              updatedAt: '2022-04-20T16:06:28.194Z',
              ReservaId: '36c13d90-8ccf-4d43-8420-251d8c549bef',
              CamaId: 'e0b0ecef-40f6-48b9-92f9-9d19faa23ce5',
            },
          },
          {
            id: '921b0051-79ce-4ae4-ba24-eea39e614323',
            precio: 500,
            estado: 'libre',
            HabitacionId: 2,
            HuespedId: null,
            Reserva_Cama: {
              createdAt: '2022-04-20T16:06:28.191Z',
              updatedAt: '2022-04-20T16:06:28.191Z',
              ReservaId: '36c13d90-8ccf-4d43-8420-251d8c549bef',
              CamaId: '921b0051-79ce-4ae4-ba24-eea39e614323',
            },
          },
        ],
      },
    ],
  ];

  //estados globales
  const [filterDates, setFilterdates] = useState({
    checkIn: '',
    checkOut: '',
  });
  const [cart, setCart] = useState([]);
  const [filteredAvailableBeds, setFilteredAvailableBeds] = useState([]);
  const [availableBeds, setAvailablebeds] = useState(mock);

  const [allRooms, setAllRooms] = useState([]);
  const [filteredRooms, setFileteredRooms] = useState([]);

  const [reservations, setReservations] = useState(mockReservations);
  const [details, setDetails] = useState({});

  ///funciones de fetch
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
  const getIdRoom = (roomId) => {
    fetch(`https://back-end-1407.herokuapp.com/habitaciones/${roomId}`)
      .then((response) => response.json())
      .then((data) => setDetails((prev) => data))
      .catch((error) => {
        if (error.response) {
          const { response } = error;
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        }
      });
  };
  const getAllRooms = () => {
    fetch('https://back-end-1407.herokuapp.com/habitaciones')
      .then((response) => response.json())
      .then((data) => {
        setFileteredRooms((prev) => data);
        setAllRooms((prev) => data);
      })
      .catch((error) => {
        if (error.response) {
          const { response } = error;
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        }
      });
  };
  const getReservations = (date1, date2) => {
    fetch(
      `https://back-end-1407.herokuapp.com/reservas/byFecha/?fecha_ingreso=${date1}&fecha_egreso=${date2}`
    )
      .then((response) => response.json())
      .then((data) => {
        setReservations((prev) => data);
      })
      .catch((error) => {
        if (error.response) {
          const { response } = error;
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        }
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        getReservations,
        reservations,
        setReservations,
        allRooms,
        setAllRooms,
        filteredRooms,
        setFileteredRooms,
        details,
        setDetails,
        getAllRooms,
        getIdRoom,
        getFilteredBeds,
        filterDates,
        setFilterdates,
        availableBeds,
        setAvailablebeds,
        cart,
        setCart,
        filteredAvailableBeds,
        setFilteredAvailableBeds,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
