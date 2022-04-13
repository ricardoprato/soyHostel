import React from 'react'
import GlobalContext from '../../GlobalContext/GlobalContext'
import { useContext } from 'react'
import styles from './Cart.modules.css'

export default function Cart() {

  const { cart, setCart } = useContext(GlobalContext)
  // const { availableBeds } = useContext(GlobalContext)

  let totalToPay = 0;
 
  return (
    
    // la data desde las cards llega en un objeto asi:{
    // checkIn: filterDates.checkIn,
    // checkOut: filterDates.checkOut,
    // roomName: props.roomName,
    // roomId: props.roomId,
    // bedPrice: props.bedPrice,
    // numberOfBeds: 0,
    // }

    <div className={styles.cartContainer}>
      <h1>Your Booking:</h1>
      {
        cart.length > 0 ? (
          cart.map((r)=>{
            <div>
              <h2>{r.roomName}</h2>
              <h3>Check-In: {r.checkIn}</h3>
              <h3>Check-Out: {r.checkOut}</h3>
              <h3>Bed price per day: {r.bedPrice}</h3>
              <h3>{r.numberOfBeds} beds booked</h3>
              {totalToPay = totalToPay + (r.numberOfBeds * r.bedPrice)}
            </div>
          })
        ):( null )
      }
      <h2>Total to pay: {totalToPay}</h2>
      <button>Pay/Register</button> {/* aqui el boton deberia enviar a registration si el usuario no esta registrado y sino a pago */}
    </div>
  )
}
