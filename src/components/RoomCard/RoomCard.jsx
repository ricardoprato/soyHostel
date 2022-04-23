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

  // console.log(cart);

  const onCLickImage = function () {
    setLocalModal((prevState) => !prevState);
  };

  return (
    <div className={styles.RoomCardContainer}>
      <div className={styles.RoomCardImg} onClick={onCLickImage}>
        {!!localModal && (
          <Modal setLocalModal={setLocalModal}>
            <RoomDetails roomId={props.roomId} />
          </Modal>
        )}
        <img
          className={styles.RoomCardImg}
          src={props.image[0]}
          alt="room-img"
          id={props?.roomId}
        />
      </div>
      <div className={styles.RoomCardText}>
        <h2 className={styles.title}>{props.roomName}</h2>
        {/* <div>
          Availability for {filterDates.checkIn} to {filterDates.checkOut}
        </div> */}
        <div className={styles.details}>
          <p>
            {props?.private ? (
              <>
                <i className="bi bi-lock-fill"></i>
                private
              </>
            ) : (
              <>
                <i className="bi bi-unlock-fill"></i>
                shared
              </>
            )}
          </p>
          {props?.bathroom ? (
            <p>
              <i className="bi bi-lock-fill"></i>
              bathroom
            </p>
          ) : null}
          <p>
            {props.bedsAvailable} <i className="bi bi-people-fill"></i>
          </p>
        </div>
        <p>
          {props?.private ? (
            <>
              Room: <span className={styles.price}>${props.bedPrice} </span>
            </>
          ) : (
            <>
              Bed:<span className={styles.price}> ${props.bedPrice} </span>
            </>
          )}
          <span>/ night</span>
        </p>
        <div className={styles.absolute}>
          <p className={styles.text}>
            {bedsOnCart} <i className="bi bi-cart"></i>
          </p>
          {props?.private ? null : (
            <>
              <p className={styles.textPlus}>
                {toCart.numberOfBeds}
                <i className="bi bi-person-plus-fill"></i>
              </p>
              <p className={styles.textDash}>
                {count} <i className="bi bi-person-dash-fill"></i>
              </p>
            </>
          )}
        </div>
      </div>
      {/* <div className={styles.RoomCardDescription}>
          <span>Room description: {props.description}</span>
      </div> */}
      <div className={styles.flexButton}>
        <div className={styles.addToCart}>
          {props?.private ? null : (
            <Button msg="-" funct={() => onClickHandler('-')} />
          )}
          <Button msg="ADD to Cart" funct={() => onClickHandler('add')} />
          {props?.private ? null : (
            <Button msg="+" funct={() => onClickHandler('+')} />
          )}
        </div>
      </div>
    </div>
  );
}
