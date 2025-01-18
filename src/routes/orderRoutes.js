const express = require("express");
const OrderController = require("../controllers/orderController");
const { authenticate, isAdmin } = require("../middlewares/authenticate");

const router = express.Router();
const orderController = new OrderController();

router.get("/", authenticate, isAdmin, orderController.getAllOrders);
router.post("/", authenticate, orderController.createOrder);
router.get("/:id", authenticate, orderController.getOrderById);
router.get("/user/:id", authenticate, orderController.getOrdersByUser);
router.patch(
  "/:id/status",
  authenticate,
  isAdmin,
  orderController.updateOrderStatus
);

module.exports = router;