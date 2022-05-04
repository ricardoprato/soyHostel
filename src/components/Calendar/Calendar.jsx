import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
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
    // start: start.toLocaleDateString('en-CA'),
    // end: end.toLocaleDateString('en-CA'),
    start: null,
    end: null,
  });

  const [calendarState, setCalendarState] = useState([]);

  const getInitialState = () => {
    let state = [];
    allRooms.forEach((room) => {
      if (room?.privada == false) {
        room?.Camas.forEach((cama) => {
          let producto = {
            id: '',
            title: '',
            tasks: [],
            dataSet: {},
          };

          producto.title = cama?.nombre.toUpperCase(); //cama.nombre
          producto.id = cama?.id;
          state = [...state, producto];
          setCalendarState(state);
          // state.push(producto);
        });
      } else {
        let producto = {
          id: '',
          title: '',
          tasks: [],
          dataSet: {},
        };
        producto.title = room.nombre.toUpperCase();
        producto.id = room?.id;

        state = [...state, producto];
        setCalendarState(state);
      }
    });
  };

  const loadCalendar = () => {
    let roomStateCopy = [];
    let bedStateCopy = [];
    // getInitialState();
    if (reservations.length) {
      reservations?.forEach((reserva) => {
        if (reserva?.Habitacions?.length > 0) {
          reserva?.Habitacions?.forEach((habitacion) => {
            let element = {
              id: reserva?.id,
              title: `${reserva?.Usuario.nombre} ${reserva?.Usuario.apellido}`,
              start: new Date(`${reserva.fecha_ingreso}`),
              end: new Date(`${reserva.fecha_egreso}`),
              dataSet: {
                ...reserva,
                idHabitacion: habitacion?.id,
                nombreHabitacion: habitacion?.nombre,
              }, ///ojo aca el nombre de la habitación
            };
            roomStateCopy = calendarState.map((producto) => {
              if (
                producto?.id == habitacion?.id &&
                !producto.tasks.find((p) => element.id == p.id)
              ) {
                producto.tasks.push(element);
              }
              return producto;
            });
          });
        } else if (reserva?.Camas?.length > 0) {
          reserva?.Camas?.forEach((cama) => {
            let element = {
              id: reserva?.id,
              title: `${reserva?.Usuario.nombre} ${reserva?.Usuario.apellido}`,
              start: new Date(`${reserva.fecha_ingreso}`),
              end: new Date(`${reserva.fecha_egreso}`),
              dataSet: {
                ...reserva,
                idCama: cama?.id,
                nombreCama: cama?.nombre,
                estado: reserva.estado,
                // huesped: cama?.huesped,
              },
            };
            bedStateCopy = calendarState.map((producto) => {
              if (
                producto.id == cama.id &&
                !producto.tasks.find((p) => element.id == p.id)
              ) {
                producto.tasks.push(element);
              }
              return producto;
            });
          });
        }
      });

      setCalendarState([...bedStateCopy, ...roomStateCopy]);
    } else {
      getInitialState();
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  useLayoutEffect(() => {
    getInitialState();
  }, [allRooms]);

  const [data, setData] = useState({});
  const taskClick = (e) => {
    setData(e.dataSet);
    setLocalModal((prevState) => !prevState);
  };

  const showReservations = (event) => {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    setLocaldate({ start: from, end: to });

    if (from !== '' && to !== '') {
      if (Date.parse(from) <= Date.parse(to)) {
        getReservations(from, to);
      }
    }
  };

  useEffect(() => {
    getInitialState();
    return loadCalendar();
  }, [reservations]);

  return (
    <>
      {!!localModal && (
        <Modal setLocalModal={setLocalModal}>
          <Formulario modalExterno={setLocalModal} props={data} />
        </Modal>
      )}
      <div className={styles.calendar}>
        <div className={styles.container} id="form">
          <label className={styles.input}>
            From:
            <input
              type="date"
              name="checkIn"
              // onChange={handleFilters}
              className={styles.data}
              // defaultValue={start.toLocaleDateString('en-CA')}
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
              // defaultValue={end.toLocaleDateString('en-CA')}
              id="to"
            />
          </label>

          <button
            className={styles.butoncito}
            onClick={showReservations}
            disabled={Date.parse(localDate.start) >= Date.parse(localDate.end)}
          >
            View
          </button>
        </div>
      </div>
      {!calendarState.length && !allRooms.length ? (
        <p>...cargando</p>
      ) : (
        calendarState.length && (
          <Gantt
            // start={new Date(`${start.toLocaleDateString('en-CA')}`)} //lo tengo que reemplazar por las fechas del mes en curso o meter un función respecto al día de hoy
            // end={new Date(`${end.toLocaleDateString('en-CA')}`)}
            start={new Date(`${localDate.start}`)}
            end={new Date(`${localDate.end}`)}
            now={new Date()}
            zoom={1}
            projects={calendarState}
            enableSticky
            scrollToNow
            sidebarWidth={220}
            clickTask={(e) => taskClick(e)}
          />
        )
      )}
    </>
  );
}
