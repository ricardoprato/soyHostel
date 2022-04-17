import React, { useContext } from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './Reserva.modules.css';

export default function Reserva() {
  const { filteredAvailableBeds } = useContext(GlobalContext); // ver como destructuro del globalContext

  return (
    <div className={styles.ReserveContainer}>
      {/* {console.log(filteredAvailableBeds)} */}
      <div className={styles.RoomCardsContainer}>
        {filteredAvailableBeds.length > 0 ? (
          filteredAvailableBeds.map((r) => (
            <div key={r.id}>
              <RoomCard
                roomId={r.id}
                roomName={r.nombre}
                comodities={r.comodidades}
                bedPrice={r.preciosCamas}
                bedsAvailable={r.cantCamas}
                description={r.descripcion}
                bathroom={r.banoPrivado}
                image={r.imagenes}
                private={r.privada}
              />
            </div>
          ))
        ) : (
          <div>No available rooms/beds for the selected dates</div>
        )}
      </div>
    </div>
  );
}
