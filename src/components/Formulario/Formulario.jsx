import React, { useContext, useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import styles from './Formulario.module.css';
import countries from '../../data/countries.json';
import ConfirmDelete from './ConfirmDelete';
import swal from 'sweetalert';
import { GlobalContext } from '../../GlobalContext/GlobalContext.jsx';

const validate = (input) => {
  /////// VALIDACiONES /////////////////////////////////
  let errores = {};

  //   Name
  if (!input.huesped.nombre) {
    errores.nombre = 'Please enter a name';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.huesped.nombre)) {
    errores.nombre = 'The name can only contain letters and spaces';
  }

  // Validacion lastname
  if (!input.huesped.apellido) {
    errores.apellido = 'Please enter a lastname';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.huesped.apellido)) {
    errores.apellido = 'The lastname can only contain letters and spaces';
  }

  // Validacion DNI
  if (!input.huesped.dni) {
    errores.dni = 'Please enter a dni';
  } else if (!/^[0-9]{8,20}$/.test(input.huesped.dni)) {
    errores.dni = 'The dni can only contain numbers';
  }

  // Validacion documento tipo
  if (!input.huesped.tipoDocumento) {
    errores.tipoDocumento = 'Please select a document type';
  }
  //Validación género
  if (!input.huesped.genero) {
    errores.genero = 'Please enter a gender';
  }
  // Validacion nationality
  if (!input.huesped.nacionalidad) {
    errores.nacionalidad = 'Please enter your nationality';
  }
  // if (!/^[0-9]{0,20}$/.test(input.saldo)) {
  //   errores.saldo = 'Balance must be a number';
  // }
  return errores;
};

function Formulario({ props, modalExterno }) {
  const { getReservations, filterDates, setFilterdates } =
    useContext(GlobalContext);
  const [error, setError] = useState({});
  const [bookingState, setBookingState] = useState({
    id_reserva: props.id,
    id_producto: props.idCama || props.idHabitacion,
    saldo: props.saldo,
    estado: props.estado,
    huesped: {},
  });
  const [flag, setFlag] = useState(false);

  const patchState = async (valores) => {
    const token = localStorage.getItem('tokenProp');
    const res = await fetch(
      `${import.meta.env.VITE_APP_URL}/reservas/update/`,
      {
        method: 'PATCH',
        headers: {
          api: import.meta.env.VITE_API,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valores),
      }
    );
    let res2 = await res.json();
  };

  const handleBookingUpdate = (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    // console.log(e.target.value);

    if (e.target.name === 'saldo')
      setBookingState({ ...bookingState, saldo: Number(e.target.value) });
    if (e.target.name === 'estado')
      setBookingState({ ...bookingState, estado: e.target.value });

    let objError = validate({
      ...bookingState,
      [e.target.name]: e.target.value,
    });
    setError(objError);
  };

  const handleGuestChange = (e) => {
    e.preventDefault();
    bookingState.huesped = {
      ...bookingState.huesped,
      [e.target.name]: e.target.value,
    };

    let objError = validate({
      ...bookingState,
      [e.target.name]: e.target.value,
    });
    setError(objError);
  };

  const SubmitBookingUpdate = async (e) => {
    // console.log(bookingState);
    await patchState(bookingState); //objeto a enviar al backend
    // setBookingState(bookingInitialState);
  };
  const handleDeleteReservation = (e) => {
    console.log('eh wachin te borre');
    console.log(props.id);
    const token = localStorage.getItem('tokenProp');
    fetch(`${import.meta.env.VITE_APP_URL}/reservas/${props.id}`, {
      method: 'DELETE',
      headers: {
        api: import.meta.env.VITE_API,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        swal('Booking deleted!');

        modalExterno(false);
      })
      .catch((error) => {
        if (error.response) {
          const { response } = error;
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        }
      });
    getReservations(filterDates.checkIn, filterDates.checkOut);
  };

  return (
    <>
      {' '}
      {!flag ? (
        <div className={styles.formulario}>
          <div>
            <div className={styles.jodido}>
              <h1 className={styles.font}>BOOKING DATA</h1>
            </div>
            <div className={styles.microContainer}>
              <p className={styles.font}>Costumer: </p>
              <p>
                {props.Usuario.nombre} {props.Usuario.apellido}
              </p>
            </div>
            <div className={styles.microContainer}>
              <p className={styles.font}>User's DNI:</p>{' '}
              <p> {props.UsuarioDni} </p>
            </div>
            <div className={styles.microContainer}>
              <p className={styles.font}>Check In: </p>

              <p> {props.fecha_ingreso.substring(0, 10)} </p>
            </div>
            <div className={styles.microContainer}>
              <p className={styles.font}>Check Out:</p>

              <p> {props.fecha_egreso.substring(0, 10)} </p>
            </div>
            {props.idCama ? (
              <div className={styles.microContainer}>
                <p className={styles.font}>Bed: </p>
                <p> {props.nombreCama.toUpperCase()} </p>
              </div>
            ) : props.idHabitacion ? (
              <div className={styles.microContainer}>
                {' '}
                <p className={styles.font}>Room: </p>{' '}
                <p> {props.nombreHabitacion.toUpperCase()}</p>
              </div>
            ) : null}

            <div className={styles.microContainer}>
              <p className={styles.font}>Booking Id:</p> <p> {props.id}</p>
            </div>

            <div className={styles.microContainer}>
              <p className={styles.font}>Total Payed: $ </p>
              <p> {props.saldo}</p>
            </div>

            <div className={styles.microContainer}>
              <p className={styles.font}>New Balance:</p>
              <input
                onChange={(e) => handleBookingUpdate(e)}
                type="number"
                placeholder="$$"
                name="saldo"
              />
            </div>
          </div>

          <div className={styles.microContainer}>
            <p className={styles.font}>Booking State: </p>
            <select
              id="stateSelect"
              onChange={(e) => handleBookingUpdate(e)}
              name="estado"
              dafaultValue={props?.estado}
            >
              <option value="Booked">Booked</option>
              <option value="Occupide">Occupide</option>
              <option value="Closed">Closed</option>
              <option value="For Manteinance">For Manteinance</option>
            </select>
          </div>
          <button
            className={styles.butoncito}
            onClick={(e) => SubmitBookingUpdate(e)}
          >
            Update
          </button>
          <button className={styles.butoncito} onClick={() => setFlag(true)}>
            Delete Reservation
          </button>
        </div>
      ) : (
        <div className={styles.formulario}>
          <h1>Warning</h1>
          <p>All asociated products will be erased too</p>
          <button
            className={styles.butoncito}
            onClick={handleDeleteReservation}
          >
            Yes
          </button>
          <button className={styles.butoncito} onClick={() => setFlag(false)}>
            No
          </button>
        </div>
      )}
    </>
  );
}

export { Formulario };
