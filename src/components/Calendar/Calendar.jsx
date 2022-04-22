import React, { useContext, useEffect, useState } from 'react';
import Gantt from 'react-gantt-antd-rocket-pt';
import 'react-gantt-antd-rocket-pt/lib/css/style.css';
import { GlobalContext } from '../../GlobalContext/GlobalContext.jsx';
import { Modal } from '../Modal/Modal';
import { Formulario } from '../Formulario/Formulario';

export default function Calendar() {
  const [localModal, setLocalModal] = useState(false);
  const {
    allRooms,
    getAllRooms,
    reservations,
    setReservations,
    getReservations,
  } = useContext(GlobalContext);

  const state = [];
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
          state.push(producto);
        });
      } else {
        let producto = {
          id: '',
          title: '',
          tasks: [],
        };
        producto.title = room.nombre;
        producto.id = room.id;

        state.push(producto);
      }
    });
  };
  useEffect(() => {
    getAllRooms();
  }, []);
  allRooms?.length > 0 && getInitialState();

  // useEffect(() => {
  //   getReservations();
  // }, []);

  const loadCalendar = () => {
    reservations?.forEach((reserva) => {
      if (reserva?.Habitacions?.length > 0) {
        console.log(reserva.Habitacions);
        reserva.Habitacions.forEach((habitacion) => {
          state.forEach((producto) => {
            if (producto.id == habitacion.id) {
              let element = {
                id: reserva.id,
                title: `${reserva.Usuario.nombre} ${reserva.Usuario.apellido}`,
                start: new Date(`${reserva.fecha_ingreso}`),
                end: new Date(`${reserva.fecha_egreso}`),
              };
              producto.tasks.push(element);
            }
          });
        });
      } else if (reserva?.Camas?.length > 0) {
        reserva.Camas.forEach((cama) => {
          state.forEach((producto) => {
            if (producto.id == cama.id) {
              let element = {
                id: reserva.id,
                title: `${reserva.Usuario.nombre} ${reserva.Usuario.apellido}`,
                start: new Date(`${reserva.fecha_ingreso}`),
                end: new Date(`${reserva.fecha_egreso}`),
              };
              producto.tasks.push(element);
            }
          });
        });
      }
    });
    console.log(state);
  };

  state?.length > 0 && reservations?.length > 0 && loadCalendar();

  let projects = [
    {
      id: 'proyecto 1',
      title: 'Cama 2', //HabitacionID + CamaID
      tasks: [
        {
          id: 'title1', //id de reserva
          title: 'Nombre de Quien Reserva', //nombre del quien reserva
          start: new Date('2022-05-10'), //checkin
          end: new Date('2022-05-16'), //check out por noche ojo aca, que tenes que poner un día mas para que lo incluya,
        },
        {
          id: 'title1', //id de reserva
          title: 'Nombre de Quien Reserva', //nombre del quien reserva
          start: new Date('2022-05-18'), //checkin
          end: new Date('2022-05-23'), //check out por noche ojo aca, que tenes que poner un día mas para que lo incluya,
        },
      ],
    },
    {
      id: '1',
      title: 'Godzila',
      tasks: [
        {
          id: 'title1', //id de reserva
          title: 'Nombre de Quien Reserva', //nombre del quien reserva
          start: new Date('2022-05-10'), //checkin
          end: new Date('2022-05-16'), //check out por noche ojo aca, que tenes que poner un día mas para que lo incluya,
        },
        {
          id: 'title1', //id de reserva
          title: 'Nombre de Quien Reserva', //nombre del quien reserva
          start: new Date('2022-05-18'), //checkin
          end: new Date('2022-05-23'), //check out por noche ojo aca, que tenes que poner un día mas para que lo incluya,
        },
      ],
    },
  ];
  const handleClick = () => {
    setLocalModal((prevState) => !prevState);
  };
  return (
    <>
      {!!localModal && (
        <Modal setLocalModal={setLocalModal}>
          <Formulario />
        </Modal>
      )}

      {state.length > 0 && (
        <Gantt
          start={new Date('2022-11-01')} //lo tengo que reemplazar por las fechas del mes en curso o meter un función respecto al día de hoy
          end={new Date('2022-11-30')}
          now={new Date('2022-11-20')}
          zoom={1}
          projects={state}
          enableSticky
          scrollToNow
          sideWidth={1000}
          clickTask={handleClick}
        />
      )}
    </>
  );
}
