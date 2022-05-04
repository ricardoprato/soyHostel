import React, { useState, useContext } from 'react';
import styles from '../Avatar/Avatar.module.css';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { Modal } from '../Modal/Modal';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BookingHistory from '../BookingHistory/BookingHistory';
import InfoUser from '../InfoUser/InfoUser';
function Avatar() {
  const { setToken, token, rol, setRol } = useContext(GlobalContext);
  const [toggle, setToggle] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const navigate = useNavigate();
  // Aca traigo a avatar el rol, el token y la img
  setRol(localStorage.getItem('nombrerol'));
  let imgAvatar = localStorage.getItem('imgAvatar');

  // Con el logout elimino rol, token y img.
  const handleClick = () => {
    window.localStorage.removeItem('imgAvatar');
    window.localStorage.removeItem('nombrerol');
    window.localStorage.removeItem('tokenProp');
    setToken(null);
    navigate('/');
  };

  const handleAvatarClick = () => {
    setToggle(!toggle);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img
          onClick={handleAvatarClick}
          className={styles.img}
          src={imgAvatar}
          alt="Avatar"
        />
      </div>
      {toggle && rol === 'cliente' ? (
        <div className={styles.menu}>
          {infoModal ? (
            <Modal setLocalModal={setInfoModal}>
              <InfoUser />
            </Modal>
          ) : null}
          <button
            className={styles.button}
            onClick={() => setInfoModal((prev) => !prev)}
          >
            <i className="bi bi-pencil-square"></i>Account details
          </button>
          {bookingModal ? (
            <Modal setLocalModal={setBookingModal}>
              <BookingHistory />
            </Modal>
          ) : null}
          <button
            className={styles.button}
            onClick={() => setBookingModal((prev) => !prev)}
          >
            <i className="bi bi-book"></i>Booking History
          </button>
          <button onClick={handleClick} className={styles.button}>
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      ) : toggle && (rol === 'administrador' || rol === 'recepcionista') ? (
        <div className={styles.menu}>
          <NavLink to="/admin">
            <button className={styles.button}>
              <i className="bi bi-command"></i>Go to admin panel
            </button>
          </NavLink>
          {infoModal ? (
            <Modal setLocalModal={setInfoModal}>
              <InfoUser />
            </Modal>
          ) : null}
          <button
            className={styles.button}
            onClick={() => setInfoModal((prev) => !prev)}
          >
            <i className="bi bi-pencil-square"></i>Account details
          </button>
          {bookingModal ? (
            <Modal setLocalModal={setBookingModal}>
              <BookingHistory />
            </Modal>
          ) : null}
          <button
            className={styles.button}
            onClick={() => setBookingModal((prev) => !prev)}
          >
            <i className="bi bi-book"></i>Booking History
          </button>
          <button onClick={handleClick} className={styles.button}>
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Avatar;
