const orderService = require("../services/orderService");
const sendResponse = require("../utils/responseHandler");

const createOrder = async (req, res) => {
  try {
    const orderData = {
      user: req.user._id,
      products: req.body.products,
    };
    const order = await orderService.createOrder(orderData);
    sendResponse(res, 201, "Order created successfully", { order });
  } catch (error) {
    sendResponse(res, 400, null, null, error.message);
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUser(req.params.id);
    sendResponse(res, 200, "Orders retrieved successfully", { orders });
  } catch (error) {
    sendResponse(res, 400, null, null, error.message);
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    sendResponse(res, 200, "Order retrieved successfully", { order });
  } catch (error) {
    sendResponse(res, 400, null, null, error.message);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    sendResponse(res, 200, "Orders retrieved successfully", { orders });
  } catch (error) {
    sendResponse(res, 400, null, null, error.message);
  }
};

const getOrdersByStatus = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByStatus(req.params.status);
    sendResponse(res, 200, "Orders retrieved successfully", { orders });
  } catch (error) {
    sendResponse(res, 400, null, null, error.message);
  }
};

const updateOrderDetails = async (req, res) => {
  try {
    const order = await orderService.updateOrderDetails(
      req.params.id,
      req.body
    );
    sendResponse(res, 200, "Order updated successfully", { order });
  } catch (error) {
    sendResponse(res, 400, null, null, error.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status
    );
    sendResponse(res, 200, "Order status updated successfully", { order });
  } catch (error) {
    sendResponse(res, 400, null, null, error.message);
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByStatus,
  updateOrderDetails,
  updateOrderStatus,
};
