import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import Room from './Room'

export default function ListRooms() {
  
  const { allRooms, getAllRooms } = useContext(GlobalContext);

  useEffect(()=>{
    allRooms.length === 0 && getAllRooms()
  },[allRooms])
  
  // allRooms?.length && console.log(allRooms)
  return (
    <div>
      <h3>List of Room:</h3>
      {allRooms?.length && allRooms.map((r)=> (
        <Room key={r.id} props={r}/>
      ))}
    </div>
  )
}
