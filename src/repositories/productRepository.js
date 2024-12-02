const CrudRepository = require("./crudRepository");
const Product = require("../models/product");

class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }

  // Find products by category
  async findByCategory(category, options = {}) {
    try {
      const query = this.model.find({ category });

      if (options.sort) query.sort(options.sort);
      if (options.limit) query.limit(options.limit);
      if (options.skip) query.skip(options.skip);

      return await query.exec();
    } catch (error) {
      throw new Error(`Error finding products by category: ${error.message}`);
    }
  }

  // Update stock for a product
  async updateStock(productId, stock) {
    try {
      const updatedProduct = await this.model.findByIdAndUpdate(
        productId,
        { stock },
        { new: true }
      );
      if (!updatedProduct) throw new Error("Product not found");
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error updating product stock: ${error.message}`);
    }
  }

  async findActiveProducts(options = {}) {
    try {
      const query = this.model.find({ isActive: true });

      if (options.sort) query.sort(options.sort);
      if (options.limit) query.limit(options.limit);
      if (options.skip) query.skip(options.skip);

      return await query.exec();
    } catch (error) {
      throw new Error(`Error finding active products: ${error.message}`);
    }
  }
}

module.exports = ProductRepository;
