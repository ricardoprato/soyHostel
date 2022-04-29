import React from 'react';

function ReservationCards({ props }) {
  console.log(props);
  return (
    <>
      <div>
        <p>Booking Id: {props?.id}</p>
        <p>Check In: {props?.fecha_ingreso?.substring(0, 10)} </p>
        <p>Check Out: {props?.fecha_egreso?.substring(0, 10)} </p>

        {props?.Camas?.length
          ? props?.Camas?.map((cama) => <p>Bed Booked:{cama.nombre}</p>)
          : null}

        {props.Habitacions?.length
          ? props.Habitacions?.map((habitacion) => (
              <p>Room Booked{habitacion?.nombre}</p>
            ))
          : null}

        <p>Balance: $ {props.saldo}</p>
        {/* <p>State: {props.estado}</p> */}
      </div>
    </>
  );
}

export default ReservationCards;
