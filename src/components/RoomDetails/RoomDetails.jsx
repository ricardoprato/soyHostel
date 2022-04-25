import React, { useState, useEffect, useContext, useCallback } from 'react';
import Button from '../Button/Button';
import styles from './RoomDetails.module.css';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { Modal } from '../Modal/Modal';
import Carousel from '../Carousel/Carousel';
export default function RoomDetails({ roomId }) {
  const { getIdRoom, details, setDetails } = useContext(GlobalContext);

  // const fetchDetails = (roomId) => {
  //   fetch(`https://back-end-1407.herokuapp.com/habitaciones/${roomId}`)
  //     .then((response) => response.json())
  //     .then((data) => setDetails(data))
  //     .catch((error) => {
  //       if (error.response) {
  //         const { response } = error;
  //         console.log(response.data);
  //         console.log(response.status);
  //         console.log(response.headers);
  //       }
  //     });
  // };

  useEffect(() => {
    getIdRoom(roomId);
  }, [roomId]);

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

  return (
    <>
      {!details?.id ? (
        <p> Cargando.......................</p>
      ) : (
        <div className={styles.roomDetailsContainer}>
          <Carousel images={details?.Imagens} />
          <div className={styles.roomDetailsText}>
            <h2>Room: {details?.nombre}</h2>
            {details?.privada ? (
              <p>
                This is a PRIVATE room with beds for {details?.cantCamas}{' '}
                people.
              </p>
            ) : (
              <p>This is a SHARED room with {details?.cantCamas} beds.</p>
            )}
            {details?.banoPrivado ? (
              <p>With private bathroom</p>
            ) : (
              <p>With shared bathroom</p>
            )}
            <div>Description: {details?.descripcion}</div>
            <div>Comodities: {details?.comodidades}</div>
          </div>
        </div>
      )}
    </>
  );
}
