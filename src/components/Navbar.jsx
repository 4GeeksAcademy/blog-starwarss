import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store } = useGlobalReducer();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="glitch-text" style={{color: '#FFE81F', fontSize: '1.5rem'}}>
            Star Wars 
          </span>
        </Link>
        <div className="ms-auto">
          <Link to="/favorites" className="text-decoration-none">
            <button className="btn btn-outline-warning position-relative">
              Favorites 
              <span className="badge bg-danger ms-2 rounded-circle">
                {store.favorites.length}
              </span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};