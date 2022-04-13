import React, { useContext } from 'react';
import FilterBar from '../../components/FilterBar/FilterBar';
import RoomCard from '../../components/RoomCard/RoomCard';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

export default function Reserva() {
  const { filteredAvailableBeds } = useContext(GlobalContext); // ver como destructuro del globalContext

  return (
    <div className="ReserveContainer">
      {console.log(filteredAvailableBeds)}
      <div>
        <FilterBar />{' '}
      </div>
      <div className="RoomCardsContainer">
        {filteredAvailableBeds.length > 0 ? (
          filteredAvailableBeds.map((r) => (
            <div key={r.roomId}>
              <RoomCard
                roomId={r.roomId}
                roomName={r.roomName}
                bedPrice={r.bedPrice}
                bedsAvailable={r.bedsAvailable}
                description={r.description}
                bathroom={r.bathroom}
                private={r.private}
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
