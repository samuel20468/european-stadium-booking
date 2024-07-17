const validateLogin = (input) => {
    const errors = {};
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    const passwordRegex = /^.{8,}$/;

    if (!usernameRegex.test(input.username)) {
        errors.username = "* Usuario no válido(solo letras, números, '_', '-' y '.')";
    }
    if (!passwordRegex.test(input.password)) {
        errors.password = "* Contraseña no válida(mínimo 8 caracteres)";
    }

    return errors
};

export default validateLogin;