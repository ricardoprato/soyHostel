import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../PopupChangePw/PopupChangePw.module.css';
import Logo from '../../Images/fondo.png';

const PopupChangePw = ({ handleClick }) => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

  let url = import.meta.env.VITE_APP_URL;
  let api = import.meta.env.VITE_API;

  let sendData = async (valores) => {
    let res = await fetch(`${url}` + '/auth/recuperacion', {
      method: 'POST',
      headers: {
        api: `${api}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valores),
    });
    console.log('PAENVIAR??????', valores);
    console.log('respuesta', res);
  };

  return (
    <div className={styles.register}>
      <Formik
        initialValues={{
          email: '',
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
              <button onClick={handleClick} className={styles.buttonicon}>
                <i
                  className={`${styles.icon} bi bi-arrow-left-square-fill`}
                ></i>
              </button>
              <img className={styles.img} src={Logo} alt="" />
              <label htmlFor="email">
                Enter your email to recovery your password :
              </label>
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

            <button type="submit">Send</button>

            {formularioEnviado && (
              <p className={styles.exito}>Formulario enviado con exito!</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PopupChangePw;
