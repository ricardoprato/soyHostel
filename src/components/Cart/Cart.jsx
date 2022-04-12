import React from 'react'
import GlobalContext from '../../GlobalContext/GlobalContext'
import { useContext } from 'react'

export default function Cart() {

  const { cart/* , setCart */ } = useContext(GlobalContext)
  const { availableBeds } = useContext(GlobalContext)

  let total = 0;

  return (
    
  // mostrar camas/habitaciones reservadas
  // total y subtotal a pagar
  // fechas check in - check out
  // boton confirmar reserva(tiene que abrir el pago o el register(si no esta aun registrado))
    <div>
      <h1>Your Booking:</h1>
      <h3>Check-In: {checkIn}</h3>
      <h3>Check-Out: {checkOut}</h3>
      {
        // aca tengo que mapear las camas reservadas del estado cart sacando su precio del estado availableBeds por roomId
      }
      <h3>Total: $ {total}</h3>
    </div>
  )
}
