import { Router } from "express";
import {
  createBusiness,
  createEnterprise,
  createResidential,
  getDashboard,
  getUserOrders,
} from "../controller/orderController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth);
router.post("/residential", createResidential);
router.post("/business", createBusiness);
router.post("/enterprise", createEnterprise);
router.get("/user/me", getUserOrders);
router.get("/dashboard/me", getDashboard);

export default router;
