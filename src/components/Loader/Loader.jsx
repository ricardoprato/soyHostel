import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </div>
  );
};

export default Loader;
