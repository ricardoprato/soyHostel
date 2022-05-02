import React, { useState, useContext } from 'react';
import styles from '../Avatar/Avatar.module.css';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Avatar() {
  const { setToken, token, rol, setRol } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  setRol(localStorage.getItem('nombrerol'));
  let imgAvatar = localStorage.getItem('imgAvatar');
  // const token2 = window.localStorage.getItem('tokenProp');

  const handleClick = (e) => {
    window.localStorage.removeItem('tokenProp');
    window.localStorage.removeItem('imgAvatar');
    window.localStorage.removeItem('nombrerol');
    navigate('/');
    setToken(false);
    console.log(token);
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
          <NavLink to="/reserva">
            <button className={styles.button}>
              <i class="bi bi-pencil-square"></i>Account details
            </button>
          </NavLink>
          <button className={styles.button}>
            <i class="bi bi-book"></i>History
          </button>
          <button onClick={handleClick} className={styles.button}>
            <i class="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      ) : toggle && (rol === 'administrador' || rol === 'recepcionista') ? (
        <div className={styles.menu}>
          <NavLink to="/admin">
            <button className={styles.button}>
              <i class="bi bi-command"></i>Go to admin panel
            </button>
          </NavLink>
          <NavLink to="/reserva">
            <button className={styles.button}>
              <i class="bi bi-pencil-square"></i>Account details
            </button>
          </NavLink>
          <button className={styles.button}>
            <i class="bi bi-book"></i>Booking History
          </button>
          <button onClick={handleClick} className={styles.button}>
            <i class="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Avatar;
