import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../GlobalContext/GlobalContext";
import styles from './RoomCars.module.css';

export default function RoomCard(props) {
  const { cart, setCart } = useContext(GlobalContext);
  const { filterDates } = useContext(GlobalContext);

  let [count, setCount] = useState(props.bedsAvailable);
  let [toCart, setToCart] = useState({
    checkIn: filterDates.checkIn,
    checkOut: filterDates.checkOut,
    roomId: props.roomId,
    bedPrice: props.bedPrice,
    numberOfBeds: 0,
  });

  const onclickHandler = function (arg) {
    if (arg === "+" && count > 0) {
      setCount(count--);
      setToCart({
        ...toCart,
        numberOfBeds: toCart.numberOfBeds + 1,
      });
    } else if (arg === "-" && count < props.bedsAvailable) {
      setCount(count++);
      setToCart({
        ...toCart,
        numberOfBeds: toCart.numberOfBeds - 1,
      });
    } else if (arg === "add") {
      if (props.private) {
        setToCart({
          ...toCart,
          numberOfBeds: 1,
        });
      }
      setCart([...cart, toCart]);
    }
  };
  return (
    <div className={styles.RoomCardContainer}>
      <Link to={`/details/${props.roomId}`} /* poner el path correcto */>
        <img
          className={styles.RoomCardImg}
          src={`../../img/rooms/smallRoom${props.roomId}.png`}
          alt="room-img"
        />
      </Link>
      <div>Room: {props.name}</div>
      <div>
        Availability for {filterDates.checkIn} to {filterDates.checkOut}
      </div>
      <span>Room description: {props.description}</span>
      <div>
        {props.private ? (
          <div>
            <div>Room price: $ {props.bedPrice}</div>
            <div>Room for {count} people</div>
            <button onClick={() => onclickHandler("add")}> ADD to Cart </button>
          </div>
        ) : (
          <div>
            <div>Bed price: $ {props.bedPrice}</div>
            <button onClick={() => onclickHandler("+")}> + </button>
            <button onClick={() => onclickHandler("-")}> - </button>
            <div>
              {toCart.numberOfBeds} beds selected, {count} Beds left
            </div>
            <button onClick={() => onclickHandler("add")}> ADD to Cart </button>
          </div>
        )}
      </div>
    </div>
  );
}
