const express = require("express");
const orderController = require("../controllers/orderController");

const { authenticate, isAdmin } = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, isAdmin, orderController.getAllOrders);
router.post("/", authenticate, orderController.createOrder);
router.get("/:id", authenticate, orderController.getOrderById);
router.get("/user/:id", authenticate, orderController.getOrdersByUser);
router.get(
  "/status/:status",
  authenticate,
  isAdmin,
  orderController.getOrdersByStatus
);

router.put("/:id", authenticate, orderController.updateOrderDetails);
router.patch(
  "/:id/status",
  authenticate,
  isAdmin,
  orderController.updateOrderStatus
);

module.exports = router;
