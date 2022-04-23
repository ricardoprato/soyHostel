import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import styles from '../Google/Google.module.css';

const clientId = 'Your-Client-Id';

function Google() {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);

  const onLoginSuccess = async (googleData) => {
    let token = googleData.tokenId;
    let googleId = googleData.googleId;
    let imageGoogle = googleData.imageUrl;

    const res = await fetch(
      'https://backpfhenryv2.herokuapp.com' + '/auth/signup',
      {
        method: 'POST',
        headers: new Headers({
          api: 'b1eb0ff9c64d38b4e55d56d45047188a9baa1b3c572f349d815a517e976e0c78e48e61224f04ee990f25f75fe4dc66a7f9a6196a950faa997a65749b012853f6',
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ googleId }),
      }
    );
    const res2 = await res.json();
    console.log('GOOGLE???>>', imageGoogle);
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
export default Google;
