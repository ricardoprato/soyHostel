import React, { useContext, useEffect, useState } from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './Reserva.module.css';

export default function Reserva() {
  const {
    filteredAvailableBeds,
    allRooms,
    filteredRooms,
    getAllRooms,
    dataForCards,
    dataForCardsCopy,
    genDataForCards,
  } = useContext(GlobalContext);

  //este va a ser el estado del cual se le va a pasar las props a las cards
 
  useEffect(() => {
    allRooms.length === 0 && getAllRooms();
  }, [allRooms]);

  useEffect(() => {
    filteredAvailableBeds?.length > 0 && genDataForCards();
    // console.log("genDataForCards desde Reserva useeffect")
    // console.log(dataForCards)
  }, [filteredAvailableBeds]);
console.log("filteredRooms")
console.log(filteredRooms)
  // console.log("dataForCards")
  // console.log(dataForCards)
console.log("allRooms")
console.log(allRooms)
  return (
    <>
      <div className={styles.RoomCardsContainer}>
        {!dataForCards?.length && !filteredRooms.length ? (
          'Cargando...'
        ) : filteredRooms.length ? (
          filteredRooms?.map((r) => (
            <RoomCard
              filtradas={r?.filtradas}
              key={r?.id}
              roomId={r?.id} //json de los sueños
              roomName={r?.nombre}
              comodities={r?.comodidades}
              description={r?.descripcion}
              bedsAvailable={r?.cantCamas} //json de los sueños
              totalBeds={r.totalBeds ? r?.totalBeds : r?.cantCamas}
              private={r?.privada}
              bedPrice={r?.privada ? r?.precio : r?.precio / r?.totalBeds}
              bathroom={r?.banoPrivado}
              image={r?.Imagens}
              bedIds={r?.bedIds}
            />
          )) /// mucho ojo con los nombres de las propiedades como vienen en el objeto
        ) : (
          // ) : filteredAvailableBeds.length > 0 ? (
          <p>No Available Rooms</p>
        )}
      </div>
    </>
  );
}
