import React from 'react';
import styles from './RoomDetails.modules.css';

export default function RoomDetails({ roomId }) {
  let details = {};

  // const fetchDetails = () => {
  //   fetch(`https://localhost:3001/larutaque me den con el filtrado de fechas`)
  //     .then(response => response.json())
  //     .then(data => {
  //       details = data;
  //     } )
  // }

  return (
    <div className={styles.roomDetailsContainer}>
      <h1>{details.roomName}</h1>
      <div>
        <img /* AQUI DEBERIAMOS PONER 2 O 3 IMAGENES */
          className={styles.RoomDetailsImg}
          src={`../../img/rooms/bigRoom${roomId}-1.png`}
          alt="room-img-1"
        />
        <img /* AQUI DEBERIAMOS PONER 2 O 3 IMAGENES */
          className={styles.RoomDetailsImg}
          src={`../../img/rooms/bigRoom${roomId}-2.png`}
          alt="room-img-2"
        />
        <img /* AQUI DEBERIAMOS PONER 2 O 3 IMAGENES */
          className={styles.RoomDetailsImg}
          src={`../../img/rooms/bigRoom${roomId}-3.png`}
          alt="room-img-3"
        />
      </div>
      <div>Description: {details.description}</div>
    </div>
  );
}
