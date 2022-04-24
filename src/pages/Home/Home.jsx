import React from 'react';
import FilterBar from '../../components/FilterBar/FilterBar';
import Slider from '../../components/Slider/Slider';
import Reserva from '../../components/Reserva/Reserva';
import styles from './Home.module.css';
import Explore from '../../components/Explore/Explore';
import AboutUs from '../../components/AboutUs/AboutUs';
import ContactUs from '../../components/ContactUs/ContactUs';
export default function Home() {
  return (
    <>
      <main className={styles.home} id="home">
        <Slider />
      </main>
      <section className={styles.section} id="reserva">
        <FilterBar />
        <Reserva />
      </section>
      <section id="explore">
        <Explore />
      </section>
      <section id="aboutUs">
        <AboutUs />
      </section>
      <section id="contactUs">
        <ContactUs />
      </section>
    </>
  );
}
