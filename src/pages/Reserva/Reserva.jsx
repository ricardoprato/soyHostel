import React, { useContext, useEffect, useState } from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './Reserva.module.css';



export default function Reserva() {
  //filetered rooms son todas las rooms;
  //cuando hace click en submit, setFilteredRooms cambia a filtered rooms con la info
  //que sacó del filteredavailablebeds
  const { filteredAvailableBeds, allRooms, filteredRooms, getAllRooms } =
    useContext(GlobalContext);
  
  const [dataForCards, setDataForCards] = useState([]) //este va a ser el estado del cual se le va a pasar las props a las cards
  
  useEffect(() => { 
    // allRooms?.length === 0 && getAllRooms();
  }, []);
allRooms?.length && console.log("allRooms")
allRooms?.length && console.log(allRooms)
filteredRooms?.length && console.log("filteredRooms")
filteredRooms?.length && console.log(filteredRooms)
filteredAvailableBeds?.length && console.log("filteredAvailableBeds")
filteredAvailableBeds?.length && console.log(filteredAvailableBeds)
dataForCards?.length > 0 && console.log("dataForCards")
dataForCards?.length > 0 && console.log(dataForCards)

  let filteredCopy = [] //aqui voy a cargar la data convinada de las rutas availableBeds + allRooms 
  filteredAvailableBeds?.length > 0 && filteredAvailableBeds.forEach((roomFiltered)=>{ //mapeo por cada habitacion que tiene algo disponible
    let aux = {}
    allRooms?.length && allRooms.forEach((roomFromAll=>{  //por cada habitacion disponible busco los datos de esa habitacion en allRooms
      if(roomFiltered.idHabitacion === roomFromAll.id){ //si coinciden los id de los 2 objetos armo un objeto con la info unificada
        aux = {
          roomId: roomFiltered.idHabitacion, //json de los sueños???
          roomName: roomFromAll.nombre,
          comodities: roomFromAll.comodidades,
          bedPrice: roomFromAll.precio / roomFromAll.cantCamas,
          bedsAvailable: roomFiltered.camasDisponible, //json de los sueños???
          description: roomFromAll.descripcion,
          bathroom: roomFromAll.banoPrivado,
          image: roomFromAll.Imagens[0],
          private: roomFromAll.privada,
          totalBeds: roomFromAll.cantCamas,
          filtradas: true,
          bedIds: roomFiltered?.camasDisponiblesIds //json de los sueños???
        }
      }
    }))
    filteredCopy.push(aux) //voy pusheando cada objero al array que luego pasamos mapeado a las cards
  })

  filteredCopy?.length > 0 && setDataForCards(filteredCopy) //seteo el estado que renderiza las cartas
  // dataForCards?.length > 0 && console.log(dataForCards)
  

  return (
    <>
      <div className={styles.RoomCardsContainer}>
      {/* {!filteredAvailableBeds.length && !filteredRooms.length ? ( */}
      {!dataForCards?.length && !filteredRooms.length ? (
          'Cargando...'
        // ) : !filteredAvailableBeds.length && filteredRooms.length ? (
        ) : !dataForCards?.length && filteredRooms.length ? (
          filteredRooms?.map((r) => (
            <RoomCard
              key={r?.id}
              roomId={r?.id} //json de los sueños
              roomName={r?.nombre}
              comodities={r?.comodidades}
              description={r?.descripcion}
              bedsAvailable={r?.cantCamas}//json de los sueños
              totalBeds={r?.canCamas} 
              private={r?.privada}
              bedPrice={r?.precio / r?.cantCamas}
              bathroom={r?.banoPrivado}
              image={r?.Imagens[0]}
            />
          )) /// mucho ojo con los nombres de las propiedades como vienen en el objeto
        // ) : filteredAvailableBeds.length > 0 ? (
        ) : dataForCards?.length > 0 ? (
          // filteredAvailableBeds.map((r) => (
            dataForCards?.map((r) => (
            <RoomCard
              key={r?.roomId}
              roomId={r?.roomId}
              roomName={r?.roomName}
              comodities={r?.comodities}
              bedPrice={r?.bedPrice / r?.totalBeds}
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
