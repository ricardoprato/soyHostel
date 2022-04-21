[...state]

reservations?.forEach((reserva) => { 
  if (reserva?.Habitacions.length > 0) {
    reserva.Habitacions.forEach((habitacion) => {
      state.forEach(producto => {
        if (producto.id == habitacion.id) {
         let element = {
            id: reserva.id,
            title: `${reserva.Usuario.nombre
          } ${reserva.Usuario.apellido
          }`,
            start: new Date(`${reserva.fecha_ingreso}`),
            end:new Date(`${reserva.fecha_egreso}`),
          }
          producto.tasks.push(element)
          
        }
      })

  })
  }
  else if (reserva?.Camas.length > 0) {
        reserva.Camas.forEach((cama) => {
      state.forEach(producto => {
        if (producto.id == cama.id) {
         let element = {
            id: reserva.id,
            title: `${reserva.Usuario.nombre
          } ${reserva.Usuario.apellido
          }`,
            start: new Date(`${reserva.fecha_ingreso}`),
            end:new Date(`${reserva.fecha_egreso}`),
          }
          producto.tasks.push(element)
          
        }
      })

  })


  }

}) 

[
  {
    id: '6a5b5fd1-e9dc-4849-af35-79378b938ea4',
    fecha_ingreso: '2022-11-01',
    fecha_egreso: '2022-11-11',
    saldo: 600,
  UsuarioDni: '34592295',
    Usuario: {
          dni: '34592295',
          nombre: 'toni',
          apellido: 'tralice',
        },
    Habitacions: [
      {
        id: 1,
        nombre: 'presidencial',
        comodidades: 'cocina',
        descripcion: 'habitacion gigante',
        cantCamas: 3,
        privada: true,
        precio: null,
        banoPrivado: true,
        createdAt: '2022-04-19T20:20:32.935Z',
        Reserva_Habitacion: {
          createdAt: '2022-04-19T21:08:44.227Z',
          updatedAt: '2022-04-19T21:08:44.227Z',
          ReservaId: '6a5b5fd1-e9dc-4849-af35-79378b938ea4',
          HabitacionId: 1,
        },
      },
    ],
    Camas: [
      {
        id: '921b0051-79ce-4ae4-ba24-eea39e614323',
        precio: 500,
        estado: 'libre',
        HabitacionId: 2,
        HuespedId: null,
        Reserva_Cama: {
          createdAt: '2022-04-19T21:08:44.225Z',
          updatedAt: '2022-04-19T21:08:44.225Z',
          ReservaId: '6a5b5fd1-e9dc-4849-af35-79378b938ea4',
          CamaId: '921b0051-79ce-4ae4-ba24-eea39e614323',
        },
      },
    ],
  },
  {
    id: '36c13d90-8ccf-4d43-8420-251d8c549bef',
    fecha_ingreso: '2022-10-01',
    fecha_egreso: '2022-11-11',
    saldo: 2600,
    UsuarioDni: '3459295',
    Habitacions: [
      {
        id: 1,
        nombre: 'presidencial',
        comodidades: 'cocina',
        descripcion: 'habitacion gigante',
        cantCamas: 3,
        privada: true,
        precio: null,
        banoPrivado: true,
        createdAt: '2022-04-19T20:20:32.935Z',
        Reserva_Habitacion: {
          createdAt: '2022-04-20T16:06:28.195Z',
          updatedAt: '2022-04-20T16:06:28.195Z',
          ReservaId: '36c13d90-8ccf-4d43-8420-251d8c549bef',
          HabitacionId: 1,
        },
      },
      {
        id: 5,
        nombre: 'messi',
        comodidades: 'cocina',
        descripcion:
          'habitacion giganteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        cantCamas: 5,
        privada: true,
        precio: null,
        banoPrivado: true,
        createdAt: '2022-04-20T15:59:33.230Z',
        Reserva_Habitacion: {
          createdAt: '2022-04-20T16:06:28.197Z',
          updatedAt: '2022-04-20T16:06:28.197Z',
          ReservaId: '36c13d90-8ccf-4d43-8420-251d8c549bef',
          HabitacionId: 5,
        },
      },
    ],
    Camas: [
      {
        id: 'e0b0ecef-40f6-48b9-92f9-9d19faa23ce5',
        precio: 200,
        estado: 'libre',
        HabitacionId: 6,
        HuespedId: null,
        Reserva_Cama: {
          createdAt: '2022-04-20T16:06:28.194Z',
          updatedAt: '2022-04-20T16:06:28.194Z',
          ReservaId: '36c13d90-8ccf-4d43-8420-251d8c549bef',
          CamaId: 'e0b0ecef-40f6-48b9-92f9-9d19faa23ce5',
        },
      },
      {
        id: '921b0051-79ce-4ae4-ba24-eea39e614323',
        precio: 500,
        estado: 'libre',
        HabitacionId: 2,
        HuespedId: null,
        Reserva_Cama: {
          createdAt: '2022-04-20T16:06:28.191Z',
          updatedAt: '2022-04-20T16:06:28.191Z',
          ReservaId: '36c13d90-8ccf-4d43-8420-251d8c549bef',
          CamaId: '921b0051-79ce-4ae4-ba24-eea39e614323',
        },
      },
    ],
  },
];
