const Order = require("../models/order");
const CrudRepository = require("./crudRepository");

class OrderRepository extends CrudRepository {
  constructor() {
    super(Order);
  }

  findById = async (id) => {
    try {
      return await this.model.findById(id).populate("products.product user");
    } catch (error) {
      throw new Error("Failed to retrieve order");
    }
  };

  findAll = async (filter = {}) => {
    try {
      return await this.model.find(filter)
        .populate("products.product user")
        .sort({ createdAt: -1 });
    } catch (error) {
      throw new Error("Failed to retrieve orders");
    }
  };
}

module.exports = OrderRepository;
