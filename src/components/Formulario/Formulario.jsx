import React, { useContext, useState } from 'react';
import Button from '../../components/Button/Button';
// import { GlobalContext } from '../../GlobalContext/GlobalContext';

const [productState, setProductState] = useState('');

//para mi por buenas practicas las funciones no tienen que estar aca peeeeeeeeero.....
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
const getBedData = (id) => {
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
      productState(data);
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

const getRoomData = (id) => {
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
      productState(data);
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

// useEffect(() => {
//   getRoomData(id);
//   getBedData(id);
// }, []);

function Formulario({ props }) {
  const handleStateUpdate = (e) => {
    patchState(e.target.value, props.idcama);
  };

  return (
    <>
      <div>
        <div>
          <h1>BOOKING DATA</h1>
        </div>
        <h1>
          Costumer: {props.Usuario.nombre} {props.Usuario.apellido}
        </h1>
        <h1>User's DNI: {props.UsuarioDni} </h1>
        <h1>Check In: {props.fecha_ingreso.substring(0, 10)} </h1>
        <h1>Check Out: {props.fecha_egreso.substring(0, 10)} </h1>
        {props.idCama ? (
          <h1>Bed: {props.nombreCama.toUpperCase()} </h1>
        ) : props.idHabitacion ? (
          <h1>Room: {props.nombreHabitacion.toUpperCase()}</h1>
        ) : null}
        {props.idCama ? (
          <h1>Bed Id: {props.idCama} </h1>
        ) : props.idHabitacion ? (
          <h1>Room Id: {props.idHabitacion} </h1>
        ) : null}
        <h1>Booking Id: {props.id}</h1>

        <div>
          <h1>Balance: $ {props.saldo}</h1>
          <h1>New Balance:</h1>
          <input type="number" name="saldo" />
        </div>
      </div>

      <div>
        <h1>Room State</h1>
        <select>
          <h1>State: {productState}</h1>
          <option value="reservada">Booked</option>
          <option value="ocupada">Ocupide</option>
          <option value="libre">Available</option>
          <option value="mantenimiento">For Manteinance</option>
        </select>
      </div>

      <button onClick={handleStateUpdate}>Update</button>
    </>
  );
}

export { Formulario };
