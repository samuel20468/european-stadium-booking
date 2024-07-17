// Register.jsx
import { useEffect, useState } from "react";
import CloseButton from "../CloseButton/CloseButton";
import styles from "./Register.module.css";
import PropTypes from "prop-types";
import validateRegister from "../../helpers/validations/validateRegister";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = ({ handleLoginClick, onClose }) => {
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();
  const user = useSelector( state => state.user);

  useEffect(() => {
    user.name && navigate("/")
  }, [])

  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    nDni: ""
  })

  const [inputErrors, setInputErrors] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    nDni: ""
  })

  const [passwordStrength, setPasswordStrength] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const { password, confirmPassword } = dataForm;

    if (password.length > 0) {
      if (password.length < 5) {
        setPasswordStrength("La contraseña es insegura");
      } else if (password.length < 8) {
        setPasswordStrength("La contraseña es débil");
      } else {
        setPasswordStrength("La contraseña es segura");
      }
    } else {
      setPasswordStrength("");
    }

    if (confirmPassword && confirmPassword !== password) {
      setInputErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Las contraseñas no coinciden",
      }));
    } else {
      setInputErrors((prevState) => ({
        ...prevState,
        confirmPassword: "",
      }));
    }

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
      [name]: validateRegister({ [name]: value })[name]
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const errors = validateRegister(dataForm);
    if (!dataForm.password) {
      errors.password = "La contraseña es obligatoria";
    }
    setInputErrors({...errors, confirmPassword: inputErrors.confirmPassword});
    setIsButtonDisabled(true);

    const checkErrors = Object.values(inputErrors).every(error => error === "" || error == undefined);

    const checkPassword = passwordStrength === "La contraseña es segura"

    if (checkErrors && checkPassword) {
      try {
        const API = "http://localhost:3000/users/register";
        
        delete dataForm.confirmPassword;
        const response = await axios.post(API, dataForm);
        const Toast = MySwal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", MySwal.stopTimer);
            toast.addEventListener("mouseleave", MySwal.resumeTimer);
          },
        });

        await Toast.fire({
          icon: "success",
          title: "Usuario registrado correctamente",
        });
        console.log(response.data);
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
    <div className={styles.registerBox}>
      <p>Register</p>
      <CloseButton onClose={onClose} />
      <form onSubmit={handleSubmit}>
        <div className={styles.userBox}>
          <input name="name" type="text" value={dataForm.name} onChange={handleChange} />
          {inputErrors.name && <p className={styles.textDanger}>{inputErrors.name}</p>}
          <label>Name</label>
        </div>
        <div className={styles.userBox}>
          <input name="email" type="email" value={dataForm.email} onChange={handleChange} />
          {inputErrors.email && <p className={styles.textDanger}>{inputErrors.email}</p>}
          <label>Email</label>
        </div>
        <div className={styles.userBox}>
          <input name="username" type="text" value={dataForm.username} onInput={handleChange} />
          {inputErrors.username && <p className={styles.textDanger}>{inputErrors.username}</p>}
          <label>Username</label>
        </div>
        <div className={styles.userBox}>
          <input name="password" type="password" value={dataForm.password} onChange={handleChange} />
          {passwordStrength && (
            <p
              className={styles.passwordStrength}
              style={{
                color:
                  passwordStrength === "La contraseña es insegura"
                    ? "indianred"
                    : passwordStrength === "La contraseña es débil"
                      ? "#FFC436"
                      : "#54B435",
              }}
            >
              {passwordStrength}
            </p>
          )}
          {inputErrors.password && <p className={styles.textDanger}>{inputErrors.password}</p>}
          <label>Password</label>
        </div>
        <div className={styles.userBox}>
          <input name="confirmPassword" type="password" onChange={handleChange} />
          {inputErrors.confirmPassword && <p className={styles.textDanger}>{inputErrors.confirmPassword}</p>}
          <label>Confirm Password</label>
        </div>
        <div className={styles.userBox}>
          <input name="birthdate" type="date" value={dataForm.birthdate} onChange={handleChange} />
          {inputErrors.birthdate && <p className={styles.textDanger}>{inputErrors.birthdate}</p>}
          <label>Date of Birth</label>
        </div>
        <div className={styles.userBox}>
          <input name="nDni" type="text" value={dataForm.nDni} onChange={handleChange} />
          {inputErrors.nDni && <p className={styles.textDanger}>{inputErrors.nDni}</p>}
          <label>Número de documento</label>
        </div>
        <button type="submit" disabled={isButtonDisabled}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
      </form>
      <p>¿Ya tienes una cuenta? <a role="button" className={styles.a2} onClick={handleLoginClick}>Inicia Sesión</a></p>
    </div>
  );
};

Register.propTypes = {
  handleLoginClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};


export default Register;