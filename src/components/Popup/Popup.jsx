import React, { useState } from 'react';
import styles from '../Popup/Popup.module.css';
import Logo from '../../Images/fondo.png';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const Popup = ({ setModal, setDataProfile }) => {
  const onLoginSuccess = (googleData) => {
    console.log(googleData);
    setDataProfile(googleData.profileObj);
    setModal(true);
  };

  const onLoginFailure = (googleData) => {
    console.log('Login Failed:', googleData);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setModal(true);
  };

  return (
    <form className={styles.form}>
      <img className={styles.img} src={Logo} alt="Logo de H" />
      <label className={styles.input}>
        Continuar con Google
        <GoogleLogin
          clientId={import.meta.env.VITE_CLIENT_ID}
          buttonText="Register"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </label>
      <label className={styles.input}>
        Continuar manualmente
        <button className={styles.button} name="manual" onClick={handleClick}>
          <i className={`${styles.icon} bi bi-box-arrow-in-right`}></i>
          Register
        </button>
      </label>
    </form>
  );
};
export default Popup;
