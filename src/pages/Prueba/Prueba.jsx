import { useState, useEffect } from 'react';
import React from 'react';
import Register from '../../components/Register/Register';
import styles from '../../components/Register/Register.module.css';
import Login from '../../components/Login/Login';
import Google from '../../components/Google/Google';

const Prueba = () => {
  return (
    <>
      <Login />
      <Google />
      <Register />
    </>
  );
};

export default Prueba;
