// Import the OrderRepository for database operations related to orders
const OrderRepository = require("../repositories/orderRepository");
// Import the ProductRepository for database operations related to products
const ProductRepository = require("../repositories/productRepository");

// Define the OrderService class for handling business logic related to orders
class OrderService {
  constructor() {
    // Initialize the productRepository for product-related operations
    this.productRepository = new ProductRepository();
    // Initialize the orderRepository for order-related operations
    this.orderRepository = new OrderRepository();
  }

  // Method to create a new order
  createOrder = async (data) => {
    try {
      let totalPrice = 0;
      // Retrieve all products related to the order
      const products = await this.productRepository.findAll({
        _id: { $in: data.products.map((p) => p.product) },
      });

      // Calculate total price and check stock availability
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
        // Price calculation logic would go here...
      });


      // Further order processing logic would go here...
    } catch (error) {
      // Handle errors related to order creation
      throw new Error(`Order creation failed: ${error.message}`);
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
      let { page, pageSize, ...queryFilters } = filters;
      // console.log(page, pageSize, queryFilters);

      return this.orderRepository.findAll(
        queryFilters,
        {
          page,
          pageSize,
        },
        "products.product user shippingAddress"
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

// Export the OrderService class for use in other parts of the application

module.exports = OrderService;
