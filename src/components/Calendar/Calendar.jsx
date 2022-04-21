import React, { useContext, useEffect } from 'react';
import Gantt from 'react-gantt-antd-rocket-pt';
import 'react-gantt-antd-rocket-pt/lib/css/style.css';
import { GlobalContext } from '../../GlobalContext/GlobalContext.jsx';

export default function Calendar() {
  const {
    allRooms,
    getAllRooms,
    reservations,
    setReservations,
    getReservations,
  } = useContext(GlobalContext);

  const initialState = [];
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
          console.log(cama.id);
          initialState.push(producto);
        });
      } else {
        let producto = {
          id: '',
          title: '',
          tasks: [],
        };
        producto.title = room.nombre;
        producto.id = room.id;
        initialState.push(producto);
      }
    });
    console.log(initialState);
  };
  useEffect(() => {
    getAllRooms();
  }, []);

  allRooms?.length > 0 && getInitialState();

  // useEffect(() => {
  //   getReservations();
  // }, []);

  // const toCalendar =[]
  // reservations.forEach((reservation) => {
  //   let reservationMolded = {
  //     id: reservation.id,
  //     title: Hab
  //   }
  //   project.push(reservationMolded)
  //  }

  let projects = [
    // camas o habitaciones
    {
      id: 'proyecto 1',
      title: 'Cama 2', //HabitacionID + CamaID
      tasks: [],
      //   {
      //     id: 'title1', //id de reserva
      //     title: 'Nombre de Quien Reserva', //nombre del quien reserva
      //     start: new Date('2022-05-10'), //checkin
      //     end: new Date('2022-05-16'), //check out por noche ojo aca, que tenes que poner un día mas para que lo incluya,
      //   },
      //   {
      //     id: 'title1', //id de reserva
      //     title: 'Nombre de Quien Reserva', //nombre del quien reserva
      //     start: new Date('2022-05-18'), //checkin
      //     end: new Date('2022-05-23'), //check out por noche ojo aca, que tenes que poner un día mas para que lo incluya,
      //   },
      // ], //
      // projects: [
      //   {
      //     id: 'sub_project1',
      //     title: 'saldo a pagar',
      //     tasks: [
      //       {
      //         id: 'titulo 1',
      //         title: 'Debe 500',
      //         start: new Date('2022-05-18'), //hay que igualar las fechas
      //         end: new Date('2022-05-23'),
      //       },
      //     ],
      //   },
      // ],
      // isOpen: true,
    },
    // {
    //   id: '1',
    //   title: 'Godzila',
    //   tasks: [
    //     {
    //       id: 'title1', //id de reserva
    //       title: 'Nombre de Quien Reserva', //nombre del quien reserva
    //       start: new Date('2022-05-10'), //checkin
    //       end: new Date('2022-05-16'), //check out por noche ojo aca, que tenes que poner un día mas para que lo incluya,
    //     },
    //     {
    //       id: 'title1', //id de reserva
    //       title: 'Nombre de Quien Reserva', //nombre del quien reserva
    //       start: new Date('2022-05-18'), //checkin
    //       end: new Date('2022-05-23'), //check out por noche ojo aca, que tenes que poner un día mas para que lo incluya,
    //     },
    //   ],
    //   projects: [
    //     {
    //       id: 'sub_project1',
    //       title: 'saldo a pagar',
    //       tasks: [
    //         {
    //           id: 'titulo 1',
    //           title: 'Debe 500',
    //           start: new Date('2022-05-18'), //hay que igualar las fechas
    //           end: new Date('2022-05-23'),
    //         },
    //       ],
    //     },
    //   ],
    //   isOpen: true,
    // },
  ];

  return (
    <>
      {initialState.length > 0 && (
        <Gantt
          start={new Date('2022-05-01')} //lo tengo que reemplazar por las fechas del mes en curso o meter un función respecto al día de hoy
          end={new Date('2022-05-31')}
          now={new Date('2022-04-20')}
          zoom={1}
          projects={initialState}
          enableSticky
          scrollToNow
        />
      )}
    </>
  );
}
