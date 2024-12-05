const Order = require("../models/order");

async function createOrder(orderData) {
  try {
    return await Order.create(orderData);
  } catch (error) {
    // console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}

async function getOrderById(id) {
  try {
    return await Order.findById(id).populate("products.product user");
  } catch (error) {
    // console.error("Error fetching order by ID:", error);
    throw new Error("Failed to retrieve order");
  }
}

async function getAllOrders() {
  try {
    return await Order.find()
      .populate("products.product user")
      .sort({ createdAt: -1 });
  } catch (error) {
    // console.error("Error fetching all orders:", error);
    throw new Error("Failed to retrieve orders");
  }
}

async function getOrdersByUser(userId) {
  try {
    return await Order.find({ user: userId })
      .populate("products.product")
      .sort({ createdAt: -1 });
  } catch (error) {
    // console.error("Error fetching orders by user:", error);
    throw new Error("Failed to retrieve orders for this user");
  }
}

async function getOrdersByStatus(status) {
  try {
    return await Order.find({ status: status })
      .populate("products.product user")
      .sort({ createdAt: -1 });
  } catch (error) {
    // console.error("Error fetching orders by status:", error);
    throw new Error("Failed to retrieve orders by status");
  }
}

async function updateOrderDetails(orderId, updateData) {
  try {
    return await Order.findByIdAndUpdate(
      orderId,
      { $set: updateData },
      { new: true }
    );
  } catch (error) {
    // console.error("Error updating order details:", error);
    throw new Error("Failed to update order");
  }
}

async function updateOrderStatus(orderId, status) {
  try {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  } catch (error) {
    throw new Error("Failed to update order status");
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByStatus,
  updateOrderDetails,
  updateOrderStatus,
};
