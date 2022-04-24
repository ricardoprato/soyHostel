import React from 'react';
import { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import Button from '../../components/Button/Button';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

function Modal({ children, setLocalModal }) {
  const { setDetails } = useContext(GlobalContext);

  const onCancel = () => {
    setLocalModal(false);
  };
  useEffect(() => {
    return setDetails({});
  }, []);

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
