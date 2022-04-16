import React from 'react';
import styles from './Prueba.module.css';
import Reserva from '../Reserva/Reserva';
import RoomDetails from '../../components/RoomDetails/RoomDetails'

function Prueba() {
  return <div className={styles.prueba}><Reserva/></div>;
}

export default Prueba;
