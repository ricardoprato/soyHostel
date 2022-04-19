import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../Login/Login.module.css';
import Logo from '../../Images/fondo.png';

const Login = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  return (
    <div className={styles.register}>
      <Formik
        initialValues={{
          correo: '',
          password: '',
        }}
        validate={(valores) => {
          let errores = {};

          // Validacion correo
          if (!valores.correo) {
            errores.correo = 'Please enter a email';
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valores.correo
            )
          ) {
            errores.correo =
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
              <label htmlFor="correo">Email (Username)</label>
              <Field
                type="text"
                id="correo"
                name="correo"
                placeholder="correo@correo.com"
              />
              <ErrorMessage
                name="correo"
                component={() => (
                  <div className={styles.error}>{errors.correo}</div>
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
            <p>Forgot your password?</p>
            {formularioEnviado && (
              <p className={styles.exito}>Formulario enviado con exito!</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
