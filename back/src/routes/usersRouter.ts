import { Router } from "express";
import usersController from "../controllers/usersController";


const router: Router = Router();

router.get("/", usersController.getAllUsers);
router.get("/user-detail/:id", usersController.getUserById);
router.post("/register", usersController.postUser);
router.post("/login", usersController.loginUser);

export default router;