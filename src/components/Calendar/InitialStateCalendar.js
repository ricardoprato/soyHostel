let initialState = [
  // camas o habitaciones
  {
    id: 'proyecto 1',
    title: 'Cama 2', //HabitacionID + CamaID
    tasks: [],
  },
  {
    id: 'proyecto 1',
    title: 'Habitación Privada 2', //HabitacionID + CamaID
    tasks: [],
  },
  {
    id: 'proyecto 1',
    title: 'Cama 2', //HabitacionID + CamaID
    tasks: [],
  },
  {
    id: 'proyecto 1',
    title: 'Cama 2', //HabitacionID + CamaID
    tasks: [],
  },
  {
    id: 'proyecto 1',
    title: 'Cama 2', //HabitacionID + CamaID
    tasks: [],
  },
  {
    id: 'proyecto 1',
    title: 'Cama 2', //HabitacionID + CamaID
    tasks: [],
  },
];

allRooms.forEach((room) => {
  let producto = { id: '', title: '', task: [] };

  if (room.privada == false) {
    room.Camas.forEach((cama) => {
      producto.title = `${room.nombre} - ${cama.id}`; //cama.nombre
      producto.id = cama.id;
      initialState.push(producto);
    });
  } else {
    producto.title = room.nombre;
    producto.id = room.id;
    initialState.push(producto);
  }
});
