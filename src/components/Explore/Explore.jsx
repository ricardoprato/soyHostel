import React, { useRef, useEffect } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import styles from '../Explore/Explore.module.css';
import explore1 from '../../Images/explore1.jpg';
import explore2 from '../../Images/explore2.jpg';
import explore3 from '../../Images/explore3.jpg';
import explore4 from '../../Images/explore4.jpg';
import explore5 from '../../Images/explore5.jpg';
import hotel from '../../Images/slashes.png';
// <img className={styles.img} src={explore1} alt="Imagen con montaña" />
// <p>This is a beautiful close up view of where it is located our hostel</p>
// <img className={styles.img} src={explore2} alt="Imagen con laberinto" />
// <p>
//   This is called the labyrinth of mysteries, located 1km from our hotel
// </p>
// <img className={styles.img} src={explore3} alt="Imagen con telefericos" />
// <p>At about 5km you can find the incredible cable cars</p>
// <img className={styles.img} src={explore4} alt="Imagen del hostel" />
// <p>This is our hostel at night</p>
// <img className={styles.img} src={explore5} alt="Imagen en un bote" />
// <p>Tourist attraction to enter the falls</p>
const img1 = {
  id: 0,
  imagen: explore1,
  descripcion:
    'Thi is a beautiful close up view of where it is located our hostels',
};
const img2 = {
  id: 1,
  imagen: explore2,
  descripcion:
    'This is called the labyrinth of mysteries, located 1km from our hotel',
};
const img3 = {
  id: 2,
  imagen: explore3,
  descripcion: 'At about 5km you can find the incredible cable cars',
};
const img4 = {
  id: 3,
  imagen: explore4,
  descripcion: 'This is our hostel at night',
};
const img5 = {
  id: 4,
  imagen: explore5,
  descripcion: 'Tourist attraction to enter the falls',
};

const Explore = () => {
  const divImage = useRef();
  useEffect(() => {
    divImage.current.style.backgroundImage = `url(${hotel})`;
    divImage.current.style.backgroundPosition = window.scrollY * 0.5 + 'px';
  }, [divImage]);
  return (
    <>
      <div className={styles.divRelative}>
        <div className={styles.parallax} ref={divImage}></div>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Explore, Enjoy & have fun with your family
          </h2>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nemo
            veniam rerum facere libero asperiores placeat, accusantium omnis vel
            consequatur atque aperiam eum officia quas soluta commodi quos
            harum. Ut!
          </p>
        </div>
        <div className={styles.container} id="explore">
          <Carousel images={[img1, img2, img3, img4, img5]} />
        </div>
      </div>
    </>
  );
};

export default Explore;
