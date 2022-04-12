import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../GlobalContext/GlobalContext"

export default function RoomCard(props) {

  const { reservation, setReservation } = useContext(GlobalContext)
  let [count, setCount] = useState(props.bedsAvailable);

  const onclickHandler = function(arg) {
    if (arg === "+" && count > 0) {
      setCount(count--)
      setReservation({...reservation, reservation.beds++, reservation.total += props.bedPrice})
    }else if(arg === "-" && count < props.bedsAvailable){
      setCount(count++)
      setReservation({...reservation, reservation.beds--, reservation.total -= props.bedPrice})
    }
  };
  // {
  //   roomId: 1,
  //   bedPrice: 500,
  //   bedsAvailable: 10,
  //   roomName:"Habitación 1",
  //   description:"bal balb la bla bla",
  //   bathroom: true,
  //   private:true
  // },
  return (
    <div className="RoomCardContainer">
      <Link to={`/details/${props.roomId}`} /* poner el path correcto */>
        <img className="RoomCardImg" src={`../../img/${props.roomId}.png`} alt="room-img" /> {/* la imagen la vamos a asociar con el ID de habitacion sacandola de /img */}
      </Link>
      <div>Room: {props.name}</div>
      <div>{props.description}</div>
      <div>
        { props.private? (
          <div>
            <div>Room price: $ {props.bedPrice}</div>
            <div>Room for {count} people</div>
            <button onClick={()=> onclickHandlerPrivate("add")}>ADD</button>
          </div>
        ): (
          <div>
            <div>Bed price: $ {props.bedPrice}</div>
            <button onClick={()=> onclickHandler("+")}> + </button>
            <button onClick={()=> onclickHandler("-")}> - </button>
            <div>{count} Beds left</div>
          </div>
        )
        }
      </div>
    </div>
  );
}
