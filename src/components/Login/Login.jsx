import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../Login/Login.module.css';
import Logo from '../../Images/fondo.png';
import PopupChangePw from '../PopupChangePw/PopupChangePw';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

const Login = ({}) => {
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

    console.log('generalresponse', res2);
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
                <img className={styles.img} src={Logo} alt="" />
                <label htmlFor="email">Email (Username)</label>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="email@email.com"
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
                <Field
                  type={typePw}
                  id="password"
                  name="password"
                  placeholder="mipassword123"
                />
                <button
                  type="button"
                  className={styles.buttoneye}
                  onClick={revealPassword}
                >
                  <i className="bi bi-eye-fill"></i>
                </button>
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
        <PopupChangePw handleClick={handleClick} />
      )}
    </div>
  );
};

export default Login;
