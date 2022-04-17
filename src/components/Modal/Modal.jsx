import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import Button from '../../components/Button/Button';
import { GlobalContext } from '../../GlobalContext/GlobalContext.jsx';

function Modal({ children }) {
  const { openModal, setOpenModal } = useContext(GlobalContext);
  const onCancel = () => {
    setOpenModal(false);
  };
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.ModalBackground}>{children}</div>
      <Button funct={onCancel} msg="cerrar" />
    </div>,
    document.getElementById('modal')
  );
}

export { Modal };
