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
}

module.exports = OrderRepository;
