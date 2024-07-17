// StadiumInfo.jsx
import PropTypes from "prop-types";
import styles from "./StadiumInfo.module.css";

const StadiumInfo = ({ image, title, description, countryImage, teamImage }) => {
  return (
    <div className={styles.stadiumInfo}>
      <div className={styles.flagContainer}>
        <img src={countryImage} alt={`Bandera de país`} className={styles.flag} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <img src={image} alt="Estadio" className={styles.image} />
        <p className={styles.description}>{description}</p>
        <div className={styles.teamContainer}>
          <img src={teamImage} alt={`Escudo de equipo`} className={styles.teamLogo} />
        </div>
      </div>
    </div>
  );
};

StadiumInfo.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  countryImage: PropTypes.string.isRequired,
  teamImage: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default StadiumInfo;