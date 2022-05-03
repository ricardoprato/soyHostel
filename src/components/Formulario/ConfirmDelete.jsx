import React, { useEffect, useState, useContext } from 'react';

import styles from './ConfirmDelete.module.css';

export default function ConfirmDelete(id) {
  const handleConfirm = () => {
    const token = localStorage.getItem('tokenProp');
    fetch(`${import.meta.env.VITE_APP_URL}/reservas/${id}`, {
      method: 'DELETE',
      headers: {
        api: import.meta.env.VITE_API,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        if (error.response) {
          const { response } = error;
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        }
      });
  };

  return (
    <div className={styles.background}>
      <div id="id_confrmdiv">
        <h1>WARNING!!!</h1>

        <h1>
          All rooms and beds asociated to this resrvation are going to be
          deleted.
        </h1>
        <h2> Please confirm delition</h2>
      </div>
      <button onClick={() => handleConfirm()}>Yes</button>
    </div>
  );
}
