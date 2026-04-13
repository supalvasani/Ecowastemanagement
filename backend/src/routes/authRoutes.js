import { Router } from "express";
import { login, register, registerAdmin } from "../controller/authController.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/register-admin", registerAdmin);

export default router;
