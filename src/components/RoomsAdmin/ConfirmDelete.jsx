import React, { useEffect, useState, useContext } from 'react'
import NavBar from '../NavBar/NavBar';
import styles from './ConfirmDelete.module.css'
import { GlobalContext } from '../../GlobalContext/GlobalContext';


export default function ConfirmDelete({props}) {
  
  let warning = false;
  let name = props.nombre
  const [ message, setMessage ] = useState(`If you DELETE the ROOM ${name}, all the room data and it's asosiated bookings will be lost!!! Are you sure you want to delete it?`)
  const { reservations } = useContext(GlobalContext);
  
/////// VERIFICAMOS SI LA HABITACION TIENE RESERVAS ANTES DE ELIMINARLA ////////////////////////////
console.log('reservations --> ',reservations)
reservations?.length && reservations.forEach((r) => { 
  if(r.Habitacions?.length > 0){
    r.Habitacions.forEach((h)=>{
      if(h.id === props.id) warning = true;
    })
  }
  if(r.Camas?.length > 0){
    r.Camas.forEach((c)=>{
      if(c.HabitacionId === props.id) warning = true; 
    })
  }
});

  const handleConfirm = () => {
    console.log('id desde confirmDelete--> ',props.id)
    let token = localStorage.getItem('tokenProp');
    fetch(`${import.meta.env.VITE_APP_URL}/habitaciones/${props.id}`,
    {
      method: 'DELETE',
      headers: {
        api: `${import.meta.env.VITE_API}`,
        Authorization: 'Bearer ' + token,
        // 'Content-Type': 'application/json',
      } 
    }
  )
    .then((response) => response.json())
    .then((data) => { getAllRooms()})
    .catch((error) => {
      if (error.response) {
        const { response } = error;
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
      }
    })
    setMessage(`The room ${name} has been deleted`)
  };

  return (
    <div className={styles.background}>
      <NavBar/>
      <div id="id_confrmdiv">
        <h1>WARNING!!!</h1>
        <h3>{message}</h3>
        { 
          warning && <h1>WARNING!!! This room has pending bookings!!!</h1>
        }
      </div>
      <button onClick={()=> handleConfirm()}>Yes</button>
      
    </div>
  )
}
