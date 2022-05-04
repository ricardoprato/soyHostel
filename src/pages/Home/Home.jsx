import React, { useEffect, useContext } from 'react';
import Slider from '../../components/Slider/Slider';
import Reserva from '../../components/Reserva/Reserva';
import Explore from '../../components/Explore/Explore';
import AboutUs from '../../components/AboutUs/AboutUs';
import ContactUs from '../../components/ContactUs/ContactUs';
import Location from '../../components/Location/Location';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './Home.module.css';
// import Calendar from '../../components/Calendar/Calendar';

export default function Home() {
  const { infoHostel, getInfoHostel } = useContext(GlobalContext);
  useEffect(() => {
    !infoHostel.length && getInfoHostel();
  }, [infoHostel.length]);
  console.log(infoHostel);
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
