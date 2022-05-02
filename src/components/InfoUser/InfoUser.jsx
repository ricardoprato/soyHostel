import React, { useEffect, useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../InfoUser/InfoUser.module.css';
import Logo from '../../Images/fondo.png';
import jwt_decode from 'jwt-decode';
import PopupChangePw from '../PopupChangePw/PopupChangePw';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

const InfoUser = () => {
  const [userDetails, setUserDetails] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [show, setShow] = useState(false);
  const { rol } = useContext(GlobalContext);

  let error;
  let url = import.meta.env.VITE_APP_URL;
  let api = import.meta.env.VITE_API;

  let token = localStorage.getItem('tokenProp');
  let decode = jwt_decode(token);
  let dni = decode.sub;

  useEffect(async () => {
    let respuesta = await fetch(`${url}` + `/usuarios/${dni}`, {
      method: 'GET',
      headers: {
        api: `${api}`,
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });

    let respuesta2 = await respuesta.json();
    setUserDetails(respuesta2);
    console.log('RES GENERAL', respuesta2);
    // error = respuesta2.msg;
    // alert(error);
  }, []);

  let sendData = async (valores) => {
    let respuesta = await fetch(`${url}` + `/usuarios/${dni}`, {
      method: 'PATCH',
      headers: {
        api: `${api}`,
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valores),
    });
    let res2 = await respuesta.json();
    // error = res2.msg;
    // alert(error);
    console.log('RESPUESTABACK', res2);
    console.log('valorescambian???', valores);
  };

  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

  const [modal, setModal] = useState(false);

  const handleChangePw = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setModal(false);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setDisabled(false);
  };

  return (
    <>
      {userDetails.nombre ? (
        <div className={styles.register}>
          <Formik
            initialValues={{
              name: userDetails?.nombre,
              lastname: userDetails?.apellido,
              dni: userDetails?.dni,
              email: userDetails?.email, // puede mostrarlo y no cambiarlo.
              birthdate: userDetails?.fechaNacimiento,
              rol: userDetails?.rol,
            }}
            validate={(valores) => {
              let errores = {};
              console.log('pararicky', valores);
              // Validacion nombre
              if (!valores.name || !valores.name.trim()) {
                errores.name = 'Please enter a name';
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
                errores.name = 'The name can only contain letters and spaces';
              }

              // Validacion lastname
              if (!valores.lastname || !valores.lastname.trim()) {
                errores.lastname = 'Please enter a lastname';
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.lastname)) {
                errores.lastname =
                  'The lastname can only contain letters and spaces';
              }

              // Validacion DNI
              if (!valores.dni) {
                errores.dni = 'Please enter a dni';
              } else if (!/^[0-9]{8,20}$/.test(valores.dni)) {
                errores.dni = 'The dni can only contain numbers';
              }

              // Validacion email
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

              // Validacion birthdate
              var actual = new Date();

              const [actualMenos18, month, day] = [
                actual.getFullYear() - 18,
                actual.getMonth() + 1,
                actual.getDate(),
              ];
              const array = [actualMenos18, month, day];
              let arrayLindo = new Date(array.join('-'));

              const formatYmd = (date) => date.toISOString().slice(0, 10);

              let fechaActualFormateada = null;
              if (arrayLindo) {
                fechaActualFormateada = formatYmd(arrayLindo);
              }
              if (birthdate.value) {
                valores.birthdate = formatYmd(new Date(birthdate.value));
              }

              if (!valores.birthdate) {
                errores.birthdate = 'Please enter a birthdate';
              } else if (!(valores.birthdate <= fechaActualFormateada)) {
                errores.birthdate = 'Need to be 18 or more years old';
              } else if (valores.birthdate < '1922-01-01') {
                errores.birthdate = 'You are very old for register';
              }

              return errores;
            }}
            onSubmit={async (valores, { resetForm }) => {
              await sendData(valores);
              // resetForm();
              console.log('INFO', valores);
              cambiarFormularioEnviado(true);
              alert('Form completed successfully');
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
                  <button onClick={handleEditClick}>Editar</button>
                  <label htmlFor="name">First Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Put your name"
                    disabled={disabled}
                  />
                  <ErrorMessage
                    name="name"
                    component={() => (
                      <div className={styles.error}>{errors.name}</div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="lastname">Last Name</label>
                  <Field
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Put your lastname"
                    disabled={disabled}
                  />
                  <ErrorMessage
                    name="lastname"
                    component={() => (
                      <div className={styles.error}>{errors.lastname}</div>
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="lastname">Dni</label>
                  <Field
                    type="text"
                    id="dni"
                    name="dni"
                    placeholder="Put your dni"
                    disabled={true}
                  />
                  <ErrorMessage
                    name="dni"
                    component={() => (
                      <div className={styles.error}>{errors.dni}</div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="birthdate">Birthdate</label>
                  <Field
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    disabled={disabled}
                  />
                  <ErrorMessage
                    name="birthdate"
                    component={() => (
                      <div className={styles.error}>{errors.birthdate}</div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email (Username)</label>
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    placeholder="email@gmail.com"
                    disabled={true}
                  />
                  <ErrorMessage
                    name="email"
                    component={() => (
                      <div className={styles.error}>{errors.email}</div>
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="rol">Role</label>
                  <Field
                    type="text"
                    id="rol"
                    name="rol"
                    placeholder=""
                    disabled={true}
                  />
                  <ErrorMessage
                    name="email"
                    component={() => (
                      <div className={styles.error}>{errors.email}</div>
                    )}
                  />
                </div>

                <div className={styles.eye}>
                  <button onClick={handleChangePw}>Cambiar Password</button>
                  {show ? (
                    <PopupChangePw
                      titleToChangePw={'Enter your email to change Password'}
                      handleClick={handleClick}
                    />
                  ) : null}
                </div>
                {!disabled ? <button type="submit">Save</button> : null}
                {formularioEnviado && (
                  <p className={styles.exito}>Formulario enviado con exito!</p>
                )}
              </Form>
            )}
          </Formik>
        </div>
      ) : null}
    </>
  );
};
export default InfoUser;
