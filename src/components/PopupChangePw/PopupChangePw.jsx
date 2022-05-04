import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../PopupChangePw/PopupChangePw.module.css';

const PopupChangePw = ({ handleClick, titleToChangePw }) => {
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
    // console.log('PAENVIAR??????', valores);
    // console.log('respuesta', res);
  };

  return (
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
        // console.log('Sent formulary');
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
              <i className={`${styles.icon} bi bi-arrow-left-square-fill`}></i>
            </button>
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
            <p className={styles.exito}>Form sent successfully!</p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PopupChangePw;
