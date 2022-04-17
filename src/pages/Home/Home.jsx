import React from 'react';
import FilterBar from '../../components/FilterBar/FilterBar';
import Slider from '../../components/Slider/Slider';
import Reserva from '../Reserva/Reserva';
import styles from './Home.module.css';
export default function Home() {
  return (
    <>
      <main className={styles.home} id="home">
        <Slider />
      </main>
      <div id="form" className={styles.section}></div>
      <section className={styles.section}>
        <FilterBar />
        <Reserva />
      </section>
    </>
  );
}
