import styles from './NavBar.module.css';
import logoImage from '/images/logotipo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Navbar = ({ handleLoginClick, handleLogoutClick }) => {
  const user = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src={logoImage} alt="Logo" className={styles.logo} />
      </Link>
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
        <li>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        {user.name && (
          <li>
            <Link to="/myBookings" className={styles.navLink}>
              My Bookings
            </Link>
          </li>
        )}
        <li>
          <Link to="#" className={styles.navLink}>
            About Us
          </Link>
        </li>
        <li>
          <Link to="#" className={styles.navLink}>
            Contact
          </Link>
        </li>
      </ul>
      <div className={styles.userIcon} onClick={toggleDropdown}>
        {user.name ? (
          <img src="/images/perfil.png" alt="User Profile" className={styles.imgUser} />
        ) : (
          <FontAwesomeIcon icon={faUser} className={styles.icon} onClick={handleLoginClick} />
        )}
        {user.name && (
          <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : ''}`}>
            <Link to="/" className={styles.dropdownItem} onClick={handleLogoutClick}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  handleLoginClick: PropTypes.func.isRequired,
  handleLogoutClick: PropTypes.func.isRequired,
};

export default Navbar;