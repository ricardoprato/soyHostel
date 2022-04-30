import React, { useContext, useEffect, useState } from 'react';

export default function EditRoom(props) {
  const handleEditClick = () => {
    console.log('props en EditRoom--> ', props);
  };
  console.log('props name--> ', props.props.nombre);

  return (
    <div>
      <div key={props.id}>
        <p>{props.props.nombre}</p>
        <p>{props.props.cantCamas}</p>
        <p>{props.props.comodidades}</p>
        <p>{props.props.descripcion}</p>
        <p>{props.props.precio}</p>
        <button onClick={() => handleEditClick(props.id)}>Edit</button>
      </div>
    </div>
  );
}
