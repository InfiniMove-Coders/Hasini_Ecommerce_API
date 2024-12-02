const CategoryRepository = require("../repositories/categoryRepository");
const categoryRepository = new CategoryRepository();

class CategoryService {
  async createCategory(data) {
    try {
      const existingCategory = await categoryRepository.findBySlug(data.slug);
      if (existingCategory) {
        throw new Error("Category with this slug already exists");
      }
      return await categoryRepository.create(data);
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  async getCategoryById(id) {
    try {
      const category = await categoryRepository.findById(id);
      if (!category) {
        throw new Error("Category not found");
      }
      return category;
    } catch (error) {
      throw new Error(`Error fetching category by ID: ${error.message}`);
    }
  }

  async getAllCategories() {   
    try {
      return await categoryRepository.findAll();
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

  async updateCategoryById(id, updates) {
    try {
      const updatedCategory = await categoryRepository.updateById(id, updates);
      if (!updatedCategory) {
        throw new Error("Category not found for update");
      }
      return updatedCategory;
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  }

  async deleteCategoryById(id) {
    try {
      const deletedCategory = await categoryRepository.deleteById(id);
      if (!deletedCategory) {
        throw new Error("Category not found for deletion");
      }
      return deletedCategory;
    } catch (error) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
  }

  async findCategoryBySlug(slug) {
    try {
      const category = await categoryRepository.findBySlug(slug);
      if (!category) {
        throw new Error("Category not found with this slug");
      }
      return category;
    } catch (error) {
      throw new Error(`Error fetching category by slug: ${error.message}`);
    }
  }
}

module.exports = new CategoryService();
