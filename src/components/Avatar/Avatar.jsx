import React, { useState, useContext } from 'react';
import avatar from '../../Images/avatar.jpg';
import styles from '../Avatar/Avatar.module.css';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

function Avatar() {
  const { setToken, token } = useContext(GlobalContext);
  const [toggle, setToggle] = useState(false);

  const token2 = window.localStorage.getItem('tokenProp');
  console.log('TOKENENAVATART', token);

  const handleClick = (e) => {
    window.localStorage.removeItem('tokenProp');
    setToken(false);
    console.log(token);
  };

  const handleAvatarClick = (e) => {
    setToggle(!toggle);
  };

  return (
    <div className={styles.container}>
      <img
        onClick={handleAvatarClick}
        className={styles.img}
        src={avatar}
        alt="Avatar"
      />

      {toggle ? (
        <div className={styles.buttons}>
          {/* <button className={styles.button}>Account details</button>
          <button className={styles.button}>Account settings</button>
          <button className={styles.button}>History</button> */}
          <button onClick={handleClick} className={styles.button}>
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Avatar;
