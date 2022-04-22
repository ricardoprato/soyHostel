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

  const [state, setState] = useState([]);
  const getInitialState = () => {
    allRooms.forEach((room) => {
      if (room.privada == false) {
        room.Camas.forEach((cama) => {
          let producto = {
            id: '',
            title: '',
            tasks: [],
          };
          producto.title = `${room.nombre} - ${cama.id}`; //cama.nombre
          producto.id = cama.id;
          setState((prev) => [...prev, producto]);
          // state.push(producto);
        });
      } else {
        let producto = {
          id: '',
          title: '',
          tasks: [],
        };
        producto.title = room.nombre;
        producto.id = room.id;
        setState((prev) => [...prev, producto]);
        // state.push(producto);
      }
    });
  };
  useEffect(() => {
    getAllRooms();
  }, []);
  allRooms?.length > 0 && getInitialState();

  useEffect(() => {
    getReservations(localDate.start, localDate.end);
  }, []);

  const loadCalendar = () => {
    reservations?.forEach((reserva) => {
      if (reserva?.Habitacions?.length > 0) {
        reserva.Habitacions.forEach((habitacion) => {
          let element = {
            id: reserva.id,
            title: `${reserva.Usuario.nombre} ${reserva.Usuario.apellido}`,
            start: new Date(`${reserva.fecha_ingreso}`),
            end: new Date(`${reserva.fecha_egreso}`),
          };
          let stateCopy = state.map((producto) => {
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
          setState((prev) => [...stateCopy]);
        });
      } else if (reserva?.Camas?.length > 0) {
        reserva.Camas.forEach((cama) => {
          let element = {
            id: reserva.id,
            title: `${reserva.Usuario.nombre} ${reserva.Usuario.apellido}`,
            start: new Date(`${reserva.fecha_ingreso}`),
            end: new Date(`${reserva.fecha_egreso}`),
          };
          let stateCopy = state.map((producto) => {
            if (producto.id == cama.id) {
              producto.tasks.push(element);
            }
          });
          setState((prev) => [...stateCopy]);
        });
      }
    });
    console.log(state);
  };

  state?.length > 0 && reservations?.length > 0 && loadCalendar();

  // let projects = [
  //   {
  //     id: 'proyecto 1',
  //     title: 'Cama 2', //HabitacionID + CamaID
  //     tasks: [
  //       {
  //         id: 'title1', //id de reserva
  //         title: 'Nombre de Quien Reserva', //nombre del quien reserva
  //         start: new Date('2022-05-10'), //checkin
  //         end: new Date('2022-05-16'), //check out por noche ojo aca, que tenes que poner un día mas para que lo incluya,
  //       },
  //       {
  //         id: 'title1', //id de reserva
  //         title: 'Nombre de Quien Reserva', //nombre del quien reserva
  //         start: new Date('2022-05-18'), //checkin
  //         end: new Date('2022-05-23'), //check out por noche ojo aca, que tenes que poner un día mas para que lo incluya,
  //       },
  //     ],
  //   },
  //   {
  //     id: '1',
  //     title: 'Godzila',
  //     tasks: [
  //       {
  //         id: 'title1', //id de reserva
  //         title: 'Nombre de Quien Reserva', //nombre del quien reserva
  //         start: new Date('2022-05-10'), //checkin
  //         end: new Date('2022-05-16'), //check out por noche ojo aca, que tenes que poner un día mas para que lo incluya,
  //       },
  //       {
  //         id: 'title1', //id de reserva
  //         title: 'Nombre de Quien Reserva', //nombre del quien reserva
  //         start: new Date('2022-05-18'), //checkin
  //         end: new Date('2022-05-23'), //check out por noche ojo aca, que tenes que poner un día mas para que lo incluya,
  //       },
  //     ],
  //   },
  // ];
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
      {state.length > 0 && (
        <Gantt
          start={new Date(`${localDate.start}`)} //lo tengo que reemplazar por las fechas del mes en curso o meter un función respecto al día de hoy
          end={new Date(`${localDate.end}`)}
          now={new Date()}
          zoom={1}
          projects={state}
          enableSticky
          scrollToNow
          clickTask={taskClick}
        />
      )}
    </>
  );
}
