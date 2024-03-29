import React, { useState, createContext, useEffect } from 'react';

export const GlobalContext = createContext();

export const ContextProvider = (props) => {
  const [filterDates, setFilterdates] = useState({
    checkIn: '',
    checkOut: '',
  });
  const [infoHostel, setInfoHostel] = useState([]);
  const [cart, setCart] = useState([]);
  const [dataPayment, setDataPayment] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [toBack, setToBack] = useState([]);
  const [details, setDetails] = useState({});

  const [dataForCards, setDataForCards] = useState([]);
  const [dataForCardsCopy, setDataForCardsCopy] = useState([]);

  const [filteredAvailableBeds, setFilteredAvailableBeds] = useState([]);
  // const [availableBeds, setAvailablebeds] = useState([]); //copia

  const [allRooms, setAllRooms] = useState([]);
  const [filteredRooms, setFileteredRooms] = useState([]); //copia

  const [token, setToken] = useState(window.localStorage.getItem('tokenProp'));

  const [rol, setRol] = useState('');

  const [googleData, setGoogleData] = useState({});
  const [dataProfile, setDataProfile] = useState({});
  const [flag, setFlag] = useState(false);

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
        if (data.length) {
          setFilteredAvailableBeds(data);
          setFlag(false);
        } else {
          setFlag(true);
        }
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
  let aux = [];
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
    let token = localStorage.getItem('tokenProp');
    fetch(
      `${
        import.meta.env.VITE_APP_URL
      }/reservas/byFecha/?ingreso=${date1}&egreso=${date2}`,
      {
        method: 'GET',
        headers: {
          api: `${import.meta.env.VITE_API}`,
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setReservations(data);
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
                id: roomFiltered.idHabitacion, //json de los sueños???
                cantCamas: roomFiltered?.camasDisponible, //json de los sueños???
                bedIds: roomFiltered?.camasDisponiblesIds,
                nombre: roomFromAll.nombre,
                comodidades: roomFromAll.comodidades,
                precio: roomFromAll.precio,
                descripcion: roomFromAll.descripcion,
                banoPrivado: roomFromAll.banoPrivado,
                Imagens: roomFromAll.Imagens,
                privada: roomFromAll.privada,
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
      setFileteredRooms(filteredCopy);
    } //seteo el estado que renderiza las cartas
    // console.log(filteredCopy);
  };
  const getInfoHostel = () => {
    fetch(import.meta.env.VITE_APP_URL + '/hostel', {
      method: 'GET',
      headers: {
        api: `${import.meta.env.VITE_API}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setInfoHostel(data);
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
        infoHostel,
        getInfoHostel,
        token,
        setToken,
        rol,
        setRol,
        toBack,
        setToBack,
        googleData,
        setGoogleData,
        dataProfile,
        setDataProfile,
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
        dataPayment,
        setDataPayment,
        cart,
        setCart,
        filteredAvailableBeds,
        setFilteredAvailableBeds,
        flag,
        setFlag,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
