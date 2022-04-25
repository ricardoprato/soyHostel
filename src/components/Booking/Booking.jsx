import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './Booking.module.css';
import countries from '../../data/countries.json';
console.log(countries);

const Booking = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({
    private: true,
    camas: 0, //cantidad
    id: [], //esto seria si es privada el id de la habitacion y si es compartida un array de ids de camas
  });
  const today = new Date();

  const fetchDetails = () => {
    fetch(`https://back-end-1407.herokuapp.com/habitaciones`)
      .then((response) => response.json())
      .then((data) => setRooms((prev) => data))
      .catch((error) => {
        if (error.response) {
          const { response } = error;
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        }
      });
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleRoomSelect = () => {
    //esta funcion debe recibir el id de la habitacion seleccionada y setear un estado con la cantidad y el id de las camas de esa habitacion, asi como si es privada o no, esto es para usar en el input de beds
    let aux = rooms?.filter((r) => r.nombre === valores.roomName);
    if (aux.privada) {
      setRoom({
        private: true,
        id: aux.id,
      });
    } else {
      let aux2 = aux.Camas.map((c) => c.id);
      setRoom({
        private: false,
        camas: aux.cantCamas, //cantidad
        id: aux2,
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          docType: '',
          docNumber: '',
          birthDate: '',
          nationality: '',
          email: '',
          roomName: '',
          bedId: '',
          checkIn: '',
          checkOut: '',
        }}
        validate={(valores) => {
          let errores = {};

          if (!valores.name) {
            errores.name = 'Please enter a name';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
            errores.name = 'The name can only contain letters and spaces';
          }

          // Validacion lastname
          if (!valores.lastname) {
            errores.lastname = 'Please enter a lastname';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.lastname)) {
            errores.lastname =
              'The lastname can only contain letters and spaces';
          }

          // Validacion DNI
          if (!valores.docNumber) {
            errores.docNumber = 'Please enter a dni';
          } else if (!/^[0-9]{8,20}$/.test(valores.docNumber)) {
            errores.docNumber = 'The dni can only contain numbers';
          }

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

          // Validacion documento tipo
          if (!valores.docType) {
            errores.docType = 'Please select a document type';
          }

          // Validacion nationality
          if (!valores.nationality) {
            errores.nationality = 'Please enter your nationality';
          }

          if (!valores.checkIn) {
            errores.checkIn = 'Please enter checkIn date';
          } else if (valores.checkIn < today.toLocaleDateString('en-CA')) {
            console.log(valores.checkIn);
            console.log(today.toLocaleDateString('en-CA'));
            errores.checkIn = 'CheckIn cant be in the past';
          }

          if (!valores.checkOut) {
            errores.checkOut = 'Please enter checkOut date';
          } else if (valores.checkOut <= valores.checkIn) {
            errores.checkOut = 'Checkout has to be after checkIn';
          }

          if (!valores.roomName) {
            errores.roomName = 'Please select room';
          }

          if (!valores.bedId) {
            if (!valores.roomName) {
              errores.bedId = 'Please enter a room first';
            } else {
              errores.bedId = 'Please select a bed';
            }
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
          if (birthDate.value) {
            valores.birthDate = formatYmd(new Date(birthDate.value));
          }

          if (!valores.birthDate) {
            errores.birthDate = 'Please enter a birthdate';
          } else if (!(valores.birthDate <= fechaActualFormateada)) {
            errores.birthDate = 'Need to be 18 or more years old';
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          // Lucho, para que recibe valores esta funcion si no los usa?
          resetForm();
          console.log('form has been sent');
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
              <label htmlFor="name">First Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="first name..."
              />
              <ErrorMessage
                name="name"
                component={() => (
                  <div className={styles.error}>{errors.name}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                placeholder="last name..."
              />
              <ErrorMessage
                name="lastName"
                component={() => (
                  <div className={styles.error}>{errors.lastName}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="typeofdni">Document type </label>
              <Field name="docType" as="select">
                <option value="docType" id="AF">
                  Elegir opción
                </option>
                <option value="DNI" id="AF">
                  DNI
                </option>
                <option value="Passport" id="AF">
                  Passport
                </option>
                <option value="Libreta civica" id="AF">
                  Libreta Civica
                </option>
                <option value="CLI" id="AF">
                  CLI
                </option>
              </Field>
              <ErrorMessage
                name="docType"
                component={() => (
                  <div className={styles.error}>{errors.docType}</div>
                )}
              />
            </div>
            <div>
              <Field
                type="text"
                id="docNumber"
                name="docNumber"
                placeholder="document number..."
              />
              <ErrorMessage
                name="docNumber"
                component={() => (
                  <div className={styles.error}>{errors.docNumber}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="birthDate">Birth date</label>
              <Field type="date" id="birthDate" name="birthDate" />
              <ErrorMessage
                name="birthDate"
                component={() => (
                  <div className={styles.error}>{errors.birthDate}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="email">Email </label>
              <Field
                type="text"
                id="email"
                name="email"
                placeholder="email@mail.com..."
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <div className={styles.error}>{errors.email}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="roomName">Room Name</label>
              <Field name="roomName" as="select" onSubmit={handleRoomSelect}>
                {' '}
                {/* terminar este handler */}
                <option value="roomName" id="AF">
                  Elegir opción
                </option>
                {rooms &&
                  rooms?.map((r) => (
                    <option key={r.id} value={r.nombre} id="AF">
                      {r.nombre}
                    </option>
                  ))}
              </Field>
              <ErrorMessage
                name="roomName"
                component={() => (
                  <div className={styles.error}>{errors.roomName}</div>
                )}
              />
            </div>
            {room?.privada ? null : ( // si la habitacion elegida es compartida mostrar este input y con la cantidad de camas correcta
              <div>
                <Field name="bedId" as="select">
                  <option value="roomName" id="AF">
                    Select bed
                  </option>
                </Field>
                <label htmlFor="bedId">Bed </label>
                <ErrorMessage
                  name="bedId"
                  component={() => (
                    <div className={styles.error}>{errors.bedId}</div>
                  )}
                />
              </div>
            )}
            <div>
              <label htmlFor="nationality">Nationality</label>
              <Field name="nationality" as="select">
                {countries?.countries &&
                  countries?.countries.map((c) => (
                    <option key={c} value={c} id={c}>
                      {c}
                    </option>
                  ))}
              </Field>
              <ErrorMessage
                name="nationality"
                component={() => (
                  <div className={styles.error}>{errors.nationality}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="checkIn">Check-In</label>
              <Field type="date" id="checkIn" name="checkIn" />
              <ErrorMessage
                name="checkIn"
                component={() => (
                  <div className={styles.error}>{errors.checkIn}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="checkOut">Check-Out</label>
              <Field type="date" id="checkOut" name="checkOut" />
              <ErrorMessage
                name="checkOut"
                component={() => (
                  <div className={styles.error}>{errors.checkOut}</div>
                )}
              />
            </div>

            <button type="submit">Send</button>
            {formularioEnviado && (
              <p className="exito">Formulario enviado con exito!</p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Booking;

//   return (
//     <div>
//       <div className={styles.espacio}>NavBar molestoooo</div>
//       <h1>Make reservation</h1>
//       <form onSubmit={(e)=> handleSubmit(e)}>
//       <div>
//           <label>Full Name: </label>
//           <input
//               type={'text'}
//               name={'name'}
//               onChange={(e)=> handleChange(e)}
//               className={error.name && styles.danger}
//           />
//           {
//             error.name && (<p className={styles.danger}>{error.name}</p>)
//           }
//       </div>
//       <div>
//           <label>Document Type: </label>
//           <select name="docType" onChange={(e)=> handleChange(e)} >
//               <option value=" ">select...</option>
//               <option value="passport">passport</option>
//               <option value="dni">dni</option>
//               <option value="driver-license">driver license</option>
//               <option value="military-identification-card">military identification card</option>
//           </select>
//           {
//             error.docType && (<p className={styles.danger}>{error.docType}</p>)
//           }
//       </div>
//       <div>
//           <label>Document Number: </label>
//           <input type="text" placeholder='number...' name={'docNumber'} onChange={(e)=> handleChange(e)} />
//           {
//             error.docNumber && (<p className={styles.danger}>{error.docNumber}</p>)
//           }
//       </div>
//       <div>
//           <label>Birth Date: </label>
//           <input type="date" name={'birthDate'}  onChange={(e)=> handleChange(e)} />
//           {
//             error.birthDate && (<p className={styles.danger}>{error.birthDate}</p>)
//           }
//       </div>
//       <div>
//         <label>Nationality: </label>
//         <input type="text" name={'nationality'}  onChange={(e)=> handleChange(e)} />
//         {
//           error.nationality && (<p className={styles.danger}>{error.nationality}</p>)
//         }
//       </div>
//       <div>
//           <label>Room: </label>
//           <select name="room" onChange={(e)=> handleChange(e)} >
//               <option value=" ">select...</option>
//               <option value="Godzilla">Godzilla</option>
//               <option value="Suit">Suit</option>
//               <option value="Ratatouille">Ratatouille</option>
//               <option value="Average">Average</option>
//               <option value="Family">Family</option>
//           </select>
//           {
//           error.room && (<p className={styles.danger}>{error.room}</p>)
//           }
//       </div>
//       <div>
//           <label>Bed: </label>
//           <input type="text" name={'bed'}  onChange={(e)=> handleChange(e)} />
//           {
//           error.bed && (<p className={styles.danger}>{error.bed}</p>)
//           }
//       </div>
//       <div>
//           <label>Check-In: </label>
//           <input type="date" name={'checkIn'}  onChange={(e)=> handleChange(e)} />
//           {
//           error.checkIn && (<p className={styles.danger}>{error.checkIn}</p>)
//           }
//       </div>
//       <div>
//           <label>Check-Out: </label>
//           <input type="date" name={'checkOut'}  onChange={(e)=> handleChange(e)} />
//           {
//           error.checkOut && (<p className={styles.danger}>{error.checkOut}</p>)
//           }
//       </div>
//       <div>
//           {
//               (error.name || error.docType || error.docNumber || error.birthDate || error.nationality ) ?
//               null :
//               (<button className='createBtn'>Create</button>)
//           }
//       </div>
//       </form>
//     </div>
//   )
// }
