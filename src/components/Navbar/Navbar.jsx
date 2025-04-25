import React, {useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
 

const Navbar = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const {user} = useAuth();
  const isAdmin = user?.role === 'ADMIN'
  const id = user?.id;
  // const isAdmin = 'ADMIN';
  const isCustomer = user?.role === 'CUSTOMER'
  // const isCustomer = ''
  const isLoggedIn = user !== null;
    //  const isAdmin = true

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };


  return (
    <>
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
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
          {isAdmin && isLoggedIn && (
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
          isCustomer && isLoggedIn &&(
            <>
            <li className="nav-item">
              <Link className="nav-link" to={`/my-plates/${id}`}>  My plates</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/my-balance/${id}`}>  My Balance</Link>
            </li>
            </>
          )
        }
        </ul>
        <ul className="navbar-nav ms-auto">
        {
          isLoggedIn  ? (
          
              <Link className="nav-link" to=""> Logout <FontAwesomeIcon icon={faSignOutAlt} className="icon logout-icon" /></Link>

          ) : (
            <Link className="nav-link" to=""> Login<FontAwesomeIcon icon={faSignInAlt} className="icon login-icon" /></Link>
          )
        }


        </ul>
        </div>
      
      
      </div>
    </nav>
    </>
    
  )
}

export default Navbar