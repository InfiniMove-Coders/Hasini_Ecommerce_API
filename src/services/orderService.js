const orderRepository = require("../repositories/orderRepository");
const productModel = require("../models/product");

async function createOrder(data) {
  try {
    let totalPrice = 0;
    for (const item of data.products) {
      const product = await productModel.findById(item.product);
      if (!product) {
        throw new Error(`Product with ID ${item.product} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product ${product.name}`);
      }
      totalPrice += product.price * item.quantity;
      item.price = product.price;
    }
    data.totalPrice = totalPrice;

    // Promise.all(
    //   data.products.map(async (item) => {
    //     const product = await productService.getProductById(item.product);
    //     if (!product) {
    //       throw new Error(`Product with ID ${item.product} not found`);
    //     }
    //     if (product.stock < item.quantity) {
    //       throw new Error(`Not enough stock for product ${product.name}`);
    //     }
    //     item.price = product.price;
    //   })
    // );
    // data.totalPrice = data.products.reduce(
    //   (total, item) => total + item.price * item.quantity,
    //   0
    // );

    // Promise.all(
    //   data.products.map(async (item) => {
    //     await productService.updateProductStock(
    //       item.product,
    //       product.stock - item.quantity
    //     );
    //   })
    // );

    return await orderRepository.createOrder(data);
  } catch (error) {
    throw new Error(`Create order failed: ${error.message}`);
  }
}

async function getOrderById(id) {
  try {
    return await orderRepository.getOrderById(id);
  } catch (error) {
    throw new Error(`Get order failed: ${error.message}`);
  }
}

async function getAllOrders() {
  try {
    return await orderRepository.getAllOrders();
  } catch (error) {
    throw new Error(`Get orders failed: ${error.message}`);
  }
}

async function getOrdersByUser(userId) {
  try {
    return await orderRepository.getOrdersByUser(userId);
  } catch (error) {
    throw new Error(`Get orders by user failed: ${error.message}`);
  }
}

async function getOrdersByStatus(status) {
  try {
    return await orderRepository.getOrdersByStatus(status);
  } catch (error) {
    throw new Error(`Get orders by status failed: ${error.message}`);
  }
}

async function updateOrderDetails(orderId, data) {
  try {
    let totalPrice = 0;
    for (const item of data.products) {
      const product = await productModel.findById(item.product);
      if (!product) {
        throw new Error(`Product with ID ${item.product} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product ${product.name}`);
      }
      totalPrice += product.price * item.quantity;
      item.price = product.price;
    }
    data.totalPrice = totalPrice;
    return await orderRepository.updateOrderDetails(orderId, data);
  } catch (error) {
    throw new Error(`Update order failed: ${error.message}`);
  }
}

async function updateOrderStatus(orderId, status) {
  try {
    return await orderRepository.updateOrderStatus(orderId, status);
  } catch (error) {
    throw new Error(`Update order status failed: ${error.message}`);
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
