import React, { useState, createContext } from 'react';

let nada = 0;
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
      Habitacions: [],
      Camas: [
        {
          id: '1caef1d5-e9e8-4c36-a5d9-4eba63b7e5aa',
          precio: 500,
          estado: 'libre',
          HabitacionId: 34,
          HuespedId: null,
          Reserva_Cama: {
            createdAt: '2022-04-19T21:08:44.225Z',
            updatedAt: '2022-04-19T21:08:44.225Z',
            ReservaId: '6a5b5fd1-e9dc-4849-af35-79378b938ea4',
            CamaId: '1caef1d5-e9e8-4c36-a5d9-4eba63b7e5aa',
          },
        },
      ],
    },
  ];

  //estados globales
  const [filterDates, setFilterdates] = useState({
    checkIn: '',
    checkOut: '',
  });
  const [cart, setCart] = useState([]);

  const [reservations, setReservations] = useState([]);

  const [details, setDetails] = useState({});

  const [dataForCards, setDataForCards] = useState([]);
  const [dataForCardsCopy, setDataForCardsCopy] = useState([]);

  const [filteredAvailableBeds, setFilteredAvailableBeds] = useState([]);
  // const [availableBeds, setAvailablebeds] = useState([]); //copia

  const [allRooms, setAllRooms] = useState([]);
  const [filteredRooms, setFileteredRooms] = useState([]); //copia

  const [token, setToken] = useState(false);

  ///funciones que modifican estados

  const getFilteredBeds = (checkIn, checkOut) => {
    fetch(
      `${
        import.meta.env.VITE_APP_URL
      }/reservas/disponibilidad/?ingreso=${checkIn}&egreso=${checkOut}`,
      {
        method: 'GET',
        headers: {
          api: `${import.meta.env.VITE_API}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // setAvailablebeds(data);
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
    // console.log(import.meta.env.VITE_API_URL)
    // console.log(import.meta.env.VITE_API)

    fetch(`${import.meta.env.VITE_APP_URL}/habitaciones/${roomId}`, {
      method: 'GET',
      headers: {
        api: `${import.meta.env.VITE_API}`,
      },
    })
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
    // console.log(import.meta.env.VITE_APP_URL)
    // console.log(import.meta.env.VITE_API)
    fetch(`${import.meta.env.VITE_APP_URL}/habitaciones`, {
      method: 'GET',
      headers: {
        api: `${import.meta.env.VITE_API}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setFileteredRooms(data);
        setAllRooms(data);
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
    //ESTA RUTA NO ESTA EN EL README
    fetch(
      `${
        import.meta.env.VITE_APP_URL
      }/reservas/byFecha/?fecha_ingreso=${date1}&fecha_egreso=${date2}`,
      {
        method: 'GET',
        headers: {
          api: `${import.meta.env.VITE_API}`,
        },
      }
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
  // generamos función que resuelve el tipo de objeto que necesito para mis Cards
  const genDataForCards = () => {
    let filteredCopy = []; //aqui voy a cargar la data convinada de las rutas availableBeds + allRooms
    // filteredAvailableBeds?.length && console.log('filteredAvailableBeds');
    // filteredAvailableBeds?.length && console.log(filteredAvailableBeds);
    // allRooms.length && console.log('allRooms');
    // allRooms.length && console.log(allRooms);

    filteredAvailableBeds?.length > 0 &&
      filteredAvailableBeds.forEach((roomFiltered) => {
        //mapeo por cada habitacion que tiene algo disponible
        let aux = {};
        allRooms?.length &&
          allRooms.forEach((roomFromAll) => {
            //por cada habitacion disponible busco los datos de esa habitacion en allRooms
            if (roomFiltered.idHabitacion === roomFromAll.id) {
              //si coinciden los id de los 2 objetos armo un objeto con la info unificada
              aux = {
                roomId: roomFiltered.idHabitacion, //json de los sueños???
                bedsAvailable: roomFiltered.camasDisponible, //json de los sueños???
                bedIds: roomFiltered?.camasDisponiblesIds, //json de los sueños???
                roomName: roomFromAll.nombre,
                comodities: roomFromAll.comodidades,
                ...(!roomFromAll.privada
                  ? { bedPrice: roomFromAll.precio / roomFromAll.cantCamas }
                  : { bedPrice: roomFromAll.precio }),
                description: roomFromAll.descripcion,
                bathroom: roomFromAll.banoPrivado,
                image: roomFromAll.Imagens,
                private: roomFromAll.privada,
                totalBeds: roomFromAll.cantCamas,
                filtradas: true,
              };
            }
          });
        filteredCopy.push(aux); //voy pusheando cada objero al array que luego pasamos mapeado a las cards
      });
    if (filteredCopy?.length) {
      setDataForCards(filteredCopy);
      setDataForCardsCopy(filteredCopy);
    } //seteo el estado que renderiza las cartas
  };

  return (
    <GlobalContext.Provider
      value={{
        token,
        setToken,
        dataForCards,
        setDataForCards,
        dataForCardsCopy,
        setDataForCardsCopy,
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
        genDataForCards,
        filterDates,
        setFilterdates,
        // availableBeds,
        // setAvailablebeds,
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
