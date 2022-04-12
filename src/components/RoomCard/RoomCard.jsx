import React from "react";
import { Link } from "react-router-dom";

export default function RoomCard() {
  return (
    <div className="RoomCardContainer">
      <Link to={`/details/${props.id}`} /* poner el path correcto */>
        <img className="RoomCardImg" src={props.img} alt="room-img" />
      </Link>
      <div>{props.description}</div>
      <div>
        <div>$ {props.price}</div>
        <button> + </button>
        <button> - </button>
        <div>{props.abailability} Beds left</div>
        <button>ADD</button>
      </div>
    </div>
  );
}
