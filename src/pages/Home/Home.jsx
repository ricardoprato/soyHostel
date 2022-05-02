import React, { useEffect, useRef } from 'react';
import Slider from '../../components/Slider/Slider';
import Reserva from '../../components/Reserva/Reserva';
import Explore from '../../components/Explore/Explore';
import AboutUs from '../../components/AboutUs/AboutUs';
import ContactUs from '../../components/ContactUs/ContactUs';
import Location from '../../components/Location/Location';
import styles from './Home.module.css';
// import Calendar from '../../components/Calendar/Calendar';

export default function Home() {
  return (
    <>
      <main className={styles.home} id="home">
        <Slider />
      </main>
      <article className={styles.article}>
        <Reserva />
        <Explore />
        <AboutUs />
        <ContactUs />
        <Location />
      </article>
    </>
  );
}
