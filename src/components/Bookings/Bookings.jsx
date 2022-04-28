import React, { useEffect, useState } from 'react';

export default function Bookings() {
  const [allReservations, setAllReservations] = useState([]);

  const getAllReservations = () => {
    fetch(`${import.meta.env.VITE_APP_URL}/reservas`, {
      method: 'GET',
      headers: {
        api: `${import.meta.env.VITE_API}`,
        Authorization: `Bearer ${localStorage.getItem('tokenProp')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllReservations((prev) => data);
        console.log('all reservations');
        console.log(data);
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

  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_APP_URL}/reservas/${id}`, {
      method: 'DELETE',
      headers: {
        api: `${import.meta.env.VITE_API}`,
        Authorization: `Bearer ${localStorage.getItem('tokenProp')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Reserva Eliminada?: ');
        console.log(data);
        getAllReservations();
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

  useEffect(() => {
    getAllReservations();
  }, []);

  return (
    <div>
      <h2>All Reservations: </h2>
      {allReservations?.length &&
        allReservations?.map((r) => (
          <div key={r.id}>
            In: {r.fecha_ingreso} out: {r.fecha_egreso} beds: {r.Camas?.length},
            private rooms: {r.Habitacions?.length} balance: {r.saldo} client
            doc: {r.UsuarioDni}{' '}
            <button onClick={() => handleDelete(r.id)}> Delete </button>{' '}
          </div>
        ))}
    </div>
  );
}
