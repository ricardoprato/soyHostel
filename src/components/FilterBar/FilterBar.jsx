import React, { useEffect } from 'react';
import { useContext, useState, useRef } from 'react';
import styles from './FilterBar.module.css';
import { GlobalContext } from '../../GlobalContext/GlobalContext.jsx';

const FilterBar = () => {
  const {
    // filterDates,
    setFilterdates,
    // filteredAvailableBeds,
    // setFilteredAvailableBeds,
    getFilteredBeds,
    allRooms,
    setAllRooms,
    filteredRooms,
    setFileteredRooms,
    filteredAvailableBeds,
    dataForCards,
    setDataForCards,
    dataForCardsCopy,
    setDataForCardsCopy,
  } = useContext(GlobalContext);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [localDate, setLocaldate] = useState({
    checkIn: today.toLocaleDateString('en-CA'),
    checkOut: tomorrow.toLocaleDateString('en-CA'),
  });

  const handleFilters = (event) => {
    let { name, value } = event.target;
    setLocaldate({ ...localDate, [name]: value });
  };

  // const alert = async () => {
  //   await getFilteredBeds(localDate.checkIn, localDate.checkOut)
  // }

  const handleClick = () => {
    getFilteredBeds(localDate.checkIn, localDate.checkOut);
    setFilterdates(localDate);
  };

  const sortPrice = () => {
    // if (dataForCards.length > 0) {
    //   let price = document.getElementById('price');

    //   let data = [];
    //   let data1 = [];
    //   if (price.checked == true) {
    //     data = [...dataForCards].sort(function (a, b) {
    //       return a.precio - b.precio;
    //     });
    //     data1 = [...dataForCardsCopy].sort(function (a, b) {
    //       return a.precio - b.precio;
    //     });
    //   } else {
    //     data = [...dataForCards].sort(function (a, b) {
    //       return b.precio - a.precio;
    //     });
    //     data1 = [...dataForCardsCopy].sort(function (a, b) {
    //       return b.precio - a.precio;
    //     });
    //   }
    //   setDataForCards(data);
    //   setDataForCardsCopy(data1);
    //   setFileteredRooms(data);
    // } else {

    let price = document.getElementById('price');

    let data = [];
    let data1 = [];
    if (price.checked == true) {
      data = [...filteredRooms].sort(function (a, b) {
        if (a.privada && !b.privada) {
          return a.precio - b.precio / b.cantCamas; // precios de habritaciónes
        } else if (!a.privada && b.privada) {
          return a.precio / a.cantCamas - b.precio; // precios de habitaciones privadas
        } else if (a.privada && b.privada) {
          return a.precio - b.precio; // precios de habitaciones privadas
        } else {
          return a.precio / a.cantCamas - b.precio / b.cantCamas; // precios de habitaciones privadas
        }
      });
      data1 = [...allRooms].sort(function (a, b) {
        if (a.privada && !b.privada) {
          return a.precio - b.precio / b.cantCamas; // precios de habritaciónes
        } else if (!a.privada && b.privada) {
          return a.precio / a.cantCamas - b.precio; // precios de habitaciones privadas
        } else if (a.privada && b.privada) {
          return a.precio - b.precio; // precios de habitaciones privadas
        } else {
          return a.precio / a.cantCamas - b.precio / b.cantCamas; // precios de habitaciones privadas
        }
      });
    } else {
      data = [...filteredRooms].sort(function (a, b) {
        if (b.privada && !a.privada) {
          return b.precio - a.precio / a.cantCamas; // precios de habritaciónes
        } else if (!b.privada && a.privada) {
          return b.precio / b.cantCamas - a.precio; // precios de habitaciones privadas
        } else if (b.privada && a.privada) {
          return b.precio - a.precio; // precios de habitaciones privadas
        } else {
          return b.precio / b.cantCamas - a.precio / a.cantCamas; // precios de habitaciones privadas
        }
      });
      data1 = [...allRooms].sort(function (a, b) {
        if (b.privada && !a.privada) {
          return b.precio - a.precio / a.cantCamas; // precios de habritaciónes
        } else if (!b.privada && a.privada) {
          return b.precio / b.cantCamas - a.precio; // precios de habitaciones privadas
        } else if (b.privada && a.privada) {
          return b.precio - a.precio; // precios de habitaciones privadas
        } else {
          return b.precio / b.cantCamas - a.precio / a.cantCamas; // precios de habitaciones privadas
        }
      });
    }
    setFileteredRooms(data);
    setAllRooms(data1);
  };

  const handleRooms = () => {
    if (dataForCards.length > 0) {
      let checkBathroomBox = document.getElementById('privateBathrooms');
      let selected = document.getElementById('roomTypes');
      // let price = document.getElementById('price');

      if (selected.value === 'All') {
        if (checkBathroomBox.checked == true) {
          setFileteredRooms(
            dataForCardsCopy.filter((room) => room.banoPrivado === true)
          );
        } else {
          setFileteredRooms(dataForCardsCopy);
        }
      } else if (selected.value === 'Private') {
        if (checkBathroomBox.checked == true) {
          setFileteredRooms(
            dataForCardsCopy.filter(
              (room) => room.privada === true && room.banoPrivado === true
            )
          );
        } else {
          setFileteredRooms(
            dataForCardsCopy.filter((room) => room.privada === true)
          );
        }
      } else if (selected.value === 'Shared') {
        if (checkBathroomBox.checked == true) {
          setFileteredRooms(
            dataForCardsCopy.filter(
              (room) => room.privada === false && room.banoPrivado === true
            )
          );
        } else {
          setFileteredRooms(
            dataForCardsCopy.filter((room) => room.privada === false)
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
        View available
      </button>
    </div>
  );
};

export default FilterBar;
