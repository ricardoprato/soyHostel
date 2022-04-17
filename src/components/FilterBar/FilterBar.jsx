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

  const handlePrice = () => {
    let price = document.getElementById('price');

    let data = [];
    if (price.checked == true) {
      data = filteredAvailableBeds.sort(function (a, b) {
        return a.preciosCamas - b.preciosCamas;
      });
    } else {
      data = filteredAvailableBeds.sort(function (a, b) {
        return b.preciosCamas - a.preciosCamas;
      });
    }
    setFilteredAvailableBeds(data);
    console.log(filteredAvailableBeds);
  };

  const handleRooms = () => {
    let checkBathroomBox = document.getElementById('privateBathrooms');
    let selected = document.getElementById('roomTypes');
    let price = document.getElementById('price');
    // const checkPrivateBox = document.getElementById('privateRooms');
    if (selected.value === 'All') {
      if (checkBathroomBox.checked == true) {
        setFilteredAvailableBeds(
          availableBeds.filter((room) => room.banoPrivado === true)
        );
        price.checked = false;
      } else {
        setFilteredAvailableBeds(availableBeds);
        price.checked = false;
      }
    } else if (selected.value === 'Private') {
      if (checkBathroomBox.checked == true) {
        setFilteredAvailableBeds(
          availableBeds.filter(
            (room) => room.privada === true && room.banoPrivado === true
          )
        );
        price.checked = false;
      } else {
        setFilteredAvailableBeds(
          availableBeds.filter((room) => room.privada === true)
        );
        price.checked = false;
      }
    } else if (selected.value === 'Shared') {
      if (checkBathroomBox.checked == true) {
        setFilteredAvailableBeds(
          availableBeds.filter(
            (room) => room.privada === false && room.banoPrivado === true
          )
        );
        price.checked = false;
      } else {
        setFilteredAvailableBeds(
          availableBeds.filter((room) => room.privada === false)
        );
        price.checked = false;
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

        <select onChange={handleRooms} id="roomTypes">
          <option value="All">All</option>
          <option value="Private">Private</option>
          <option value="Shared">Shared</option>
        </select>
      </div>

      <div className={styles.title}>
        <label>Private Bathroom</label>
        <input type="checkbox" onChange={handleRooms} id="privateBathrooms" />
      </div>

      <div className={styles.title}>
        <label>Order by Price</label>
        <input type="checkbox" onChange={handlePrice} id="price" />
      </div>
    </div>
  );
};

export default FilterBar;
