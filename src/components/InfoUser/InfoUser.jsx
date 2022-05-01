import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../InfoUser/InfoUser.module.css';
import Logo from '../../Images/fondo.png';

const InfoUser = () => {
  let error;
  let url = import.meta.env.VITE_APP_URL;
  let api = import.meta.env.VITE_API;

  let sendData = async (valores) => {
    let res = await fetch(`${url}` + '/auth/signup', {
      method: 'PATCH',
      headers: {
        api: `${api}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valores),
    });
    let res2 = await res.json();
    error = res2.msg;
    alert(error);
    console.log('RESPUESTABACK', res2);
  };

  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  // const [dataProfile, setDataProfile] = useState({});

  //   const [modal, setModal] = useState(false);

  //   const handleClick = (e) => {
  //     e.preventDefault();
  //     setModal(false);
  //   };

  const [typePw, setTypePw] = useState('password');

  const revealPassword = (e) => {
    if (typePw === 'password') {
      setTypePw('text');
    } else {
      setTypePw('password');
    }
  };

  return (
    <div className={styles.register}>
      {modal ? (
        <Formik
          initialValues={{
            name: '',
            lastname: '',
            email: '', // puede mostrarlo y no cambiarlo.
            password: '',
            birthdate: '',
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

            // Validacion password
            if (!valores.password) {
              errores.password = 'Please enter a password';
            } else if (
              !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valores.password)
            ) {
              errores.password =
                'Minimum eight characters, at least one letter and one number:';
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
          onSubmit={(valores, { resetForm }) => {
            sendData(valores);
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
                <button onClick={handleClick} className={styles.buttonicon}>
                  <i
                    className={`${styles.icon} bi bi-arrow-left-square-fill`}
                  ></i>
                </button>
                <img className={styles.img} src={Logo} alt="" />
                <label htmlFor="name">First Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Put your name"
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
                  // onChange={handleChange}
                />
                <ErrorMessage
                  name="lastname"
                  component={() => (
                    <div className={styles.error}>{errors.lastname}</div>
                  )}
                />
              </div>
              <div>
                <label htmlFor="typeofdocument">Type of document</label>
                <Field name="typeofdocument" as="select">
                  <option value="typeofdocument" id="AF">
                    Elegir opción
                  </option>
                  <option value="DNI" id="AF">
                    DNI
                  </option>
                  <option value="Passport" id="AF">
                    Passport
                  </option>
                  <option value="Driver License" id="AF">
                    Driver License
                  </option>
                </Field>
                <ErrorMessage
                  name="typeofdocument"
                  component={() => (
                    <div className={styles.error}>{errors.typeofdocument}</div>
                  )}
                />
              </div>
              <div>
                <Field
                  type="text"
                  id="dni"
                  name="dni"
                  placeholder="Put your dni"
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
                <Field type="date" id="birthdate" name="birthdate" />
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
                />
                <ErrorMessage
                  name="email"
                  component={() => (
                    <div className={styles.error}>{errors.email}</div>
                  )}
                />
              </div>
              <div className={styles.eye}>
                <label htmlFor="password">Password</label>
                <Field
                  type={typePw}
                  id="password"
                  name="password"
                  placeholder="mypassword123"
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
              <div>
                <label htmlFor="nationality">Nationality</label>
                <Field name="nationality" as="select">
                  <option>Elegir pais</option>
                  {paises.countries.map((p) => {
                    return <option key={p}>{p}</option>;
                  })}
                </Field>
                <ErrorMessage
                  name="nationality"
                  component={() => (
                    <div className={styles.error}>{errors.nationality}</div>
                  )}
                />
              </div>
              <div>
                <label htmlFor="genre">Genre</label>
                <Field name="genre" as="select">
                  <option value="" id="AF">
                    Elegir opción
                  </option>
                  <option value="masculino" id="AF">
                    masculino
                  </option>
                  <option value="femenino" id="AF">
                    femenino
                  </option>
                </Field>
                <ErrorMessage
                  name="genre"
                  component={() => (
                    <div className={styles.error}>{errors.genre}</div>
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
      ) : (
        <Popup
          setModal={setModal}
          setDataProfile={setDataProfile}
          handleClick={handleClick}
        />
      )}
    </div>
  );
};

export default InfoUser;
