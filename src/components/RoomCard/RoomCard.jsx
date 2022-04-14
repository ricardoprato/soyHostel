import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './RoomCard.module.css';

export default function RoomCard(props) {
  const { cart, setCart } = useContext(GlobalContext);
  const { filterDates } = useContext(GlobalContext);

  let initialstate = {
    checkIn: filterDates.checkIn,
    checkOut: filterDates.checkOut,
    roomName: props.roomName,
    roomId: props.roomId,
    bedPrice: props.bedPrice,
    numberOfBeds: 0,
  };
  let countInitialState = props.bedsAvailable
  let [count, setCount] = useState(countInitialState);
  let [toCart, setToCart] = useState(initialstate);

  const oncliCkHandler = function (arg) {
    if (arg === '+' && count > 0) {
      let aux = count -1
      setCount(aux);
      setToCart({
        ...toCart,
        numberOfBeds: toCart.numberOfBeds + 1,
      });
    } else if (arg === '-' && count < props.bedsAvailable) {
      let aux = count + 1
      setCount(aux);
      setToCart({
        ...toCart,
        numberOfBeds: toCart.numberOfBeds - 1,
      });
    } else if (arg === 'add') {
      if (props.private) {
        setToCart({
          ...toCart,
          numberOfBeds: props.bedsAvailable,
        });
      }
      if (toCart.numberOfBeds > 0) {
        setCart([...cart, toCart]); //  llega al estado Global???
        setToCart(initialstate);
      }
    }
  };
  console.log(cart);
  return (
    <div className={styles.RoomCardContainer}>
      <div className={styles.RoomCardImages}>
        <Link to={`/details/${props.roomId}`}>
          <img
            className={styles.RoomCardImg}
            src={`https://handyhostel.com/wp-content/uploads/2020/10/nomads-brisbane-hostel-dorm1574757593.jpg`}
            alt="room-img"
          />
        </Link>
      </div>
      <div className={styles.RoomCardText}>
        <div>Room: {props.roomName}</div>
        <div>
          Availability for {filterDates.checkIn} to {filterDates.checkOut}
        </div>
        <span>Room description: {props.description}</span>
        <div>
          {props.private ? ( // si la habitacion es privada no se agregan + o - camas sino que se reserva la habitacion entera
            <div>
              <div>This is a PRIVATE room</div>
              {props.bathroom ? <div>With private bathroom</div> : null}
              <div>Room price: $ {props.bedPrice * props.bedsAvailable}</div>
              <div>Room for {props.bedsAvailable} people</div>
              <button onClick={() => oncliCkHandler('add')}>
                {' '}
                ADD to Cart{' '}
              </button>
            </div>
          ) : (
            <div>
              <div>This is a SHARED room</div>
              {props.bathroom ? <div>With private bathroom</div> : null}
              <div>Bed price: $ {props.bedPrice}</div>
              <button onClick={() => oncliCkHandler('+')}> + </button>
              <button onClick={() => oncliCkHandler('-')}> - </button>
              <div>
                {toCart.numberOfBeds} beds selected, {count} Beds left
              </div>
              <button onClick={() => oncliCkHandler('add')}>
                {' '}
                ADD to Cart{' '}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
