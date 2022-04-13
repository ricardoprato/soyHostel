import { NavLink } from 'react-router-dom';
const NavBar = (...arg) => {
  return (
    <nav>
      <NavLink to="#">Home</NavLink>
      <NavLink to="#">About Us</NavLink>
      <NavLink to="#">Contact US</NavLink>
    </nav>
  );
};
export default NavBar;
