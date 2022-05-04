import React, { useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { useContext } from 'react';
import styles from './Cart.module.css';
import Stripe from '../../components/Stripe/Stripe';
export default function Cart() {
  const [pay, setPay] = useState(false);
  const {
    cart,
    setCart,
    genDataForCards,
    getFilteredBeds,
    setDataForCards,
    toBack,
    setToBack,
    filterDates,
  } = useContext(GlobalContext);
  // const { availableBeds } = useContext(GlobalContext)

  let token = window.localStorage.getItem('tokenProp');

  let totalToPay = 0;
  let auxToBack = {};
  if (cart?.length > 0) {
    auxToBack = {
      //   ESTO ES LO QUE MANDAMOS AL BACK
      fecha_ingreso: cart[0]?.checkIn,
      fecha_egreso: cart[0]?.checkOut,
      camas: [],
      habitaciones: [],
      saldo: 0,
    };
  }

  const fillToBack = () => {
    cart.length &&
      cart.forEach((r) => {
        if (r.private === 'private') {
          auxToBack.habitaciones = [...auxToBack.habitaciones, r.roomId];
          totalToPay = totalToPay + r.price;
        }
        if (r.private === 'shared') {
          let aux = r.beds.map((b) => {
            return b.camaId;
          });
          // console.log(aux)
          auxToBack.camas = [...auxToBack.camas, ...aux]; //mapear porque beds ahora es un array de objetos
          totalToPay = totalToPay + r.price * r.beds.length;
        }
      });
    auxToBack.saldo = totalToPay;
    setToBack(auxToBack);
    // toBack?.saldo > 0 && console.log("toBack")
    // toBack?.saldo > 0 && console.log(toBack)
  };

  // useEffect(()=>{
  //   cart?.length === 0 && setCart([])
  // },[])

  useEffect(() => {
    /* cart?.length && */ fillToBack();
  }, [cart]);

  // console.log("auxToBack")
  // auxToBack?.totalToPay !== 0 && console.log(auxToBack)

  const handleClick = () => {
    setPay((prev) => !prev);
    // token ? navigate('/reserva') : alert('You need to be logged to reserve');
  };

  const handleEmprtyCart = () => {
    setCart([]);
    getFilteredBeds(filterDates.checkIn, filterDates.checkOut);
  }

  // console.log('CARRITO????', cart);
  return (
    <>
      {pay ? (
        <Stripe setPay={setPay} />
      ) : (
        <div className={styles.cartContainer}>
          {cart?.length ? (
            <>
              <h2>You are about to book:</h2>
              {cart?.map((r) => (
                <div key={r.roomId} className={styles.info}>
                  <p>
                    {r.roomName} - {r.private} room:
                  </p>
                  <p>Check-In: {r.checkIn}</p>
                  <p>Check-Out: {r.checkOut}</p>
                  {r.private === 'shared' ? (
                    <>
                      <p>Bed price per day: {r.price}</p>
                      <p>{r.beds.length} beds booked</p>
                      <p>subtotal: ${r.beds.length * r.price}</p>
                      {/* {r.beds.length * r.price} */}
                    </>
                  ) : (
                    <>
                      <p>Room price per day: ${r.price}</p>
                      {/* <h3>{r.beds?.length} beds booked</h3> */}
                    </>
                  )}
                </div>
              ))}
              <p>Total to pay: ${toBack.saldo}</p>
              <button
                className={`${styles.button} ${styles.payment}`}
                onClick={handleClick}
              >
                <i className="bi bi-credit-card-2-back"></i> Go to payment
              </button>
              <button
                className={`${styles.button} ${styles.empty}`}
                onClick={() => handleEmprtyCart()}>
                <i className="bi bi-bag"></i> Empty cart
              </button>
              {/* AUN NO ESTA LA FUNCIONALIDAD DE PAGO */}
            </>
          ) : (
            <div className={styles.noAvalaible}>
              You have no reserves in the bag, please make one and come back
            </div>
          )}
        </div>
      )}
    </>
  );
}
