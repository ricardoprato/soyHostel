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

  const handleAvatarClick = (e) => {
    setToggle(!toggle);
  };

  console.log('ROL', rol);
  return (
    <div className={styles.container}>
      <img
        onClick={handleAvatarClick}
        className={styles.img}
        src={imgAvatar}
        alt="Avatar"
      />
      {toggle && rol === 'cliente' ? (
        <div className={styles.buttons}>
          <button className={styles.button}>Account details</button>
          <button className={styles.button}>History</button>
          <button onClick={handleClick} className={styles.button}>
            Logout
          </button>
        </div>
      ) : toggle && (rol === 'administrador' || rol === 'recepcionista') ? (
        <div className={styles.buttons}>
          <NavLink to="/admin">
            <button className={styles.button}>Go to admin panel</button>
          </NavLink>
          <button className={styles.button}>Account details</button>
          <button className={styles.button}>Booking History</button>
          <button onClick={handleClick} className={styles.button}>
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Avatar;
