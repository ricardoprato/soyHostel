import React, { useContext, useEffect, useState, useRef } from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import FilterBar from '../../components/FilterBar/FilterBar';
import styles from './Reserva.module.css';
import explore1 from '../../Images/lava-rock.gif';
import LoaderDark from '../Loader/LoaderDark';

export default function Reserva() {
  const divImage = useRef();

  useEffect(() => {
    divImage.current.style.backgroundImage = `url(${explore1})`;
    divImage.current.style.backgroundPosition = window.scrollY * 0.5 + 'px';
  }, [divImage]);

  const {
    filteredAvailableBeds,
    allRooms,
    filteredRooms,
    getAllRooms,
    dataForCards,
    dataForCardsCopy,
    genDataForCards,
    flag,
  } = useContext(GlobalContext);

  //este va a ser el estado del cual se le va a pasar las props a las cards

  useEffect(() => {
    allRooms.length === 0 && getAllRooms();
    // console.log('allRooms desde reserva');
    // console.log(allRooms);
  }, [allRooms]);

  useEffect(() => {
    filteredAvailableBeds?.length > 0 && genDataForCards();
  }, [filteredAvailableBeds]);

  // useEffect(()=>{
  //   console.log('filteredRooms desde reserva');
  //   console.log(filteredRooms);
  // },[filteredRooms])

  // console.log("dataForCards")
  // console.log(dataForCards)
  // console.log('allRooms');
  // console.log(allRooms);

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Simple, Elegant and Comfortable rooms</h2>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nemo
          veniam rerum facere libero asperiores placeat, accusantium omnis vel
          consequatur atque aperiam eum officia quas soluta commodi quos harum.
          Ut!
        </p>
      </div>
      <div className={styles.relative}>
        <div className={styles.parallax} ref={divImage}></div>
        <FilterBar />
        <div className={`${styles.RoomCardsContainer}`}>
          {!dataForCards.length && !filteredRooms.length ? (
            <LoaderDark />
          ) : !flag && filteredRooms.length ? (
            filteredRooms?.map((r) => (
              <RoomCard
                filtradas={r?.filtradas}
                key={r?.id}
                roomId={r?.id} //json de los sueños
                roomName={r?.nombre}
                comodities={r?.comodidades}
                description={r?.descripcion}
                bedsAvailable={r?.cantCamas} //json de los sueños
                totalBeds={r.totalBeds ? r?.totalBeds : r?.cantCamas}
                private={r?.privada}
                bedPrice={
                  r?.privada
                    ? r?.precio
                    : r?.precio / (r?.totalBeds || r?.cantCamas)
                }
                bathroom={r?.banoPrivado}
                image={r?.Imagens}
                bedIds={r?.bedIds}
              />
            ))
          ) : flag ? (
            <p style={{ color: 'black', background: 'red' }}>
              No Available Rooms
            </p>
          ) : (
            <p>No room Availables with those parameteres</p>
          )}
        </div>
      </div>
    </>
  );
}
