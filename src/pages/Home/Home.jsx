import React from 'react';
import Slider from '../../components/Slider/Slider';
import styles from './Home.module.css';
import { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext/GlobalContext.jsx';
import { Formulario } from '../../components/Formulario/Formulario';
import { Modal } from '../../components/Modal/Modal';

export default function Home() {
  const { openModal, setOpenModal } = useContext(GlobalContext);

  const onClickButton = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <>
      <main className={styles.home}>
        <Slider />
        {!!openModal && (
          <Modal>
            <Formulario />
          </Modal>
        )}
        <Button
          setOpenModal={setOpenModal}
          msg="View Avalaible"
          funct={onClickButton}
        />
      </main>
    </>
  );
}
