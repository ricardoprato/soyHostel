import React, { useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { useContext } from 'react';
import styles from './Cart.modules.css';

export default function Cart() {
  const { cart, setCart, genDataForCards, getFilteredBeds, setDataForCards } = useContext(GlobalContext);
  const [toBack, setToBack] = useState({})
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

  const handleCartRemove = (roomId) => { //  funcion para eliminar items del carrito
    let aux = cart.filter((e) => {
      return e.roomId !== roomId
    })
    // console.log(aux)
    setCart(aux)
    // console.log("handleCartRemove")
  }

  const handleConfirm = () =>{ 
    // console.log('toBack')
    // console.log(toBack)
    fetch(`${import.meta.env.VITE_APP_URL}/reservas`,
      {
        method: 'POST',
        headers: {
          api: `${import.meta.env.VITE_API}`,
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toBack),
      }
      )
      .then(response => response.json())
      .then(data =>{ 
        console.log(data)
        if (data?.id) {
          console.log("reserva enviada a back: ");console.log(toBack);
          getFilteredBeds(cart[0].checkIn, cart[0].checkOut)
        }})

      // .then(data => genDataForCards())
      .catch((error) => {
        if (error.response) {
          const { response } = error;
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        }
      });
      setCart([])  
  }
  let token = window.localStorage.getItem('tokenProp');
  
  let totalToPay = 0;
  let auxToBack = {};
  if(cart.length > 0){
    auxToBack = {                   //   ESTO ES LO QUE MANDAMOS AL BACK
      fecha_ingreso: cart[0]?.checkIn,
      fecha_egreso: cart[0]?.checkOut,
      camas: [],
      habitaciones: [],
      saldo: 0
    }}
  

  
  const fillToBack = () => {
    // console.log("se ejecuto fillToBack")
    // console.log("cart")
    // console.log(cart)
    cart.length && cart.forEach((r) => {
    if(r.private === "private"){
      auxToBack.habitaciones = [...auxToBack.habitaciones, r.roomId]
      totalToPay = totalToPay + r.price;
    }
    if(r.private === "shared"){
      let aux = r.beds.map((b)=> {
        return b.camaId
      })
      // console.log(aux)
      auxToBack.camas = [...auxToBack.camas, ...aux]   //mapear porque beds ahora es un array de objetos
      totalToPay = totalToPay + (r.price * r.beds.length)
    }
  }); 
  auxToBack.saldo = totalToPay;
  setToBack(auxToBack)
  // toBack?.saldo > 0 && console.log("toBack")
  // toBack?.saldo > 0 && console.log(toBack)

  }
  
  // useEffect(()=>{
  //   cart?.length === 0 && setCart([])
  // },[])

  useEffect(()=>{
    /* cart?.length && */ fillToBack();
  },[cart])

  

  // console.log("auxToBack")
  // auxToBack?.totalToPay !== 0 && console.log(auxToBack)

  

  return (
    <div className={styles.cartContainer}>
      <h1>You are about to book:</h1>
      {cart?.length &&
        ( cart?.map((r) => (
            <div key={r.roomId}>
              <h2>{r.roomName} - {r.private} room:</h2>
              <h3>Check-In: {r.checkIn}</h3>
              <h3>Check-Out: {r.checkOut}</h3>
              { r.private === "shared" ? (<>
                  <h3>Bed price per day: {r.price}</h3>
                  <h3>{r.beds.length} beds booked</h3>
                  <h3>subtotal: {(r.beds.length * r.price)}</h3>
                  {/* {r.beds.length * r.price} */}
              </>):(<>
                  <h3>Room price per day: {r.price}</h3>
                  {/* <h3>{r.beds?.length} beds booked</h3> */}
              </>)
              }
              <button onClick={()=> handleCartRemove(r.roomId)}>Cancel</button>
            </div>
  )))
      }
      <h2>Total to pay: {toBack.saldo}</h2>
      <button onClick={() => handleConfirm()}>Confirm booking</button><button onClick={()=>setCart([])}>Empty cart</button> 
      {/* AUN NO ESTA LA FUNCIONALIDAD DE PAGO */}
    </div>
  );
}