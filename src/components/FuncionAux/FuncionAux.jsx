import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import styles from '../FuncionAux/FuncionAux.module.css';

const clientId = 'Your-Client-Id';

function FuncionAux() {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const [dataProfile, SetdataProfile] = useState([]);

  const onLoginSuccess = (googleData) => {
    SetdataProfile({ ...googleData.profileObj, ...googleData.tokenId });
    console.log('asd2', dataProfile);

    console.log('Login Success:', googleData);
    setShowloginButton(false);
    setShowlogoutButton(true);
  };

  const onLoginFailure = (googleData) => {
    console.log('Login Failed:', googleData);
  };

  const onSignoutSuccess = () => {
    alert('You have been logged out successfully');
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  return (
    <div className={styles.google}>
      {showloginButton ? (
        <GoogleLogin
          clientId="540051645175-sbuak0uu5auodj9ipes8lklhgeg39kfo.apps.googleusercontent.com"
          buttonText="Sign In"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      ) : null}

      {showlogoutButton ? (
        <GoogleLogout
          clientId="540051645175-sbuak0uu5auodj9ipes8lklhgeg39kfo.apps.googleusercontent.com"
          buttonText="Sign Out"
          onLogoutSuccess={onSignoutSuccess}
        ></GoogleLogout>
      ) : null}
    </div>
  );
}
export default FuncionAux;
