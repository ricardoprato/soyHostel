import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

function BookingHistory() {
  const [isloading, setIsloading] = useState(true);
  const [bookingHistory, setBookingHistory] = useState([]);

  let userReservations = [];
  let token = localStorage.getItem('tokenProp');
  let decode = jwt_decode(token);
  const filterdReservations = (reservations) => {
    userReservations = reservations.filter((reservation) => {
      reservation.UsuarioDni == decode.sub;
    });
    setBookingHistory(userReservations);
  };

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
        console.log(data);
        filterdReservations(data);
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

  return (
    //   <>{isloading ? <div>Cargando...</div> : bookingHistory.map((reservation) => { }}
    <div>
      <p>lalalalalalalalalalalalalal</p>
    </div>
    // </>
  );
}

export default BookingHistory;
