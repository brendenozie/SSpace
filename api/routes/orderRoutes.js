import express from "express";
import {
  addOrderItems,
  getOrder,
  updateOrderToPaid,
  getMyOrders,
  getAllMyOrders,
  getOrders,
  updateOrderToDeliver,
  getAllOrders,
  getStatusOrder,
  getTotalSales,
  getDailyAverage,
  getUserCount,
  getProductCount,
} from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(addOrderItems);
router.route("/").get(getAllOrders);
router.route("/getcount").get(getTotalSales);
router.route("/dailyaverage").get(getDailyAverage);
router.route("/usercount").get(getUserCount);
router.route("/productcount").get(getProductCount);
router.route("/myorders").get(getAllMyOrders);
router.route("/statsorder").get(getStatusOrder);
router.route("/:id").get(getOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDeliver);

export default router;
