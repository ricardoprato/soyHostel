import React from 'react';
import Slider from '../../components/Slider/Slider';
import styles from './Home.module.css';
export default function Home() {
  return (
    <>
      <main className={styles.home}>
        <Slider />
      </main>
    </>
  );
}
