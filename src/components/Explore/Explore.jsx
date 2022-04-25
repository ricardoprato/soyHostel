import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import styles from '../Explore/Explore.module.css';
import explore1 from '../../Images/explore1.jpg';
import explore2 from '../../Images/explore2.jpg';
import explore3 from '../../Images/explore3.jpg';
import explore4 from '../../Images/explore4.jpg';
import explore5 from '../../Images/explore5.jpg';

const Explore = () => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={explore1} alt="Imagen con montaña" />
      <p>This is a beautiful close up view of where it is located our hostel</p>
      <img className={styles.img} src={explore2} alt="Imagen con laberinto" />
      <p>
        This is called the labyrinth of mysteries, located 1km from our hotel
      </p>
      <img className={styles.img} src={explore3} alt="Imagen con telefericos" />
      <p>At about 5km you can find the incredible cable cars</p>
      <img className={styles.img} src={explore4} alt="Imagen del hostel" />
      <p>This is our hostel at night</p>
      <img className={styles.img} src={explore5} alt="Imagen en un bote" />
      <p>Tourist attraction to enter the falls</p>
    </div>
    // <Carousel images={[explore5, explore4, explore3, explore2, explore1]} />
  );
};

export default Explore;
