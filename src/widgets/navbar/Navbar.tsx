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
      <div className="navbar-search">
        <input
          type="text"
          className="navbar-search"
          placeholder="Введите имя героя"
        />
        <button>Искать</button>
      </div>
    </div>
  );
};

export default Navbar;
