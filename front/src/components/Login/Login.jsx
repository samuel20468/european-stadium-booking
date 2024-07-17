import CloseButton from "../CloseButton/CloseButton";
import styles from "./Login.module.css"; // Importa los estilos CSS Modules
import PropTypes from "prop-types";
import validateLogin from "../../helpers/validations/validateLogin"
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { addUser } from "../../redux/reducer";
import { useNavigate } from "react-router-dom";

// Componente de formulario de login

const Login = ({ handleRegisterClick, onClose }) => {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();
  const user = useSelector( state => state.user);

  useEffect(() => {
    user.name && navigate("/")
  }, [])

  const dispatch = useDispatch();

  const [dataForm, setDataForm] = useState({
    username: "",
    password: ""
  })

  const [inputErrors, setInputErrors] = useState({
    username: "",
    password: ""
  })

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
    setInputErrors({
      ...inputErrors,
      [name]: validateLogin({ [name]: value })[name]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInputErrors(validateLogin(dataForm));
    setIsButtonDisabled(true);
    
    const checkErrors = Object.values(inputErrors).every(error => error === "" || error == undefined);


    if (checkErrors) {
      try {
        const API = "http://localhost:3000/users/login";
        const response = await axios.post(API, dataForm);
        console.log(response.data.user);
        dispatch(addUser(response.data.user));
        onClose();
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
          confirmButtonColor: 'indianred'
        });
      }
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "El formulario tiene campos con errores, revisalos",
        confirmButtonColor: 'indianred'
      });
    }
  };



  return (
    <div className={styles.loginBox}>
      <p>Login</p>
      <CloseButton onClose={onClose} />
      <form onSubmit={handleSubmit}>
        <div className={styles.userBox}>
          <input name="username" type="text" value={dataForm.username} onChange={handleChange} />
          {inputErrors.username && <p className={styles.textDanger}>{inputErrors.username}</p>}
          <label>Username</label>
        </div>
        <div className={styles.userBox}>
          <input name="password" type="password" value={dataForm.password} onChange={handleChange} />
          {inputErrors.password && <p className={styles.textDanger}>{inputErrors.password}</p>}
          <label>Password</label>
        </div>
        <button type="submit" disabled={isButtonDisabled}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
      </form>
      <p>¿No tienes cuenta? <a role="button" className={styles.a2} onClick={handleRegisterClick}>Registrate</a></p>
    </div>
  );
};

Login.propTypes = {
  handleRegisterClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Login;
