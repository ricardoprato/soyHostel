import { NavLink } from 'react-router-dom';

// how to use example
//<Button msg="text" link="where" />
//<Button msg="text" funct={() => {}} />
//<Button msg="text" funct={nameFunct}/>

const Button = ({ msg, link, funct }) => {
  return (
    <>
      {link ? (
        <NavLink to={link}>{msg}</NavLink>
      ) : (
        <button onClick={funct}>{msg}</button>
      )}
    </>
  );
};
export default Button;
