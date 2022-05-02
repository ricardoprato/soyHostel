import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Carousel.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

const Carousel = ({ images }) => {
  console.log(images);
  return (
    <div className="div_carousel">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="img-slider"
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.imagen} alt="carousel" />
            {item.descripcion ? (
              <div className="info">
                <p>{item.descripcion}</p>
              </div>
            ) : null}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Carousel;
