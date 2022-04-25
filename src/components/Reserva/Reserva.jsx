import React, { useContext, useEffect, useState } from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './Reserva.module.css';

export default function Reserva() {
  //filetered rooms son todas las rooms;
  //cuando hace click en submit, setFilteredRooms cambia a filtered rooms con la info
  //que sacó del filteredavailablebeds
  const {
    filteredAvailableBeds,
    allRooms,
    filteredRooms,
    getAllRooms,
    dataForCards,
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

  // console.log("dataForCards")
  // console.log(dataForCards)

  return (
    <>
      <div className={styles.RoomCardsContainer}>
        {/* {!filteredAvailableBeds.length && !filteredRooms.length ? ( */}
        {!dataForCards?.length && !filteredRooms.length ? (
          'Cargando...'
        ) : // ) : !filteredAvailableBeds.length && filteredRooms.length ? (
        !dataForCards?.length && filteredRooms.length ? (
          filteredRooms?.map((r) => (
            <RoomCard
              key={r?.id}
              roomId={r?.id} //json de los sueños
              roomName={r?.nombre}
              comodities={r?.comodidades}
              description={r?.descripcion}
              bedsAvailable={r?.cantCamas} //json de los sueños
              totalBeds={r?.cantCamas}
              private={r?.privada}
              bedPrice={r?.privada ? r?.precio : r?.precio / r?.cantCamas}
              bathroom={r?.banoPrivado}
              image={r?.Imagens}
            />
          )) /// mucho ojo con los nombres de las propiedades como vienen en el objeto
        ) : // ) : filteredAvailableBeds.length > 0 ? (
        dataForCards?.length > 0 ? (
          // filteredAvailableBeds.map((r) => (
          dataForCards?.map((r) => (
            <RoomCard
              key={r?.roomId}
              roomId={r?.roomId}
              roomName={r?.roomName}
              comodities={r?.comodities}
              bedPrice={r?.bedPrice}
              bedsAvailable={r?.bedsAvailable} // OJO ACA HAY QUE PASAR LA CANTIDAD DE CAMAS DISPONIBLES
              totalBeds={r?.totalBeds}
              description={r?.description}
              bathroom={r?.bathroom}
              image={r?.image}
              private={r?.private}
              filtradas={r?.filtradas}
              bedIds={r?.bedIds} //json de los sueños???
            />
          ))
        ) : (
          <div>No available rooms/beds for the selected dates</div> //aca no va a entrar nunca porque si filtramos por fecha y no hay disponibilidad dataForCards estaria vacio, creo que renderizaria todas las habitaciones...
        )}
      </div>
    </>
  );
}
