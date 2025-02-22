import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">Movie Watchlist</Link>
        <div className="ms-auto">
          <Link to="/add" className="nav-link text-white">Add Movie</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
