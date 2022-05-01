import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

const PopupEditRoom = () => {
  const { allRooms } = useContext(GlobalContext);
  const [room, setRoom] = useState({});

  let params = useParams();

  useEffect(() => {
    const habitacionEncontrada = allRooms?.find((r) => {
      return r.id === params.id;
    });

    setRoom(habitacionEncontrada);
    console.log('roomfound ?', habitacionEncontrada);
  }, []);
  console.log('rooms ?', allRooms);

  return (
    <div>
      <h1>asd</h1>
    </div>
  );
};

export default PopupEditRoom;
