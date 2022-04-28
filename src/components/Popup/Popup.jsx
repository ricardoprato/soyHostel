import React, { useState } from 'react';
import styles from '../Popup/Popup.module.css';
import Logo from '../../Images/fondo.png';
import { GoogleLogin, GoogleLogout, useGoogleLogout } from 'react-google-login';

const Popup = ({ setModal, setDataProfile }) => {
  let url = import.meta.env.VITE_APP_URL;
  let api = import.meta.env.VITE_API;
  const googleFn = useGoogleLogout({
    clientId: import.meta.env.VITE_CLIENT_ID,
  });
  const onLoginSuccess = async (googleData) => {
    let googleId = googleData.googleId;
    let response = await fetch(
      `${url}` + `/usuarios/existGoogleUser/${googleId}`,
      {
        method: 'GET',
        headers: {
          api: `${api}`,
          'Content-Type': 'application/json',
        },
      }
    );
    let res2 = await response.json();

    if (res2.existe) {
      setModal(false);
      alert('Ya existe un usuario con ese correo');
      console.log('FUNCION', useGoogleLogout);
      googleFn.signOut();
    } else {
      console.log('Res2', res2);
      setDataProfile(googleData.profileObj);
      setModal(true);
    }
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
