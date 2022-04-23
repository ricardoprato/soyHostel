import React from 'react';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { useContext } from 'react';
import styles from './Cart.modules.css';

export default function Cart() {
  const { cart, setCart } = useContext(GlobalContext);
  // const { availableBeds } = useContext(GlobalContext)

  let totalToPay = 0;
  ////////// EL BACK NECESITA ESTO /////////////////////////
	// {
  //   "fecha_ingreso":"2022-01-10", 
  //   "fecha_egreso":"2022-01-15",
  //   "camas":["5b920a51-0651-42f4-b72d-e18bb3f63ad4"],
  //   "habitaciones": [],
  //   "saldo": 100
  // }
  ////////////////////////////////////////////////////////////

  ////////////// ASI RECIBIMOS LA DATA DESDE LAS CARDS AL CART //////////////////////
  // [
  //  {
  //     private: "private",
  //     roomId: props.roomId,
  //     checkIn: filterDates.checkIn,
  //     checkOut: filterDates.checkOut,
  //     price: props.bedPrice, 
  //     roomName: props.roomName
  //  }
  //  {
  //    private: "Shared",
  //    roomId: props.roomId,
  //    checkIn: filterDates.checkIn,
  //    checkOut: filterDates.checkOut,
  //    beds: [...aux ],
  //    price: props.bedPrice,
  //    roomName: props.roomName
  //  }
  // ] 
  // 
  ///////////////////////////////////////////////////////////////////////////////////

  const handleCartRemove = (roomId) => { //  funcion para eliminar items del carrito
    let aux = cart.filter((e) => {
      e.roomId !== roomId
    })
    setCart(aux)
  }

  const handleConfirm = () =>{
    fetch(
      'https://backpfhenryv2.herokuapp.com/reservas',
      {
        method: 'POST',
        headers: {
          api: 'b1eb0ff9c64d38b4e55d56d45047188a9baa1b3c572f349d815a517e976e0c78e48e61224f04ee990f25f75fe4dc66a7f9a6196a950faa997a65749b012853f6',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toBack),
      }
      )
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error)=> console.log(error))
  }
  
  let toBack = {};
  if(cart.length > 0){
    toBack = {                   //   ESTO ES LO QUE MANDAMOS AL BACK
      fecha_ingreso: cart[0]?.checkIn,
      fecha_egreso: cart[0]?.checkOut,
      camas: [],
      habitaciones: [],
      saldo: totalToPay
    }}

  cart.forEach((r) => {
    if(r.private === "private"){
      toBack.habitaciones.push(r.roomId)
    }else if(r.privada === "shared"){
      toBack.camas = toBack.camas.concat(r.beds)
    }
  });

  return (
    <div className={styles.cartContainer}>
      <h1>You are about to book:</h1>
      {cart?.length > 0
        ? cart?.map((r) => {
            <div>
              <h2>{r.roomName} - {r.private} room:</h2>
              <h3>Check-In: {r.checkIn}</h3>
              <h3>Check-Out: {r.checkOut}</h3>
              { r.private === "shared" ? (<>
                  <h3>Bed price per day: {r.price}</h3>
                  <h3>{r.beds.length} beds booked</h3>
                  <h3>subtotal: {(r.beds.length * r.price)}</h3>
                  {(totalToPay = totalToPay + (r.beds.length * r.price))}
              </>):(<>
                  <h3>Room price per day: {r.price}</h3>
                  <h3>{r.beds.length} beds booked</h3>
                  {(totalToPay = totalToPay + r.price)}
              </>)
              }
              <button onClick={handleCartRemove(r.roomId)}>Cancel</button>
            </div>
          })
        : <h2> There is nothing on your cart</h2>}
      <h2>Total to pay: {totalToPay}</h2>
      <button onClick={handleConfirm()}>Confirm booking</button><button onClick={setCart([])}>Empty cart</button> 
      {/* AUN NO ESTA LA FUNCIONALIDAD DE PAGO */}
    </div>
  );
}