import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink className="navbar-btn" to="/">
        Главная
      </NavLink>
      <NavLink className="navbar-btn" to="/fhp">
        Любимые герои
      </NavLink>
    </div>
  );
};

export default Navbar;
