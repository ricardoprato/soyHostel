import React from 'react';
import styles from './RoomDetails.module.css';


  /*     {
    "id": 4,
    "nombre": "habitacion 3",
    "comodidades": "frigobar, vista al rio",
    "cantCamas": 4,
    "privada": true,
    "banoPrivado": true,
    "createdAt": "2022-04-13T04:03:21.104Z",
    "Camas": []
    }
    {
    "id": 7,
    "nombre": "habitacion 4",
    "comodidades": "frigobar, vista al rio",
    "cantCamas": 8,
    "descripcion": "blablablablablablablablablablablablablablablablablablablabla",
    "imagenes": ["http://blablabla", "http://blablabla", "http://blablabla", "http://blablabla"]
    "privada": false,
    "banoPrivado": true,
    "createdAt": "2022-04-13T04:05:01.311Z",
    "Camas": []
    } */

export default function RoomDetails({ roomId }) {
  
  let details = {};

  const fetchDetails = (roomId) => {
    fetch(`https://back-end-1407.herokuapp.com/habitaciones/${roomId}`)
      .then((response) => response.json())
      .then((details) => details)
      .catch((error) => {
        if (error.response) {
          const { response } = error;
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        }
      });
  };

  details = fetchDetails(roomId);

  return (
    <div className={styles.roomDetailsContainer}>
      <div className={styles.roomDetailsImages}>
        {details.imagenes.length > 0
          ? details.imagenes.map((i) => <img src={i} alt="room-img" />)
          : null}
      </div>
      <div className={styles.roomDetailsText}>
        <h1>Room: {details.nombre}</h1>
        {details.privada ? (
          <h3>
            This is a PRIVATE room with spade for {details.cantCamas} people.
          </h3>
        ) : (
          <h3>This is a SHARED room with {details.cantCamas} berd.</h3>
        )}
        {details.banoPrivado ? (
          <h3>With private bathroom</h3>
        ) : (
          <h3>With shared bathroom</h3>
        )}
        <div>Description: {details.descripcion}</div>
        <div>Comodities: {details.comodidades}</div>
      </div>
    </div>
  );
}
