import React, { useContext } from 'react';
import Button from '../../components/Button/Button';
import { GlobalContext } from '../../GlobalContext/GlobalContext.jsx';

function Formulario() {
  const { openModal, setOpenModal } = useContext(GlobalContext);
  const onCancel = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <label>FORMULARIO DE PRUEBA</label>
      <Button funct={onCancel} msg="cerrar" />
    </div>
  );
}

export { Formulario };
