import { useEffect } from 'react';
import './Carousel.css';
import autoSlider from './util';
const Carousel = ({ images }) => {
  console.log(images);
  useEffect(() => {
    autoSlider();
  }, []);
  return (
    <>
      <div className="img-slider">
        {images.map((item, index) => {
          return (
            <>
              <div className={`slide ${!index ? 'active' : ''}`} key={item.id}>
                <img src={item?.imagen} alt="img" />
                <div className="info">
                  {item?.nombre && <h2>{item.nombre}</h2>}
                  {item?.descripcion && <p>{item.descripcion}</p>}
                </div>
              </div>
            </>
          );
        })}
        <div className="navigation">
          {images.map((item, index) => (
            <div
              className={`btn ${!index ? 'active' : ''}`}
              key={item.id}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
