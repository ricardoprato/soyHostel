import React, { useContext, useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import styles from './Formulario.module.css';
import countries from '../../data/countries.json';

// import { GlobalContext } from '../../GlobalContext/GlobalContext';

//p
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

function Formulario({ props }) {
  const [error, setError] = useState({});
  const [bookingState, setBookingState] = useState({
    id_reserva: props.id,
    id_producto: props.idCama || props.idHabitacion,
    saldo: props.saldo,
    estado: props.estado,
    huesped: {},
  });

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
    console.log(e.target.name);
    console.log(e.target.value);

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
    console.log(bookingState);
    await patchState(bookingState); //objeto a enviar al backend
    // setBookingState(bookingInitialState);
  };
  return (
    <div className={styles.formulario}>
      <div>
        <div>
          <h1 className={styles.font}>BOOKING DATA</h1>
        </div>
        <p className={styles.font}>Costumer:</p>
        <p>
          {props.Usuario.nombre} {props.Usuario.apellido}
        </p>
        <p className={styles.font}>User's DNI:</p> <p> {props.UsuarioDni} </p>
        <p className={styles.font}>Check In: </p>
        <p> {props.fecha_ingreso.substring(0, 10)} </p>
        <p className={styles.font}>Check Out:</p>
        <p> {props.fecha_egreso.substring(0, 10)} </p>
        {props.idCama ? (
          <div>
            <p className={styles.font}>Bed: </p>
            <p> {props.nombreCama.toUpperCase()} </p>
          </div>
        ) : props.idHabitacion ? (
          <div>
            {' '}
            <p className={styles.font}>Room: </p>{' '}
            <p> {props.nombreHabitacion.toUpperCase()}</p>
          </div>
        ) : null}
        {props.idCama ? (
          <div>
            {' '}
            <p className={styles.font}>Bed Id: </p> <p>{props.idCama} </p>{' '}
          </div>
        ) : props.idHabitacion ? (
          <div>
            <p className={styles.font}>Room Id: </p>
            <p>{props.idHabitacion} </p>
          </div>
        ) : null}
        {/* <p className={styles.font}>Guest:</p> <p> {props.huesped} </p> */}
        <p className={styles.font}>Booking Id:</p> <p> {props.id}</p>
        <div>
          <p className={styles.font}>Balance: $ </p> <p> {props.saldo}</p>
          <p className={styles.font}>New Balance:</p>
          <input
            onChange={(e) => handleBookingUpdate(e)}
            type="number"
            placeholder="$$"
            name="saldo"
          />
        </div>
      </div>

      <div>
        <p className={styles.font}>Room State:</p>
        <p> {props?.estado}</p>

        <label className={styles.font}>Update State: </label>
        <select
          id="stateSelect"
          onChange={(e) => handleBookingUpdate(e)}
          name="estado"
        >
          <option value="Booked">Booked</option>
          <option value="Occupide">Occupide</option>
          <option value="Closed">Closed</option>
          <option value="For Manteinance">For Manteinance</option>
        </select>
      </div>
      <div>
        <div>
          <p className={styles.font}>Guest Data Update</p>
          {/* <form onSubmit={(e) => handleGuestAdd(e)}> */}
          <form>
            <div>
              {/* First Name */}

              <label>First Name: </label>
              <input
                type="text"
                id="name"
                name="huesped.nombre"
                onChange={(e) => handleGuestChange(e)}
                placeholder="first name..."
              />
              {error.nombre && <p className={styles.error}>{error.nombre}</p>}
            </div>

            <div>
              {' '}
              {/* Last Name */}
              <label>Last Name: </label>
              <input
                type="text"
                id="lastName"
                name="huesped.apellido"
                onChange={(e) => handleGuestChange(e)}
                placeholder="last name..."
              />
              {error.apellido && (
                <p className={styles.error}>{error.apellido}</p>
              )}
            </div>

            <div>
              {' '}
              {/* Document type */}
              <label>Document type: </label>
              <select
                name="huesped.tipoDocumento"
                onChange={(e) => handleGuestChange(e)}
              >
                <option value="docType">Elegir opción</option>
                <option value="DNI">DNI</option>
                <option value="Passport">Passport</option>
                <option value="Libreta civica">Libreta Civica</option>
                <option value="CLI">CLI</option>
              </select>
              {error.tipoDocumento && (
                <p className={styles.error}>{error.tipoDocumento}</p>
              )}
            </div>

            <div>
              {' '}
              {/* document number */}
              <label>Document Number: </label>
              <input
                type="text"
                id="dni"
                name="huesped.dni"
                onChange={(e) => handleGuestChange(e)}
                placeholder="document number..."
              />
              {error.dni && <p className={styles.error}>{error.dni}</p>}
            </div>

            <div>
              {' '}
              {/* Nationality */}
              <label htmlFor="nationality">Nationality</label>
              <select
                name="huesped.nacionalidad"
                onChange={(e) => handleGuestChange(e)}
              >
                <option value="">...select country</option>
                {countries?.countries &&
                  countries?.countries.map((c) => (
                    <option key={c} value={c} id={c}>
                      {c}
                    </option>
                  ))}
              </select>
              {error.nacionalidad && (
                <p className={styles.error}>{error.nacionalidad}</p>
              )}
            </div>
            {/* Gender */}
            <label htmlFor="gender">Gender</label>
            <select
              onChange={(e) => handleGuestChange(e)}
              name="huesped.genero"
            >
              <option value="">Select option</option>
              <option value="masculino">Male</option>
              <option value="femenino">Female</option>
              <option value="no-binario">Other</option>
            </select>
            {error.genero && <p className={styles.error}>{error.genero}</p>}
            {/* <button type="submit">Add Gest</button> */}
          </form>
        </div>
      </div>
      <button
        className={styles.button}
        onClick={(e) => SubmitBookingUpdate(e)}
        // disable={
        //   error.nombre ||
        //   error.apellido ||
        //   error.dni ||
        //   error.tipoDocumento ||
        //   error.nacionalidad ||
        //   error.genero
        // }
      >
        Update
      </button>
    </div>
  );
}

export { Formulario };
