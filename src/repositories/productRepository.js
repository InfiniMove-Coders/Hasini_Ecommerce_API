const CrudRepository = require("./crudRepository");
const Product = require("../models/product");

class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
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
}

module.exports = ProductRepository;
