import React, { useContext, useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import styles from './Formulario.module.css';
import countries from '../../data/countries.json';
// import { GlobalContext } from '../../GlobalContext/GlobalContext';

//p
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

  // const today = new Date();
  // if (!input.checkIn) {
  //   errores.checkIn = 'Please enter checkIn date';
  // } else if (input.checkIn < today.toLocaleDateString('en-CA')) {
  //   // console.log(input.checkIn);
  //   // console.log(today.toLocaleDateString('en-CA'));
  //   errores.checkIn = 'CheckIn cant be in the past';
  // }

  // if (!input.checkOut) {
  //   errores.checkOut = 'Please enter checkOut date';
  // } else if (input.checkOut <= input.checkIn) {
  //   errores.checkOut = 'Checkout has to be after checkIn';
  //}

  // if (!input.roomIds) {
  //   errores.roomIds = 'Please select room';
  // }

  // if (!input.bedQuantity && input.private === false) {
  //   if (!input.roomIds) {
  //     errores.bedQuantity = 'Please enter a room first';
  //   } else {
  //     errores.bedQuantity = 'Please select number of beds';
  //   }
  // }

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
function Formulario({ props }) {
  const [huesped, setHuesped] = useState({
    // camas: [],
    // habitaciones: [],
    nombre: '',
    apellido: '',
    tipoDoc: '',
    numDoc: '',
    fechaNac: '',
    nacionalidad: '',
    email: '',
    genero: '',
  });
  const [error, setError] = useState({});
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




  let url = VITE_APP_URL;
  const patchState = (state, id) => {
    let token = localStorage.getItem('tokenProp');
    fetch(`${url}` + `/camas/${id}`, {

      method: 'PATCH',
      headers: {
        api: `${import.meta.env.VITE_API}`,
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state), //saldo, el estado y los huespedes
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    // quiero que haga algo mas aca en el front???
  };

  const handleStateUpdate = (e) => {
    e.preventDefault();
    let stateSelect = document.getElementById('stateSelect');
    let state = stateSelect.options[stateSelect.selectedIndex].value;
    let id = props.idCama || props.idHabitacion;

    setHuesped({
      nombre: '',
      apellido: '',
      tipoDoc: '',
      numDoc: '',
      fechaNac: '',
      nacionalidad: '',
      email: '',
      genero: '',
    });

    patchState(state, id);
    console.log(state);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
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
          <input type="number" placeholder="$$" name="saldo" />
        </div>
      </div>

      <div>
        <p className={styles.font}>Room State:</p>
        <p> {props?.estado}</p>

        <label className={styles.font}>Update State: </label>
        <select id="stateSelect">
          <option value="booked">Booked</option>
          <option value="occupide">Occupide</option>
          <option value="closed">Closed</option>
          <option value="for manteinance">For Manteinance</option>
        </select>
      </div>
      <div className={styles.allcss}>
        <div className={styles.formulario}>
          <p className={styles.font}>Guest Data Update</p>
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
              {error.lastName && (
                <p className={styles.error}>{error.lastName}</p>
              )}
            </div>

            <div>
              {' '}
              {/* Document type */}
              <label>Document type: </label>
              <select name="docType" onChange={(e) => handleChange(e)}>
                <option value="docType">Elegir opción</option>
                <option value="DNI">DNI</option>
                <option value="Passport">Passport</option>
                <option value="Libreta civica">Libreta Civica</option>
                <option value="CLI">CLI</option>
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

            {/* {(toBack.camas === 0 && toBack.habitaciones === 0) ||
            error.name ||
            error.lastName ||
            error.docType ||
            error.docNumber ||
            error.birthDate ||
            error.nationality ||
            error.email ||
            // error.roomIds ||
            error.bedQuantity ||
            error.private ||
            // error.totalBeds ||
            error.checkOut ||
            error.checkIn ? null : (
              <button type="submit">send</button>
            )} */}
          </form>
        </div>
      </div>
      <button className={styles.button} onClick={handleStateUpdate}>
        Update
      </button>
    </div>
  );
}

export { Formulario };
