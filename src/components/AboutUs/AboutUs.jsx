import React from 'react';
import styles from '../AboutUs/AboutUs.module.css';
import aboutus from '../../Images/aboutus.jpg';

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p className={styles.parrafo}>
          SoyHostel was created in 1890 by a young couple, at that time it was
          not much more than a simple cabin with 3 rooms, over time there were
          so many guests that SoyHostel was enlarged and implemented more rooms,
          today who manage this beautiful hostel they are the grandchildren of
          that beautiful young couple.
        </p>
        <img className={styles.img} src={aboutus} alt="Imagen de un living" />
      </div>
    </div>
  );
};

export default AboutUs;
