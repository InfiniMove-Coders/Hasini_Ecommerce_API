const { default: mongoose } = require("mongoose");
const OrderService = require("../services/orderService");
const sendResponse = require("../utils/responseHandler");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }

  createOrder = async (req, res) => {
    try {
      const orderData = {
        user: req.user._id,
        products: req.body.products,
        deliveryTimeSlot: req.body.deliveryTimeSlot,
        deliveryAt: req.body.deliveryAt,
        shippingAddress: req.body.shippingAddress,
      };
      const order = await this.orderService.createOrder(orderData);
      sendResponse(res, 201, "Order created successfully", { order });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  getOrdersByUser = async (req, res) => {
    try {
      const orders = await this.orderService.getOrdersByUser(req.params.id);
      sendResponse(res, 200, "Orders retrieved successfully", { orders });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };


  getOrderById = async (req, res) => {
    try {
      const order = await this.orderService.getOrderById(req.params.id);
      sendResponse(res, 200, "Order retrieved successfully", { order });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  getAllOrders = async (req, res) => {
    try {
      const filters = req.query;
      if (filters.user) {
        filters.user = new mongoose.Types.ObjectId(filters.user);
      }

      const orders = await this.orderService.getAllOrders(filters);
      sendResponse(res, 200, "Orders retrieved successfully", { orders });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  getOrdersByStatus = async (req, res) => {
    try {
      const orders = await this.orderService.getOrdersByStatus(
        req.params.status
      );
      sendResponse(res, 200, "Orders retrieved successfully", { orders });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  updateOrderStatus = async (req, res) => {
    try {
      const order = await this.orderService.updateOrderStatus(
        req.params.id,
        req.body.status
      );
      sendResponse(res, 200, "Order status updated successfully", { order });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };
}

module.exports = OrderController;
