import { NavLink } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import styles from './ReceptionNavBar.module.css';
import Avatar from '../Avatar/Avatar';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import { Modal } from '../Modal/Modal';
import CreateRoom from '../RoomsAdmin/CreateRoom';
import DeleteEditRoom from '../RoomsAdmin/ListRooms';
import BookingFromReception from '../BookingFromReception/BookingFromReception';
import CreateAdminReceptionist from '../RegisterForAdmin/RegisterForAdmin';
import swal from 'sweetalert2';

const ReceptionNavBar = ({ children }) => {
  const [active, setActive] = useState(false);
  const { rol } = useContext(GlobalContext);
  let token = window.localStorage.getItem('tokenProp');
  if (!token) {
    token = null;
  }
  const [localModalCreateRoom, setLocalModalCreateRoom] = useState(false);
  const [localModalDeleteEditRoom, setLocalModalDeleteEditRoom] =
    useState(false);
  const [
    localModalCreateAdminReceptionist,
    setLocalModalCreateAdminReceptionist,
  ] = useState(false);
  const [localModalCreateBooking, setLocalModalCreateBooking] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const [input, setInput] = useState({
    name: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput({ name: '' });
    if (!input.name.trim()) {
      return swal('please input a name');
    }
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
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
    <>
      <header className={`${styles.header} ${active}`}>
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
          {rol === 'administrador' ? (
            <>
              <button
                className={styles.nav_link}
                onClick={() => setLocalModalCreateRoom((prev) => !prev)}
              >
                <i className="bi bi-envelope"></i>
                Create Room
              </button>
              <button
                className={styles.nav_link}
                onClick={() => setLocalModalDeleteEditRoom((prev) => !prev)}
              >
                <i className="bi bi-info-circle"></i>
                Delete/Edit Room
              </button>
              <button
                className={styles.nav_link}
                onClick={() =>
                  setLocalModalCreateAdminReceptionist((prev) => !prev)
                }
              >
                <i className="bi bi-envelope"></i>
                Create Admin/Receptionist
              </button>
            </>
          ) : null}
          <button
            className={styles.nav_link}
            onClick={() => setLocalModalCreateBooking(!localModalCreateBooking)}
          >
            <i className="bi bi-compass"></i>
            Create booking
          </button>

          <div className={styles.nav_flex}>
            <Avatar />
          </div>
          <i className={`${styles.icons} bi bi-three-dots-vertical`}></i>
          <i className={`${styles.icons} bi bi-x`}></i>
        </nav>
      </header>
      {!!localModalCreateBooking && (
        <Modal setLocalModal={setLocalModalCreateBooking}>
          <BookingFromReception />
        </Modal>
      )}
      {!!localModalCreateAdminReceptionist && (
        <Modal setLocalModal={setLocalModalCreateAdminReceptionist}>
          <CreateAdminReceptionist
            modalExterno={setLocalModalCreateAdminReceptionist}
          />
        </Modal>
      )}
      {!!localModalDeleteEditRoom && (
        <Modal setLocalModal={setLocalModalDeleteEditRoom}>
          <DeleteEditRoom />
        </Modal>
      )}
      {!!localModalCreateRoom && (
        <Modal setLocalModal={setLocalModalCreateRoom}>
          <div className={styles.CreateRoom}>
            <CreateRoom />
          </div>
        </Modal>
      )}
      {children}
    </>
  );
};

export default ReceptionNavBar;
