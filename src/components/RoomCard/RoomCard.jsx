import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './RoomCard.module.css';
import Button from '../Button/Button';
import { Modal } from '../Modal/Modal';
import RoomDetails from '../RoomDetails/RoomDetails';

/*  VIENE POR PROPS:
        roomId
        roomName
        comodities
        bedPrice
        bedsAvailable
        totalBeds
        description
        bathroom
        image 
        private
        filtradas
        bedIds
 */
export default function RoomCard(props) {
  const { cart, setCart, filterDates } = useContext(GlobalContext);
  // console.log(filterDates)
  const [localModal, setLocalModal] = useState(false);
  let initialstate = {
    //para el toCart, solo lo usaremos por camas, si la habitacion es privada va directo al cart global
    // rooms: [], //LAS HABITACIONES PRIVADAS LAS AGREGAMOS DIRECTO A CART
    numberOfBeds: 0,
  };
  let [toCart, setToCart] = useState(initialstate); //solo para habitaciones compartidas, las privadas va directo al cart

  let countInitialState = props?.bedsAvailable;
  let [count, setCount] = useState(countInitialState);
  let [bedsOnCart, setBedsOnCart] = useState(0);

  const onClickHandler = function (arg) {
    if (arg === '+' && count > 0) {
      let aux = count - 1;
      setCount(aux); //SE ACTUALIZAN LAS CAMAS QUE QUEDAN EN ESA HABITACION
      setToCart({
        numberOfBeds: toCart?.numberOfBeds + 1,
      });
    } else if (arg === '-' && count < props?.bedsAvailable) {
      let aux = count + 1;
      setCount(aux);
      setToCart({
        numberOfBeds: toCart.numberOfBeds - 1,
      });
    } else if (arg === 'add') {
      if (props?.private && count !== 0) {
        //CONTROLAR SI EL CART YA TIENE LAS FECHAS Y SETEAR EL ID DE LA HABITACION Y EL SALDO
        setCart([
          // SI EL CART NO TIENE LAS FECHAS, ENVIARLAS O TOMARLAS EN EL CART DESDE EL ESTADO GLOBAL DE FECHAS
          ...cart,
          {
            private: 'private',
            roomId: props.roomId,
            checkIn: filterDates.checkIn,
            checkOut: filterDates.checkOut,
            price: props.bedPrice,
            roomName: props.roomName,
          },
        ]);
        setCount(0);
      } else if (toCart.numberOfBeds > 0) {
        //CHEQUEAR QUE EL CART TENGA LAS FECHAS
        let aux = props.bedIds.slice(0, toCart.numberOfBeds);
        setCart([
          // SI EL CART NO TIENE LAS FECHAS, ENVIARLAS O TOMARLAS EN EL CART DESDE EL ESTADO GLOBAL DE FECHAS
          ...cart,
          {
            private: 'shared',
            roomId: props.roomId,
            checkIn: filterDates.checkIn,
            checkOut: filterDates.checkOut,
            beds: [...aux],
            price: props.bedPrice,
            roomName: props.roomName,
          },
        ]);
        setBedsOnCart(toCart.numberOfBeds);
        setToCart(initialstate);
      }
    }
  };

  // console.log(cart);

  const onCLickImage = function () {
    setLocalModal((prevState) => !prevState);
  };
  console.log(props)

  return (
    <div className={styles.RoomCardContainer}>
      <div className={styles.RoomCardImg} onClick={onCLickImage}>
        {!!localModal && (
          <Modal setLocalModal={setLocalModal}>
            <RoomDetails roomId={props?.roomId} />
          </Modal>
        )}
        <img
          className={styles.RoomCardImg}
          src={props?.image[0]?.imagen}
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
              Room: <span className={styles.price}> {((props.bedPrice) * (props.totalBeds))} </span>
            </>
          ) : (
            <>
              Bed:<span className={styles.price}> {props.bedPrice} </span>
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
      {props?.filtradas ? (
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
      ) : null}
    </div>
  );
}
