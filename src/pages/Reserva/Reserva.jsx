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

  
  let filteredCopy = [] //aqui voy a cargar la data convinada de las rutas availableBeds + allRooms para pasar por props a las cards
  filteredAvailableBeds?.length > 0 && filteredAvailableBeds.forEach((roomFiltered)=>{ //mapeo por cada habitacion que tiene algo disponible
    let aux = {}
    allRooms?.forEach((roomFromAll=>{  //por cada habitacion disponible busco los datos de esa habitacion en allRooms
      if(roomFiltered.id === roomFromAll.id){ //si coinciden los id de los 2 objetos armo un objeto con la info unificada
        aux = {
          key: roomFiltered.id, //json de los sueños???
          roomId: roomFiltered.id, //json de los sueños???
          roomName: roomFromAll.nombre,
          comodities: roomFromAll.comodidades,
          bedPrice: roomFromAll.preciosCamas / roomFromAll.cantCamas,
          bedsAvailable: roomFiltered.cantCamas, //json de los sueños???
          description: roomFromAll.descripcion,
          bathroom: roomFromAll.banoPrivado,
          image: roomFromAll.imagenes,
          private: roomFromAll.privada,
          filtradas: true,
          bedId: roomFiltered?.camas //json de los sueños???
        }
      }
    }))
    filteredCopy.push(aux) //voy pusheando cada objero al array que luego pasamos mapeado a las cards
  })



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
              bedId={r?.camas} //json de los sueños???
            />
          ))
        ) : (
          <div>No available rooms/beds for the selected dates</div>
        )}
      </div>
    </>
  );
}
