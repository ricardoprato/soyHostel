import { NavLink } from 'react-router-dom';
import styles from './Button.module.css';

// how to use example
//<Button msg="text" link="where" />
//<Button msg="text" funct={() => {}} />
//<Button msg="text" funct={nameFunct}/>

const Button = ({ msg, link, funct, disabled }) => {
  return (
    <>
      {link ? (
        <NavLink to={link}>{msg}</NavLink>
      ) : (
        <button className={styles.button} onClick={funct} disabled={disabled}>
          {msg}
        </button>
      )}
    </>
  );
};
export default Button;
