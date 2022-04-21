import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../Login/Login.module.css';
import Logo from '../../Images/fondo.png';
import PopupChangePw from '../PopupChangePw/PopupChangePw';

const Login = () => {
  let sendData = async (valores) => {
    let res = await fetch(
      'https://prueba-google-auth.herokuapp.com' + '/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valores),
      }
    );
    let res2 = await res.json();
    let token = res2.token;
    console.log('token?', token);
    localStorage.setItem('tokenProp', token);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  const [show, setShow] = useState(false);
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  return (
    <div className={styles.register}>
      {' '}
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
            resetForm();
            console.log('Sent formulary');
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
                  type="text"
                  id="password"
                  name="password"
                  placeholder="mipassword123"
                />
                <ErrorMessage
                  name="password"
                  component={() => (
                    <div className={styles.error}>{errors.password}</div>
                  )}
                />
              </div>

              <button type="submit">Send</button>
              <button onClick={handleClick}>Forgot your password?</button>
              {formularioEnviado && (
                <p className={styles.exito}>Formulario enviado con exito!</p>
              )}
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
