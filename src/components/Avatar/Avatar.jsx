import React, { useState, useContext } from 'react';
import avatar from '../../Images/avatar.jpg';
import styles from '../Avatar/Avatar.module.css';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { NavLink } from 'react-router-dom';

function Avatar() {
  const { setToken, token, googleData } = useContext(GlobalContext);
  const [toggle, setToggle] = useState(false);
  let rol = localStorage.getItem('nombrerol');
  let imgAvatar = localStorage.getItem('imgAvatar');
  // const token2 = window.localStorage.getItem('tokenProp');
  console.log('TOKENENAVATART', token);

  const handleClick = (e) => {
    window.localStorage.removeItem('tokenProp');
    window.localStorage.removeItem('imgAvatar');
    setToken(false);
    window.location.reload();
    console.log(token);
  };

  const handleAvatarClick = () => {
    setToggle(!toggle);
  };

  console.log('ROL', rol);
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
          <button className={styles.button}>
            <i class="bi bi-pencil-square"></i>Account details
          </button>
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
          <button className={styles.button}>
            <i class="bi bi-pencil-square"></i>Account details
          </button>
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
