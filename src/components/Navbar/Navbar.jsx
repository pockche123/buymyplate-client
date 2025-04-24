import React, {useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const {user} = useAuth();
  const isAdmin = user?.role === 'ADMIN'
  // const isAdmin = 'ADMIN';
  const isCustomer = user?.role === 'CUSTOMER'
  const isLoggedIn = user !== null;
    //  const isAdmin = true

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };


  return (
    <>
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="#">BuyMyPlate</a>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar}
        aria-controls="navbarText"
        aria-expanded={!isNavbarCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
          <Link className="nav-link" to="/">Home</Link>
          </li>
          {isAdmin &&(
            <>
          <li className="nav-item">
          <Link className="nav-link" to="/register-plate">Register Plate </Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" to="/transactions">Transactions</Link>
          </li>
          </>
          )
        }
        {
          isCustomer && (
            <>
            <li className="nav-item">
              <Link className="nav-link" to="/my-plates">My plates</Link>
            </li>
            </>
          )
        }
        </ul>
        {/* <span className="navbar-text">
          Navbar text with an inline element
        </span> */}
      </div>
    </nav>
    </>
    
  )
}

export default Navbar