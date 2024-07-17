const validateRegister = (input) => {
    const errors = {};

    const nameSurnameRegex = /^[a-zA-Z\u00C0-\u017F']+([-]?[a-zA-Z\u00C0-\u017F']+)\s[a-zA-Z\u00C0-\u017F']+([-]?[a-zA-Z\u00C0-\u017F']+)$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const birthdateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const nDniRegex = /^\d+$/;
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;

    if (!nameSurnameRegex.test(input.name)) {
        errors.name = "* Nombre y Apellido no válido";
    }
    if (!emailRegex.test(input.email)) {
        errors.email = "* Email no válido";
    }
    if (!birthdateRegex.test(input.birthdate)) {
        errors.birthdate = "* Fecha de Nacimiento no válida (AAAA-MM-DD)";
    }
    if (!nDniRegex.test(input.nDni)) {
        errors.nDni = "* DNI no válido (solo números, sin '.' ni espacios)";
    }
    if (!usernameRegex.test(input.username)) {
        errors.username = "* Usuario no válido (solo letras, números, '_', '-' y '.')";
    }

    return errors

};

export default validateRegister;