import PropTypes from "prop-types";
import styles from "./CancelledBooking.module.css";
import DeleteButton from "../DeleteButton/DeleteButton";

const CancelledBooking = ({ stadium, date, time, status, deleteBooking, id }) => {
  return (
    <div className={styles.booking}>
      <div className={styles.bookingInfo}>
        <p className={styles.subtitle}>Estadio: {stadium}</p>
        <p>Fecha: {date}</p>
        <p>Hora: {time}</p>
        <p style={{ color: "indianred" }}>Estado: {status}</p>
      </div>
      <DeleteButton id={id} deleteBooking={deleteBooking} />
    </div>
  );
};

CancelledBooking.propTypes = {
  id: PropTypes.string.isRequired,
  stadium: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  deleteBooking: PropTypes.func.isRequired

}

export default CancelledBooking