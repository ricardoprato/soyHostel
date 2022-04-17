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
    // console.log(localDate);
    // console.log(setAvailablebeds);
  };

  const handleRooms = () => {
    let checkBathroomBox = document.getElementById('privateBathrooms');
    let selected = document.getElementById('roomTypes');
    // const checkPrivateBox = document.getElementById('privateRooms');
    if (selected.value === 'All') {
      if (checkBathroomBox.checked == true) {
        setFilteredAvailableBeds(
          availableBeds.filter((room) => room.banoPrivado === true)
        );
      } else {
        setFilteredAvailableBeds(availableBeds);
      }
    } else if (selected.value === 'Private') {
      if (checkBathroomBox.checked == true) {
        setFilteredAvailableBeds(
          availableBeds.filter(
            (room) => room.privada === true && room.banoPrivado === true
          )
        );
      } else {
        setFilteredAvailableBeds(
          availableBeds.filter((room) => room.privada === true)
        );
      }
    } else if (selected.value === 'Shared') {
      if (checkBathroomBox.checked == true) {
        setFilteredAvailableBeds(
          availableBeds.filter(
            (room) => room.privada === false && room.banoPrivado === true
          )
        );
      } else {
        setFilteredAvailableBeds(
          availableBeds.filter((room) => room.privada === false)
        );
      }
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

  // useEffect(() => {
  //   console.log(filteredAvailableBeds);
  // }, [filteredAvailableBeds]);

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
      <button
        className={styles.button}
        onClick={handleClick}
        disabled={
          Date.parse(localDate.checkIn) >= Date.parse(localDate.checkOut)
        }
      >
        Submit
      </button>
      <label className={styles.input}>
        Private Room
        <select onChange={handleRooms} id="roomTypes" className={styles.select}>
          <option value="All">All</option>
          <option value="Private">Private</option>
          <option value="Shared">Shared</option>
        </select>
      </label>

      <label className={styles.input}>
        Private Bathroom
        <input type="checkbox" onChange={handleRooms} id="privateBathrooms" />
        <div className={styles.check}>
          <div className={styles.checkText}></div>
        </div>
      </label>
    </div>
  );
};

export default FilterBar;
