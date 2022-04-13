import React from 'react';
import { useContext } from 'react';
import styles from './FilterBar.module.css';
import moment from 'moment';
import { GlobalContext } from '../../GlobalContext/GlobalContext.jsx';

const FilterBar = () => {
  const { filterDates, setFilterdates } = useContext(GlobalContext);

  const handleFilters = (event) => {
    let { name, value } = event.target;
    if (name === 'checkIn' || name === 'checkOut') {
      value = moment(value);
    }
    const newData = { ...filterDates, [name]: value };
    setFilterdates(newData);
  };

  const handleReset = (event) => {
    setFilterdates({
      checkIn: {},
      checkOut: {},
    });
  };

  return (
    <div className={styles.lateral}>
      <label className={styles.input}>
        From:
        <input
          type="date"
          name="checkIn"
          onChange={() => {}}
          value={
            Object.keys(filterDates.checkIn).length === 0
              ? {}
              : moment(filterDates.checkIn).format('YYYY[-]MM[-]DD')
          }
        />
      </label>
      <label className={styles.input}>
        To:
        <input
          type="date"
          name="checkOut"
          onChange={() => {}}
          value={
            Object.keys(filterDates.checkOut).length === 0
              ? {}
              : moment(filterDates.checkOut).format('YYYY[-]MM[-]DD')
          }
        />
      </label>
      //poner el boton siempre y ver deshabilitación
      {moment(filterDates.checkIn) <= moment(filterDates.checkOut) ? (
        <button onClick={handleFilters}> Search </button>
      ) : (
        <span>Please select valid dates</span>
      )}
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
