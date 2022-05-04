import React, { useContext, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './BookingFromReception.module.css';
import countries from '../../data/countries.json';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
// console.log(countries);



export function validate(input) {

  /////// VALIDACiONES /////////////////////////////////
  let errores = {};

  //   Name
  if (!input.name) {
    errores.name = 'Please enter a name';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.name)) {
    errores.name = 'The name can only contain letters and spaces';
  }

  // Validacion lastname
  if (!input.lastName) {
    errores.lastName = 'Please enter a lastname';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.lastName)) {
    errores.lastName = 'The lastname can only contain letters and spaces';
  }

  // gender
  if (!input.gender) {
    errores.gender = 'Please select a gender';
  }

  // Validacion DNI
  if (!input.docNumber) {
    errores.docNumber = 'Please enter a dni';
  } else if (!/^[0-9]{8,20}$/.test(input.docNumber)) {
    errores.docNumber = 'The dni can only contain numbers';
  }

  // Validacion correo
  if (!input.email) {
    errores.email = 'Please enter a email';
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.email)
  ) {
    errores.email =
      'Email can only contain letters, numbers, points, script and underscores';
  }

  // Validacion documento tipo
  if (!input.docType) {
    errores.docType = 'Please select a document type';
  }

  // Validacion nationality
  if (!input.nationality) {
    errores.nationality = 'Please enter your nationality';
  }

  const today = new Date();
  if (!input.checkIn) {
    errores.checkIn = 'Please enter checkIn date';
  } else if (input.checkIn < today.toLocaleDateString('en-CA')) {
    // console.log(input.checkIn);
    // console.log(today.toLocaleDateString('en-CA'));
    errores.checkIn = 'CheckIn cant be in the past';
  }

  if (!input.checkOut) {
    errores.checkOut = 'Please enter checkOut date';
  } else if (input.checkOut <= input.checkIn) {
    errores.checkOut = 'Checkout has to be after checkIn';
  }

  if (!input.roomIds) {
    errores.roomIds = 'Please select room';
  }

  if (!input.bedQuantity && input.private === false) {
    if (input?.bedQuantity === 0) {
      errores.bedQuantity = 'Please select number of beds';
    } else if (toBack?.camas?.length === 0) {
      errores.bedQuantity =
        'Pleade click add to finish adding the selected beds';
    }
  }

  // Validacion birthdate
  var actual = new Date();

  const [actualMenos18, month, day] = [
    actual.getFullYear() - 18,
    actual.getMonth() + 1,
    actual.getDate(),
  ];
  const array = [actualMenos18, month, day];
  let arrayLindo = new Date(array.join('-'));

  const formatYmd = (date) => date.toISOString().slice(0, 10);

  let fechaActualFormateada = null;
  if (arrayLindo) {
    fechaActualFormateada = formatYmd(arrayLindo);
  }
  if (birthDate.value) {
    input.birthDate = formatYmd(new Date(birthDate.value));
  }

  if (!input.birthDate) {
    errores.birthDate = 'Please enter a birthdate';
  } else if (!(input.birthDate <= fechaActualFormateada)) {
    errores.birthDate = 'Need to be 18 or more years old';
  }

  return errores;
}

const Booking = () => {
  const {
    filteredAvailableBeds, ////// Global Context Imports ////////////////////////////////
    allRooms,
    dataForCardsCopy,
    dataForCards,
    setDataForCards,
    getAllRooms,
    getFilteredBeds,
    genDataForCards,
  } = useContext(GlobalContext);
  let initialState = {
    /////// Inputs initial state ///////////////////////
    name: '',
    lastName: '',
    docType: '',
    docNumber: '',
    birthDate: '',
    nationality: '',
    email: '',
    roomIds: 0,
    bedQuantity: 0,
    checkIn: '',
    checkOut: '',
    private: '',
    totalBeds: [],
    price: 0,
  };
  const [input, setInput] = useState(initialState);

  const [toBack, setToBack] = useState({

    camas: [],
    habitaciones: [],
    saldo: 0,
    ingreso: '',
    egreso: '',
    nombre: '',
    apellido: '',
    tipoDoc: '',
    numDoc: '',
    fechaNac: '',
    nacionalidad: '',
    email: '',
    genero: '',

  });

  let [error, setError] = useState({}); ////////  Mensajes de error //////////////////////

  useEffect(() => {
    allRooms?.length === 0 && getAllRooms();
  }, [allRooms]);

  useEffect(() => {
    filteredAvailableBeds?.length > 0 && genDataForCards(); // HandleClick carga filteredAvailableBeds y genDataForCards arma lista de habitaciones disponibles /////////////
  }, [filteredAvailableBeds]);



  useEffect(() => {
    console.log('input --> ', input);
  }, [input]);

  useEffect(() => {
    console.log('toBack --> ', toBack);
  }, [toBack]);

  useEffect(() => {
    console.log('dataforCards --> ', dataForCards);
  }, [dataForCards]);

  const handleRoomSelect = (e) => {
    let id = Number(e.target.value);
    let aux = dataForCards.filter((r) => r.id === id);
    if (aux[0].privada === true) {
      setInput({ ...input, private: true, roomIds: id, price: aux[0].precio });
    } else {
      let aux2 = [];
      let i = 1;
      aux[0]?.bedIds.forEach((c) => {
        aux2.push(i);
        i++;
      });
      setInput({
        ...input,
        private: false,
        roomIds: id,
        totalBeds: [...aux2],
        price: aux[0].precio / aux[0].totalBeds,
      });
    }
  };

  let handleChange = (e) => {

    // valida todos los inputs y carga mensajes de error //////////////////

    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    let objError = validate(
      { ...input, [e.target.name]: e.target.value },
      toBack
    );
    setError(objError);
  };



  const handleClick = (e) => {
    e.preventDefault();
    getFilteredBeds(input.checkIn, input.checkOut); //esto nos carga filteredAvailableBeds
  };

  const handleAddBed = (e) => {

    e.preventDefault();
    let aux = [];
    if (input.bedQuantity > 0) {
      let empty = false;
      let position = undefined;
      let localData = [...dataForCards];
      localData.forEach((r) => {
        if (r.id === input.roomIds) {
          aux = r.bedIds.splice(0, input.bedQuantity);
          r.cantCamas = r.cantCamas - input.bedQuantity;
          if (r.bedIds?.length === 0) {
            empty = true;
          }
          position = localData.indexOf(r);
        }
      });
      if (empty == true) {
        localData.splice(position, 1);
      }
      let aux2 = aux.map((c) => {
        return c.camaId;
      });
      setDataForCards([...localData]);
      setToBack({
        ...toBack,
        camas: [...toBack.camas, ...aux2],
        saldo: toBack.saldo + input.price * aux2.length,
      });
      setInput({
        ...input,
        roomIds: 0,
        price: 0,
        totalBeds: input.totalBeds.slice(
          0,
          input.totalBeds.length - input.bedQuantity
        ),
        bedQuantity: 0,
      });

    } else if (input.roomIds > 0) {

      let localAux = dataForCards.filter((r) => r.id !== input.roomIds);
      setDataForCards([...localAux]);
      setToBack({
        ...toBack,
        habitaciones: [...toBack.habitaciones, input.roomIds],
        saldo: toBack.saldo + input.price,
      });

      setInput({ ...input, roomIds: 0, price: 0 });
    }
  };

  const handleSubmit = (e) => {
    //FALTA ESTO //////////////////////////////////////////////
    e.preventDefault();
    setToBack({
      camas: [...toBack.camas],
      habitaciones: [...toBack.habitaciones],
      ingreso: input.checkIn,
      egreso: input.checkOut,
      nombre: input.name,
      apellido: input.lastName,
      tipoDoc: input.docType,
      numDoc: input.docNumber,
      fechaNac: input.birthDate,
      nacionalidad: input.nationality,
      email: input.email,
      genero: input.gender,
    });
  };


  return (
    <div className={styles.allcss}>
      <div className={styles.formulario}>
        <h1>Booking</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            {' '}
            {/* First Name */}
            <label>First Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="first name..."
            />
            {error.name && <p className={styles.error}>{error.name}</p>}
          </div>

          <div>
            {' '}
            {/* Last Name */}
            <label>Last Name: </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={(e) => handleChange(e)}
              placeholder="last name..."
            />
            {error.lastName && <p className={styles.error}>{error.lastName}</p>}
          </div>

          <div>
            {' '}
            {/* Gender */}
            <label>Gender: </label>
            <select name="gender" onChange={(e) => handleChange(e)}>
              <option value="">...Select</option>
              <option value="masculino">male</option>
              <option value="femelnino">female</option>
              <option value="no-binario">other</option>
            </select>
            {error.gender && <p className={styles.error}>{error.gender}</p>}
          </div>

          <div>
            {' '}
            {/* Document type */}
            <label>Document type: </label>
            <select name="docType" onChange={(e) => handleChange(e)}>
              <option value="docType">Elegir opción</option>
              <option value="DNI">DNI</option>
              <option value="Passport">Passport</option>
              <option value="Driver License">Driver License</option>
            </select>
            {error.docType && <p className={styles.error}>{error.docType}</p>}
          </div>

          <div>
            {' '}
            {/* document number */}
            <label>Document Number: </label>
            <input
              type="text"
              id="docNumber"
              name="docNumber"
              onChange={(e) => handleChange(e)}
              placeholder="document number..."
            />
            {error.docNumber && (
              <p className={styles.error}>{error.docNumber}</p>
            )}
          </div>

          <div>
            {' '}
            {/* Birth date */}
            <label htmlFor="birthDate">Birth date</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              onChange={(e) => handleChange(e)}
            />
            {error.birthDate && (
              <p className={styles.error}>{error.birthDate}</p>
            )}
          </div>

          <div>
            {' '}
            {/* Email */}
            <label htmlFor="email">Email </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => handleChange(e)}
              placeholder="email@mail.com..."
            />
            {error.email && <p className={styles.error}>{error.email}</p>}
          </div>

          <div>
            {' '}
            {/* Nationality */}
            <label htmlFor="nationality">Nationality</label>
            <select
              name="nationality"
              as="select"
              onChange={(e) => handleChange(e)}
            >
              <option value="">...select country</option>
              {countries?.countries &&
                countries?.countries.map((c) => (
                  <option key={c} value={c} id={c}>
                    {c}
                  </option>
                ))}
            </select>
            {error.nationality && (
              <p className={styles.error}>{error.nationality}</p>
            )}
          </div>

          <div>
            {' '}
            {/* Check-In / Out ---> al ingresar las 2 fechas deberia buscar disponibilidad entre esas fechas y luego al seleccionar habitacion y cama solo dar las opciones que estan disponibles*/}
            <label htmlFor="checkIn">Check-In</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              onChange={(e) => handleChange(e)}
            />
            {error.checkIn && <p className={styles.error}>{error.checkIn}</p>}
            <label htmlFor="checkOut">Check-Out</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              onChange={(e) => handleChange(e)}
            />
            {error.checkOut && <p className={styles.error}>{error.checkOut}</p>}

            <button onClick={(e) => handleClick(e)}>get available</button>

          </div>

          <div>
            {' '}
            {/* Select Room: */}
            <label htmlFor="roomIds">Room Name</label>
            <select name="roomIds" onChange={(e) => handleRoomSelect(e)}>

              <option value="roomIds">Elegir opción</option>

              {dataForCards?.length &&
                dataForCards?.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))}
            </select>
            {error.roomIds && <p className={styles.error}>{error.roomIds}</p>}
          </div>
          {input?.private === false ? ( // si la habitacion elegida es compartida mostrar este input y con la cantidad de camas correcta
            <div>
              {' '}
              {/* Select bed */}
              <label htmlFor="bedQuantity">Bed </label>
              <select name="bedQuantity" onChange={(e) => handleChange(e)}>


                <option value="bedQuantity">Select bed</option>
                {input?.totalBeds?.length &&
                  input?.totalBeds.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
              </select>
              {error.bedQuantity && (
                <p className={styles.error}>{error.bedQuantity}</p>
              )}
            </div>
          ) : null}


          <button onClick={(e) => handleAddBed(e)}>add to booking</button>
          <div>
            Booking: {toBack?.camas?.length} beds and{' '}
            {toBack?.habitaciones?.length} private rooms
          </div>
          <h2>Total to pay: $ {toBack?.saldo}</h2>
          {(toBack.camas === 0 && toBack.habitaciones === 0) ||

          error.name ||
          error.lastName ||
          error.docType ||
          error.docNumber ||
          error.birthDate ||
          error.nationality ||
          error.email ||
          error.gender ||
          // error.roomIds ||
          error.bedQuantity ||
          error.private ||
          // error.totalBeds ||
          error.checkOut ||
          error.checkIn ? null : (

            <button type="submit">send</button>

          )}
        </form>
      </div>
    </div>
  );
};

export default Booking;
