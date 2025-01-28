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

  async getUserRatingPos(product, userId) {
    try {
      return product.ratings.findIndex(rating => rating.user.toString() === userId);
    } catch (error) {
      throw new Error(`Error while checking if user rated product: ${error.message}`);
    }
  }

  async addNewRating(product, user, rating) {
    try {
      product.ratings.push({ user: user, rating: rating });
      product.avgRating = (product.avgRating * product.numRatings + rating) / (product.numRatings + 1);
      product.numRatings += 1;
      await product.save();
      return product;
    } catch (error) {
      throw new Error(`Error while adding new rating to product: ${error.message}`);
    }
  }

  async updateRating(product, userRatingIndex, currRating) {
    try {
      const prevRating = product.ratings[userRatingIndex].rating;
      product.avgRating = (product.avgRating * product.numRatings - prevRating + currRating) / product.numRatings;
      product.ratings[userRatingIndex].rating = currRating;
      await product.save();
      return product;
    } catch (error) {
      throw new Error(`Error while updating rating for product: ${error.message}`);
    }
  }

}

module.exports = ProductRepository;
