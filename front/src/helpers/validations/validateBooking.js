const validateBooking = (name, value) => {
    const errors = {};
    const currentDate = new Date();
    const selectedDate = new Date(value);
    
    if (name === "date") {
        const dayOfWeek = selectedDate.getDay();
        if (dayOfWeek == 5|| dayOfWeek == 6) {
            errors.date = "Seleccione un día laborable (de lunes a viernes)";
        } else if (selectedDate <= currentDate) {
            errors.date = "La fecha debe ser mayor a la de hoy";
        }
        
    } else if (name === "time") {
        const [hours,] = value.split(":").map(Number);
        if (hours < 10 || hours >= 21) {
            errors.time = "El rango de hora debe ser entre las 10 am y 9 pm";
        }
    } else if (name === "stadium") {
        if (value === "") errors.stadium = "Debes seleccionar un estadio";
    }

    return errors;
};

export default validateBooking;