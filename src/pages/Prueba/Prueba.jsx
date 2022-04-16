import { useState, useEffect } from 'react';
import React from 'react';
import FilterBar from '../../components/FilterBar/FilterBar';
import Calendar from '../../components/Calendar/Calendar';
import styles from './Prueba.module.css';
import Reserva from '../Reserva/Reserva';
import RoomDetails from '../../components/RoomDetails/RoomDetails'

function Prueba() {
  return (
    <div>
      <Calendar />
      <p>Puto el que lee</p>
    </div>
  );



}

export default Prueba;
