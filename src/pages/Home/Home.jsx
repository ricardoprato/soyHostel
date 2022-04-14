import Button from '../../components/Button/Button';
import React from 'react';
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
      <main>
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
