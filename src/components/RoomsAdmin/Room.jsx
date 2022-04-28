import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import ConfirmDelete from './ConfirmDelete';
import EditRoom from './EditRoom';

export default function Room({props}) {

  // console.log('props desde Room--> ', props)

  const [localModal, setLocalModal] = useState(false)
  const [localModal2, setLocalModal2] = useState(false)

  const handleDelete = (id) => {
    setLocalModal((prevState) => !prevState);
  }

  const handleEdit = (id) => {
    setLocalModal2((prevState) => !prevState);
  }



  return (
    <div>
      {props.nombre}: {props.privada ? "Private" : "Shared"},
      {props.cantCamas} beds. 
      <button onClick={()=>handleEdit(props.id)}>{!!localModal2 && (
        <Modal setLocalModal={setLocalModal2}>
          <EditRoom props={props} />
        </Modal>
      )}Edit</button>
      <button onClick={()=>handleDelete(props.id)}>{!!localModal && (
        <Modal setLocalModal={setLocalModal}>
          <ConfirmDelete props={props} />
        </Modal>
      )}Delete</button></div>
  )
}
