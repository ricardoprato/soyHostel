import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay';
import './Slider.css';
// import required modules
import { Autoplay, FreeMode, Thumbs } from 'swiper';

export default function Slider({ images }) {
  // console.log(images);
  const form = document.querySelector('#form');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const handleClick = () => form.scrollIntoView({ behavior: 'smooth' });
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={0}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[FreeMode, Thumbs, Autoplay]}
        className="bg-slider"
      >
        {images?.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.url} alt="slider" />
            <div className="text-content">
              <h2 className="title">{item.title}</h2>
              <p>{item.description}</p>
              <button className="button" onClick={handleClick}>
                View Avalaible <i className="bi bi-arrow-right-short"></i>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={0}
        slidesPerView={0}
        modules={[FreeMode, Thumbs, Autoplay]}
        className="bg-slider-thumbs"
      >
        <div className="thumbs-container">
          {images?.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.url} alt="slider" />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
}
