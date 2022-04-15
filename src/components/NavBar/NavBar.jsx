import { NavLink } from 'react-router-dom';
import Logo from '../../Images/index.png';
import styles from './NavBar.module.css';
// import Button from '../Button/Button';

const NavBar = () => {
  return (
    <nav className={styles.navcont}>
      <a className={styles.logo} href="/">
        <img className={styles.logo} src={Logo} alt="Img.png" />
      </a>
      <div className={styles.buttonsleft}>
        <NavLink className={styles.aboutUs} to="#">
          About Us
        </NavLink>
        {/* <Button msg="About Us" link="/" /> */}
        <NavLink className={styles.contactUS} to="#">
          Contact US
        </NavLink>
      </div>
      <div className={styles.buttonsright}>
        <NavLink className={styles.login} to="#">
          Login
        </NavLink>
        <NavLink className={styles.register} to="#">
          Register
        </NavLink>
      </div>
    </nav>
  );
};
export default NavBar;
