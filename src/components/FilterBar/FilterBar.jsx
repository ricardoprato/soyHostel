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
    <div className={styles.form} id="form">
      <label className={styles.input}>
        From:
        <input
          type="date"
          name="checkIn"
          onChange={handleFilters}
          className={styles.data}
          defaultValue={today.toLocaleDateString('en-CA')}
        />
      </label>
      <label className={styles.input}>
        To:
        <input
          type="date"
          name="checkOut"
          onChange={handleFilters}
          className={styles.data}
          defaultValue={tomorrow.toLocaleDateString('en-CA')}
        />
      </label>
      <label className={styles.input}>
        Private Room
        <input type="checkbox" />
        <div className={styles.check}>
          <span className={styles.checkText}></span>
        </div>
      </label>
      <label className={styles.input}>
        Private Bathroom
        <input type="checkbox" />
        <div className={styles.check}>
          <div className={styles.checkText}></div>
        </div>
      </label>
    </div>
  );
};

export default FilterBar;
