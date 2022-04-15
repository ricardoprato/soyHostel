import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import styles from './FilterBar.module.css';

import { GlobalContext } from '../../GlobalContext/GlobalContext.jsx';

const FilterBar = () => {
  const {
    filterDates,
    setFilterdates,
    availableBeds,
    setAvailablebeds,
    filteredAvailableBeds,
    setFilteredAvailableBeds,
    getFilteredBeds,
  } = useContext(GlobalContext);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [localDate, setLocaldate] = useState({
    checkIn: today,
    checkOut: tomorrow,
  });

  useEffect(() => {
    getFilteredBeds(today, tomorrow);
  }, []);

  const handleFilters = (event) => {
    let { name, value } = event.target;
    setLocaldate({ ...localDate, [name]: value });
  };

  const handleClick = () => {
    getFilteredBeds(localDate.checkIn, localDate.checkOut);
    setFilterdates(localDate);
  };

  return (
    <div className={styles.lateral}>
      <label className={styles.input}>
        From:
        <input
          type="date"
          name="checkIn"
          onChange={handleFilters}
          defaultValue={today.toLocaleDateString('en-CA')}
        />
      </label>
      <label className={styles.input}>
        To:
        <input
          type="date"
          name="checkOut"
          onChange={handleFilters}
          defaultValue={tomorrow.toLocaleDateString('en-CA')}
        />
      </label>

      <button
        className={`boton my-1 ${styles.submitBtn}`}
        onClick={handleClick}
        disabled={
          Date.parse(localDate.checkIn) >= Date.parse(localDate.checkOut)
        }
      >
        Submit
      </button>

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
    </div>
  );
};

export default FilterBar;
