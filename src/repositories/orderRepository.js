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

  findAll = async (filters = {}) => {
    try {
      let { page, pageSize, ...queryFilters } = filters;
      let query = this.model
        .find(queryFilters)
        .populate("products.product user shippingAddress")
        .sort({ createdAt: -1 });
      if (page && pageSize) {
        page = parseInt(page);
        pageSize = parseInt(pageSize);
        const skip = (page - 1) * pageSize;
        console.log(skip, pageSize);
        query = query.skip(skip).limit(pageSize);
      }

      const orders = await query.exec();
      console.log(orders);
      return orders;
    } catch (error) {
      throw new Error("Failed to retrieve orders");
    }
  };
}

// Export the OrderRepository class for use in other parts of the application
module.exports = OrderRepository;
