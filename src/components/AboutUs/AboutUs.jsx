import React, { useRef, useEffect } from 'react';
import styles from '../AboutUs/AboutUs.module.css';
import aboutus from '../../Images/aboutus.jpg';

const AboutUs = () => {
  const divImage = useRef();
  useEffect(() => {
    divImage.current.style.backgroundImage = `url(${aboutus})`;
  }, [divImage]);

  return (
    <div className={styles.container} id="aboutUs">
      <div className={styles.parallax} ref={divImage}></div>
      <div className={styles.header}>
        <h2 className={styles.title}>About Us</h2>
      </div>
      <div className={styles.box}>
        <p className={styles.main}>
          <span className={styles.mainStrong}>
            SoyHostel was created in 1890{' '}
          </span>
          by a young couple
        </p>
        <p className={styles.parrafo}>
          At that time it was not much more than a simple cabin with 3 rooms,
          over time there were so many guests that SoyHostel was enlarged and
          implemented more rooms, today who manage this beautiful hostel they
          are the grandchildren of that beautiful young couple.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
