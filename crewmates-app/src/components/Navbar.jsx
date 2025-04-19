import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/pokeball.png" alt="Pokéball" className="navbar-logo" />
        <Link to="/summary" className="navbar-title">Pokémon Team Builder</Link>
      </div>
      <div className="navbar-links">
        <Link to="/create">Create</Link>
        <Link to="/summary">Summary</Link>
      </div>
    </nav>
  );
};

export default Navbar;
