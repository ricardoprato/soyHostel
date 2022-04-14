import React from 'react';
import { useContext, useState } from 'react';
import styles from './FilterBar.module.css';

import { GlobalContext } from '../../GlobalContext/GlobalContext.jsx';

const FilterBar = () => {
  const [localDate, setLocaldate] = useState({
    checkIn: '',
    checkOut: '',
  });
  const { filterDates, setFilterdates } = useContext(GlobalContext);

  const handleFilters = (event) => {
    let { name, value } = event.target;
    setLocaldate({ ...localDate, [name]: value });
    let date1 = new Date(localDate.checkIn);
    let date2 = new Date(localDate.checkOut);
    console.log(localDate.checkIn);
    if (date1.getTime() <= date2.getTime()) {
      setFilterdates(localDate);
    } else {
      alert('La fecha de salida debe ser mayor a la de entrada');
    }
  };

  const handleReset = (event) => {
    setFilterdates({
      checkIn: '',
      checkOut: '',
    });
  };

  const date = new Date();
  const defaultValue = date.toLocaleDateString('en-CA');

  return (
    <div className={styles.lateral}>
      <label className={styles.input}>
        From:
        <input
          type="date"
          name="checkIn"
          onChange={handleFilters}
          defaultValue={defaultValue}
        />
      </label>
      <label className={styles.input}>
        To:
        <input
          type="date"
          name="checkOut"
          onChange={handleFilters}
          defaultValue={defaultValue}
        />
      </label>
      ///ver para que no puedan setear reservas en el pasado
      <div>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className="slider round">Bath</span>
        </label>
      </div>
      <div>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className="slider round">Bath</span>
        </label>
      </div>
      <div>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className="slider round">Bath</span>
        </label>
      </div>
      <div>
        <button className={styles.button} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
