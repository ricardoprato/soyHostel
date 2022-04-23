import React, { useEffect } from 'react';
import { useContext, useState, useRef } from 'react';
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
    allRooms,
    setAllRooms,
    filteredRooms,
    setFileteredRooms,
  } = useContext(GlobalContext);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [localDate, setLocaldate] = useState({
    checkIn: today.toLocaleDateString('en-CA'),
    checkOut: tomorrow.toLocaleDateString('en-CA'),
  });

  // useEffect(() => {
  // getFilteredBeds(today, tomorrow);
  // }, []);

  const handleFilters = (event) => {
    let { name, value } = event.target;
    setLocaldate({ ...localDate, [name]: value });
  };

  const handleClick = () => {
    getFilteredBeds(localDate.checkIn, localDate.checkOut);
    setFilterdates(localDate);
    setFileteredRooms(availableBeds);
  };

  const sortPrice = () => {
    if (filteredAvailableBeds.length > 0) {
      let price = document.getElementById('price');

      let data = [];
      let data1 = [];
      if (price.checked == true) {
        data = [...filteredAvailableBeds].sort(function (a, b) {
          return a.preciosCamas - b.preciosCamas;
        });
        data1 = [...availableBeds].sort(function (a, b) {
          return a.preciosCamas - b.preciosCamas;
        });
      } else {
        data = [...filteredAvailableBeds].sort(function (a, b) {
          return b.preciosCamas - a.preciosCamas;
        });
        data1 = [...availableBeds].sort(function (a, b) {
          return b.preciosCamas - a.preciosCamas;
        });
      }
      setFilteredAvailableBeds(data);
      setAvailablebeds(data1);
    } else {
      let price = document.getElementById('price');

      let data = [];
      let data1 = [];
      if (price.checked == true) {
        data = [...filteredRooms].sort(function (a, b) {
          return a.precio - b.precio;
        });
        data1 = [...allRooms].sort(function (a, b) {
          return a.precio - b.precio;
        });
      } else {
        data = [...filteredRooms].sort(function (a, b) {
          return b.precio - a.precio;
        });
        data1 = [...allRooms].sort(function (a, b) {
          return b.precio - a.precio;
        });
      }
      setFileteredRooms(data);
      setAllRooms(data1);
    }
  };

  const handleRooms = () => {
    if (filteredAvailableBeds.length > 0) {
      let checkBathroomBox = document.getElementById('privateBathrooms');
      let selected = document.getElementById('roomTypes');
      // let price = document.getElementById('price');

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
    } else {
      let checkBathroomBox = document.getElementById('privateBathrooms');
      let selected = document.getElementById('roomTypes');
      // let price = document.getElementById('price');

      if (selected.value === 'All') {
        if (checkBathroomBox.checked == true) {
          setFileteredRooms(
            allRooms.filter((room) => room.banoPrivado === true)
          );
        } else {
          setFileteredRooms(allRooms);
        }
      } else if (selected.value === 'Private') {
        if (checkBathroomBox.checked == true) {
          setFileteredRooms(
            allRooms.filter(
              (room) => room.privada === true && room.banoPrivado === true
            )
          );
        } else {
          setFileteredRooms(allRooms.filter((room) => room.privada === true));
        }
      } else if (selected.value === 'Shared') {
        if (checkBathroomBox.checked == true) {
          setFileteredRooms(
            allRooms.filter(
              (room) => room.privada === false && room.banoPrivado === true
            )
          );
        } else {
          setFileteredRooms(allRooms.filter((room) => room.privada === false));
        }
      }
    }
  };

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

      <label className={styles.input}>
        Only Privated Bathroom
        <input type="checkbox" onChange={handleRooms} id="privateBathrooms" />
        <div className={styles.check}>
          <div className={styles.checkText}></div>
        </div>
      </label>
      <label className={styles.input}>
        Order by Price
        <input type="checkbox" onChange={sortPrice} id="price" />{' '}
        <div className={styles.check}>
          <div className={styles.checkPrice}></div>
        </div>
      </label>

      <label className={styles.input}>
        Private Room
        <select onChange={handleRooms} id="roomTypes" className={styles.select}>
          <option value="All">All</option>
          <option value="Private">Private</option>
          <option value="Shared">Shared</option>
        </select>
      </label>

      <button
        className={styles.button}
        onClick={handleClick}
        disabled={
          Date.parse(localDate.checkIn) >= Date.parse(localDate.checkOut)
        }
      >
        View Available
      </button>
    </div>
  );
};

export default FilterBar;
