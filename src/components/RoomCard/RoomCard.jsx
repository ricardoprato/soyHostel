import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './RoomCard.module.css';
import Button from '../Button/Button';

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
  let countInitialState = props.bedsAvailable;
  let [count, setCount] = useState(countInitialState);
  let [toCart, setToCart] = useState(initialstate);
  let [bedsOnCart, setBedsOnCart] = useState(0);

  const onClickHandler = function (arg) {
    if (arg === '+' && count > 0) {
      let aux = count - 1;
      setCount(aux);
      setToCart({
        ...toCart,
        numberOfBeds: toCart.numberOfBeds + 1,
      });
    } else if (arg === '-' && count < props.bedsAvailable) {
      let aux = count + 1;
      setCount(aux);
      setToCart({
        ...toCart,
        numberOfBeds: toCart.numberOfBeds - 1,
      });
    } else if (arg === 'add') {
      if (props.private && count) {
        setToCart({
          ...toCart,
          numberOfBeds: props.bedsAvailable,
        });
        setCount(0);
      }
      if (toCart.numberOfBeds > 0) {
        setCart([...cart, toCart]);
        setBedsOnCart(toCart.numberOfBeds);
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
            src={props.image[0]}
            alt="room-img"
          />
        </Link>
      </div>
      <div className={styles.RoomCardText}>
        <div>Room: {props.roomName}</div>
        {/* <div>
          Availability for {filterDates.checkIn} to {filterDates.checkOut}
        </div> */}
        <div>
          {props.private ? ( // si la habitacion es privada no se agregan + o - camas sino que se reserva la habitacion entera
            <div>
              <div>This is a PRIVATE room</div>
              {props.bathroom ? <div>With private bathroom</div> : null}
              <div>Room price: $ {props.bedPrice * props.bedsAvailable}</div>
              <div>Room for {props.bedsAvailable} people</div>
              <Button msg="ADD to Cart" funct={() => onClickHandler('add')} />
            </div>
          ) : (
            <div>
              <div>This is a SHARED room</div>
              {props.bathroom ? <div>With private bathroom</div> : null}
              <div>Bed price: $ {props.bedPrice}</div>
              <div>
                <Button msg="+" funct={() => onClickHandler('+')} />
                <Button msg="-" funct={() => onClickHandler('-')} />
                {toCart.numberOfBeds} beds selected, {count} left
              </div>
              <div>
                <Button msg="ADD to Cart" funct={() => onClickHandler('add')} />{' '}
                {bedsOnCart} on Cart
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className={styles.RoomCardDescription}>
          <span>Room description: {props.description}</span>
      </div> */}
    </div>
  );
}
