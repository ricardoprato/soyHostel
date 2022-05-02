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
    flag,
  } = useContext(GlobalContext);

  //este va a ser el estado del cual se le va a pasar las props a las cards

  useEffect(() => {
    allRooms.length === 0 && getAllRooms();
  }, [allRooms]);

  useEffect(() => {
    filteredAvailableBeds?.length > 0 && genDataForCards();
  }, [filteredAvailableBeds]);
  console.log(flag);
  return (
    <>
      <div className={styles.RoomCardsContainer}>
        {!dataForCards.length && !filteredRooms.length ? (
          'Cargando...'
        ) : !flag && filteredRooms.length ? (
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
              bedPrice={
                r?.privada
                  ? r?.precio
                  : r?.precio / (r?.totalBeds || r?.cantCamas)
              }
              bathroom={r?.banoPrivado}
              image={r?.Imagens}
              bedIds={r?.bedIds}
            />
          ))
        ) : flag ? (
          <h1 style={{ color: 'black', background: 'red' }}>
            No Available Rooms
          </h1>
        ) : null}
      </div>
    </>
  );
}
