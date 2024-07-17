import PropTypes from "prop-types";
import styles from "./ActiveBooking.module.css";
import CancelButton from "../CancelButton/CancelButton";

const ActiveBooking = ({ stadium, date, time, status, cancelBooking, id }) => {
  

  return (
    <div className={styles.booking}>
      <div className={styles.bookingInfo}>
        <p className={styles.subtitle}>Estadio: {stadium}</p>
        <p>Fecha: {date}</p>
        <p>Hora: {time}</p>
        <p style={{ color: "#2e8b57" }}>Estado: {status}</p>
      </div>
      <CancelButton id={id} cancelBooking={cancelBooking}/>
    </div>
  );
};

ActiveBooking.propTypes = {
  id: PropTypes.string.isRequired,
  stadium: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  cancelBooking: PropTypes.func.isRequired

}

export default ActiveBooking;