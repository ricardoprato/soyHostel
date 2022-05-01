import React from 'react';

function ReservationCards(props) {
  return (
    <>
      <div>
        <p>Booking Id: {props.id}</p>
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

        <p>Balance: $ {props.saldo}</p>
        <p>State: {props.estado}</p>
      </div>
    </>
  );
}

export default ReservationCards;
