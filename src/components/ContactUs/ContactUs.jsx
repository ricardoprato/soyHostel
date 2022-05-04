import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../ContactUs/ContactUs.module.css';
import Logo from '../../Images/fondo.png';
import ReCAPTCHA from 'react-google-recaptcha';
import swal from 'sweetalert';

const ContactUs = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [modal, setModal] = useState(false);
  const [captchaVerify, setCaptchaVerify] = useState(false);
  const recaptchaRef = React.createRef();

  let api = import.meta.env.VITE_API;
  let url = import.meta.env.VITE_APP_URL;
  //FALTA IMPLEMENTAR EL FETCH A LA RUTA QUE ME DE ERIC (ASI LE ENVIAMOS LOS DATOS DE ESTE FORMULARIO)
  let sendData = async (valores) => {
    let res = await fetch(`${url}` + '/contacto', {
      method: 'POST',
      headers: {
        api: `${api}`,

        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valores),
    });
    let res2 = await res.json();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setModal(false);
  };

  const handleChange = () => {
    setCaptchaVerify(true);
    // console.log('CAPTCHA VERIFY', captchaVerify);
  };

  return (
    <div className={styles.container} id="contactUs">
      <div className={styles.info}>
        <p className={styles.title}>
          <span className={styles.titleStrong}>Hi,</span> contact with us
        </p>

        <div className={styles.contactInfo}>
          <p className={styles.city}>CITY</p>
          <p>
            Mar de las Pampas, Provincia de Buenos Aires, Las Acacias Street
          </p>

          <div>
            <a
              href="mailto: soyhostel@soyhostel.com"
              className={styles.contact_link}
            >
              Email: soyhostel@soyhostel.com
            </a>
            <a
              href="tel: +1080 (0) 000 000 000"
              className={styles.contact_link}
            >
              Phone: +1080 (0) 000 000 000
            </a>
          </div>
        </div>
        <div className={styles.social}>
          <p>CONNECT WITH US</p>
          <div className={styles.socialContainer}>
            <a
              className={styles.link}
              target="_blank"
              href="https://www.instagram.com/soyhostel/"
            >
              <i type="button" className="bi bi-instagram"></i>
            </a>
            <a
              className={styles.link}
              target="_blank"
              href="https://www.facebook.com/SoyHostel-112398641450674/"
            >
              <i type="button" className="bi bi-facebook"></i>
            </a>
            <a
              className={styles.link}
              target="_blank"
              href="https://web.whatsapp.com/"
            >
              <i type="button" className="bi bi-whatsapp"></i>
            </a>
            <a
              className={styles.link}
              target="_blank"
              href="https://twitter.com/Soyhostel/"
            >
              <i className="bi bi-twitter"></i>
            </a>
          </div>
        </div>
      </div>
      <Formik
        initialValues={{
          name: '',
          lastname: '',
          email: '',
          textarea: '',
        }}
        validate={(valores) => {
          let errores = {};
          // console.log('pararicky', valores);
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

          // Validacion textarea
          if (!valores.textarea || !valores.textarea.trim()) {
            errores.textarea = 'Please enter a textarea';
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          sendData(valores);
          // console.log('valores>>>', valores);
          swal.fire({
            title: 'success',
            text: 'Created Successfull',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          resetForm();
          // console.log('INFO', valores);
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
              <label htmlFor="email">Email (Username)</label>
              <Field
                type="text"
                id="email"
                name="email"
                placeholder="email@outlook.com"
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <div className={styles.error}>{errors.email}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="textarea">Message</label>
              <Field
                as="textarea"
                type="text"
                id="textarea"
                name="textarea"
                placeholder="Your message"
              />
              <ErrorMessage
                name="textarea"
                component={() => (
                  <div className={styles.error}>{errors.textarea}</div>
                )}
              />
            </div>
            <div className={styles.captcha}>
              <ReCAPTCHA
                required={true}
                onChange={handleChange}
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_CAPTCHA}
              />
            </div>
            <button type="submit" disabled={!captchaVerify}>
              Send
            </button>
            {formularioEnviado && (
              <p className={styles.exito}>Form sent successfully</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactUs;
