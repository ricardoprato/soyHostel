import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './Reserva.module.css';

export default function Reserva() {
  //filetered rooms son todas las rooms;
  //cuando hace click en submit, setFilteredRooms cambia a filtered rooms con la info
  //que sacó del filteredavailablebeds
  const { filteredAvailableBeds, allRooms, filteredRooms, getAllRooms } =
    useContext(GlobalContext);

  useEffect(() => {
    getAllRooms();
  }, []);

  // hay que armar un array auxiliar, que contenga objetos;
  //ese array lo vamos a conformar por filteredAvilableBeds(json de los sueños) y allRooms(/habitaciones)
  let auxiliar = [];
  allRooms.forEach((room) => {
    let auxObject = {
      roomId: room.id,
      roomName: room.nombre,
      comodities: room.comodidades,
      description: room.descripcion,
      // bedsAvailable, //json de los sueños
      private: room.privada,
      bedPrice: room.precio / room.cantCamas,
      bathroom: room.banoPrivado,
      image: room.Imagens,
      totalBeds: room.cantCamas,
      // bedId, //json de los sueños???}
    };
    auxiliar.push(auxObject);
  });

  return (
    <>
      <div className={styles.RoomCardsContainer}>
        {!filteredAvailableBeds.length && !filteredRooms.length ? (
          'Cargando...'
        ) : !filteredAvailableBeds.length && filteredRooms.length ? (
          filteredRooms?.map((r) => (
            <RoomCard
              key={r?.id}
              roomId={r?.id} //json de los sueños
              roomName={r?.nombre}
              comodities={r?.comodidades}
              description={r?.descripcion}
              bedsAvailable={r?.cantCamas} //json de los sueños
              private={r?.privada}
              bedPrice={r?.precio / r?.cantCamas}
              bathroom={r?.banoPrivado}
              image={r?.Imagens}
              bedId={r?.camas} //json de los sueños???
            />
          )) /// mucho ojo con los nombres de las propiedades como vienen en el objeto
        ) : filteredAvailableBeds.length > 0 ? (
          filteredAvailableBeds.map((r) => (
            <RoomCard
              key={r?.id}
              roomId={r?.id}
              roomName={r?.nombre}
              comodities={r?.comodidades}
              bedPrice={r?.preciosCamas / r?.cantCamas}
              bedsAvailable={r?.cantCamas}
              description={r?.descripcion}
              bathroom={r?.banoPrivado}
              image={r?.imagenes}
              private={r?.privada}
              filtradas={true}
            />
          ))
        ) : (
          <div>No available rooms/beds for the selected dates</div>
        )}
      </div>
    </>
  );
}
