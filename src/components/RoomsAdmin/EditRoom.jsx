import React, { useContext } from 'react'
import NavBar from '../NavBar/NavBar';
import styles from './ConfirmDelete.module.css'
import { GlobalContext } from '../../GlobalContext/GlobalContext';

export default function EditRoom({props}) {
  
  console.log('propr desde EditRoom --> ', props)

  const { allRooms, getAllRooms } = useContext(GlobalContext);
  
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
