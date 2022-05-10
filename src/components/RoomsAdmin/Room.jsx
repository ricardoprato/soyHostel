import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import ConfirmDelete from './ConfirmDelete';
import FormEditRoom from '../FormEditRoom/FormEditRoom';
import styles from './Room.module.css';
export default function Room({ props }) {
  // console.log('props desde Room--> ', props)

  const [localModal, setLocalModal] = useState(false);
  const [localModal2, setLocalModal2] = useState(false);

  const handleDelete = () => {
    setLocalModal((prevState) => !prevState);
  };

  const handleEdit = () => {
    setLocalModal2((prevState) => !prevState);
  };

  return (
    <div className={styles.room}>
      {props.nombre}: {props.privada ? 'Private' : 'Shared'},{props.cantCamas}{' '}
      <button className={styles.butoncito} onClick={() => handleEdit(props.id)}>
        {!!localModal2 && (
          <Modal setLocalModal={setLocalModal2}>
            <FormEditRoom props={props} />
          </Modal>
        )}
        Edit
      </button>
      <button
        className={styles.butoncito}
        onClick={() => handleDelete(props.id)}
      >
        {!!localModal && (
          <Modal setLocalModal={setLocalModal}>
            <ConfirmDelete props={props} />
          </Modal>
        )}
        Delete
      </button>
    </div>
  );
}
