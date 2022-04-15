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
    checkIn: today.toLocaleDateString('en-CA'),
    checkOut: tomorrow.toLocaleDateString('en-CA'),
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
    console.log(localDate);
    console.log(setAvailablebeds);
  };

  const handleChecks = () => {
    const checkBathroomBox = document.getElementById('privateBathrooms');
    const checkPrivateBox = document.getElementById('privateRooms');

    if (checkPrivateBox.checked == true && checkBathroomBox.checked == true) {
      setFilteredAvailableBeds(
        availableBeds.filter(
          (room) => room.privada === true && room.banoPrivado === true
        )
      );
    } else if (
      checkPrivateBox.checked == true &&
      checkBathroomBox.checked == false
    ) {
      setFilteredAvailableBeds(
        availableBeds.filter((room) => room.privada === true)
      );
    } else if (
      checkBathroomBox.checked == true &&
      checkPrivateBox.checked == false
    ) {
      setFilteredAvailableBeds(
        availableBeds.filter((room) => room.banoPrivado === true)
      );
    } else {
      setFilteredAvailableBeds(availableBeds);
    }
  };

  // const handleBathroomChecked = () => {
  //   if (checkBathroomBox.checked == true) {
  //     setFilteredAvailableBeds(
  //       (prev) =>
  //         (prev = availableBeds.filter((room) => room.banoPrivado === true))
  //     );
  //   } else {
  //     setFilteredAvailableBeds(availableBeds);
  //   }
  // };

  // const handleClick = () => {
  //   getFilteredBeds(localDate.checkIn, localDate.checkOut);
  //   setFilterdates(localDate);
  //   console.log(localDate);
  //   console.log(setAvailablebeds);
  // };

  // const handlePrivateChecked = () => {
  //   let checkBox = document.getElementById('privateRooms');
  //   if (checkBox.checked == true) {
  //     setFilteredAvailableBeds(
  //       availableBeds.filter((room) => room.privada === true)
  //     );
  //   } else {
  //     setFilteredAvailableBeds(availableBeds);
  //   }
  // };

  // const handleBathroomChecked = () => {
  //   let checkBox = document.getElementById('privateBathrooms');
  //   if (checkBox.checked == true) {
  //     setFilteredAvailableBeds(
  //       (prev) =>
  //         (prev = availableBeds.filter((room) => room.banoPrivado === true))
  //     );
  //   } else {
  //     setFilteredAvailableBeds(availableBeds);
  //   }
  // };

  useEffect(() => {
    console.log(filteredAvailableBeds);
  }, [filteredAvailableBeds]);

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
        className={styles.submitBtn}
        onClick={handleClick}
        disabled={
          Date.parse(localDate.checkIn) >= Date.parse(localDate.checkOut)
        }
      >
        Submit
      </button>

      <div className={styles.title}>
        <label>Private Room</label>
        <label className={styles.container}>
          <input type="checkbox" onClick={handleChecks} id="privateRooms" />
          <div className={styles.checkmark}></div>
        </label>
      </div>

      <div className={styles.title}>
        <label>Private Bathroom</label>
        <label className={styles.container}>
          <input type="checkbox" onClick={handleChecks} id="privateBathrooms" />
          <div className={styles.checkmark}></div>
        </label>
      </div>
    </div>
  );
};

export default FilterBar;
