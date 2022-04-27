import React from 'react'
import NavBar from '../NavBar/NavBar';
import styles from './ConfirmDelete.module.css'

export default function EditRoom({props}) {
  
  
  
  return (
    <div className={styles.background}>
      <NavBar/>
      <div id="id_confrmdiv">
        <h1>EDIT</h1>
        <h3>Room id: {props.id}</h3>
      </div>
      {/* <button onClick={()=> handleConfirm()}>Yes</button> */}
      
    </div>
  )
}
