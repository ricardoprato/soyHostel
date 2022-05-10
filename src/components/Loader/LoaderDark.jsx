import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <span className={styles.barDark}></span>
        <span className={styles.barDark}></span>
        <span className={styles.barDark}></span>
      </div>
    </div>
  );
};

export default Loader;
