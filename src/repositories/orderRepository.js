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

module.exports = OrderRepository;
