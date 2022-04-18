import React, { useState } from 'react';
import styles from './Booking.module.css'




export function validate(input){
  let error = {};
  if(!input.name){
      error.name = 'Full name required';
  }else if(!/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(input.name)){
      error.name = 'Only [A-z] & [0-9]';
  }
  if(!input.birthDate){
      error.birthDate = 'must select a date'
  }
  if(!input.docType){
      error.docType = 'must select a document type'
  }
  if(!input.docNumber){
    error.docNumber = 'insert valid document number'
  }
  if(!input.nationality){
    error.nationality = 'insert valid country'
  }
  if(!input.roomId){
    error.roomId = 'select a room'
  }
  if(!input.bedId){
    error.bedId = 'insert valid bedId'
  }
  if(!input.checkIn){
    error.checkIn = 'select valid check-in date'
  }
  if(!input.checkOut){
    error.checkOut = 'select valid check-out date'
  }
  return error
}

export default function Booking() {

  let [error, setError] = useState({}); 
  let [input, setInput] = useState({
    name: '', 
    docType: '', 
    docNumber: '',
    birthDate: '',
    nationality: '',
    roomId: '',
    bedId: '',
    checkIn: '',
    checkOut: ''
  });

  function handleSubmit (e) {
    e.preventDefault();
    // Aca debemos enviar los datos de la reserva al back
    setInput({
        name: '', 
        docType: '', 
        docNumber: '',
        birthDate: '',
        nationality: '',
        roomId: '',
        bedId: '',
        checkIn: '',
        checkOut: ''
    })
    e.target.reset()
  }

  let handleChange = (e) => {
      setInput({...input, [e.target.name]: e.target.value})
      let objError = validate({...input, [e.target.name]: e.target.value})
      setError(objError)
  };

  return (
    <div>
      <div className={styles.espacio}>NavBar molestoooo</div>
      <h1>Make reservation</h1>
      <form onSubmit={(e)=> handleSubmit(e)}>
      <div>
          <label>Full Name: </label>
          <input 
              type={'text'}
              name={'name'} 
              onChange={(e)=> handleChange(e)} 
              className={error.name && styles.danger}
          />
          {
            error.name && (<p className={styles.danger}>{error.name}</p>)
          }
      </div>
      <div>
          <label>Document Type: </label>
          <select name="docType" onChange={(e)=> handleChange(e)} >
              <option value=" ">select...</option>
              <option value="passport">passport</option> 
              <option value="dni">dni</option> 
              <option value="driver-license">driver license</option>
              <option value="military-identification-card">military identification card</option>   
          </select> 
      </div>
      <div>
          <label>Document Number: </label>
          <input type="text" placeholder='number...' name={'docNumber'} onChange={(e)=> handleChange(e)} />
      </div>
      <div>
          <label>Birth Date: </label>
          <input type="date" name={'birthDate'}  onChange={(e)=> handleChange(e)} />
      </div>
      <div>
        <label>Nationality: </label> 
        <input type="text" name={'nationality'}  onChange={(e)=> handleChange(e)} />
      </div>
      <div>
          <label>Room: </label>
          <select name="room" onChange={(e)=> handleChange(e)} >
              <option value=" ">select...</option>
              <option value="Godzilla">Godzilla</option> 
              <option value="Suit">Suit</option> 
              <option value="Ratatouille">Ratatouille</option> 
              <option value="Average">Average</option> 
              <option value="Family">Family</option> 
          </select> 
      </div>
      <div>
          <label>Bed: </label>
          <input type="text" name={'bed'}  onChange={(e)=> handleChange(e)} />
      </div>
      <div>
          <label>Check-In: </label>
          <input type="date" name={'checkIn'}  onChange={(e)=> handleChange(e)} />
      </div>
      <div>
          <label>Check-Out: </label>
          <input type="date" name={'checkOut'}  onChange={(e)=> handleChange(e)} />
      </div>
      <div>
          {
              (error.name || error.docType || error.docNumber || error.birthDate || error.nationality ) ? 
              null : 
              (<button className='createBtn'>Create</button>)
          }
      </div>
      </form>
    </div>
  )
}
