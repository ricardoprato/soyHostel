import styles from './Location.module.css';
const Location = () => {
  return (
    <iframe
      className={styles.location}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2446.519058415656!2d-57.016805949001714!3d-37.32491925640359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959b5dd0fa54eaf1%3A0x745b63779392e329!2sMar%20de%20las%20Pampas%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses!2sve!4v1651449296248!5m2!1ses!2sve"
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};
export default Location;
