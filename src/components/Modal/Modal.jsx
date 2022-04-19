import React from 'react';
import { useContext } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import Button from '../../components/Button/Button';

function Modal({ children, setLocalModal }) {
  const onCancel = () => {
    setLocalModal(false);
  };
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.ModalBackground}>
        {children} <Button funct={onCancel} msg="cerrar" />
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export { Modal };
