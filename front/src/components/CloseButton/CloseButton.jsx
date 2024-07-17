import styles from "./CloseButton.module.css";
import PropTypes from "prop-types";

const CloseButton = ({onClose}) => {
    return (
        <div className={styles.outer} onClick={onClose}>
            <div className={styles.inner}>
                <label className={styles.inputLabel}>Back</label>
            </div>
        </div>
    )
};

CloseButton.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default CloseButton