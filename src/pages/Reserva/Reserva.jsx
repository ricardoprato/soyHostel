import React, { useContext } from 'react';
import Filters from '../../components/Filters/Filters';
import RoomCard from '../../components/RoomCard/RoomCard';
import GlobalContext from '../../GlobalContext/GlobalContext';

export default function Reserve() {
  const { filteredAvailableBeds } = useContext(GlobalContext); // ver como destructuro del globalContext

  return (
    <div className="ReserveContainer">
      <div>
        <Filters />{' '}
      </div>
      <div className="RoomCardsContainer">
        {filteredAvailableBeds.length > 0 ? (
          filteredAvailableBeds.map((r) => (
            <div>
              <RoomCard
                key={r.roomId}
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
