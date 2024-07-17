// Home.jsx
// import heroImage from './hero-image.jpg';
import NavBar from "../../components/NavBar/NavBar"
import Register from "../../components/Register/Register"
import Login from "../../components/Login/Login"
import StadiumInfo from "../../components/StadiumInfo/StadiumInfo";
import stadiumsList from "../../helpers/stadiumsList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Home.module.css';
import { useState } from "react";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowRegister(false);
    setShowLogin(true);
    document.body.classList.add(styles.modalOpen);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
    document.body.classList.add(styles.modalOpen);
  };

  const onClose = () => {
    setShowRegister(false);
    setShowLogin(false);
    document.body.classList.remove(styles.modalOpen);
  };

  return (
    <>
      <div className={`${styles.home} ${(showLogin || showRegister) ? styles.blur : ''}`}>
        <NavBar handleLoginClick={handleLoginClick} />
        <div className={styles.heroSection}>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h1 className={styles.heading}>Descubre los mejores estadios de Europa</h1>
            <p className={styles.description}>
              Explora y reserva los estadios más icónicos y emocionantes del continente.
            </p>
            <button className={styles.button}>Reservar ahora</button>
          </div>
          <div className={styles.scrollIndicator}>
            <FontAwesomeIcon icon={faChevronDown} className={styles.scrollIcon} />
          </div>
        </div>
        <div className={styles.stadiumInfo}>
          {stadiumsList.map((stadiumInfo, index) => {
            return <StadiumInfo {...stadiumInfo} key={index} />
          })}
        </div>
      </div>
      {showLogin && <Login handleRegisterClick={handleRegisterClick} onClose={onClose} />}
      {showRegister && <Register handleLoginClick={handleLoginClick} onClose={onClose} />}
    </>
  );
};

export default Home;