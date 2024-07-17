import { Router } from "express";
import usersRouter from "./usersRouter";
import bookingsRouter from "./bookingsRouter"

const router: Router = Router();

router.use("/users", usersRouter);
router.use("/bookings", bookingsRouter);

export default router;
