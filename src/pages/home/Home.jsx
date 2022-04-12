import React from "react";
import Filters from "../../components/Filters/Filters";
import RoomCard from "../../components/RoomCard/RoomCard";
const availableBeds = [];
export default function Home() {
  return (
    <div className="HomeContainer">
      <div>
        <Filters />{" "}
      </div>
      <div className="RoomCardsContainer">
        {availableBeds.length > 0 ? (
          availableBeds.map(
            (
              r // availableBeds deberia ser un array de objetos que tengan la data unificada del back y front???
            ) => (
              <div>
                <RoomCard
                  key={r.id}
                  name={r.name}
                  img={r.img}
                  price={r.price}
                  availability={r.availability}
                  description={r.description}
                />
              </div>
            )
          )
        ) : (
          <div>No abailable rooms for the selected dates</div>
        )}
      </div>
    </div>
  );
}
