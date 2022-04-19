import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './RoomCard.module.css';
import Button from '../Button/Button';
import { Modal } from '../Modal/Modal';
import RoomDetails from '../RoomDetails/RoomDetails';

export default function RoomCard(props) {
  const { cart, setCart, filterDates } = useContext(GlobalContext);
  const [localModal, setLocalModal] = useState(false);
  let initialstate = {
    checkIn: filterDates.checkIn,
    checkOut: filterDates.checkOut,
    roomName: props?.roomName,
    roomId: props?.roomId,
    bedPrice: props?.bedPrice,
    numberOfBeds: 0,
  };
  let countInitialState = props?.bedsAvailable;
  let [count, setCount] = useState(countInitialState);
  let [toCart, setToCart] = useState(initialstate);
  let [bedsOnCart, setBedsOnCart] = useState(0);

  const onClickHandler = function (arg) {
    if (arg === '+' && count > 0) {
      let aux = count - 1;
      setCount(aux);
      setToCart({
        ...toCart,
        numberOfBeds: toCart?.numberOfBeds + 1,
      });
    } else if (arg === '-' && count < props?.bedsAvailable) {
      let aux = count + 1;
      setCount(aux);
      setToCart({
        ...toCart,
        numberOfBeds: toCart.numberOfBeds - 1,
      });
    } else if (arg === 'add') {
      if (props?.private && count) {
        setToCart({
          ...toCart,
          numberOfBeds: props?.bedsAvailable,
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

  // console.log(cart);

  const onCLickImage = function () {
    setLocalModal((prevState) => !prevState);
  };

  return (
    <div className={styles.RoomCardContainer}>
      <div className={styles.RoomCardImages}>
        {!!localModal && (
          <Modal setLocalModal={setLocalModal}>
            <RoomDetails roomId={props?.roomId} />
          </Modal>
        )}
        <img
          onClick={onCLickImage}
          className={styles.RoomCardImg}
          src={props?.image[0]?.imagen}
          alt="room-img"
          id={props?.roomId}
        />
      </div>
      <div className={styles.RoomCardText}>
        <h2 className={styles.title}>Room: {props?.roomName}</h2>
        {/* <div>
          Availability for {filterDates.checkIn} to {filterDates.checkOut}
        </div> */}
        {props?.private ? ( // si la habitacion es privada no se agregan + o - camas sino que se reserva la habitacion entera
          <>
            <div className={styles.description}>
              <h3>
                This is a{' '}
                <span className={styles.spanDescription}>PRIVATE</span> room
              </h3>
              {props?.bathroom ? <p>With private bathroom</p> : null}
              <p>Room for {props?.bedsAvailable} people</p>
            </div>
            <p className={styles.price}>Room price: $ {props?.bedPrice}</p>
            <div className={styles.addToCart}>
              <Button msg="ADD to Cart" funct={() => onClickHandler('add')} />
            </div>
          </>
        ) : (
          <>
            <div className={styles.description}>
              <h3>
                This is a <span className={styles.spanDescription}>SHARED</span>{' '}
                room
              </h3>
              {props?.bathroom ? <p>With private bathroom</p> : null}
            </div>
            <p className={styles.price}>Bed price: $ {props?.bedPrice}</p>

            {props?.filtradas ? (
              <>
                <div className={styles.buttons}>
                  <div className={styles.flexButton}>
                    <Button msg="+" funct={() => onClickHandler('+')} />
                    <Button msg="-" funct={() => onClickHandler('-')} />
                  </div>
                </div>

                <div className={styles.addToCart}>
                  <p>{bedsOnCart} on Cart</p>
                  <Button
                    msg="ADD to Cart"
                    funct={() => onClickHandler('add')}
                  />
                </div>

                <p className={styles.amount}>
                  {toCart.numberOfBeds} beds selected, {count} left
                </p>
              </>
            ) : null}
          </>
        )}
      </div>
      {/* <div className={styles.RoomCardDescription}>
          <span>Room description: {props.description}</span>
      </div> */}
    </div>
  );
}
