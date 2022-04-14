import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const ContextProvider = (props) => {
  let mock = [
    {
      roomId: 1,
      bedPrice: 400,
      bedsAvailable: 10,
      roomName: 'Gotzilla',
      image: 'https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/03/freehand.jpg',
      description:
        'This is the hostels biggest room. It has 10 beds, each with its own locker and small light. It has a big window this an ocean view.',
      bathroom: false,
      private: false,
    },
    {
      roomId: 2,
      bedPrice: 650,
      bedsAvailable: 3,
      roomName: 'Ratatouille',
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhu6nVyjLiJZqi3MbtLvvdEZlbYRMYvDcCww&usqp=CAU',
      description: 'This is the smallest dorm on the hostel. Only for 3 people, ideal for small friends group or even a couple with a kid.',
      bathroom: true,
      private: false,
    },
    {
      roomId: 3,
      bedPrice: 650,
      bedsAvailable: 2,
      roomName: 'Swite',
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/06/3e/92/2c/hotel-california-bandung.jpg',
      description: 'Our One Bedroom Suite (72m2) was designed in a resort style, providing the comfort and feel of a resort with teak wood furniture and chic white marble bathroom.',
      bathroom: true,
      private: true,
    },
    {
      roomId: 4,
      bedPrice: 500,
      bedsAvailable: 6,
      roomName: 'Average',
      image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.afersurf.com/wp-content/uploads/2019/03/6bed1.jpg',
      description: 'Normal dorm with 6 beds, personal lockers, sealing fan, mosquito net and a private bathroom. Close to the bar.',
      bathroom: true,
      private: false,
    },
    {
      roomId: 5,
      bedPrice: 700,
      bedsAvailable: 4,
      roomName: 'Family',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvLgATHRBwenxFd8W8bmm_AM8_Z1IRdgXFaC24Ge4qvo_GmJUGRz4R7-T6lSLz9kSby3g&usqp=CAU',
      description: 'Perfect private room for a couple with 1 or 2 kids. It has a queen size bed and 2 small ones in anothes room. Big onswit bathroom.',
      bathroom: true,
      private: true,
    },
  ];

  const [filterDates, setFilterdates] = useState({
    checkIn: '',
    checkOut: '',
  });

  const [cart, setCart] = useState([]);
  const [filteredAvailableBeds, setFilteredAvailableBeds] = useState(mock);
  const [availableBeds, setAvailablebeds] = useState(mock);
  const [openModal, setOpenModal] = useState(false);

  const getFilteredBeds = (checkIn, checkOut) => {
    fetch(
      'algun endpoint donde le ensarte la globalDate`${checkIn} ${checkOut}`'
    )
      .then((response) => response.json())
      .then((data) => {
        setAvailablebeds(data);
        setFilteredAvailableBeds(data);
      })
      .catch((err) => {
        if (err.response) {
          const { response } = err;
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        }
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        filterDates,
        setFilterdates,
        availableBeds,
        setAvailablebeds,
        cart,
        setCart,
        filteredAvailableBeds,
        setFilteredAvailableBeds,
        getFilteredBeds,
        openModal,
        setOpenModal,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
