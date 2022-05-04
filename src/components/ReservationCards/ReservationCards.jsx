import React from 'react';
import styles from './ReservationCards.module.css';
function ReservationCards({ props }) {
  return (
    <>
      <div className={styles.ReservationCards}>
        <p>
          Booking Id: <span>{props?.id}</span>
        </p>
        <p>
          Check In: <span>{props?.fecha_ingreso?.substring(0, 10)} </span>
        </p>
        <p>Check Out: {props?.fecha_egreso?.substring(0, 10)} </p>

        {props?.Camas?.length
          ? props?.Camas?.map((cama) => (
              <p>
                Bed Booked: <span>{cama.nombre}</span>
              </p>
            ))
          : null}
        {props.Habitacions?.length
          ? props.Habitacions?.map((habitacion) => (
              <p>
                Room Booked: <span>{habitacion?.nombre}</span>
              </p>
            ))
          : null}
        <p>Balance: $ {props.saldo}</p>
        {/* <p>State: {props.estado}</p> */}
      </div>
    </>
  );
}

export default ReservationCards;
