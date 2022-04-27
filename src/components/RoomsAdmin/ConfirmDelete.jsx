import React from 'react'
import NavBar from '../NavBar/NavBar';
import styles from './ConfirmDelete.module.css'

export default function ConfirmDelete({props}) {
  console.log('props desde ConfirmDelete--> ', props)


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
  };

  // function doSomething(){
  //   document.getElementById('id_confrmdiv'); //this is the replace of this line


  //   const handleDelete = (id) => {
  //     setLocalModal((prevState) => !prevState);
  //   }
  //   // document.getElementById('id_truebtn').onClick = function(){
  // }

  return (
    <div className={styles.background}>
      <NavBar/>
      <div id="id_confrmdiv">
        <h1>WARNING!!!</h1>
        <h3>If you DELETE the ROOM {props.nombre}, all the room data and it's asosiated reservations will be lost!!! Are you sure you want to delete?</h3>
      </div>
      <button onClick={()=> handleConfirm()}>Yes</button>
      
    </div>
  )
}
