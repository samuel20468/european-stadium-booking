// CreateBooking.jsx
import { useEffect, useState } from 'react';
import styles from './CreateBooking.module.css';
import PropTypes from "prop-types";
import axios from 'axios';
import validateBooking from "../../helpers/validations/validateBooking";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { addBooking } from '../../redux/reducer';

const CreateBooking = ({ onClose }) => {
  const MySwal = withReactContent(Swal);

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const user_id = user.id

  const [dataForm, setDataForm] = useState({
    stadium: "",
    date: "",
    time: ""
  });

  const [inputErrors, setInputErrors] = useState({
    stadium: "",
    date: "",
    time: ""
  })

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const hasEmptyFields = Object.values(dataForm).some((value) => value === "");
    setIsButtonDisabled(hasEmptyFields);
  }, [dataForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataForm({
      ...dataForm,
      [name]: value
    });

    const errors = validateBooking(name, value);
    setInputErrors({
      ...inputErrors,
      [name]: errors[name]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateBooking("date", dataForm.date);
    errors.time = validateBooking("time", dataForm.time).time;
    errors.stadium = validateBooking("stadium", dataForm.stadium).stadium;

    inputErrors.stadium = errors.stadium;

    setInputErrors(errors);

    const checkErrors = Object.values(inputErrors).every(error => error === "" || error == undefined);

    if (checkErrors) {
      try {
        const API = "http://localhost:3000/bookings/booking/schedule";
        const response = await axios.post(API, { ...dataForm, user_id });
        dispatch(addBooking(response.data));

        MySwal.fire({
          icon: "success",
          title: "Todo correcto!",
          text: "Reserva creada con éxito",
          confirmButtonColor: "forestgreen"
        });
      } catch (error) {
        console.error(error);
      }
      onClose();
    } else {
      const errorMessages = Object.entries(inputErrors)
        .filter(([, value]) => value !== "" && value !== undefined)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");

      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: `El formulario tiene campos con errores:\n ${errorMessages}`,
        confirmButtonColor: 'indianred'
      });
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Nueva Reserva</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="date" className={styles.label}>
              Fecha
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={dataForm.date}
              onChange={handleChange}
              className={`${styles.input} ${styles.dateTime}`}
            />
            {inputErrors.date && <p className={styles.textDanger}>{inputErrors.date}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="time" className={styles.label}>
              Hora
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={dataForm.time}
              onChange={handleChange}
              className={`${styles.input} ${styles.dateTime}`}
            />
            {inputErrors.time && <p className={styles.textDanger}>{inputErrors.time}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="stadium" className={styles.label}>
              Estadio
            </label>
            <select
              id="stadium"
              name="stadium"
              value={dataForm.stadium}
              onChange={handleChange}
              className={styles.select}
            >
              <optgroup label="Selecciona un estadio">
                <option value="Anfield">Anfield Stadium</option>
                <option value="Santiago Bernabéu">Santiago Bernabéu Stadium</option>
                <option value="Alianz Arena">Alianz Arena Stadium</option>
                <option value="Parc des Princes">Parc des Princes Stadium</option>
              </optgroup>
            </select>
            {inputErrors.stadium && <p className={styles.textDanger}>{inputErrors.stadium}</p>}
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={`${styles.button} ${styles.submit}`} disabled={isButtonDisabled}>
              Reservar
            </button>
            <button type="button" className={`${styles.button} ${styles.cancel}`} onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateBooking.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default CreateBooking;