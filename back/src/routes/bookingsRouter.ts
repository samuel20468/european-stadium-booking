import { Router } from "express";
import bookingsController from "../controllers/bookingsController";

const router: Router = Router();

router.get("/", bookingsController.getAllBookings);
router.get("/booking-detail/:id", bookingsController.getBookingById);
router.post("/booking/schedule", bookingsController.createBooking);
router.put("/booking/cancel/:id", bookingsController.changeBookingStatus);
router.delete("/booking/delete/:id", bookingsController.deleteOneBooking);

export default router;