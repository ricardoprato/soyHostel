import React, { useContext } from "react";
import Filters from "../../components/Filters/Filters";
import RoomCard from "../../components/RoomCard/RoomCard";
import GlobalContext from "../../GlobalContext/GlobalContext";

export default function Home() {
  const { availableBeds } = useContext(GlobalContext); // ver como destructuro del globalContext

  return (
    <div className="HomeContainer">
      <div>
        <Filters />{" "}
      </div>
      <div className="RoomCardsContainer">
        {availableBeds.length > 0 ? (
          availableBeds.map(
            (
              r // availableBeds debe ser un array de objetos
            ) => (
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
            )
          )
        ) : (
          <div>No abailable rooms/beds for the selected dates</div>
        )}
      </div>
    </div>
  );
}
