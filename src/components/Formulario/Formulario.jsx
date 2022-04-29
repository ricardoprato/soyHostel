import React, { useContext, useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import styles from './Formulario.module.css';
// import { GlobalContext } from '../../GlobalContext/GlobalContext';

//para mi por buenas practicas las funciones no tienen que estar aca peeeeeeeeero.....

function Formulario({ props }) {
  const [productState, setProductState] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const patchState = (state, id) => {
    let token = localStorage.getItem('tokenProp');
    fetch(`https://back-end-1407.herokuapp.com/camas/${id}`, {
      method: 'PATCH',
      headers: {
        api: `${import.meta.env.VITE_API}`,
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    // quiero que haga algo mas aca en el front???
  }; //mandar el saldo y el estado

  const handleStateUpdate = (e) => {
    let stateSelect = document.getElementById('stateSelect');
    let state = stateSelect.options[stateSelect.selectedIndex].value;
    let id = props.idCama || props.idHabitacion;
    patchState(state, id);
    console.log(state);
    // patchState(state, props.idcama);
    //delete reservas
  };

  return (
    <div className={styles.formulario}>
      <div>
        <div>
          <h1>BOOKING DATA</h1>
        </div>

        <p>
          Costumer: {props.Usuario.nombre} {props.Usuario.apellido}
        </p>

        <p>User's DNI: {props.UsuarioDni} </p>

        <p>Check In: {props.fecha_ingreso.substring(0, 10)} </p>
        <p>Check Out: {props.fecha_egreso.substring(0, 10)} </p>

        {props.idCama ? (
          <p>Bed: {props.nombreCama.toUpperCase()} </p>
        ) : props.idHabitacion ? (
          <p>Room: {props.nombreHabitacion.toUpperCase()}</p>
        ) : null}

        {props.idCama ? (
          <p>Bed Id: {props.idCama} </p>
        ) : props.idHabitacion ? (
          <p>Room Id: {props.idHabitacion} </p>
        ) : null}

        <p>Booking Id: {props.id}</p>

        <div>
          <p>Balance: $ {props.saldo}</p>
          <p>New Balance:</p>
          <input type="number" placeholder="$$" name="saldo" />
        </div>
      </div>

      <div>
        {/* {isLoading ? (
          <p>Cargando...</p>
        ) : productState === 'libre' ? (
          <p>State: Available</p>
        ) : productState === 'ocupada' ? (
          <p>State: Occupied</p>
        ) : productState === 'reservada' ? (
          <p>State: Booked</p>
        ) : productState === 'mantenimiento' ? (
          <p>State: For Manteinance</p>
        ) : null} */}
        <p>Room State {props?.estado}</p>
        <select id="stateSelect">
          <option value="booked">Booked</option>
          <option value="occupide">Occupide</option>
          <option value="closed">Closed</option>
          <option value="for manteinance">For Manteinance</option>
        </select>
      </div>

      <button onClick={handleStateUpdate}>Update</button>
    </div>
  );
}

export { Formulario };
