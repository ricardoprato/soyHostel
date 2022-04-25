import React, { useContext, useEffect, useState } from 'react';
import Gantt from 'react-gantt-antd-rocket-pt';
import 'react-gantt-antd-rocket-pt/lib/css/style.css';
import { GlobalContext } from '../../GlobalContext/GlobalContext.jsx';
import { Modal } from '../Modal/Modal';
import { Formulario } from '../Formulario/Formulario';
import styles from './Calendar.module.css';

export default function Calendar() {
  const [localModal, setLocalModal] = useState(false);
  const {
    allRooms,
    getAllRooms,
    reservations,
    setReservations,
    getReservations,
  } = useContext(GlobalContext);

  const today = new Date();
  const start = new Date(today);
  const end = new Date(today);
  start.setDate(start.getDate() - 15);
  end.setDate(end.getDate() + 15);

  const [localDate, setLocaldate] = useState({
    start: start.toLocaleDateString('en-CA'),
    end: end.toLocaleDateString('en-CA'),
  });

  const [calendarState, setCalendarState] = useState([]);

  const getInitialState = () => {
    allRooms.forEach((room) => {
      if (room?.privada == false) {
        room?.Camas.forEach((cama) => {
          let producto = {
            id: '',
            title: '',
            tasks: [],
          };
          producto.title = `${room?.nombre} - ${cama?.id}`; //cama.nombre
          producto.id = cama?.id;
          setCalendarState((prev) => [...prev, producto]);
          // state.push(producto);
        });
      } else {
        let producto = {
          id: '',
          title: '',
          tasks: [],
        };
        producto.title = room.nombre;
        producto.id = room?.id;
        setCalendarState((prev) => [...prev, producto]);
        // state.push(producto);
      }
    });
  };
  const loadCalendar = () => {
    reservations?.forEach((reserva) => {
      if (reserva?.Habitacions?.length > 0) {
        reserva?.Habitacions?.forEach((habitacion) => {
          let element = {
            id: reserva?.id,
            title: `${reserva.Usuario.nombre} ${reserva.Usuario.apellido}`,
            start: new Date(`${reserva.fecha_ingreso}`),
            end: new Date(`${reserva.fecha_egreso}`),
          };
          let stateCopy = calendarState.map((producto) => {
            if (producto.id == habitacion.id) {
              producto.tasks.push(element);
              // let element = {
              //   id: reserva.id,
              //   title: `${reserva.Usuario.nombre} ${reserva.Usuario.apellido}`,
              //   start: new Date(`${reserva.fecha_ingreso}`),
              //   end: new Date(`${reserva.fecha_egreso}`),
              // }
              // producto.tasks.push(element);
            }
          });
          setCalendarState(stateCopy);
        });
      } else if (reserva?.Camas?.length > 0) {
        reserva.Camas.forEach((cama) => {
          let element = {
            id: reserva.id,
            title: `${reserva.Usuario.nombre} ${reserva.Usuario.apellido}`,
            start: new Date(`${reserva.fecha_ingreso}`),
            end: new Date(`${reserva.fecha_egreso}`),
          };
          let stateCopy = calendarState.map((producto) => {
            if (producto.id == cama.id) {
              producto.tasks.push(element);
            }
          });
          setCalendarState((prev) => [...stateCopy]);
        });
      }
    });
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  useEffect(() => {
    allRooms?.length > 0 && getInitialState();
  }, [allRooms]);

  useEffect(() => {
    getReservations(localDate.start, localDate.end);
  }, []);
  calendarState?.length > 0 && reservations?.length > 0 && loadCalendar();

  console.log(calendarState);

  const taskClick = () => {
    setLocalModal((prevState) => !prevState);
    (dataSet) => console.log(dataSet);
  };

  const handleFilters = (event) => {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    setLocaldate({ ...localDate, start: from, end: to });
  };

  return (
    <>
      {!!localModal && (
        <Modal setLocalModal={setLocalModal}>
          <Formulario />
        </Modal>
      )}
      <div className={styles.form} id="form">
        <label className={styles.input}>
          From:
          <input
            type="date"
            name="checkIn"
            // onChange={handleFilters}
            className={styles.data}
            defaultValue={start.toLocaleDateString('en-CA')}
            id="from"
          />
        </label>
        <label className={styles.input}>
          To:
          <input
            type="date"
            name="checkOut"
            // onChange={handleFilters}
            className={styles.data}
            defaultValue={end.toLocaleDateString('en-CA')}
            id="to"
          />
        </label>

        <button
          className={styles.button}
          onClick={handleFilters}
          disabled={Date.parse(localDate.start) >= Date.parse(localDate.end)}
        >
          View
        </button>
      </div>
      {calendarState.length && !reservations.lenght ? (
        <Gantt
          start={new Date(`${localDate.start}`)} //lo tengo que reemplazar por las fechas del mes en curso o meter un función respecto al día de hoy
          end={new Date(`${localDate.end}`)}
          now={new Date()}
          zoom={1}
          projects={calendarState}
          enableSticky
          scrollToNow
          clickTask={taskClick}
        />
      ) : reservations.length ? (
        <Gantt
          start={new Date(`${localDate.start}`)} //lo tengo que reemplazar por las fechas del mes en curso o meter un función respecto al día de hoy
          end={new Date(`${localDate.end}`)}
          now={new Date()}
          zoom={1}
          projects={calendarState}
          enableSticky
          scrollToNow
          clickTask={taskClick}
        />
      ) : null}
    </>
  );
}
