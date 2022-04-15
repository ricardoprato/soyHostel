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

export default function Slider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={0}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{ delay: 3000 }}
        modules={[FreeMode, Thumbs, Autoplay]}
        className="bg-slider"
      >
        <SwiperSlide>
          <img src="https://www.antiguatilcara.com.ar//image/habitaciones/hostel/habitacion-hostel-01.jpg" />
          <div className="text-content">
            <h2 className="title">
              Lorem <span>Ipsum</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nam
              veniam aliquid soluta a. Temporibus earum a, expedita quisquam id
              dolores quaerat debitis quae itaque, at fugit. Placeat,
              consectetur vel?
            </p>
            <button className="button">
              View Avalaible <i className="bi bi-arrow-right-short"></i>
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://www.antiguatilcara.com.ar/image/fotos/hotel/vista-hotel-antigua-tilcara.jpg" />
          <div className="text-content">
            <h2 className="title">
              Ipsum <span>Dolor</span>
            </h2>
            <p>
              At nisi consequuntur ad voluptatibus.Perspiciatis, veritatis.
              Provident veniam facilis dolore aliquam voluptatum iure mollitia
              repellat voluptas consequatur. Maiores alias neque laboriosam.
              Delectus voluptas rerum blanditiis maiores incidunt natus dolorem,
              autem, earum dolores voluptatibus veniam.
            </p>
            <button className="button">
              View Avalaible <i className="bi bi-arrow-right-short"></i>
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://www.antiguatilcara.com.ar/image/fotos/hotel/pasillo-hotel-antigua-tilcara.jpg" />
          <div className="text-content">
            <h2 className="title">
              Sit <span>Amet</span>
            </h2>
            <p>
              Illum rerum ut ratione cumque ipsum atque veniam eos in
              commodi!Cum earum quia repellat, praesentium autem magnam quaerat
              vel id expedita deleniti, inventore voluptatibus cupiditate in
              dicta omnis, adipisci voluptate sed error! Iusto consequatur
              accusamus reprehenderit quidem officiis deleniti debitis?
            </p>
            <button className="button">
              View Avalaible <i className="bi bi-arrow-right-short"></i>
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://www.antiguatilcara.com.ar/image/fotos/hotel/frase-hotel-antigua-tilcara.jpg" />
          <div className="text-content">
            <h2 className="title">
              Consectetur <span>adipisicing</span>
            </h2>
            <p>
              Laudantium?Voluptate, sequi consequatur. Id ratione numquam
              blanditiis vel impedit harum dolorum saepe unde! At quia excepturi
              quibusdam ex non quas, maiores atque accusantium cum nesciunt
              optio quidem rerum? Similique, eius.
            </p>
            <button className="button">
              View Avalaible <i className="bi bi-arrow-right-short"></i>
            </button>
          </div>
        </SwiperSlide>
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
          <SwiperSlide>
            <img src="https://www.antiguatilcara.com.ar//image/habitaciones/hostel/habitacion-hostel-01.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://www.antiguatilcara.com.ar/image/fotos/hotel/vista-hotel-antigua-tilcara.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://www.antiguatilcara.com.ar/image/fotos/hotel/pasillo-hotel-antigua-tilcara.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://www.antiguatilcara.com.ar/image/fotos/hotel/frase-hotel-antigua-tilcara.jpg" />
          </SwiperSlide>
        </div>
      </Swiper>
    </>
  );
}
