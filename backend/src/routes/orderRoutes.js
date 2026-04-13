import { Router } from "express";
import {
  createBusiness,
  createEnterprise,
  createResidential,
  cancelOrder,
  getDashboard,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controller/orderController.js";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth);
router.post("/residential", createResidential);
router.post("/business", createBusiness);
router.post("/enterprise", createEnterprise);
router.get("/", requireAdmin, getAllOrders);
router.get("/user/me", getUserOrders);
router.get("/dashboard/me", getDashboard);
router.patch("/:id/cancel", cancelOrder);
router.patch("/:id/status", requireAdmin, updateOrderStatus);

export default router;
