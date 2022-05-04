import React from 'react';
import { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

function Modal({ children, setLocalModal }) {
  const { setDetails } = useContext(GlobalContext);

  const onCancel = () => {
    setLocalModal((prev) => !prev);
  };
  useEffect(() => {
    return () => {
      setLocalModal(false);
      setDetails({});
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div
        className={styles.modalBackground}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.cancel} onClick={onCancel}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export { Modal };
