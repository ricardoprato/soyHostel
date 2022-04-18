import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './Booking.module.css';

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bonaire, Sint Eustatius and Saba',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos Keeling Islands',
  'Colombia',
  'Comoros',
  'Democratic Republic of the Congo',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Curaçao',
  'Cyprus',
  'Czechia',
  "Côte d'Ivoire",
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea Bissau',
  'Guyana',
  'Haiti',
  'Heard Island and McDonald Islands',
  'Holy See',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  "Democratic People's Republic of Korea",
  'Republic of Korea',
  'Kuwait',
  'Kyrgyzstan',
  "Lao People's Democratic Republic",
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'Northern Mariana Islands',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine, State of',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Pitcairn',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Republic of North Macedonia',
  'Romania',
  'Russian Federation',
  'Rwanda',
  'Réunion',
  'Saint Barthélemy',
  'Saint Helena, Tristan da Cunha',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Martin',
  'Saint Pierre and Miquelon',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Sint Maarten',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia and the South Sandwich Islands',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Svalbard and Jan Mayen',
  'Sweden',
  'Switzerland',
  'Syrian Arab Republic',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom of Great Britain and Northern Ireland',
  'United States Minor Outlying Islands',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Viet Nam',
  'Virgin Islands',
  'Virgin Islands U.S.',
  'Wallis and Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe',
  'Åland Islands',
];

const Booking = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const today = new Date();

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

          // Validacion password
          // if (!valores.password) {
          //   errores.password = 'Please enter a password';
          // } else if (
          //   !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valores.password)
          // ) {
          //   errores.password =
          //     'Minimum eight characters, at least one letter and one number:';
          // }

          // Validacion type of dni
          if (!valores.docType) {
            errores.docType = 'Please select a document type';
          }

          // Validacion nationality
          if (!valores.nationality) {
            errores.nationality = 'Please enter your nationality';
          }

          if (!valores.checkIn) {
            errores.checkIn = 'Please enter checkIn date';
          }else if(valores.checkIn < today.toLocaleDateString('en-CA')){
            console.log(valores.checkIn)
            console.log(today.toLocaleDateString('en-CA'))
            errores.checkIn ='CheckIn cant be in the past'
          }

          if (!valores.checkOut) {
            errores.checkOut = 'Please enter checkOut date';
          }else if (valores.checkOut <= valores.checkIn){
            errores.checkOut = 'Checkout has to be after checkIn';
          }

          if (!valores.roomName) {
            errores.roomName = 'Please select room';
          }

          if (!valores.bedId) {
            if(!valores.roomName){
            errores.bedId = 'Please enter a room first';
            }else {
              errores.bedId = 'Please select a bed';
            }
          }

          // Validacion genre
          // if (!valores.genre) {
          //   errores.genre = 'Please enter a genre';
          // }

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
                placeholder="email@email.com..."
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
              <Field name="roomName" as="select">
                <option value="roomName" id="AF">
                  Elegir opción
                </option>
                <option value="Godzilla" id="AF">
                  Godzilla
                </option>
                <option value="Average" id="AF">
                  Average
                </option>
                <option value="Ratatouille" id="AF">
                  Ratatouille
                </option>
                <option value="Suite" id="AF">
                  Suite
                </option>
                <option value="Family" id="AF">
                  Family
                </option>
              </Field>
              <ErrorMessage
                name="roomName"
                component={() => (
                  <div className={styles.error}>{errors.roomName}</div>
                )}
              />
            </div>
            <div>
            <Field name="bedId" as="select">  {/* Aqui deberia mapear la cantidad de camas de esa habitacion y si es privada anular la opcion cama */}
                <option value="roomName" id="AF">
                  Select bed
                </option>
                <option value="1" id="AF">
                  1
                </option>
                <option value="2" id="AF">
                  2
                </option>
                <option value="3" id="AF">
                  3
                </option>
                <option value="4" id="AF">
                  4
                </option>
                <option value="5" id="AF">
                  5
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
            <div>
              <label htmlFor="nationality">Nationality</label>
              <Field name="nationality" as="select">
                {countries &&
                  countries.map((c) => (
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
