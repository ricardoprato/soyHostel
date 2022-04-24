import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { Modal } from '../Modal/Modal';
import ConfirmDelete from './ConfirmDelete';

export default function ListDeleteRoom() {
  
  const { allRooms, getAllRooms } = useContext(GlobalContext);
  const [localModal, setLocalModal] = useState(false)

  useEffect(()=>{
    allRooms.length === 0 && getAllRooms()
  },[])
  
  const handleDelete = (id) => {
    setLocalModal((prevState) => !prevState);
  }


  console.log(allRooms)
  return (
    <div>
      <h3>List of Room:</h3>
      {allRooms?.length && allRooms.map((r)=> (
        <div key={r.id}>
          {r.nombre}: {r.privada ? "Private" : "Shared"},
          {r.cantCamas} beds. 
          <button onClick={()=>handleDelete(r.id)}>{!!localModal && (
          <Modal setLocalModal={setLocalModal}>
            <ConfirmDelete id={r.id} />
          </Modal>
        )}Delete</button></div>
      ))}
    
    
    
    </div>
  )
}
