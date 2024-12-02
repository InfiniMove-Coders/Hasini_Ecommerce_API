const CrudRepository = require("./crudRepository"); // Adjust the path as needed
const Category = require("../models/category"); // Example model

class CategoryRepository extends CrudRepository {
  constructor() {
    super(Category);
  }

  async findBySlug(slug) {
    try {
      return await this.model.findOne({ slug });
    } catch (error) {
      throw new Error(`Error finding category by slug: ${error.message}`);
    }
  }
}

module.exports = CategoryRepository;
