import React from 'react';
import FilterBar from '../../components/FilterBar/FilterBar';
import Slider from '../../components/Slider/Slider';
import Reserva from '../../components/Reserva/Reserva';
import styles from './Home.module.css';
export default function Home() {
  return (
    <>
      <main className={styles.home} id="home">
        <Slider />
      </main>
      <section className={styles.section} id="form">
        <FilterBar />
        <Reserva />
      </section>
    </>
  );
}
