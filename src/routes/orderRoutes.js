// Import the express module
const express = require("express");

// Import the OrderController class
const OrderController = require("../controllers/orderController");

// Import authentication middleware functions
const { authenticate, isAdmin } = require("../middlewares/authenticate");

// Create a new router instance
const router = express.Router();

// Instantiate the OrderController
const orderController = new OrderController();

// Route to get all orders, accessible only to admins
router.get("/", authenticate, isAdmin, orderController.getAllOrders);

// Route to create a new order, accessible to authenticated users
router.post("/", authenticate, orderController.createOrder);

// Route to get a specific order by ID, accessible to authenticated users
router.get("/:id", authenticate, orderController.getOrderById);

// Route to get orders by user ID, accessible to authenticated users
router.get("/user/:id", authenticate, orderController.getOrdersByUser);

// Route to update order status by ID, accessible only to admins
router.patch(
  "/:id/status",
  authenticate,
  isAdmin,
  orderController.updateOrderStatus
);

// Export the router to be used in other parts of the application
module.exports = router;
