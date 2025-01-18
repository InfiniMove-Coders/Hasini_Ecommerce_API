const OrderRepository = require("../repositories/orderRepository");
const ProductRepository = require("../repositories/productRepository");

class OrderService {
  constructor() {
    this.productRepository = new ProductRepository();
    this.orderRepository = new OrderRepository();
  }

  createOrder = async (data) => {
    try {
      let totalPrice = 0;
      const products = await this.productRepository.findAll({
        _id: { $in: data.products.map((p) => p.product) },
      });
      data.products.forEach((orderProduct) => {
        const product = products.find(
          (p) => p._id.toString() === orderProduct.product.toString()
        );
        if (!product) {
          throw new Error(`Product with ID ${orderProduct.product} not found`);
        }
        if (product.stock < orderProduct.quantity) {
          throw new Error(`Not enough stock for product ${product.name}`);
        }
        totalPrice += product.price * orderProduct.quantity;
        orderProduct.price = product.price;
      });
      data.totalPrice = totalPrice;

      return await this.orderRepository.create(data);
    } catch (error) {
      throw new Error(`Create order failed: ${error.message}`);
    }
  };

  getOrderById = async (id) => {
    try {
      return await this.orderRepository.findById(id);
    } catch (error) {
      throw new Error(`Get order failed: ${error.message}`);
    }
  };

  getAllOrders = async (filters) => {
    try {
      let { page, pageSize, minPrice, maxPrice, ...queryFilters } = filters;

      if (minPrice) {
        queryFilters.totalPrice = {
          ...(queryFilters.totalPrice || {}),
          $gte: minPrice,
        };
      }

      if (maxPrice) {
        queryFilters.totalPrice = {
          ...(queryFilters.totalPrice || {}),
          $lte: maxPrice,
        };
      }

      return this.orderRepository.findAll(
        queryFilters,
        { page, pageSize},
        "products.product user shippingAddress",
        { createdAt: 1 }
      );
    } catch (error) {
      throw new Error("Failed to retrieve orders");
    }
  };

  getOrdersByUser = async (userId) => {
    try {
      return await this.orderRepository.findAll(
        { user: userId },
        {},
        "products.product user shippingAddress"
      );
    } catch (error) {
      throw new Error(`Get orders by user failed: ${error.message}`);
    }
  };

  getOrdersByStatus = async (status) => {
    try {
      return await this.orderRepository.findAll({ status });
    } catch (error) {
      throw new Error(`Get orders by status failed: ${error.message}`);
    }
  };

  updateOrderStatus = async (orderId, status) => {
    try {
      return await this.orderRepository.updateById(orderId, { status });
    } catch (error) {
      throw new Error(`Update order status failed: ${error.message}`);
    }
  };
}

module.exports = OrderService;
