// Import the Order model from the models directory
const Order = require("../models/order");

// Import the CrudRepository class for base repository operations
const CrudRepository = require("./crudRepository");

// Define the OrderRepository class extending the CrudRepository
class OrderRepository extends CrudRepository {
  // Constructor that initializes the repository with the Order model
  constructor() {
    super(Order);
  }

  // Method to find an order by its ID with populated product and user details
  findById = async (id) => {
    try {
      return await this.model.findById(id).populate("products.product user");
    } catch (error) {
      throw new Error("Failed to retrieve order");
    }
  };

  // Method to find all orders based on a filter, with populated details
  findAll = async (filter = {}) => {
    try {
      return await this.model
        .find(filter)
        .populate("products.product user shippingAddress")
        .sort({ createdAt: -1 });
    } catch (error) {
      throw new Error("Failed to retrieve orders");
    }
  };
}

// Export the OrderRepository class for use in other parts of the application
module.exports = OrderRepository;
