import React, { useEffect, useState } from 'react';
import styles from './CreateRoom.module.css';




export function validate(input, image) {
  let errores = {};
  
  if (!input.nombre) {// NOMBRE
    errores.nombre = 'Please enter a room name';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.nombre)) {
    errores.nombre = 'The name can only contain letters and spaces';
  }
  
  if (input.privada === 'select') {// PRIVADA?
    errores.privada = 'Please select room type';
  }
  
  if (input.banoPrivado === 'select') {//Baño privado?
    errores.banoPrivado = 'Please select with or without private bathroom';
  }
 
  if (!input.comodidades) { // COMODIDADES
    errores.comodidades = 'Please enter room amenities';
  } else if (!/^[a-zA-Z0-9,.!? ]*$/.test(input.comodidades)) {
    errores.comodidades = 'Only letters and spaces';
  }
  
  if (!input.cantCamas) {//CANTCAMAS
    errores.cantCamas = 'Please enter amount of beds';
  } else if (!/^[0-9]*$/.test(input.cantCamas)) {
    errores.cantCamas = 'must be a number';
  }
  
  if (!input.descripcion) {//DESCRIPCION
    errores.descripcion = 'Please enter a room description';
  } else if (!/^[a-zA-Z0-9,.'!? ]*$/.test(input.descripcion)) {
    errores.descripcion =
      'The description can only contain letters, numbers, puntuation and spaces';
  }
  
  if (input.preciosCamas.length === 0 && input.privada === false) {//PRECIOSCAMAS
    //buscar validacion de imagenes url que acepte todas
    errores.preciosCamas = 'Please type the price for one night';
  } else if (
    !/^[0-9,.]*$/.test(input.preciosCamas) &&
    input.privada === false
  ) {
    errores.preciosCamas = 'The price can onoly contain numbers';
  }
  
  if (input.precioHabitacion === 0 && input.privada === true) {//PRECIOHABITACION
    errores.precioHabitacion = 'Please type the price for one night';
  } else if (
    input.privada === true &&
    !/^[0-9,.]*$/.test(input.precioHabitacion)
  ) {
    errores.precioHabitacion = 'The price can onoly contain numbers';
  }
  
  if (!/(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-])*((\.jpg)|(\.png)|(\.jpeg)|(\.svg))\/?(\.webp)?/.test(image)){ //IMAGENES
    errores.image = 'URL should start with https and end with (.jpg, .png, .jpeg, .svg or .webp)';
  }

  if(input.imagenes.length === 0){
    errores.imagenes = 'You need to give at least one valir image URL'
  }

  return errores;
}

export default function CreateRoom() {
  let [error, setError] = useState({});
  let [image, setImage] = useState('');
  let [imageError, setImageError] = useState('');
  let [input, setInput] = useState({
    nombre: '',
    privada: false,
    banoPrivado: false,
    comodidades: '',
    cantCamas: 0,
    descripcion: '',
    preciosCamas: [],
    precioHabitacion: 0,
    imagenes: [],
  });

  useEffect(() => {
    setInput({
      nombre: '',
      privada: false,
      banoPrivado: false,
      comodidades: '',
      cantCamas: 0,
      descripcion: '',
      preciosCamas: [],
      precioHabitacion: 0,
      imagenes: [],
    });
  }, []);
  
  function validateImage(image) {
    if(!/(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-])*((\.jpg)|(\.png)|(\.jpeg)|(\.svg))\/?(\.webp)?/.test(
      image
    )){
      setImageError("URL should start with https and end with (.jpg, .png, .jpeg, .svg or .webp)")
    }else{
      setImageError("ok")
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    //AGREGAR ACA EL FETCH(POST) AL BACK CON TODA LA DATA VALIDADA
    setInput({
      nombre: '',
      privada: false,
      banoPrivado: false,
      comodidades: '',
      cantCamas: 0,
      descripcion: '',
      preciosCamas: [],
      precioHabitacion: 0,
      imagenes: [],
    });
    e.target.reset();
  }

  let handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
    setTimeout(() => console.log(input), 1000);
  };

  let handleImageLoad = (e) => {
    console.log("e")
    console.log(e)
    e.preventDefault()
    // console.log("image to load: " + image)
    setInput({ ...input, imagenes: [...input.imagenes, image] });
    setTimeout(() => console.log(input), 1000);
    setImage("");

  };

  let oneImage = (value) => {
    setImage(value)
    let objError = validate({ ...input}, image);
    setError(objError);
    setTimeout(() => console.log(image), 1000);
  };

  return (
    <div className={styles.formulario}>
      <h1>Create New rOOM</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>{/* nombre */}
          
          <label>Room name: </label>
          <input
            type={'text'}
            name={'nombre'}
            onChange={(e) => handleChange(e)}
            placeholder="first name..."
          />
          {error.nombre && <p className={styles.error}>{error.nombre}</p>}
        </div>
        <div> {/* privada */}
         
          <label>Room type: </label>
          <select name={'privada'} onChange={(e) => handleChange(e)}>
            <option value="select...">Select...</option>
            <option value={true}>Private</option>
            <option value={false}>Shared</option>
          </select>
          {error.privada && <p className={styles.error}>{error.privada}</p>}
        </div>
        <div>{/* banoPrivado */}
          
          <label>Private bathroom: </label>
          <select name="banoPrivado" onChange={(e) => handleChange(e)}>
            <option value="select">Select...</option>
            <option value={true}>Private</option>
            <option value={false}>Shared</option>
          </select>
          {error.banoPrivado && (
            <p className={styles.error}>{error.banoPrivado}</p>
          )}
        </div>
        <div>{' '}{/* comodidades */}
          <label>Amenities: </label>
          <input
            type={'text'}
            name={'comodidades'}
            onChange={(e) => handleChange(e)}
            placeholder="amenities..."
          />
          {error.comodidades && (
            <p className={styles.error}>{error.comodidades}</p>
          )}
        </div>
        <div>{' '}{/* cantCamas */} 
          <label>Number of beds: </label>
          <input
            type={'number'}
            name={'cantCamas'}
            onChange={(e) => handleChange(e)}
            placeholder="number of beds..."
          />
          {error.cantCamas && <p className={styles.error}>{error.cantCamas}</p>}
        </div>
        <div> {' '}{/* descripcion */}
          <label>Room description: </label>
          <input
            type={'text'}
            name={'descripcion'}
            onChange={(e) => handleChange(e)}
            placeholder="Type a description..."
          />
          {error.descripcion && (
            <p className={styles.error}>{error.descripcion}</p>
          )}
        </div>
        {input.privada === 'true' && (
          <div>{' '} {/* precioHabitacion */}
            <label>Room price: </label>
            <input
              type={'number'}
              name={'precioHabitacion'}
              onChange={(e) => handleChange(e)}
              placeholder="Room price..."
            />
            {error.precioHabitacion && (
              <p className={styles.error}>{error.precioHabitacion}</p>
            )}
          </div>
        )}
        {input.privada === 'false' && (
          <div>{' '}{/* preciosCamas */}
            <label>Bed price: </label>
            <input
              type={'number'}
              name={'preciosCamas'}
              onChange={(e) => handleChange(e)}
              placeholder="Bed price..."
            />
            {error.preciosCamas && (
              <p className={styles.error}>{error.preciosCamas}</p>
            )}
          </div>
        )}
        <div>
          {' '}
          {/* imagenes */}
          <label>Add 3 images: </label>
          <input
            type="text"
            id="imagenes"
            name="imagenes"
            onChange={(e) => oneImage(e.target.value)}
            placeholder="paste image url..."
          />
          {!error.image && <button onClick={handleImageLoad}>load</button>}
          {error.image && (
              <p className={styles.error}>{error.image}</p>
            )}
          {error.imagenes && (
              <p className={styles.error}>{error.imagenes}</p>
            )}
        </div>
        <div>
          {error.name ||
          error.privada ||
          error.banoPrivado ||
          error.comodidades ||
          error.cantCamas ||
          error.descripcion ||
          error.precioHabitacion ||
          error.preciosCamas ||
          imageError !== "ok" ? null : (
            <button>Create</button>
          )}
        </div>
      </form>
    </div>
  );
}

