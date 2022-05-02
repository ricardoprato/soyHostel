import React, { useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { useContext } from 'react';
import styles from './Cart.module.css';
import { useNavigate } from 'react-router';

export default function Cart() {
  const {
    cart,
    setCart,
    genDataForCards,
    getFilteredBeds,
    setDataForCards,
    toBack,
    setToBack,
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  // const { availableBeds } = useContext(GlobalContext)

  ////////// EL BACK NECESITA ESTO /////////////////////////
  /* 	{
    "fecha_ingreso":"2022-01-10", 
    "fecha_egreso":"2022-01-15",
    "camas":["5b920a51-0651-42f4-b72d-e18bb3f63ad4"],
    "habitaciones": [],
    "saldo": 100
  } */
  ////////////////////////////////////////////////////////////

  ////////////// ASI RECIBIMOS LA DATA DESDE LAS CARDS AL CART //////////////////////
  /*  [
   {
      private: "private",
      roomId: props.roomId,
      checkIn: filterDates.checkIn,
      checkOut: filterDates.checkOut,
      price: props.bedPrice, 
      roomName: props.roomName
   }
   {
     private: "Shared",
     roomId: props.roomId,
     checkIn: filterDates.checkIn,
     checkOut: filterDates.checkOut,
     beds: [...aux ],
     price: props.bedPrice,
     roomName: props.roomName
   }
  ] 
   */
  ///////////////////////////////////////////////////////////////////////////////////

  /*   let cartMock = [
    {
      private: "private",
      roomId: 8,
      checkIn: "2022-06-06",
      checkOut: "2022-06-07",
      price: 500, 
      roomName: "Family"
    },
    {
      private: "shared",
      roomId: 4,
      checkIn: "2022-06-06",
      checkOut: "2022-06-07",
      beds: ["bdcf3d42-7884-4d56-85c0-f6794f49a2ee",
      "d69809be-b3a3-4779-ad9a-ebe7b77ab72b"],
      price: 300,
      roomName: "Godzilla"
    }
  ]   */

  const handleCartRemove = (roomId) => {
    //  funcion para eliminar items del carrito
    let aux = cart.filter((e) => {
      return e.roomId !== roomId;
    });
    // console.log(aux)
    setCart(aux);
    // console.log("handleCartRemove")
  };

  //   const handleConfirm = () => {
  //     // console.log('toBack')
  //     // console.log(toBack)
  //     fetch(`${import.meta.env.VITE_APP_URL}/reservas`, {
  //       method: 'POST',
  //       headers: {
  //         api: `${import.meta.env.VITE_API}`,
  //         Authorization: 'Bearer ' + token,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(toBack),
  //     })
  //       .then((response) => response.json())
  //       .then((data) =>
  //         setTimeout(() => {
  //           console.log('reserva enviada a back: ');
  //           console.log(toBack);
  //           getFilteredBeds(cart[0].checkIn, cart[0].checkOut);
  //         }, 2000)
  //       )

  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data?.id) {
  //           console.log('reserva enviada a back: ');
  //           console.log(toBack);
  //           getFilteredBeds(cart[0].checkIn, cart[0].checkOut);
  //         }
  //       })

  //       // .then(data => genDataForCards())

  //       .catch((error) => {
  //         if (error.response) {
  //           const { response } = error;
  //           console.log(response.data);
  //           console.log(response.status);
  //           console.log(response.headers);
  //         }
  //       });
  //     setCart([]);
  //   };
  // const handleConfirm = () => {
  //   // console.log('toBack')
  //   // console.log(toBack)
  //   fetch(`${import.meta.env.VITE_APP_URL}/reservas`, {
  //     method: 'POST',
  //     headers: {
  //       api: `${import.meta.env.VITE_API}`,
  //       Authorization: 'Bearer ' + token,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(toBack),
  //   })
  //     .then((response) => response.json())
  //     .then((data) =>
  //       setTimeout(() => {
  //         console.log('reserva enviada a back: ');
  //         console.log(toBack);
  //         getFilteredBeds(cart[0].checkIn, cart[0].checkOut);
  //       }, 2000)
  //     )

  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data?.id) {
  //         console.log('reserva enviada a back: ');
  //         console.log(toBack);
  //         getFilteredBeds(cart[0].checkIn, cart[0].checkOut);
  //       }
  //     })

  //     // .then(data => genDataForCards())

  //     .catch((error) => {
  //       if (error.response) {
  //         const { response } = error;
  //         console.log(response.data);
  //         console.log(response.status);
  //         console.log(response.headers);
  //       }
  //     });
  //   setCart([]);
  // };
  let token = window.localStorage.getItem('tokenProp');

  let totalToPay = 0;
  let auxToBack = {};
  if (cart.length > 0) {
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
    // console.log("se ejecuto fillToBack")
    // console.log("cart")
    // console.log(cart)
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
    token ? navigate('/reserva') : alert('You need to be logged to reserve');
  };

  console.log('CARRITO????', cart);
  return (
    <div className={styles.cartContainer}>
      {cart?.length ? (
        <>
          <h2>You are about to book:</h2>
          {cart?.map((r) => (
            <div key={r.roomId}>
              <p>
                {r.roomName} - {r.private} room:
              </p>
              <p>Check-In: {r.checkIn}</p>
              <p>Check-Out: {r.checkOut}</p>
              {r.private === 'shared' ? (
                <>
                  <p>Bed price per day: {r.price}</p>
                  <p>{r.beds.length} beds booked</p>
                  <p>subtotal: {r.beds.length * r.price}</p>
                  {/* {r.beds.length * r.price} */}
                </>
              ) : (
                <>
                  <p>Room price per day: {r.price}</p>
                  {/* <h3>{r.beds?.length} beds booked</h3> */}
                </>
              )}
              <button onClick={() => handleCartRemove(r.roomId)}>Cancel</button>
            </div>
          ))}
          <p>Total to pay: {toBack.saldo}</p>
          <button onClick={handleClick}>Go to payment</button>
          <button onClick={() => setCart([])}>Empty cart</button>
          {/* AUN NO ESTA LA FUNCIONALIDAD DE PAGO */}
        </>
      ) : (
        <div className={styles.noAvalaible}>
          You have no reserves in the bag, please make one and come back
        </div>
      )}
    </div>
  );
}
