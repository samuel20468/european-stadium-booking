import PropTypes from "prop-types";
import styles from "./CancelButton.module.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const CancelButton = ({ id, cancelBooking }) => {
    const MySwal = withReactContent(Swal);
    const handleCancelBooking = () => {
        const swalWithBootstrapButtons = MySwal.mixin({
            customClass: {
                confirmButton: `${styles.confirmButton}`,
                cancelButton: `${styles.cancelButton}`
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "¿Estas seguro que quieres cancelar esta reserva?",
                text: "No podrás revertir los cambios",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, cancelar reserva!",
                cancelButtonText: "No, volver!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire(
                        "Cancelado!",
                        "La reserva ha sido cancelada!",
                        "success"
                    );
                    cancelBooking(id);
                } else if (
                    result.dismiss === MySwal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        "Acción interrumpida!",
                        "Tu reserva sigue activa :)",
                        "error"
                    );
                }
            });
    };

    return (
        <button className={styles.button} onClick={handleCancelBooking}>
            <span className={styles.button__text}>Cancel</span>
            <span className={styles.button__icon}>
                <svg className={styles.svg} height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                    <title></title>
                    <path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320" style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }}></path>
                    <line style={{ stroke: "#fff", strokeLinecap: "round", strokeMiterlimit: "10", strokeWidth: "32px" }} x1="80" x2="432" y1="112" y2="112"></line>
                    <path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40" style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }}></path>
                    <line style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} x1="256" x2="256" y1="176" y2="400"></line>
                    <line style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} x1="184" x2="192" y1="176" y2="400"></line>
                    <line style={{ fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32px" }} x1="328" x2="320" y1="176" y2="400"></line>
                </svg>
            </span>
        </button>
    );
};

CancelButton.propTypes = {
    id: PropTypes.string.isRequired,
    cancelBooking: PropTypes.func.isRequired
};

export default CancelButton;
