import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../Login/Login.module.css';
import Logo from '../../Images/fondo.png';
import PopupChangePw from '../PopupChangePw/PopupChangePw';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

const Login = () => {
  const { setToken } = useContext(GlobalContext);
  let url = import.meta.env.VITE_APP_URL;
  let api = import.meta.env.VITE_API;

  let sendData = async (valores) => {
    let res = await fetch(`${url}` + '/auth/login', {
      method: 'POST',
      headers: {
        api: `${api}`,

        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valores),
    });
    let res2 = await res.json();
    let token = res2.token;
    window.localStorage.setItem('imgAvatar', res2.avatar);
    window.localStorage.setItem('nombrerol', res2.rol);

    if (token || localStorage.getItem('tokenProp')) {
      setToken(true);
    }
    token ? window.localStorage.setItem('tokenProp', token) : null;
    console.log('TokenenLS', window.localStorage.getItem('tokenProp'));
    {
      token ? setMensaje('Sesion iniciada') : setMensaje('Datos invalidos');
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  const [typePw, setTypePw] = useState('password');

  const revealPassword = (e) => {
    if (typePw === 'password') {
      setTypePw('text');
    } else {
      setTypePw('password');
    }
  };

  const [show, setShow] = useState(false);
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [mensaje, setMensaje] = useState('');
  return (
    <div className={styles.register}>
      {!show ? (
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validate={(valores) => {
            let errores = {};

            // Validacion correo
            if (!valores.email) {
              errores.email = 'Please enter a email';
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                valores.email
              )
            ) {
              errores.email =
                'Email can only contain letters, numbers, points, script and underscores';
            }

            // Validacion password
            if (!valores.password) {
              errores.password = 'Please enter a password';
            } else if (
              !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valores.password)
            ) {
              errores.password =
                'Minimum eight characters, at least one letter and one number:';
            }

            return errores;
          }}
          onSubmit={(valores, { resetForm }) => {
            sendData(valores);
            setMensaje('');
            cambiarFormularioEnviado(true);
            setTimeout(
              () => cambiarFormularioEnviado(false),

              5000
            );
          }}
        >
          {({ errors }) => (
            <Form className={styles.formulario}>
              <div>
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
                <label htmlFor="email">Email (Username)</label>
                <Field
                  type="text"
                  id="mail"
                  name="email"
                  placeholder="email@hotmail.com"
                />
                <ErrorMessage
                  name="email"
                  component={() => (
                    <div className={styles.error}>{errors.email}</div>
                  )}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className={styles.containerInput}>
                  <Field
                    type={typePw}
                    id="password"
                    name="password"
                    placeholder="mipassword123"
                  />
                  {typePw === 'password' ? (
                    <i
                      className={`${styles.buttoneye} bi bi-eye-fill`}
                      onClick={revealPassword}
                    ></i>
                  ) : (
                    <i
                      className={`${styles.buttoneye} bi bi-eye-slash-fill`}
                      onClick={revealPassword}
                    ></i>
                  )}
                </div>
                <ErrorMessage
                  name="password"
                  component={() => (
                    <div className={styles.error}>{errors.password}</div>
                  )}
                />
              </div>
              <button type="submit">Send</button>
              <button className={styles.button} onClick={handleClick}>
                Forgot your password?
              </button>
              {<p className={styles.exito}>{mensaje}</p>}
            </Form>
          )}
        </Formik>
      ) : (
        <PopupChangePw
          titleToChangePw={'Enter your email to recovery your password'}
          handleClick={handleClick}
        />
      )}
    </div>
  );
};

export default Login;
