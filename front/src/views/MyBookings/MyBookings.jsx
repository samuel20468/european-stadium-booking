// MyBookings.jsx
import { useEffect, useState } from "react"
import axios from "axios";
import styles from "./MyBookings.module.css";
import NavBar from "../../components/NavBar/NavBar";
import ActiveBooking from "../../components/Booking/ActiveBooking";
import CancelledBooking from "../../components/Booking/CancelledBooking";
import Spinner from "../../components/Spinner/Spinner";
import CreateBooking from "../../components/CreateBooking/CreateBooking";
import { useDispatch, useSelector } from "react-redux";
import { sortBookings, cancelOneBooking, removeBooking } from "../../redux/reducer";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const user = useSelector( state => state.user);
  const activeBookings = useSelector(state => state.activeBookings);
  const cancelledBookings = useSelector(state => state.cancelledBookings);
  
  const userId = user.id
  
  const navigate = useNavigate();

  useEffect(() => {
    !user.name && navigate("/")
  }, [])

  const [isLoading, setIsLoading] = useState(false);
  const [showCreateBooking, setShowCreateBooking] = useState(false);

  const dispatch = useDispatch();


  const handleCreateBookingClick = () => {
    setShowCreateBooking(true);
  };

  const handleCloseCreateBooking = () => {
    setShowCreateBooking(false);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const API = `http://localhost:3000/users/user-detail/${userId}`;
        const response = await axios(API);
        const data = response.data.appointments;
        const active = data.filter((booking) => booking.status === "Active");
        const cancelled = data.filter((booking) => booking.status === "Cancelled");

        dispatch(sortBookings({active, cancelled}));

      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    try {
      setIsLoading(true);
      const API = `http://localhost:3000/bookings/booking/cancel/${id}`;
      await axios.put(API, { status: "Cancelled" });
      const cancelledBooking = activeBookings.find((booking) => booking.id === id);
      const updatedActiveBookings = activeBookings.filter((booking) => booking.id !== id);

      dispatch(cancelOneBooking({updatedActiveBookings, cancelledBooking}));

    } catch (error) {
      console.error("Error canceling booking:", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:3000/bookings/booking/delete/${id}`);
      const updatedCancelledBookings = cancelledBookings.filter((booking) => booking.id !== id);

      dispatch(removeBooking(updatedCancelledBookings));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className={`${styles.container} ${showCreateBooking ? styles.blur : ''}`}>
        {activeBookings.length ? (
          <div className={styles.addContainer}>
            <button className={styles.Btn} onClick={handleCreateBookingClick}>
              <div className={styles.sign}>+</div>
              <div className={styles.text}>Create</div>
            </button>
          </div>
        ) : null}
        <h2 className={styles.title}>Mis Reservas</h2>
        {isLoading || !cancelledBookings.length && !activeBookings.length ? (
          <>
            <Spinner />
            <div className={styles.notFound}>
              <h3 className={styles.notFoundText}> No tienes reservas creadas... </h3>
              <button className={styles.Btn} onClick={handleCreateBookingClick}>

                <div className={styles.sign}>+</div>

                <div className={styles.text}>Create</div>
              </button>
            </div>
          </> 
        ) : null}

        {activeBookings.length || cancelledBookings.length ? (
          <>
            <div className={styles.activeBookingsContainer}>
              <h3 className={styles.subtitle}>Reservas Activas</h3>
              <div className={styles.activeBookings}>
                {!activeBookings.length ? (
                  <div className={styles.notFound}>
                    <h3 className={styles.notFoundText}> No tienes reservas activas... </h3>
                    <button className={styles.Btn} onClick={handleCreateBookingClick}>

                      <div className={styles.sign}>+</div>

                      <div className={styles.text}>Create</div>
                    </button>
                  </div>
                ) : activeBookings.map((booking) => (
                  <ActiveBooking key={booking.id} {...booking} cancelBooking={cancelBooking} />
                ))}
              </div>
            </div>
            <div className={styles.cancelledBookingsContainer}>
              <h3 className={styles.subtitle}>Reservas Canceladas</h3>
              <div className={styles.cancelledBookings}>
                {!cancelledBookings.length ? (
                  <div className={styles.notFound}>
                    <h3 className={styles.notFoundText}> No tienes reservas canceladas... </h3>
                  </div>
                ) : cancelledBookings.map((booking) => (
                  <CancelledBooking key={booking.id} {...booking} deleteBooking={deleteBooking} />
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
      {showCreateBooking && <CreateBooking onClose={handleCloseCreateBooking} />}
    </>
  );
};

export default MyBookings;