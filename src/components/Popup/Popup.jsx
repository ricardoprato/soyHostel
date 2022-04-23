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
    <div className={styles.container}>
      <form className={styles.form}>
        <img className={styles.img} src={Logo} alt="Logo de H" />
        <div className={styles.google}>
          <label>
            Continuar con Google
            <GoogleLogin
              className={styles.logoGoogle}
              clientId="540051645175-sbuak0uu5auodj9ipes8lklhgeg39kfo.apps.googleusercontent.com"
              buttonText="Register"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          </label>
        </div>
        <div className={styles.manualmente}>
          <label>
            Continuar manualmente
            <button
              className={styles.register}
              name="manual"
              onClick={handleClick}
            >
              Register
            </button>
          </label>
        </div>
      </form>
    </div>
  );
};
export default Popup;
