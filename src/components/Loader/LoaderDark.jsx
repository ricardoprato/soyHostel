import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderDark}>
      <span className={styles.barDark}></span>
      <span className={styles.barDark}></span>
      <span className={styles.barDark}></span>
    </div>
  );
};

export default Loader;
