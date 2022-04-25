import { NavLink } from 'react-router-dom';
import { useEffect, useState, useContext, useRef } from 'react';
import styles from './NavBar.module.css';
import { Modal } from '../Modal/Modal';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Avatar from '../Avatar/Avatar';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

const NavBar = () => {
  const [active, setActive] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);
  const { token } = useContext(GlobalContext);
  const header = useRef();
  const lastScrollTop = useRef(0);
  const handleClick = (e) => {
    const target = document.getElementById(e.target.name);
    target.scrollIntoView({ behavior: 'smooth' });
  };
  const [tokencito, setTokencito] = useState('');

  useEffect(() => {
    if (localStorage.getItem('tokenProp')) {
      setTokencito(localStorage.getItem('tokenProp'));
    } else {
      setTokencito('');
    }
    console.log(localStorage.getItem('tokenProp'));
  }, [token]);

  // if (!tokencito.current) {
  //   tokencito.current = null;
  // }
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop === 0) {
      setActive(false);
    } else if (scrollTop > lastScrollTop.current) {
      header.current.style.top = '-200px';
      setActive(true);
    } else {
      header.current.style.top = '0';
    }
    lastScrollTop.current = scrollTop;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // const handleClick = (e) => {
  //   window.localStorage.removeItem('tokenProp');
  //   window.location.reload();
  // };

  return (
    <header
      className={`${styles.header} ${active && styles.sticky}`}
      ref={header}
    >
      <nav className={styles.nav}>
        <NavLink to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 154.87 113"
            className={styles.nav_logo}
          >
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_1-2" data-name="Capa 1">
                <path d="M0,34c0,18.7.2,34,.5,34s6.6-1.5,14.2-3.4,16.4-4,19.6-4.7L40,58.7V0H0Z" />
                <path d="M66,27V54l2.3-.4c3.8-.8,14.9-2.5,23.2-3.6,4.4-.6,9.5-1.3,11.3-1.6l3.2-.5V0H66Z" />
                <path d="M126.82,39.6c-.4.3.3,1.5,1.4,2.6,1.5,1.4,1.7,2.3.9,3.1-1.6,1.6-1.4,9,.3,11.3,1.3,1.6,1.3,2.2,0,4.1-.9,1.4-1,2.4-.4,2.8,1.6,1,4.8-.4,5.5-2.4.4-1.2,2.3-2.1,6.5-2.9,11.2-2.1,15.8-5.9,13.1-11-1.2-2.3-7.9-4.2-14.8-4.2-3.6,0-5.3-.5-6.6-2C131.12,39.1,128,38.3,126.82,39.6Z" />
                <path d="M91,68.5c-5.8,1.9-13.8,4.4-17.7,5.6L66,76.4V113h40V65l-2.2.1C102.52,65.1,96.82,66.7,91,68.5Z" />
                <path d="M21,92.9C-1.48,102,0,101,0,107.5V113H40V99.5c0-10.2-.3-13.5-1.2-13.4C38.12,86.1,30.12,89.1,21,92.9Z" />
              </g>
            </g>
          </svg>
        </NavLink>
        <div className={styles.nav_flex}>
          <button
            className={styles.nav_link}
            onClick={handleClick}
            name="explore"
          >
            <i className="bi bi-compass"></i>
            Explore
          </button>
          <button
            className={styles.nav_link}
            onClick={handleClick}
            name="aboutUs"
          >
            <i className="bi bi-info-circle"></i>
            About Us
          </button>
          <button
            className={styles.nav_link}
            onClick={handleClick}
            name="contactUs"
          >
            <i className="bi bi-envelope"></i>
            Contact US
          </button>
        </div>
        {token || tokencito ? (
          <Avatar />
        ) : (
          <div className={styles.nav_flex}>
            {modalLogin ? (
              <Modal setLocalModal={setModalLogin}>
                <Login />
              </Modal>
            ) : null}
            <button
              className={styles.nav_link}
              onClick={() => setModalLogin(true)}
            >
              <i className="bi bi-user"></i>
              Login
            </button>
            {modalRegister ? (
              <Modal setLocalModal={setModalRegister}>
                <Register />
              </Modal>
            ) : null}
            <button
              className={styles.nav_link}
              onClick={() => setModalRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        <i className={`${styles.icons} bi bi-three-dots-vertical`}></i>
        <i className={`${styles.icons} bi bi-x`}></i>
      </nav>
    </header>
  );
};
export default NavBar;
