import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

export default function EditRoom() {
  const { allRooms, getAllRooms } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(async () => {
    await getAllRooms();
    console.log('allrooms', allRooms);
  }, []);

  const handleEditClick = (id, e) => {
    navigate(`/editroom/${id}`);
  };

  return (
    <div>
      {allRooms?.map((r) => (
        <div key={r.id}>
          <ul>
            <li>{r.nombre}</li>
            <li>{r.cantCamas}</li>
            <li>{r.comodidades}</li>
            <li>{r.descripcion}</li>
            <li>{r.precio}</li>
            <button onClick={() => handleEditClick(r.id)}>Edit</button>
          </ul>
        </div>
      ))}
    </div>
  );
}
