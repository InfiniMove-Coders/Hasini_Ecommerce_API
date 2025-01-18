// Import the OrderService for handling business logic related to orders
const OrderService = require("../services/orderService");
// Import the sendResponse utility for sending HTTP responses
const sendResponse = require("../utils/responseHandler");

// Define the OrderController class to handle order-related HTTP requests
class OrderController {
  constructor() {
    // Initialize an instance of OrderService
    this.orderService = new OrderService();
  }

  // Method to create a new order
  createOrder = async (req, res) => {
    try {
      // Construct order data from the request body and user information
      const orderData = {
        user: req.user._id,
        products: req.body.products,
        deliveryTimeSlot: req.body.deliveryTimeSlot,
        deliveryAt: req.body.deliveryAt,
        shippingAddress: req.body.shippingAddress,
      };
      // Call the orderService to create a new order
      const order = await this.orderService.createOrder(orderData);
      // Send a success response with the created order
      sendResponse(res, 201, "Order created successfully", { order });
    } catch (error) {
      // Send an error response if order creation fails
      sendResponse(res, 400, null, null, error.message);
    }
  };

  // Method to retrieve orders by user ID
  getOrdersByUser = async (req, res) => {
    try {
      // Call the orderService to retrieve orders for a specific user
      const orders = await this.orderService.getOrdersByUser(req.params.id);
      // Send a success response with the retrieved orders
      sendResponse(res, 200, "Orders retrieved successfully", { orders });
    } catch (error) {
      // Send an error response if retrieval fails
      sendResponse(res, 400, null, null, error.message);
    }
  };

  // Method to retrieve all orders
  getAllOrders = async (req, res) => {
    try {
      // Call the orderService to retrieve all orders
      const orders = await this.orderService.getAllOrders();
      // Send a success response with the retrieved orders
      sendResponse(res, 200, "All orders retrieved successfully", { orders });
    } catch (error) {
      // Send an error response if retrieval fails
      sendResponse(res, 400, null, null, error.message);
    }
  };

  // Method to retrieve a specific order by ID
  getOrderById = async (req, res) => {
    try {
      // Call the orderService to retrieve a specific order
      const order = await this.orderService.getOrderById(req.params.id);
      // Send a success response with the retrieved order
      sendResponse(res, 200, "Order retrieved successfully", { order });
    } catch (error) {
      // Send an error response if retrieval fails
      sendResponse(res, 400, null, null, error.message);
    }
  };

  // Method to update the status of an order
  updateOrderStatus = async (req, res) => {
    try {
      // Call the orderService to update the order status
      const order = await this.orderService.updateOrderStatus(
        req.params.id,
        req.body.status
      );
      // Send a success response with the updated order
      sendResponse(res, 200, "Order status updated successfully", { order });
    } catch (error) {
      // Send an error response if update fails
      sendResponse(res, 400, null, null, error.message);
    }
  };
}

// Export the OrderController class for use in other parts of the application
module.exports = OrderController;
