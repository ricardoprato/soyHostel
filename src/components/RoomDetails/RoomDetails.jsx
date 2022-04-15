import React, { useState, useEffect } from 'react';
import styles from './RoomDetails.module.css';

export default function RoomDetails() {
  const roomId = 15;

  const [details, setDetails] = useState({});

  const fetchDetails = (roomId) => {
    fetch(`https://back-end-1407.herokuapp.com/habitaciones/${roomId}`)
      .then((response) => response.json())
      .then((data) => setDetails((prev) => data))
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
    fetchDetails(roomId);
  }, []);

  // Camas: []
  // Imagenes: []
  // Reservas: []
  // banoPrivado: true
  // cantCamas: 1
  // comodidades: "frigobar, vista al rio, A/A, sommier, cama king size"
  // createdAt: "2022-04-14T22:32:37.874Z"
  // descripcion: "la bonita y mas mejor habitacion del hotel"
  // id: 1
  // nombre: "suite imperial"
  // precio: 5000
  // privada: true

  console.log(details);

  return (
    <div className={styles.roomDetailsContainer}>
      <div className={styles.roomDetailsImages}>
        {details.Imagenes && ( //ojo no usar prettier aca que borra los parentesis y no funciona mas
          details.Imagenes.map((i) => {
            return <img key={i.id} src={i.enlace} alt="room-img" />;
          }))}
      </div>
      <div className={styles.roomDetailsText}>
        <h1>Room: {details.nombre}</h1>
        {details.privada ? (
          <h3>
            This is a PRIVATE room with beds for {details.cantCamas} people.
          </h3>
        ) : (
          <h3>This is a SHARED room with {details.cantCamas} beds.</h3>
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
