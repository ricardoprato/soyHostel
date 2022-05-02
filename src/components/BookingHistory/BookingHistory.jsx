import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import ReservationCards from '../ReservationCards/ReservationCards';

function BookingHistory() {
  const [isloading, setIsloading] = useState(true);
  const [bookingHistory, setBookingHistory] = useState([]);

  let token = localStorage.getItem('tokenProp');
  let decode = jwt_decode(token);

  const getReservations = () => {
    fetch(`${import.meta.env.VITE_APP_URL}/reservas`, {
      method: 'GET',
      headers: {
        api: `${import.meta.env.VITE_API}`,
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        setBookingHistory(data);
        setIsloading(false);
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
    getReservations();
  }, []);
  //  bookingHistory
  //           .filter((booking) => booking.UsuarioDni == decode.sub)
  //           .map((r) => <ReservationCards props={r} />)
  return (
    <>
      {isloading ? (
        <div>Cargando...</div>
      ) : (
        bookingHistory
          .filter((booking) => booking.UsuarioDni == decode.sub)
          .map((r) => <ReservationCards key={r.id} props={r} />)
      )}
    </>
  );
}

export default BookingHistory;
