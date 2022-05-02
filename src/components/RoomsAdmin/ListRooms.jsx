import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import Room from './Room';
import styles from '../RoomsAdmin/ListRooms.module.css';

export default function ListRooms() {
  const { allRooms, getAllRooms, reservations, getReservations } =
    useContext(GlobalContext);

  const today = new Date();
  const start = new Date(today);
  const end = new Date(today);
  start.setDate(start.getDate());
  end.setDate(end.getDate() + 60);

  useEffect(() => {
    allRooms.length === 0 && getAllRooms();
    if (reservations?.length === 0) {
      getReservations(
        start.toLocaleDateString('en-CA'),
        end.toLocaleDateString('en-CA')
      );
    }
  }, [allRooms]);

  // allRooms?.length && console.log(allRooms)
  return (
    <div className={styles.container}>
      <h3>List of Room:</h3>
      {allRooms?.length && allRooms.map((r) => <Room key={r.id} props={r} />)}
    </div>
  );
}
