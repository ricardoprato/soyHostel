import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../NewPassword/NewPassword.module.css';
import Logo from '../../Images/fondo.png';
import { useLocation } from 'react-router-dom';

const NewPassword = (props) => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [send, setSend] = useState(true);

  const search = useLocation().search;
  const name = new URLSearchParams(search).get('token');

  let sendData = async (valores) => {
    let paraEnviar = {
      newPassword: valores,
      token: name,
    };
    let res = await fetch(
      'https://backpfhenryv2.herokuapp.com' + '/auth/cambiar-password',
      {
        method: 'POST',
        headers: {
          api: 'b1eb0ff9c64d38b4e55d56d45047188a9baa1b3c572f349d815a517e976e0c78e48e61224f04ee990f25f75fe4dc66a7f9a6196a950faa997a65749b012853f6',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paraEnviar),
      }
    );
  };

  return (
    <div className={styles.register}>
      <Formik
        initialValues={{
          password: '',
          password2: '',
        }}
        validate={(valores) => {
          let errores = {};
          if (valores.password2 !== valores.password) {
            errores.password = "Passwords don't match";
          } else {
            setSend(false);
          }

          // Validacion password
          if (!valores.password) {
            errores.password = "Please enter a password'";
          } else if (valores.password2 !== valores.password) {
            errores.password = "Passwords don't match";
          } else if (
            !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valores.password)
          ) {
            errores.password =
              'Minimum eight characters, at least one letter and one number:';
          }

          if (Object.keys(errores).length > 0) {
            setSend(true);
          } else {
            setSend(false);
          }
          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          sendData(valores.password2);
          alert('Created Succesfully');
          resetForm();
          console.log('INFO', valores);
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
              <label htmlFor="password">New Password</label>
              <Field
                type="text"
                id="password"
                name="password"
                placeholder="Enter your new password"
              />
              <ErrorMessage
                name="password"
                component={() => (
                  <div className={styles.error}>{errors.password}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="password2">Password</label>
              <Field
                type="text"
                id="password2"
                name="password2"
                placeholder="Please enter your new password again"
              />
              <ErrorMessage
                name="password"
                component={() => (
                  <div className={styles.error}>{errors.password}</div>
                )}
              />
            </div>
            {send ? '' : <button type="submit">Send</button>}

            {formularioEnviado && (
              <p className={styles.exito}>Formulario enviado con exito!</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPassword;
