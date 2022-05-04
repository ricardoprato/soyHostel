import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../Register/Register.module.css';
import Logo from '../../Images/fondo.png';

const FormEditRoom = (props) => {
  let url = import.meta.env.VITE_APP_URL;
  let api = import.meta.env.VITE_API;
  let token = localStorage.getItem('tokenProp');
  console.log('PROPS???', props.props);
  let sendData = async (valores) => {
    let res = await fetch(`${url}` + `/habitaciones/${props.props.id}`, {
      method: 'PATCH',
      headers: {
        api: `${api}`,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valores),
    });
    let res2 = await res.json();
  };

  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [modal, setModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setModal(false);
  };

  return (
    <div className={styles.register}>
      <Formik
        initialValues={{
          nombre: props.props.nombre,
          cantCamas: props.props.cantCamas,
          comodidades: props.props.comodidades,
          descripcion: props.props.descripcion,
          precio: props.props.precio,
        }}
        validate={(valores) => {
          let errores = {};
          console.log('pararicky', valores);
          // Validacion nombre
          if (!valores.nombre || !valores.nombre.trim()) {
            errores.nombre = 'Please enter a name';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
            errores.nombre = 'The name can only contain letters and spaces';
          }

          // Validacion Number of beds
          if (!valores.cantCamas) {
            errores.cantCamas = 'Please enter a number of beds';
          } else if (!/^[0-9]{0,50}$/.test(valores.cantCamas)) {
            errores.cantCamas = 'Need to be a number';
          } else if (!(valores.cantCamas > 0 && valores.cantCamas < 50)) {
            errores.cantCamas = 'Need to be greater than 0 and below than 50';
          }

          // Validacion comodities
          if (!valores.comodidades || !valores.comodidades.trim()) {
            errores.comodidades = 'Please enter a name';
          } else if (!/^.{1,255}$/.test(valores.comodidades)) {
            errores.comodidades =
              'The comodities can only contain 255 characters';
          }

          // Validacion descripcion
          if (!valores.descripcion || !valores.descripcion.trim()) {
            errores.descripcion = 'Please enter a name';
          } else if (!/^.{1,1000}$/.test(valores.descripcion)) {
            errores.descripcion =
              'The description can only contain 1000 characters';
          }

          //   Validacion precio
          if (!valores.precio) {
            errores.precio = 'Please enter a price';
          } else if (!/^[0-9]{1,200}$/.test(valores.precio)) {
            errores.precio = 'Need to be a number';
          } else if (!(valores.precio > 0 && valores.precio < 20000)) {
            errores.precio = 'Need to be greater than 0 and below 20.000';
          }
          return errores;
        }}
        onSubmit={async (valores, { resetForm }) => {
          await sendData(valores);
          window.location.reload();
          console.log('INFO', valores);
          cambiarFormularioEnviado(true);
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
              <label htmlFor="nombre">First Name</label>
              <Field
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Put your name"
              />
              <ErrorMessage
                name="nombre"
                component={() => (
                  <div className={styles.error}>{errors.nombre}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="cantCamas">cantcamas</label>
              <Field
                type="text"
                id="cantCamas"
                name="cantCamas"
                placeholder="Put your cantCamas"
                // onChange={handleChange}
              />
              <ErrorMessage
                name="cantCamas"
                component={() => (
                  <div className={styles.error}>{errors.cantCamas}</div>
                )}
              />
            </div>

            <div>
              <label htmlFor="precio">precio</label>
              <Field
                type="text"
                id="precio"
                name="precio"
                placeholder="Put your precio"
              />
              <ErrorMessage
                name="precio"
                component={() => (
                  <div className={styles.error}>{errors.precio}</div>
                )}
              />
            </div>

            <div className={styles.eye}>
              <label htmlFor="comodidades">comodidades</label>
              <Field
                type="text"
                id="comodidades"
                name="comodidades"
                placeholder="comodidades"
              />

              <ErrorMessage
                name="comodidades"
                component={() => (
                  <div className={styles.error}>{errors.comodidades}</div>
                )}
              />
            </div>

            <div className={styles.eye}>
              <label htmlFor="descripcion">descripcion</label>
              <Field
                as="textarea"
                id="descripcion"
                name="descripcion"
                placeholder="descripcion"
              />

              <ErrorMessage
                name="descripcion"
                component={() => (
                  <div className={styles.error}>{errors.descripcion}</div>
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
    </div>
  );
};

export default FormEditRoom;
