import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="navbar-btn" to="/">
        Главная
      </Link>
      <Link className="navbar-btn" to="/fhp">
        Любимые герои
      </Link>
    </div>
  );
};

export default Navbar;
