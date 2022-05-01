import React from 'react';
import FilterBar from '../../components/FilterBar/FilterBar';
import Slider from '../../components/Slider/Slider';
import Reserva from '../../components/Reserva/Reserva';
import styles from './Home.module.css';
import Explore from '../../components/Explore/Explore';
import AboutUs from '../../components/AboutUs/AboutUs';
import ContactUs from '../../components/ContactUs/ContactUs';
// import Calendar from '../../components/Calendar/Calendar';

export default function Home() {
  return (
    <>
      <main className={styles.home} id="home">
        <Slider />
      </main>
      <article className={styles.article}>
        <FilterBar />
        <Reserva />
        <Explore />
        <AboutUs />
        <ContactUs />
      </article>
    </>
  );
}
