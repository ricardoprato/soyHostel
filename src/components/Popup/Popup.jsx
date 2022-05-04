import React, { useState } from 'react';
import styles from '../Popup/Popup.module.css';
import { GoogleLogin, useGoogleLogout } from 'react-google-login';
import swal from 'sweetalert';

const Popup = ({ setModal, setDataProfile }) => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const url = import.meta.env.VITE_APP_URL;
  const api = import.meta.env.VITE_API;
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
      swal.fire({
        title: 'info',
        text: 'An user already exists with this mail address ',
        icon: 'info',
        confirmButtonText: 'Ok',
      });

      // console.log('FUNCION', useGoogleLogout);
      googleFn.signOut();
    } else {
      // console.log('Res2', res2);
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
      <h2 className={styles.logo}>
        Soy{' '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 154.87 113"
          className={styles.nav_logo}
        >
          <g id="Capa_2" data-name="Capa 2">
            <g id="Capa_1-2" data-name="Capa 1">
              <path d="M0,34c0,18.7.2,34,.5,34s6.6-1.5,14.2-3.4,16.4-4,19.6-4.7L40,58.7V0H0Z" />
              <path d="M66,27V54l2.3-.4c3.8-.8,14.9-2.5,23.2-3.6,4.4-.6,9.5-1.3,11.3-1.6l3.2-.5V0H66Z" />
              <path d="M126.82,39.6c-.4.3.3,1.5,1.4,2.6,1.5,1.4,1.7,2.3.9,3.1-1.6,1.6-1.4,9,.3,11.3,1.3,1.6,1.3,2.2,0,4.1-.9,1.4-1,2.4-.4,2.8,1.6,1,4.8-.4,5.5-2.4.4-1.2,2.3-2.1,6.5-2.9,11.2-2.1,15.8-5.9,13.1-11-1.2-2.3-7.9-4.2-14.8-4.2-3.6,0-5.3-.5-6.6-2C131.12,39.1,128,38.3,126.82,39.6Z" />
              <path d="M91,68.5c-5.8,1.9-13.8,4.4-17.7,5.6L66,76.4V113h40V65l-2.2.1C102.52,65.1,96.82,66.7,91,68.5Z" />
              <path d="M21,92.9C-1.48,102,0,101,0,107.5V113H40V99.5c0-10.2-.3-13.5-1.2-13.4C38.12,86.1,30.12,89.1,21,92.9Z" />
            </g>
          </g>
        </svg>
        ostel
      </h2>
      <label className={styles.input}>
        Continuar con Google
        <GoogleLogin
          clientId={clientId}
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
