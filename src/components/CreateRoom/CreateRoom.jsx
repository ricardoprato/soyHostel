import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useField, connect } from 'formik';
import styles from './CreateRoom.module.css';
import { useFieldValue } from './use-field-value';



export const CreateRoom = connect(({ formik }) => {
  const privada = useFieldValue(formik, 'privada');
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);



  return (
    <>
      <Formik
        initialValues={{
          nombre: '',
          privada: false,
          banoPrivado: false,
          comodidades: '',
          cantCamas: 0,
          descripcion: '',
          preciosCamas: [],
          precioHabitacion: 0,
          imagenes: [],
        }}
        validate={(input) => {
          let errores = {};
          // NOMBRE
          if (!input.nombre) {
            errores.nombre = 'Please enter a room name';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.nombre)) {
            errores.nombre = 'The name can only contain letters and spaces';
          }
          // PRIVADA?
          if (input.privada === "select") {
            errores.privada = 'Please select room type';
          }
          //Baño privado?
          if (input.banoPrivado === "select") {
            errores.banoPrivado = 'Please select with or without private bathroom';
          }
          // COMODIDADES
          if (!input.comodidades) {
            errores.comodidades = 'Please enter room amenities';
          } else if (!/^[a-zA-Z0-9,.!? ]*$/.test(input.comodidades)) {
            errores.comodidades = 'Only letters and spaces';
          }
          //CANTCAMAS
          if (!input.cantCamas) {
            errores.cantCamas = 'Please enter amount of beds';
          } else if (!/^[0-9]*$/.test(input.cantCamas)) {
            errores.cantCamas = 'must be a number';
          }
          //DESCRIPCION
          if (!input.descripcion) {
            errores.descripcion = 'Please enter a room description';
          } else if (!/^[a-zA-Z0-9,.'!? ]*$/.test(input.descripcion)) {
            errores.descripcion = 'The description can only contain letters, numbers, puntuation and spaces';
          }
          //PRECIOSCAMAS
          if (input.preciosCamas.length === 0 && input.privada === false) {  //buscar validacion de imagenes url que acepte todas
            errores.preciosCamas = 'Please type the price for one night';
          }else if(!/^[0-9,.]*$/.test(input.preciosCamas)  && input.privada === false){
            errores.preciosCamas = 'The price can onoly contain numbers'
          }
          //PRECIOHABITACION
          if (input.precioHabitacion === 0 && input.privada === true) {  //buscar validacion de imagenes url que acepte todas
            errores.precioHabitacion = 'Please type the price for one night';
          }else if(input.privada === true && !/^[0-9,.]*$/.test(input.precioHabitacion)){
            errores.precioHabitacion = 'The price can onoly contain numbers'
          }
          //IMAGENES
          if (input.imagenes.length === 0) {  //buscar validacion de imagenes url que acepte todas
            errores.imagenes = 'Please paste at least one image URL';
          }else if(!/(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-])*((\.jpg)|(\.png)|(\.jpeg)|(\.svg))\/?(\.webp)?/.test(input.imagenes)){
            errores.imagenes = 'URL should start with https and end with (.jpg, .png, .jpeg, .svg or .webp)';
          }

          console.log(input)
          return errores;
        }}
        onSubmit={(input, { resetForm }) => {
          
          console.log(input)
          async () => {
            const rawResponse = await fetch('https://back-end-1407.herokuapp.com/habitaciones', {
              method: 'POST',
              headers: {},
              body: input
            });
            const content = await rawResponse.json();
            console.log(content);
          }

          resetForm();
          console.log('form has been sent');
          cambiarFormularioEnviado(true);
          setTimeout(
            () => cambiarFormularioEnviado(false),

            5000
          );
        }}
      >
        {({ errors, input }) => (
          <Form className={styles.formulario}>
            <div> {/* nombre */}
              <label htmlFor="nombre">Room name: </label>
              <Field
                type="text"
                id="nombre"
                name="nombre"
                placeholder="first name..."
              />
              <ErrorMessage
                name="nombre"
                component={() => (
                  <div className={styles.error}>{errors.nombre}</div>
                )}
              />
            </div>
            <div> {/* privada */}
            <label htmlFor="privada">Room type: </label>
            <Field name="privada" as="select">
              <option value="select..." id="AF">
                Select...
              </option>
              <option value={true} id="AF">
                Private
              </option>
              <option value={false} id="AF">
                Shared
              </option>
            </Field>  
              <ErrorMessage
                name="privada"
                component={() => (
                  <div className={styles.error}>{errors.privada}</div>
                )}
              />

            </div>
            <div> {/* banoPrivado */}
              <label htmlFor="banoPrivado">Private Bathroom: </label>
              <Field name="banoPrivado" as="select">
                <option value="select" id="AF">
                  Select...
                </option>
                <option value={true} id="AF">
                  Private
                </option>
                <option value={false} id="AF">
                  Shared
                </option>
              </Field>
              <ErrorMessage
                name="banoPrivado"
                component={() => (
                  <div className={styles.error}>{errors.banoPrivado}</div>
                )}
              />
            </div>
            <div> {/* comodidades */}
              <label htmlFor="comodidades">Room Amenities: </label>
              <Field
                type="text"
                id="comodidades"
                name="comodidades"
                placeholder="first name..."
              />
              <ErrorMessage
                name="comodidades"
                component={() => (
                  <div className={styles.error}>{errors.comodidades}</div>
                )}
              />
            </div>
            <div> {/* cantCamas */}
              <label htmlFor="cantCamas">Number of beds: </label>
              <Field
                type="number"
                id="cantCamas"
                name="cantCamas"
                placeholder="how many beds..."
              />
              <ErrorMessage
                name="cantCamas"
                component={() => (
                  <div className={styles.error}>{errors.cantCamas}</div>
                )}
              />
            </div>      
            <div> {/* descripcion */}
              <label htmlFor="descripcion">Description: </label>
              <Field
                type="text"
                id="descripcion"
                name="descripcion"
                placeholder="Room description..."
              />
              <ErrorMessage
                name="descripcion"
                component={() => (
                  <div className={styles.error}>{errors.descripcion}</div>
                )}
              />
            </div>
            { privada === "true" && (
              <div> {/* precioHabitacion */}
                <label htmlFor="precioHabitacion">Room price: </label>
                <Field
                  type="number"
                  id="precioHabitacion"
                  name="precioHabitacion"
                  placeholder="0"
                />
                <ErrorMessage
                  name="precioHabitacion"
                  component={() => (
                    <div className={styles.error}>{errors.precioHabitacion}</div>
                  )}
                />
              </div>
            )}
            { privada === "false" && (
              <div> {/* preciosCamas */}
                <label htmlFor="preciosCamas">Bed price: </label>
                <Field
                  type="number"
                  id="preciosCamas"
                  name="preciosCamas[0]"
                  placeholder="0"
                />
                <ErrorMessage
                  name="preciosCamas"
                  component={() => (
                    <div className={styles.error}>{errors.preciosCamas}</div>
                  )}
                />
              </div>
            )}
            <div> {/* imagenes */}
              <label htmlFor="imagenes">Add 3 images: </label>
              <Field
                type="text"
                id="imagenes"
                name="imagenes[0]"
                placeholder="paste image url..."
              />
              <Field
                type="text"
                id="imagenes"
                name="imagenes[1]"
                placeholder="paste image url..."
              />
              <Field
                type="text"
                id="imagenes"
                name="imagenes[2]"
                placeholder="paste image url..."
              />
              <ErrorMessage
                name="imagenes"
                component={() => (
                  <div className={styles.error}>{errors.imagenes}</div>
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
},

export default CreateRoom;
